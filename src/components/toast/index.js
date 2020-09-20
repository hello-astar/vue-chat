import "./index.scss";

const name = "toast";
export default {
  name,
  props: {
    type: {
      // 类型
      type: String,
      default: "text" // success warn error text loading
    },
    text: {
      // 内容
      type: String,
      default: ""
    },
    position: {
      // toast位置
      type: String,
      default: "center" // top center, bottom
    },
    duration: {
      // 显示时间
      type: Number,
      default: 2000 // 默认两秒
    }
  },
  watch: {
    visible(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      visible: false,
      timeout: null
    };
  },
  methods: {
    // 获取动画class
    __getTransitionName() {
      const { position } = this;
      return `${name}__${position}_animation`;
    },
    // 清除定时器
    __clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    // 显示
    show() {
      this.__clearTimeout();
      this.visible = true;
      if (this.type !== "loading") {
        this.timeout = setTimeout(() => {
          this.visible = false;
        }, this.duration);
      }
    },
    // 隐藏
    hide() {
      this.__clearTimeout();
      this.visible = false;
    }
  },
  render() {
    const { position, text, type } = this;
    let transitionName = this.__getTransitionName();
    let showImg = ["success", "error", "warn", "loading"].includes(type);
    let img = "";
    if (showImg) {
      try {
        img = ''; // require(`./assets/icon_toast_${type}.png`)
      } catch (e) {
        showImg = false;
      }
    }
    return (
      <transition name={transitionName}>
        <div class={[name, `${name}__${position}`]} vShow={this.visible}>
          <div class={[`${name}-content`]}>
            {showImg ? (
              <img
                class={[
                  `${name}-content__icon`,
                  `${name}-content__icon__${type}`
                ].join(" ")}
                src={img}
                alt=""
              />
            ) : null}
            <p class={`${name}-content__text`}>
              {text
                ? text
                : this.$scopedSlots.default && this.$scopedSlots.default()}
            </p>
          </div>
        </div>
      </transition>
    );
  }
};
