module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vue-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCYHOEZdESOqGvGexEfnugSQyo0vgmzNhA' },
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js' }
    ],
    htmlAttrs: {
      class: 'no-dev'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    // 'bulma',
    // CSS file in the project
    // '@/assets/css/global.css',
    // SCSS file in the project
    '@/assets/css/global.scss'
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: [
      'axios',
      'jcf',
      'velocity-animate',
      'vue-fancybox',
      '@fancyapps/fancybox',
      'vue-slick',
      '~/plugins/includes/slidetoggle.js',
      '~/plugins/includes/validation.js'
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extend (config, { isServer }) {
      if (isServer) {
        config.externals = [
          require('webpack-node-externals')({
            whitelist: [/^vue-slick/]
          })
        ]
      }
    }
  },
  plugins: [
    {src: '~/plugins/includes/velocity.js', ssr: false},
    { src: '~/plugins/includes/slidetoggle.js', ssr: false }
  ],
};
