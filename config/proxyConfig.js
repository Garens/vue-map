module.exports = {
    proxy: {
        '/api': {
            target: 'http://node.webshao.com/', // 接口域名
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}