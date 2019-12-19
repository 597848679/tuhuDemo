const proxy = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        proxy("/tb", {
            target: "https://suggest.taobao.com/",
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
            pathRewrite: {
                "^/tb": ""
            }
        })
    );
    app.use(
        proxy("/th", {
            target: "https://api.tuhu.cn/",
            changeOrigin: true, // needed for virtual hosted sites
            ws: true, // proxy websockets
            pathRewrite: {
                "^/th": ""
            }
        })
    );
};