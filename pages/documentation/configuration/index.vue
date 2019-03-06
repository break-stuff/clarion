<template>
    <div>
        <h1>Configuration</h1>

        <p>
            In order to fit your development environment's needs, Clarion is configurable to meet your project's requirements. If the default configuration is used, no config
            file is generated in order to avoid unnecessary clutter in your project. To add a config file to your project, run the
            following command at the root of your project:
        </p>
        <code>clarion config</code>
        <br>
        <br>

        <p>You will them be prompted with a series of questions to create your custom configurations as well as the default options.</p>

        <p>
            You should now see a new file called
            <code>clarion-config.json</code> in your project. The file contains a simple JSON object.
        </p>
        <pre>
{
    "paths": {
        "styles": "./src"
    },
    "format": {
        "styles": "scss"
    },
    "addToManifest": "true",
    "importAbstracts": "true"
}
</pre>
        <p>
            You can modify this content directly using your text editor or update it using the
            <code>clarion config</code> command.
        </p>

        <h2>Paths</h2>
        <p>
            You can change the location of your project contents. This is extremely useful if you are using a framework or have a specific
            architecture you need to adhere to.
        </p>
        <p>
            For example, if you wanted to move your styles folder to a directory called "app" rather than "src" you could do so by updating the value to
            <code>"./app"</code>.
        </p>
        <p>
            <strong>
                (Note: Clarion will look for your styles in directories called
                <code>sass</code>,
                <code>scss</code>, or
                <code>less</code>).
            </strong>
        </p>

        <h2>Format</h2>
        <p>You can change the file format. This will not change the existing files, but will take effect for new files. If you updated the value to
            <code>
                "less", any new files will now use the
                <code>.less</code> style format.
            </code>
        </p>

        <h2>Add To Manifest</h2>
        <p>
            If you would like to turn off the feature of automatically adding an import statement for new files to your manifest file,
            you can turn it off by setting the
            <code>addToManifest</code> value to
            <code>false</code>. This may be usefult for experimental code.
        </p>

        <h2>Import Abstracts</h2>
        <p>
            When a new style file is created, the Abstracts manifest file is imported to give you access to your variables, mixins, functions, etc.
            Some developers may want to be more selective about the files they would like to import. You can prevent Clarion from
            adding this reference by setting
            <code>importAbstracts</code> to
            <code>false</code>.
        </p>
    </div>
</template>

<script>
export default {
    name: 'Architecture',
    layout: 'documentation',
    head: {
        title: 'Configuration in Clarion',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    "In order to fit your development environment's needs, Clarion is configurable to meet your project's requirements."
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content:
                    "In order to fit your development environment's needs, Clarion is configurable to meet your project's requirements."
            },
            {
                hid: 'og:url',
                name: 'og:url',
                content: 'https://projectclarion.com/configuration'
            }
        ]
    }
};
</script>
