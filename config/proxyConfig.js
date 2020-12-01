module.exports = {
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:8360/', // 接口域名
            // target: 'http://node.webshao.com/', // 接口域名
            changeOrigin: true, //是否跨域
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}