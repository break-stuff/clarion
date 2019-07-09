# Configuration

In order to fit your development environment's needs, Clarion is configurable to meet your project's requirements. If the default configuration is used, no config file is generated in order to avoid unnecessary clutter in your project. To add a config file to your project, run the following command at the root of your project:

```bash
clarion config
```

You will them be prompted with a series of questions to create your custom configurations as well as the default options.

You should now see a new file called `clarion-config.json` in your project. The file contains a simple JSON object.

```json
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
```

You can modify this content directly using your text editor or update it using the clarion config command.

## Paths

You can change the location of your project contents. This is extremely useful if you are using a framework or have a specific architecture you need to adhere to.

For example, if you wanted to move your styles folder to a directory called `/app` rather than `/src` you could do so by updating the value to `"./app"`.

::: tip NOTE
Clarion will look for your styles in directories called `sass`, `scss`, or `less`.
:::

## Format

You can change the file format. This will not change the existing files, but will take effect for new files. If you updated the value to `"less"`, any new files will now use the `.less` style format.

## Add To Manifest

If you would like to turn off the feature of automatically adding an import statement for new files to your manifest file, you can turn it off by setting the `addToManifest` value to `false`. This may be useful for experimental code.

## Import Abstracts

When a new style file is created, the Abstracts manifest file is imported to give you access to your variables, mixins, functions, etc. Some developers may want to be more selective about the files they would like to import. You can prevent Clarion from adding this reference by setting `importAbstracts` to `false`.
