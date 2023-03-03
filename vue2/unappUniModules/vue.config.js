
const fs = require("fs");
// 注：需要进入 strip-json-comments
const stripJsonComments = require("strip-json-comments");
// 时间转换
const getDateStr = () => {
  const now = new Date();
  let year = now.getFullYear().toString().slice(-2)
  let month = (now.getMonth() + 1).toString().padStart(2, 0)
  let day = now.getDate().toString().padStart(2, 0)
  return 'V' + year + month + day
}
module.exports = {
  productionSourceMap: false,//生产打包时不输出map文件，增加打包速度
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
  },
  chainWebpack: (config) => {
    // 生成版本号    this.baseURL:process.env.VUE_APP_VER
    config.plugin('define').tap(args => {
      if (args[0]['process.env'].NODE_ENV === '"production"') {
        args[0]['process.env'].VUE_APP_VER = `"${getDateStr()}"`
      }
      return args;
    })
    config.when(process.env.NODE_ENV === "production" && process.env.UNI_PLATFORM === "app-plus", (config) => {
      const str = fs.readFileSync("./src/manifest.json", "utf8");
      const manifest = JSON.parse(stripJsonComments(str));
      // 注：需要进入 filemanager-webpack-plugin
      config.plugin("compress").use("filemanager-webpack-plugin", [{
        events: {
          // 注：npm run build:app-plus 打包文件生成路径
          onEnd: [
            { delete: [{ source: "../app/src/main/assets/apps/*", options: { force: true } }] },
            { mkdir: ["../app/src/main/assets/apps/" + manifest.appid + "/www/"] },
            { copy: [{ source: "./dist/build/app-plus", destination: "../app/src/main/assets/apps/" + manifest.appid + "/www" }] },
          ],
        },
        runTasksInSeries: true,
        runOnceInWatchMode: true,
      },
      ]);
    }
    );
  },
};
