// 使用 postcss-pxtorem 将项目的 px 转为 rem
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],

      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
