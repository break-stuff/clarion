# Custom ASP.Net Themes Using Clarion

Clarion fits in nicely with your ASP.Net projects. Managing Font, Style and Script files in your presentation layer can often become complex and cluttered very quickly. Clarion will help keep your project clean.

## Add the Architecture

::: tip NOTE
The following steps are assuming you do not already have a style preprocessor 
:::

1. In the command line, navigate to to the project folder you would like to add Clarion to. (If you are using Visual Studio 2017 and above, you can right-click the project and select `"Open in Command Line"`.)

2. Run the following command to kick off the Clarion installer:

   ```bash
   clarion new
   ```
3. Select the `Default` option
4. Make sure the following files and directories gett included in your solution:
  - build
  - src
  - package.json
  - postcss.config.js
  - webpack.config.js
  - feel free to delete the index.html file.

## Updating Your Project

Now that the files have been added to the project, there are 2 things that you probably need to fixed:

1. The added directories probably do not match the project's naming conventions.
2. New files added using the CLI will not be included in the project and will have to be included manually.

## File Organization

The new directories that have been added to the project most likely do not match your project's naming convention. A popular way of organizing precompiled content such as SASS and TypeScript is to put them into an `Assets` directory.

Rename the src directory to `/Assets`. Also, just to keep it tidy, let's move the `dist` directory into that same directory. Now all of our front-end code is in the same place.

### Update WebPack
We need to update WebPack to look into this new directory to compile the code as well as change the output directory to the new location in the `/Assets` directory. If you are using Gulp or Grunt, the process will be similar.

1. Open the `webpack.config.js` at the root of the project
2. Change the `entry` property to the new `Assets` directory: `entry: './Assets/scripts/main.js',`
3. Change the `output` object so that the `filename` property also points to the new directory: `filename: './Assets/build/scripts.js'`
4. In the `plugins` section change the css output path to `new ExtractTextPlugin("./Assets/build/styles.css")`

### Adding new Files
New files that are added using the CLI will not automatically be included in the project. In order to include them you will have to show hidden files, right-click, and select "Include In Project". This process will effectively eliminate any efficiencies gained by using the CLI. Instead, we can modify the `.csproj` to automatically include them.

1. In Visual Studio, right-click the project and select "Unload Project"
2. Right-click the unloaded project a select "Edit {your project name}.csproj"
3. Search for the section where your Assets directory contents are being included
4. Add the following line: `<content include="Assets\**"></content>`
5. Save the file, right-click the unloaded project and click "Reload Project"
6. In your command line, run `npm run build`. You should see the compiled `css` and `js` files already included in the project (you may have to refresh the Solution Explorer)

## Configuring Clarion

Now that we have moved things around, we need to configure Clarion to tell Clarion where to add new files.

1. In your terminal run the command `clarion config`
2. When prompted for the path to your styles directory, typ `./Assets`
3. Feel free to include the new `clarion-config.json` file in your project in case you would rather manually modify the settings

