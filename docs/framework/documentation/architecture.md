# Style Architecture

After creating your project, if you navigate to the `/src` folder you should see 2 subdirectories: `/scss` (unless you specified a different format) and `/scripts`.

## Styles

Clarion offers a unique architecture to reduce the complexity of styling small and large web applications and sites.

### What's with the numbers?

Seeing folders prefixed with numbers may seem a little awkward or even down-right blasphemous to you at first. There is a method to this madness. The reason for it is to put the folder structure in the order in witch the styles are implemented in your style sheet. This servers two purposes:

1. Knowing the order that your styles are implemented allows you to see which rules are overriding other rules. Rules in the style sheets higher up in the folder structure will be overridden by the rules that are lower in the file structure (for example - rules in the Components section will override rules in the Elements section).
2. Understanding how the styles cascade should allow you to reduce, if not eliminate, the need to use `!important`. It has it's uses and appropriate applications, but abuse if this feature leads to style sheets that are painful to maintain and very difficult to troubleshoot.

## 00_Abstracts

This folder is for your style tools and helpers used across the project. Your reusable code such as global variables, functions, mixins and placeholders should be put in here.

The code contained in this folder should not be code that outputs CSS directly.

With larger projects you may want to break this into subdirectories like variables, functions, and mixins. Subdirectories are supported in the Clarion CLI.

## 01_Base

This folder holds the boilerplate code for the project. Here you would add your reset files, font declarations, iconography styles, etc. Keep in mind that most front-end UI frameworks like Bootstrap, Foundation, and Material Design already have their own CSS resets built into their styles, so additional resets may not be necessary.

## 02_Vendors

The Vendors folder contains third-party themes and plug-ins for your website. This file has been added higher in the architecture so that if you would like to create customizations, you can do so in the subsequent folders like Components, Layouts, and Pages. This will allow you to override the theme's rules without modifying the theme directly and ruining the integrity of the code.

## 03_Elements

The Elements folder is for styling specific elements such as links, buttons, form inputs, and header tags. These are the smallest building blocks in the web and cannot be broken up into smaller parts. Browsers, by default, have their own styling in place for these elements, but tend to be inconsistent. Because of this, adding a reset to the `01_Base` directory or adding one to build pipeline is recommended.

## 04_Components

Components are groups of elements. This can be things like a search box, navbar, or carousel. These groups of elements together have a specific purpose.

## 05_Layouts

This folder contains everything that takes part in laying out the web site or application. These could be containers used for organizing elements and components within them like like a header, footer, or sidebar. This could also be used for your grid-system.

Styles for Elements and Components _usually should not_ be modified here. Style variations for these should all be contained in a single place. Layouts are for positioning Elements and Components.

## 06_Pages

This folder is for any page-specific styles, if you have any. Some sites may have custom styling for the Home page or the Contact Us page.

If you have time sensitive or temporary styles or themes (such as a holiday theme or special event), this would be the place to add them.

## 07_Utilities

The Utilities are used to create overrides or call out specific rules for an elements or components. For example, you could have a class for making text bold or aligning it to the right. The rule of thumb is to make it specific and make it simple.

## Manifest Files

Each of these directories will have an index file (index.scss). This is called your manifest file. When a new file is added to a directory, it will automatically be added to this manifest file. Feel free to reorder the import statements in this file to something that works best for you. Also, if you would like to exclude a file from compilation, you can just comment it out until you are ready to incorporate it back into the code.

### Main Style Manifest

At the root of your less or sass directory, you should see your main manifest file (if you used the default configuration, it will be called styles.scss). This file is your main manifest file. Inside you will find import statements for each of the manifest files from the various subdirectories.

```scss
@import './00_Abstracts/index.scss';
@import './01_Base/index.scss';
@import './02_Vendors/index.scss';
@import './03_Elements/index.scss';
@import './04_Components/index.scss';
@import './05_Layouts/index.scss';
@import './06_Pages/index.scss';
@import './07_Utilities/index.scss';
```

## Customize the Architecture

That's right! If this naming convention doesn't work for you or you feel like it is missing something, feel free to change it up. You can rename your directories fit your preferences or project needs. _Just make sure you update the references in the main manifest file._

### Adding New Directories

Not only can you rename directories, but you can also create and remove directories. A popular trend is to create a directory called "Shame". This directory is used for adding style hot fixes until the style can be added to the appropriate file later. The idea is to have this file lower down in the architecture so I overrides any of the previous rules. Adding a new directory is similar to adding a new file, but we use the `directory` keyword.

```bash
clarion add directory 08_Shame 
```

You should now see the new directory along with your other style directories and in it you will see the `index` manifest file. You will also see a reference to the new directory's manifest file in the main `styles` manifest file.

## Scripts

The default script section was intentionally left fairly simple. The `/components` directory is used for component-specific JavaScript like menus and modals. The `/services` directory is used for reusable functions and methods.
