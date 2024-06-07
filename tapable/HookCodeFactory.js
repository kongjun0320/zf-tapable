class HookCodeFactory {
  /**
   * 初始化 hook 代码工厂
   * @param {*} hookInstance hook 实例
   * @param {*} options 渲染 type、args、taps
   */
  setup(hookInstance, options) {
    // 把回调函数全部取出来，变成数组赋值给 _x
    hookInstance._x = options.taps.map((item) => item.fn);
  }

  init(options) {
    // 把选项对象保存到工厂的 options 属性上
    this.options = options;
  }

  args() {
    return this.options.args.join(','); // name,age
  }

  header() {
    let code = '';
    code += `var _x = this._x;\n`;
    return code;
  }

  create(options) {
    this.init(options);
    let fn;
    switch (options.type) {
      case 'sync':
        fn = new Function(this.args(), this.header() + this.content());
        break;

      default:
        break;
    }
    return fn;
  }

  callTapsSeries() {
    if (this.options.taps.length === 0) {
      return '';
    }
    let code = '';
    for (let i = 0; i < this.options.taps.length; i++) {
      const tapContent = this.callTap(i);
      code += tapContent;
    }
    return code;
  }

  callTap(tapIndex) {
    let code = '';
    code += `var _fn${tapIndex} = _x[${tapIndex}]; \n`;
    let tapInfo = this.options.taps[tapIndex];
    switch (tapInfo.type) {
      case 'sync':
        code += ` _fn${tapIndex}(${this.args()});`;
        break;

      default:
        break;
    }
    return code;
  }
}

module.exports = HookCodeFactory;
