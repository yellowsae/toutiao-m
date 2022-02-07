// 使用 postcss-pxtorem 将项目的 px 转为 rem
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
