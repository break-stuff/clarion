module.exports = {
    title: 'Clarion Style Framework',
    description: 'See how the Clarion CLI and style framework can make managing styles in your project simpler.',
    head: [
        ['script', { src: 'https://kit.fontawesome.com/24018dd45e.js' }]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Contact', link: '/contact/' },
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
                            '/cli/documentation/architecture.html',
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
                            '/documentation/',
                            
                        ]
                    }        
                ]
            }
        ]
    }
}