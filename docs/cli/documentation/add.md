# Adding and Removing Files

When working with files that require references to other files in order to make them work properly, just adding and removing files is not as simple as it seems. The Clarion CLI is designed to help reduce that friction.

## Adding a New File

Adding a new file is quite simple. In the root of your project type the following command:

```bash
clarion add element headings 
```

This will create the file `_headings.scss` in the `03_Elements` directory as well as add `@import '_headings.scss';` import statement to the directory manifest file so it can be included in your final CSS file.

If you look in your newly created `_headings.scss` file, you will also see a reference to the Abstracts manifest file - `@import "../00_Abstracts/index.scss";`. this will give you access to the variables and tools you have created in that folder.

## Removing a File

Similar to adding a file, removing files can also be done through the CLI:

```bash
clarion remove element headings 
```

This will remove the file `_headings.scss` in the `03_Elements` directory as well as remove `@import '_headings.scss';` import statement from the directory manifest file.

## Fuzzy Search

When specifying a directory to add or remove a file from, you do not have to use the entire directory name. This parameter supports "fuzzy search" witch means that it will try to find the appropriate directory based on part or all of the directory name. So, if I wanted to, I could add an item to the Abstracts folder by using the following command:

```bash
clarion add 00 colors 
```

Clarion would find the directory based on the double zeros (00) that were entered rather than the directory name. If the directory is not found, you will be provided with a list of available options.

## Subdirectory Support

Clarion supports subdirectories within the architecture. For example, if you wanted to further split up your Abstracts folder into `variables` and `mixins`, I would still be able to add files to the subdirectories using the following commands (make sure the directories exist before adding files to them):

```bash
clarion add abstract variables/colors 
```

```bash
clarion add abstract mixins/breakpoints 
```

This allows for greater flexibility in your architecture and enable your code to expand in the future.