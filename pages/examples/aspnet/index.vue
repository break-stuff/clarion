<template>
    <div>
        <h1>Custom ASP.Net Themes Using Clarion</h1>

        <p>
            Clarion fits in nicely with your ASP.Net projects. Managing Font, Style and Script files in your presentation layer can often
            become complex and cluttered very quickly. Clarion will help keep your project clean.
        </p>

        <h2>Add the Architecture</h2>
        <p>
            In the command line, navigate to to the project folder you would like to add Clarion to. (If you are using Visual Studio
            2017, you right-click the project and select "Open in Command Line".)
        </p>
        <p>Run the following command to install the basic architecture:</p>
        <p>
            <code>clarion new</code>
        </p>

        <h2>Include New Files</h2>
        <p>The first thing that needs to be done is to include the new files and folders in the project.</p>
        <ol>
            <li>At the top of the Solution Explorer window select the "Show All Files" button.</li>
            <li>Right-click the following directories and files and select "Include In Project":
                <ul>
                    <li>
                        <code>build</code>
                    </li>
                    <li>
                        <code>src</code>
                    </li>
                    <li>
                        <code>package.json</code>
                    </li>
                    <li>
                        <code>postcss.config.js</code>
                    </li>
                    <li>
                        <code>webpack.config.js</code>
                    </li>
                </ul>
            </li>
            <li>You can delete the index.html file.</li>
        </ol>

        <h2>Update Directories</h2>
        <p>Now that the files have been added to the project, there are 2 things that need to be fixed:</p>
        <ol>
            <li>The added directories probably do not match the project's naming conventions.</li>
            <li>New files added using the CLI will not be included in the project and will have to be included manually.</li>
        </ol>

        <h3>File Organization</h3>
        <p>The new directories that have been added to the project most likely do not match your project's naming convention. A popular way of organizing precompiled content such as SASS and TypeScript is to put them into an
            <code>Assets</code> directory.
        </p>
        <p>Rename the
            <code>src</code> directory to
            <code>Assets</code>. Also, just to keep it tidy, let's move the
            <code>build</code> directory into that same directory. Now all of our front-end code is in the same place. (It is also common to store
            <code>image</code> files in here as well.)
        </p>
        <h5>Update WebPack</h5>
        <p>We need to update WebPack to look into this new directory to compile the code as well as change the output directory to the new location in the
            <code>Assets</code> directory. If you are using Gulp or Grunt, the process will be similar.
        </p>
        <ol>
            <li>Open the
                <code>webpack.config.js</code> at the root of the project
            </li>
            <li>Change the
                <code>entry</code> property to the new
                <code>Assets</code> directory:
                <code>entry: './Assets/scripts/main.js',</code>
            </li>
            <li>Change the
                <code>output</code> object so that the
                <code>filename</code> property also points to the new directory:
                <code>filename: './Assets/build/scripts.js'</code>
            </li>
            <li>In the
                <code>plugins</code> section change the css output path to
                <code>new ExtractTextPlugin("./Assets/build/styles.css")</code>
            </li>
        </ol>

        <h3>Adding new Files</h3>
        <p>New files that are added using the CLI will not automatically be included in the project. In order to include them you will have to show hidden files, right-click, and select "Include In Project". This process will effectively eliminate any efficiencies gained by using the CLI. Instead, we can modify the
            <code>.csproj</code> to automatically include them.
        </p>
        <ol>
            <li>In Visual Studio, right-click the project and select "Unload Project"</li>
            <li>Right-click the unloaded project a select "Edit {your project name}.csproj"</li>
            <li>Search for the section where your
                <code>Assets</code> directory contents are being included
            </li>
            <li>Add the following line:
                <code>
                    <Content Include="Assets\**"/>
                </code>
            </li>
            <li>Save the file, right-click the unloaded project and click "Reload Project"</li>
            <li>In your command line, run
                <code>npm run build</code>. You should see the compiled
                <code>css</code> and
                <code>js</code> files already included in the project (you may have to refresh the Solution Explorer)
            </li>
        </ol>

        <h2>Configuring Clarion</h2>
        <p>Now that we have moved things around, we need to configure Clarion to tell Clarion where to add new files.</p>
        <ol>
            <li>In your terminal run the command
                <code>clarion config init</code>
            </li>
            <li>Include the new
                <code>.clarion</code> file in your project
            </li>
            <li>Change the style path in the
                <code>.clarion</code> file to
                <code>"./Assets</code> by running the following command
                <code>clarion config paths.styles ./Assets</code> or by manually changing the
                <code>style</code> property in the
                <code>paths</code> object to "./Assets".
            </li>
        </ol>

        <p>After saving the configuration changes in the
            <code>.clarion</code> config file, you should be able to use the Clarion CLI normally.
        </p>
    </div>
</template>

<script>
export default {
    name: 'AspNetExample',
    layout: 'examples',
    head: {
        title: 'ASP.Net Themes Using Clarion',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'See how to use the Clarion CLI and style framework to create ASP.Net themes.'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content:
                    'See how to use the Clarion CLI and style framework to create ASP.Net themes.'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://projectclarion.com/examples/aspnet'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'ASP.Net Themes Using Clarion'
            }
        ]
    }
};
</script>
