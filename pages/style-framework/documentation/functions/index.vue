<template lang="md">
    # Functions

    Functions are incredibly useful tools to add logic to our styles. 
    Precompilers like `sass` and `less` have built in functions, but you can also create custom functions. 
    The important thing to keep in mind is that `functions` return values whereas `mixins` return `css`.

    There is some fantastic documentation on using and creating functions at [thesassway.com](http://thesassway.com/advanced/pure-sass-functions).

    Here is an overview of the custom functions provided in the Clarion Style Framework.

    ## <nuxt-link to="/style-framework/documentation/functions/colors/">Colors</nuxt-link>

    ## <nuxt-link to="/style-framework/documentation/functions/spacing">Spacing</nuxt-link>

    ## <nuxt-link to="/style-framework/documentation/functions/strings">Strings</nuxt-link>

    ## <nuxt-link to="/style-framework/documentation/functions/z-index">Z-Index</nuxt-link>
</template>

<script>
export default {
    name: 'Functions',
    layout: 'functions',

    data() {
        return { };
    },
    head: {
        title: 'Clarion Functions Documentation',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'See how adding a style framework to your project can make development faster and more effective.'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content:
                    'See how adding a style framework to your project can make development faster and more effective.'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content:
                    'https://projectclarion.com/style-framework/documentation'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Clarion Style Framework Documentation'
            }
        ]
    }
};
</script>
