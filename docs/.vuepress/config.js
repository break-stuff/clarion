module.exports = {
    title: 'Clarion',
    description: 'See how the Clarion CLI and style framework can make managing styles in your project simpler.',
    head: [
        ['script', { src: 'https://kit.fontawesome.com/24018dd45e.js' }]
    ],
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
                                    '/framework/documentation/functions/colors.html',
                                ]
                            }
                        ]
                    }        
                ]
            }
        ]
    }
}