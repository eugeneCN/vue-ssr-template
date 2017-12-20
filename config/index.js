const isProd = process.env.NODE_ENV === 'production'

const proUrl = 'https://news-at.zhihu.com' // 生产环境api地址
const devUrl = 'https://news-at.zhihu.com' // 开发api地址

const FaceUrl = isProd ? proUrl : devUrl

module.exports = {
  baseUrl: FaceUrl,
  client: {
    baseurl: '/api/4',
    timeout: 10000
  },
  server: {
    baseurl: FaceUrl + '/api/4',
    timeout: 10000
  }
}
