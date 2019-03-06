<template>
    <div>
        <h1>Custom React Themes Using Clarion</h1>

        <p>
            React is a fantastically flexible framework that focuses on rendering complex views. This flexibility can make documentation
            a little difficult, so for this example I will be using the
            <a
                href="https://github.com/facebookincubator/create-react-app"
            >create-react-app</a> command line scaffolding tool.
        </p>

        <h2>Starting Your Project</h2>
        <p>Before you get started, make sure Clarion and create-react-app are installed:</p>
        <p>
            <code>npm install -g clarion create-react-app</code>
        </p>

        <p>After the install is finished, create your new project:</p>
        <p>
            <strong>Note: You must use all lower-case letters in your new project name.</strong>
        </p>
        <p>
            <code>create-react-app my-app</code>
        </p>

        <h2>Update Your Project for SASS</h2>
        <p>
            The following is a summary from the
            <a
                href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc"
            >create-react-app documentation</a>:
        </p>

        <h5>Install the SASS Compiler</h5>
        <p>
            <code>npm install --save node-sass-chokidar npm-run-all</code>
        </p>

        <h5>Update the Project Commands</h5>
        <p>
            In the
            <code>package.json</code> file, replace the
            <code>scripts</code> commands with the following commands:
        </p>
        <pre>
"build-css": "node-sass-chokidar src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
"start-js": "react-scripts start", 
"start": "npm-run-all -p watch-css start-js",
"build": "npm run build-css && react-scripts build",
"test": "react-scripts test --env=jsdom",
"eject": "react-scripts eject"
</pre>

        <h2>Adding Clarion</h2>
        <p>Adding Clarion to the project can be done in 4 easy steps:</p>

        <h4>1. Create a Folder For Your Styles</h4>
        <p>
            Under the
            <code>src</code> directory create a new folder called
            <code>sass</code>.
        </p>
        <p>
            <strong>
                Note: By default Clarion will look for the Clarion CSS Architecture in folders called
                <code>sass</code>,
                <code>scss</code>, or
                <code>less</code>.
            </strong>
        </p>

        <h4>2. Navigate to Your New Directory</h4>
        <p>
            Using your command line or terminal, navigate to your new
            <code>sass</code> folder:
        </p>
        <p>
            <code>cd src/sass</code>
        </p>

        <h4>3. Add Clarion</h4>
        <p>
            In order to avoid overriding any of the files provided by the You can add the Clarion architecture by using the
            <code>--only</code> or
            <code>-O</code> option. This will only install the Clarion Style Architecture.
        </p>
        <p>
            <code>clarion new -O</code>
        </p>

        <h4>4. Add the Styles to index.js</h4>
        <p>
            In the
            <code>src</code> folder open the
            <code>index.js</code> file and replace
            <code>import './index.css';</code> with
            <code>import './sass/styles.scss';</code>.
            This will include the styles in the build process.
        </p>

        <h2>Conclusion</h2>
        <p>You should be able to use the Clarion CLI as you normally would. No additional configuration is necessary.</p>
    </div>
</template>

<script>
export default {
    name: 'ReactExample',
    layout: 'examples',
    head: {
        title: 'React Themes Using Clarion',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'See how to use the Clarion CLI and style framework to create React themes.'
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content:
                    'See how to use the Clarion CLI and style framework to create React themes.'
            },
            {
                hid: 'og:url',
                name: 'og:url',
                content: 'https://projectclarion.com/examples/react'
            }
        ]
    }
};
</script>
