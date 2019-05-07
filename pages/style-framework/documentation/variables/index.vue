<template>
    <div>
        <h1>Variables</h1>

        <p>
            Variables are one of the core pieces to project.
            They help bring consistency and organization to your application.
            You can find your varibles file at the root of the
            <code>00_Abstracts</code> directory.
            If you have values that you use regularly throught our site or application,
            it is
            <em>highly</em> recommended that you add them here to maximize their reuse and minimize maintenance time.
        </p>

        <h2>Fonts</h2>

        <p>
            There are 3 default font types set up to start out with (
            <code>$font-accent</code>,
            <code>$font-base</code>, and
            <code>$font-monospace</code>).
            This should usually be more than enough to get you started.
            If you feel like you need more font families in your project than this, feel free to add them, but do so carefully.
            Having all of those fancy fonts on your site may look nice, but they come at a cost (both technically and cognitively).
        </p>

        <p>
            The default values that have been set for these varibles are system fonts.
            This is done for efficiency feasons and also beacuse really like what Marcin Wichary had to say about in this
            <a
                href="https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/"
            >Smashing Magazine</a> article.
        </p>

        <h3>Font Types</h3>

        <table class="table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Accent</td>
                    <td>
                        This is primarily used for things like headers or bloquotes. 
                        This should help those pieces of your design stand out from the rest of your content.
                    </td>
                </tr>
                <tr>
                    <td>Base</td>
                    <td>
                        This is the default font for your site.
                        If it is not text that should stand out more than other text, it should be using this font.
                        This font should be simple and easy to read at both large and small font sizes.
                    </td>
                </tr>
                <tr>
                    <td>Monospace</td>
                    <td>
                        If you are creating a tutorial site that has code snippets or special call-out text,
                        this font is an excellent way to help highlight those parts of your application.
                    </td>
                </tr>
            </tbody>
        </table>

        <h3>Font Sizes</h3>

        <p>
            The default font sizes are <code>xxs-xxl</code>. 
            They also use <code>rem</code>'s for the unit of measure. 
            This is to provide proper scaling when the user's browser default font size is increase or they zoom in.
        </p>

    <pre>
    $font-sizes: (
        xxs: 0.75rem,
        xs: 0.875rem,
        sm: 1rem,
        md: 1.25rem,
        lg: 1.5rem,
        xl: 2rem,
        xxl: 3rem
    ) !default;
    </pre>


        <p>
            For accessibility reasons, it is usally not a good idea to go below <code>16px</code> for your reagular font size so the <code>xxs</code> and <code>xs</code> font sizes should be used sparingly. 
            If you are setting up heading styles, may be happy to know that the <code>xs-xxl</code> match very nicely with the <code>h6-h1</code> tags, respectively.
        </p>

        <h3>Line Height</h3>

        <p>
            The <code>$line-height-base</code> is a way to globally set the line-height (space between each line of text) property. 
            For readability purposes, it has been defaulted to <code>1.5</code>.
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-height">Mozilla (MDN)</a> provides some excellent ducumentation on line-height and how to use it.
        </p>

        <h2>Spacing</h2>

        <p>
            The spacing variables control the padding and margin values for your site. 
            At first you may think that globally restricting these properties is extermely limiting, 
            but it actually makes development so much simpler when your're not always pixel counting or doing math to get things to line up properly.
            It's also nice to know that because they are using <code>rem</code>'s for their units, it will scale with your other content as users zoom or adjust their font sizes.
        </p>

    <pre>
    $spacing-sizes: (
        auto: auto,
        0: 0,
        xxs: 0.125rem,
        xs: 0.25rem,
        sm: 0.5rem,
        md: 0.75rem,
        lg: 1rem,
        xl: 1.25rem,
        xxl: 2rem
    ) !default;
    </pre>


        <h2>Colors</h2>

        <p>
            Colors are easily one of the most complext things about your site: 
            trying to capture your brand and make sure it is well represented in your design, 
            making sure that you are using the right colors to convey the right message (because colors have meaning),
            and making sure that your site is accessible to all users.
            The list goes on and on. 
            A lot rides on your color choices and how you use them. 
            The tools provided by clarion should hopegully help with a lot of these concerns.
        </p>

        <p>
            The default colors that have been chosen are just a basic pallet, but should be a good starting place.

        </p>

    <pre>
    $theme-colors: (
        'primary': #d15f01,
        'secondary': #30629e,
        'success': #76b524,
        'info': #8ebede,
        'warning': #ffc107,
        'danger': #ff0000,
        'light': #c7c7c7,
        'dark': #494949
    ) !default;
    </pre>

        <p>
            The <code>primary</code> and <code>secondary</code> colors should be reserved for your brand, 
            but the rest are there for either communication purposed or content styling (borders, text, backgrounds, etc.).
        </p>

        <h2>Breakpoints</h2>

        <p>
            These values used to help you build responsive sites and applications. 
            Having consistency in these values will help proved a sense of stability in your site and simplify your development experience. 
            If you are using a UI framework like Bootstrap or Foundation, it is a really good idea to replace the default values with their values.
        </p>

    <pre>
    $breakpoints: (
        xs: 480px,
        sm: 768px,
        md: 992px,
        lg: 1200px,
        xl: 1440px
    ) !default;
    </pre>

        <h2>Z-Indexes</h2>

        <p>
            This is susally on of the most obviouse and yet most comical implementation to have. 
            When asking developers how they handle z-indexes in their application, 
            the most common answer is to set the value to <code>9999</code>. 
            If that doesn't work, continue adding a <code>9</code> on the end until it does. 
            Having a repeatable pattern and process for this should help remove this behaviour as well as some of the unpredicatbility of your application. 
            Anither common pattern is, rather than using the values below, use the component that you are setting the z-index for (<code>tooltip</code>, <code>modal</code>, etc.).
        </p>

    <pre>
    $z-indexes: (
        sub: -1,
        none: 0,
        xxs: 1,
        xs: 10,
        sm: 50,
        md: 100,
        lg: 200,
        xl: 500,
        trump: 99999
    ) !default;
    </pre>

        <h2>Border Radiuses</h2>

        <p>
            These are pretty straigh forward.
            This is a way to keep your rounded corners consistent throughout your application.
        </p>

    <pre>
    $border-radiuses: (
        none: 0,
        sm: 0.25rem,
        md: 0.5rem,
        lg: 0.75rem,
        pill: 10rem,
        circle: 50%
    ) !default;
    </pre>

        <h2>Transitions</h2>

        <p>
            This set of values is where you can keep track of your transition speeds for your application.
            Having consistent transitions throughout you application can really give it a polished look and feel.
        </p>

    <pre>
    $transitions: (
        slow: .5s,
        med: .3s,
        fast: .1s
    ) !default;
    </pre>
    <p>&nbsp;</p>
    </div>
</template>

<script>
export default {
    layout: 'framework-documentation',
    data() {
        return {
            title: 'Variables - Clarion'
        };
    },
    head: {
        title: 'Clarion Style Framework Documentation',
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
