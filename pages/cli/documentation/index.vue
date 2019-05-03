<template>
    <div class="documentation">
        <h1>Documentation</h1>
        <h2>
            <nuxt-link to="/cli/documentation/new/">New Project</nuxt-link>
        </h2>
        <p>
            Discover all of the ways you can start a project using Clarion CLI. 
            The default project is configured with SASS and WebPack, but those are not your only options. 
            Find out how to build projects that work best for you and your teams.
        </p>
        <h2>
            <nuxt-link to="/cli/documentation/architecture/">Project Architecture</nuxt-link>
        </h2>
        <p>
            The Clarion Style Architecture offers a simpler way to maintain your website's styles in order to increase reuse, 
            reduce complexity, and prevent unexpected results.
        </p>
        <h2>
            <nuxt-link to="/cli/documentation/add/">Adding and Removing Files</nuxt-link>
        </h2>
        <p>
            Unfortunately, adding and removing files is not always as easy as right-clicking and adding a new file. 
            If the appropriate references aren't added or removed, your code may be ignored or may also result in errors when building. 
            Clarion CLI can help reduce these errors and produce faster coding with less errors.
        </p>
        <h2>
            <nuxt-link to="/cli/documentation/configuration">Configuration</nuxt-link>
        </h2>
        <p>
            Clarion CLI is designed to fit your development environment. 
            Using the CLI, you can customize Clarion to behave the way that best suits you and your team 
            including managing import statements and changing locations to be more inline with your project architecture or framework.
        </p>
        <p>&nbsp;</p>
    </div>
</template>

<script>
export default {
    name: 'Documentation',
    layout: 'documentation',
    head: {
        title: 'Clarion Documentation',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'See how the Clarion CLI and style framework can make managing styles in your project simpler.'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content:
                    'See how the Clarion CLI and style framework can make managing styles in your project simpler.'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://projectclarion.com/documentation'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Clarion Documentation'
            }
        ]
    }
};
</script>
