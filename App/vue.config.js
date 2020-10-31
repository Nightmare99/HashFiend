// vue.config.js
module.exports = {
    devServer: {
        proxy: 'http://localhost:3000/',
    },

    publicPath: '',

    pluginOptions: {
      cordovaPath: 'src-cordova'
    }
}
