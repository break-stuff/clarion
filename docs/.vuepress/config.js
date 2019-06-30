module.exports = {
    title: 'Clarion',
    description: 'See how the Clarion CLI and style framework can make managing styles and design systems simpler.',
    head: [
        ['link', { rel: 'icon', href: '/images/favicon.png' }],
        [
            'meta',
            { property: 'og:image', content: '/images/clarion_default_image.png' },
            { property: 'og:title', content: 'Clarion CLI and Style Framework' },
            { property: 'og:description', content: 'See how the Clarion CLI and style framework can make managing styles and design systems simpler.' },
            { property: 'twitter:image', content: '/images/clarion_default_image.png' },
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:creator', content: '@stuffbreaker' },
            { property: 'robots', content: 'index, follow' },
            { property: 'HandheldFriendly', content: 'True' },
        ]
    ],
    plugins: {
        '@vuepress/google-analytics': {
            'ga': 'UA-106134260-1'
        },
        'sitemap': {
            hostname: 'https://projectclarion.com'
        }
    },
    themeConfig: {
        nav: [
            { text: 'Contact', link: '/contact.html' },
            { text: 'NPM', link: 'https://www.npmjs.com/package/clarion' },
            { text: 'GitHub', link: 'https://github.com/break-stuff/clarion' },
        ],
        sidebar: [
            '/',
            {
                title: 'CLI',
                children: [
                    {
                        title: 'Documentation',
                        children: [
                            '/cli/documentation/new.html',
                            '/cli/documentation/add.html',
                            '/cli/documentation/configuration.html',
                        ]
                    },
                    {
                        title: 'Examples',
                        children: [
                            '/cli/examples/angular.html',
                            '/cli/examples/aspnet.html',
                            '/cli/examples/bootstrap.html',
                            '/cli/examples/react.html',
                            '/cli/examples/vue.html',
                        ]
                    }
                ]
            },
            {
                title: 'Framework',
                children: [
                    {
                        title: 'Documentation',
                        children: [
                            '/framework/documentation/architecture.html',
                            '/framework/documentation/variables.html',
                            {
                                title: 'Functions',
                                children: [
                                    '/framework/documentation/functions/colors.html',
                                    '/framework/documentation/functions/spacing.html',
                                    '/framework/documentation/functions/strings.html',
                                    '/framework/documentation/functions/z-index.html',
                                ]
                            },
                            {
                                title: 'Mixins',
                                children: [
                                    '/framework/documentation/mixins/border-radius.html',
                                    '/framework/documentation/mixins/breakpoints.html',
                                    '/framework/documentation/mixins/display.html',
                                    '/framework/documentation/mixins/font-sizes.html',
                                    '/framework/documentation/mixins/hover.html',
                                    '/framework/documentation/mixins/spacing.html',
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}