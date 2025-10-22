**开源兄弟项目(补环境框架sdenv)：[sdenv](https://github.com/pysunday/sdenv)**

## 0. 声明

该项目下代码仅用于个人学习、研究或欣赏。通过使用该仓库相关代码产生的风险与仓库代码作者无关！

该项目的研究网站仅做参考，项目不鼓励直接请求该研究网站，可通过以下两种方式研究：

1。 直接使用`example`目录下的样例文件，如：`node main.js makecookie`，既使用项目默认用例的外层虚拟机代码文件+ts文件。
2。 使用-j和-f命令指定本地外层虚拟机代码文件+ts文件(可通过makecode -u自动获取)，如：`node main.js makecookie -j ./path/to/main.js -f ./path/to/ts.json`

## 1. 博客文章

1. [瑞数vmp-代码格式化后无法正常运行原因分析](https://blog.howduudu.tech/article/420dc80bfb66280ddbb93d87864cadd1/)
2. [瑞数vmp-动态代码生成原理](https://blog.howduudu.tech/article/95f60638eaa0647bcf327fb4f2c2887c/)
3. [补环境-document.all的c++方案1](https://blog.howduudu.tech/article/00bb5f4a997c39858e25fa962e8cd5b8/)
4. [补环境-document.all的c++方案2](https://blog.howduudu.tech/article/de942bdea377f7f3ce6878fc04a8c76c/)

## 2. 瑞数算法还原

**`npx rs-reverse *`与在当前目录下运行`node main.js *`相对应, 当然也支持npm全局安装(`npm install -g rs-reverse`)，npm全局安装后也可以直接使用命令`rs-reverse`**

如npx运行的包不是最新的，可以加上-p参数后执行如：`npx -p rs-reverse@latest rs-reverse makecookie`，非官方源可能存在版本不同步问题，建议拉取时使用官方源：`--registry=https://registry.npmjs.org`。

### 2.1. makecode子命令

执行子命令`makecode`生成动态代码, 可以传入包含`$_ts.nsd`和`$_ts.cd`的文本文件或者直接给url让程序自己去拿，命令示例:

1. npx方式：`npx rs-reverse makecode`
2. 文件方式：`node main.js makecode`

**命令后不接参数则从example文件中取**

<!-- makecodeHelp -->

调用示例：

<!-- makecodeExample -->

### 2.2. makecookie子命令

执行子命令`makecookie`生成cookie, 调用方式与`makecode`类型，调用示例：

1. npx方式：`npx rs-reverse makecookie`
2. 文件方式：`node main.js makecookie`

该命令首先会执行`makecode`子命令拿到完整的`$_ts`值，再运行`makecookie`的还原算法生成cookie。

<!-- makecookieHelp -->

调用示例：

<!-- makecookieExample -->

### 2.3. makecode-high子命令

执行子命令`makecode-high`生成网站代码，解码两次请求返回的网站代码(功能涵盖makecode子命令)，调用示例：

1. npx方式：`npx rs-reverse makecode-high -u url`
2. 文件方式：`node main.js makecode-high -u url`

该命令第一次请求生成cookie带入第二次请求，将两次请求返回的加密代码及动态代码解码后保存到`output/makecode-high`目录中，和makecode命令区别为该命令只提供-u方式执行!

需要注意的是，请避免连续执行该命令以免触发风控报错，报错如：

![makecode-high风控报错](./static/error-makecode-high.png)

<!-- makecodeHighHelp -->

调用示例：

<!-- makecodeHighExample -->

### 2.4. exec子命令

exec子命令用于开发中或者演示时使用。命令示例：

1. npx方式：`npx rs-reverse exec -c 'gv.cp2'`
2. 文件方式：`node main.js exec -c 'gv.cp2'`

<!-- execHelp -->

调用示例：

<!-- execExample -->

## 3. 其它

### 3.1. 网站适配情况

从 [Issues:瑞数vmp网站征集](https://github.com/pysunday/rs-reverse/issues/1) 中获取。

**其中cookie可行性验证可执行makecode-high子命令，无报错则可行性验证验证通过。**

名称 | makecode | makecookie | makecode-high
---- | -------- | ---------- | -------------
[riversecurity.com](https://www.riversecurity.com/) | 👌 | 👌 | 👌
[epub.cnipa.gov.cn](http://epub.cnipa.gov.cn) | 👌 | 👌 | 👌
[zhaopin.sgcc.com.cn](https://zhaopin.sgcc.com.cn/sgcchr/static/home.html) | 👌 | 👌 | 👌
[njnu.edu.cn](http://www.njnu.edu.cn/index/tzgg.htm) | 👌 | 👌 | 👌
[ems.com.cn](https://www.ems.com.cn/) | 👌 | 👌 | 👌
[jf.ccb.com](https://jf.ccb.com/exchangecenter/search/product.jhtml) | 👌 | 👌 | 👌
[customs.gov.cn](http://www.customs.gov.cn/) | 👌 | 👌 | 👌
[fangdi.com.cn](https://www.fangdi.com.cn/) | 👌 | 👌 | 👌
[nmpa.gov.cn](https://www.nmpa.gov.cn/xxgk/ggtg/index.html) | 👌 | 👌 | 👌

**备注**：

1. njnu.edu.cn: 直接执行会返回明文，但是添加代理后会返回rs加密密文，可能和请求头参数有关本项目不做探讨，感兴趣可以自行研究。

### 3.2. 网站适配

版本1.10+适配只需要增加在目录`src/handler/basearr/`下增加适配文件即可，如文件：[len123.js](https://github.com/pysunday/rs-reverse/blob/main/src/handler/basearr/len123.js)

在文件底部需要加入适配信息，如：

```javascript
Object.assign(getBasearr, {
  adapt: ["XFRKF1pWVBdaVw==", "U18XWlpbF1pWVA=="],
  "XFRKF1pWVBdaVw==": {
    lastWord: 'P',
    flag: 4114,
    devUrl: 'UU1NSUoDFhZOTk4XXFRKF1pWVBdaVxY='
  },
  "U18XWlpbF1pWVA==": {
    lastWord: 'T',
    flag: 4113,
    devUrl: "UU1NSUoDFhZTXxdaWlsXWlZUFlxBWlFYV15cWlxXTVxLFkpcWEtaURZJS1ZdTFpNF1NRTVRV",
  },
  lens: 123,
  example: [3,49,1,0,33,128,159,173,0,238,8,77,97,99,73,110,116,101,108,0,0,6,74,52,0,0,0,1,0,0,0,0,0,0,0,3,190,0,150,4,55,6,192,0,0,0,0,0,0,0,0,10,19,1,13,104,247,77,223,132,182,40,134,0,8,94,52,6,14,91,114,4,7,12,1,0,0,0,0,0,0,0,16,18,246,60,0,1,0,6,16,1,0,0,0,0,1,127,21,128,139,16,104,13,0,0,0,2,4,181,203,11,102,9,5,11,100,0,0,0,13,1,0]
});
```

参数说明（非必需项根据项目情况使用）：

实际使用：

1. adapt（必需）：目标网站hostname的数组集合，为减少项目中出现适配网站明文需要通过simpleCrypt加解密处理；
2. encryptLens：标记第一层加密后的数组长度，某些网站时间和随机数的不同，会出现错误的结果，程序会多次尝试生成正确的位数；
3. hasDebug: 生成内层虚拟机代码是否增加额外的debugger文本, 默认情况下内层虚拟机只会出现两处debugger文本；
4. lastWord: 默认字母T，cookie键的最后一个字母，来自`$_ts.cp[0]`，没有找到取值规律，可通过浏览器cookie中查看，已经有T和P的情况；
5. flag: 4位数字，每个网站都是不同的的，可能是rs对客户网站的序列号。

协助开发（实际无使用）：

1. lens：标记basearr数组长度；
2. exmaple：浏览器真实生成的basearr，用于记录和开发对比；
3. devUrl: 开发该适配器的目标网站。

**注意：basearr的适配需要开发人员自己逆，不过内容大差不差（适配一个网站大概用时1天）**

## 4. 技术交流

加作者微信进技术交流群: `howduudu_tech`(备注rs-reverse)

订阅号不定时发表版本动态及技术文章：码功

<img src="https://github.com/pysunday/sdenv/raw/main/static/qrcode.png" alt="订阅号：码功" width="320">
