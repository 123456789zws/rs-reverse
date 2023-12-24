// 将数字数组每四位通过位移运算生成新数字，最后组成数组返回
// 入参数组的长度必须是4的倍数
const gv = require('@src/handler/globalVarible');

module.exports = function(numarr) {
  const arr = new Array(numarr.length / gv.cp2[19]);
  for (let cursor = 0, idx = 0; cursor < numarr.length; cursor += 4, idx++) {
    arr[idx] = numarr[cursor] << gv.cp2[4] | numarr[cursor + 1] << gv.cp2[2] | numarr[cursor + 2] << gv.cp2[52] | numarr[cursor + 3];
  }
  return arr;
}

