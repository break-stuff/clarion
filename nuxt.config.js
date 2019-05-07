module.exports = {
    mode: 'universal',

    /*
     ** Headers of the page
     */
    head: {
        title: 'Clarion CLI and Style Framework',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'See how the Clarion CLI and style framework can make managing styles in your project simpler.'
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content:
                    'https://projectclarion.com/images/clarion_default_image.png'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Clarion CLI and Style Framework'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content:
                    'See how the Clarion CLI and style framework can make managing styles in your project simpler.'
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:creator',
                name: 'twitter:creator',
                content: '@stuffbreaker'
            },
            {
                name: 'robots',
                content: 'index, follow'
            },
            {
                name: 'HandheldFriendly',
                content: 'True'
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
            }
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
    css: ['@/assets/scss/styles.scss'],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/sitemap',
        ['@nuxtjs/google-analytics', {
            id: 'UA-106134260-1'
          }
        ]
    ],

    sitemap: {
        generate: true,
        hostname: 'https://projectclarion.com/'
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // Run ESLint on save
            // if (ctx.isDev && ctx.isClient) {
            //     config.module.rules.push({
            //         enforce: 'pre',
            //         test: /\.(js|vue)$/,
            //         loader: 'eslint-loader',
            //         exclude: /(node_modules)/
            //     });
            // }
        }
    },
    router: {
        linkActiveClass: 'active'
    }
};
