module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'sq',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  },
  devServer: {
    proxy: 'https://prodadmin.sensoneo.com',
  }
}
