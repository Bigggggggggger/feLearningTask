/**
 * 题目：进制转换，将 10 进制浮点数转换成 64 进制。
 */
const convert10To64 = (() => {
  const CHARS =
    "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~";
  const CHARS_ARR = CHARS.split("");
  const RADIX = CHARS.length;

  // 反转字符串
  const reverseString = (str = "") => {
    return str?.split("").reverse().join("") || "";
  };

  // 移除末尾0
  const removeEndZero = (str = "") => {
    return str.replace(/(0+)$/g, "");
  };

  // 编码
  const encode = (num) => {
    const convert = (number) => {
      const arr = [];
      let res = number;
      let mod = 0;

      do {
        mod = res % RADIX;
        res = (res - mod) / RADIX;
        arr.unshift(CHARS_ARR[mod]);
      } while (res);

      return arr.join("");
    };

    const str = String(num);
    const [integer, float] = str?.split(".") || [];
    if (!float) {
      /* 无浮点数的情况直接返回转换的整型 */
      return convert(str);
    }

    return `${convert(integer)}.${convert(
      reverseString(removeEndZero(float))
    )}`;
  };

  // 解码
  const decode = (num) => {
    const convert = (number) => {
      let numCode = number;
      let len = numCode.length;
      let i = 0;
      let origin = 0;

      while (i < len) {
        origin +=
          Math.pow(RADIX, i++) *
          CHARS_ARR.indexOf(numCode.charAt(len - i) || 0);
      }

      return origin;
    };

    const str = String(num);
    const [integer, float] = str?.split(".") || [];
    if (!float) {
      /* 无浮点数的情况直接返回转换的整型 */
      return convert(str);
    }

    return `${convert(integer)}.${reverseString(
      String(convert(removeEndZero(float)))
    )}`;
  };

  return {
    encode,
    decode,
  };
})();

console.log("Test --- 1");
console.log(convert10To64.encode("123"));
console.log(convert10To64.decode("1X"));
console.log("Test --- 2");
console.log(convert10To64.encode("35.96"));
console.log(convert10To64.decode("z.15"));
console.log("Test --- 3");
console.log(convert10To64.encode("688.0120"));
console.log(convert10To64.decode("aM.3i0"));
