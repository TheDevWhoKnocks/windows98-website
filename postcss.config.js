module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-extend'),
    require('postcss-cssnext')({ browsers: ['last 2 versions', '> 5%'] }),
    require('postcss-short-color'),
    require('postcss-pxtorem')({
      propWhiteList: ['font-size', 'letter-spacing', 'line-height'],
      mediaQuery: 0
    }),
    require('lost')
  ]
}