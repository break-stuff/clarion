<template>
    <div>
        <h1>Style Framework Documentation</h1>

        <p>
            <em><u>Before we get started</u></em>, let's make one thing perfectly clear.
            The style framework is not in any way a way to tell you how to write your code.
            The style framework is a set of tools to help you build the best applications you can.
            If you don't like the way something is, change it.
            There is a reason why this framework isn't an NPM package and instead part of your project.
            These are your tools now!
        </p>

        <h2>Variables</h2>

        <p>
            The first place you are going to want to customize are the varible.
            There are some default values in place and those are a good place to start, 
            but if you have an existing project or if you are using a third-party library like Bootstrap, Material Design, or Foundation, 
            you may want to update the variables with their values so you can improve your development experience.
            If you have values that you use regularly throught our site or application, 
            it is highly recommended that you add them here to maximize their reuse and minimize maintenance time.
        </p>

        <h2>Functions</h2>

        <p>
            Functions are exactly as they sound.
            They are bits of programming to improve your development experience.
            Functions usually take input and return a value.
            If you're not a "coder", don't worry. 
            Feel free to use what we've got and copy and paste from your favorite tutorials as you go.
        </p>

        <h2>Mixins</h2>

        <p>
            Mixins are abstractions of commonly used code.
            At first they may feel a little like functions, but the values they return are actual CSS.
            Simply put, functions return values, mixins return CSS.
            If you find yourself re-writing the same set of CSS rules over and over again, you may want to consider a mixin.
            You'll see how cool they are in a second. 
            The biggest take-away is that you can write clean, consistant (<a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY</a>) CSS with the help of these tools.
        </p>

        <h3>Share the Wealth</h3>

        <p>
            If you have an idea for the framework or have some frequently used tools that you feel would be a good fit for these tools,
            feel free to contact me via <nuxt-link to="/contact">email</nuxt-link>, <a href="https://twitter.com/stuffbreaker">twitter</a>, <a href="https://www.linkedin.com/in/burton-smith-48132a34/">LinkedIn</a>, <a href="https://github.com/break-stuff/clarion">GitHub</a>, or however you can and share your ideas. Thanks!
        </p>
    </div>
</template>

<script>
export default {
    name: 'Style Framework Documentation',
    layout: 'framework-documentation',
    data() {
        return {
            title: 'Style Framework - Clarion'
        };
    },
    head: {
        title: 'Style Framework - Clarion',
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
