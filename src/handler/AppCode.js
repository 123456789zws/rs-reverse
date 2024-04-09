const gv = require('@src/handler/globalVarible');

module.exports = class {
  constructor(params, idx) {
    this.oper = 0;
    this.params = params;
    this.idx = idx;
  }

  getLength() {
    let one, two, three, four, dkey = gv.decryptKeys[5];
    const text = this.params[0];
    const flag = dkey[text.charCodeAt(this.oper++)];
    if (flag <= 80) return flag;
    if (flag == 81) {
      return dkey[text.charCodeAt(this.oper++)] + 80;
    }
    if (flag == 82) {
      one = dkey[text.charCodeAt(this.oper++)];
      two = dkey[text.charCodeAt(this.oper++)];
      return one + two * 86 + 165;
    }
    if (flag == 83) {
      one = dkey[text.charCodeAt(this.oper++)];
      two = dkey[text.charCodeAt(this.oper++)];
      three = dkey[text.charCodeAt(this.oper++)];
      return one + two * 86 + three * 86 * 86 + 7560;
    }
    if (flag == 84) {
      one = dkey[text.charCodeAt(this.oper++)];
      two = dkey[text.charCodeAt(this.oper++)];
      three = dkey[text.charCodeAt(this.oper++)];
      four = dkey[text.charCodeAt(this.oper++)];
      return one + two * 86 + three * 86 * 86 + four * 86 * 86 * 86 + 643615;
    }
  }

  getKeys(len) {
    const keys = [];
    for(let i = 0; i <= len; i++) {
      const j = Math.floor((this.random || Math.random()) * 4294967295) % len + 0;
      keys[i] = keys[j] || `$_${j}`;
      keys[j] = `$_${i}`;
    }
    return keys;
  }

  decrypt() {
    const keys = this.getKeys(this.getLength());
    const name = `$$_${this.idx}`;
    const num = this.getLength();
    const ret = new Array(num), res = [];
    const staticText = this.params[1].split('~');
    for(let i = 0, j; i < num; i++) {
      i % 2 == 0 ? j = this.getLength() : j >>= 3;
      const next = this.getLength();
      switch(j & 7) {
        case 0:
          ret[i] = res[next];
          break;
        case 1:
          ret[i] = keys[next];
          break;
        case 2:
          ret[i] = gv.ts.cp[1][next];
          break;
        case 3:
          const val = this.params[0].substr(this.oper, next);
          this.oper += next;
          res.push(val);
          ret[i] = val;
          break;
        case 4:
          // ret[i] = `${name}[${next}]`;
          ret[i] = `"${staticText[next]}"`;
          break;
        case 5:
          ret[i] = this.params[2][next]
          break;
      }
    }
    // return `window[${name}]=${JSON.stringify(staticText)};${ret.join('')}`;
    return ret.join('');
  }

  run() {
    const code = this.decrypt();
    if (this.getLength() !== 0) {
      debugger;
      throw new Error('预期值不符，需要增加额外代码适配！');
    };
    return code;
  }
}
