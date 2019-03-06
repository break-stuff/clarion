<template>
    <div>
        <h1>Examples</h1>

        <p>Clarion is designed to fit comfortably into your framework of choice. Whether you are using server-side rendering for your pages or a single-page application, there should be no trouble implementing the Clarion Style Architecture into your project. Many of the frameworks out there already have the tooling in place and all you need to do is add the Clarion Style Architecture in order to start taking advantage of its benefits.</p>

        <p>If you have an idea for an example or have questions about an existing example, please feel free to
            <nuxt-link to="/contact/">reach out to me</nuxt-link>.
        </p>
    </div>
</template>

<script>
export default {
    name: 'exaples',
    layout: 'examples',
    head: {
        title: 'Example Projects with Clarion',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'Find out hoe to inclide the Clarion CLI and style framework into your favorite projects.'
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content:
                    'Find out hoe to inclide the Clarion CLI and style framework into your favorite projects.'
            },
            {
                hid: 'og:url',
                name: 'og:url',
                content: 'https://projectclarion.com/examples'
            }
        ]
    }
};
</script>
