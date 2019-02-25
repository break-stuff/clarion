<template>
    <div>
        <h1>Custom Vue.js Themes Using Clarion</h1>

        <p>Vue.js is a powerful JavaScript framework for building advanced user interfaces. From the Vue.js documentation:</p>

        <p>
            <i>"Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.</i>
        </p>

        <h2>Starting Your Project</h2>
        <p>Before you get started, make sure Clarion and the Vue CLI are installed:</p>
        <p>
            <code>npm install -g clarion vue-cli</code>
        </p>

        <p>After the install is finished, create your new project by running the following commands (make sure you indicate you would like to use SASS if you want to use SASS or SCSS):</p>
        <pre>
vue init webpack-simple my-project
cd my-project
npm install
</pre>

        <h2>Adding Clarion</h2>
        <p>Adding Clarion to the project can be done in 4 easy steps:</p>

        <h4>1. Create a Folder For Your Styles</h4>
        <p>Under the
            <code>src</code> directory create a new folder called
            <code>sass</code>.
        </p>
        <p>
            <strong>Note: By default Clarion will look for the Clarion CSS Architecture in folders called
                <code>sass</code>,
                <code>scss</code>, or
                <code>less</code>.
            </strong>
        </p>

        <h4>2. Navigate to Your New Directory</h4>
        <p>Using your command line or terminal, navigate to your new
            <code>sass</code> folder:
        </p>
        <p>
            <code>cd src/sass</code>
        </p>

        <h4>3. Add Clarion</h4>
        <p>In order to avoid overriding any of the files provided by the You can add the Clarion architecture by using the
            <code>--only</code> or
            <code>-O</code> option. This will only install the Clarion Style Architecture.
        </p>
        <p>
            <code>clarion new -O</code>
        </p>

        <h4>4. Add Your Styles to main.js</h4>
        <p>In the
            <code>src</code> folder open the
            <code>main.js</code> file and import your styles:
        </p>
        <p>
            <code>import './sass/styles.scss';</code>
        </p>
        <p>This will include the styles in the build process.</p>

        <h2>Conclusion</h2>
        <p>You should be able to use the Clarion CLI as you normally would. No additional configuration is necessary.</p>
    </div>
</template>

<script>
export default {
    name: 'VuejsExample',
    layout: 'examples'
};
</script>
