const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      },
      {
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css',
        rel: 'stylesheet'
      },
    ],
    script: [{
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://use.fontawesome.com/releases/v5.7.1/js/all.js',
        type: 'text/javascript'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/sass/styles.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
