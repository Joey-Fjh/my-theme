module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
      ],
    }),

    // 宽度和横向间距 dw → vw
    require('postcss-px-to-viewport-8-plugin')({
      viewportWidth: 1440,
      unitToConvert: 'dw',
      unitPrecision: 3,
      viewportUnit: "vw", 
      minPixelValue: 1,
      mediaQuery: false,
    }),

    // 其余px单位转换为rem
    require('postcss-pxtorem')({
      rootValue: 10,
      unitPrecision: 3,
      unitToConvert: 'px',
      propList: ['*'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    }),
  ],
};

