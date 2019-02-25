<template>
    <div>
        <h1>Style Architecture</h1>
        <p>
            After creating your project, if you navigate to the
            <code>src</code> folder you should see 2 subdirectories:
            <code>sass</code> (unless you specified a different format) and
            <code>scripts</code>.
        </p>

        <h2>Styles</h2>
        <p>Clarion offers a unique architecure to help reduce the complexity of styling small and large web applications and sites.</p>

        <h3>What's with the numbers?</h3>
        <p>Seeing folders prefixed with numbers may seem a little awkward or even down-right blasphemous to you at first. There is a method to this madness. The reason for it is to put the folder structure in the order in witch the styles are implemented in your style sheet. This servers two purposes:</p>
        <ul>
            <li>Knowing the order that your styles are implemented allows you to see which rules are overriding other rules. Rules in the style sheets higher up in the folder structure will be overridden by the rules that are lower in the file structure (for example - rules in the Components section will override rules in the Elements section).</li>
            <li>
                Understanding how the styles cascade should allow you to reduce, if not eliminate, the need to use
                <code>!important</code>. It has it's uses and appropriate applications, but abuse if this feature leads to style sheets that are painful to maintain and very difficult to troubleshoot.
            </li>
        </ul>

        <h3>00_Abstracts</h3>
        <p>This folder is for your style tools and helpers used across the project. Your reusable code such as global variables, functions, mixins and placeholders should be put in here.</p>
        <p>The code contained in this folder should not be code that outputs CSS directly.</p>
        <p>With larger projects you may want to break this into subdirectories like variables, functions, and mixins. Subdirectories are supported in the Clarion CLI.</p>

        <h3>01_Base</h3>
        <p>This folder holds the boilerplate code for the project. Here you would add your reset files, font declarations, iconography styles, etc. Keep in mind that most front-end UI frameworks like Bootstrap, Foundation, and Material Design already have their own CSS resets built into their styles, so additional resets may not be necessary.</p>

        <h3>02_Vendors</h3>
        <p>The Vendors folder contains third-party themes and plug-ins for your website. This file has been added higher in the architecture so that if you would like to create customizations, you can do so in the subsequent folders like Components, Layouts, and Pages. This will allow you to override the theme's rules without modifying the theme directly and ruining the integrity of the code.</p>

        <h3>03_Elements</h3>
        <p>
            The Elements folder is for styling specific elements such as links, buttons, form inputs, and header tags. These are the smallest building blocks in the web and cannot be broken up into smaller parts. Browsers, by default, have their own styling in place for these elements, but tend to be inconsistent. Because of this, adding a reset to the
            <code>01_Base</code> directory or adding one to build pipeline is recommended.
        </p>

        <h3>04_Components</h3>
        <p>Components are groups of elements. This can be things like a search box, navbar, or carousel. These groups of elements together have a specific purpose.</p>

        <h3>05_Layouts</h3>
        <p>This folder contains everything that takes part in laying out the web site or application. These could be containers used for organizing elements and components within them like like a header, footer, or sidebar. This could also be used for your grid-system.</p>

        <p>Styles for Elements and Components should
            <em>not</em> be modified here. Style variations for these should all be contained in a single place. Layouts are for positioning Elements and Components.
        </p>

        <h3>06_Pages</h3>
        <p>This folder is for any page-specific styles, if you have any. Some sites may have custom styling for the Home page or the Contact Us page.</p>

        <p>If you have time sensitive or temporary styles or themes (such as a holiday theme or special event), this would be the place to add them.</p>

        <h3>07_Utilities</h3>
        <p>The Utilities are used to create overrides or call out specific rules for an elements or components. For example, you could have a class for making text bold or aligning it to the right. The rule of thumb is to make it specific and make it simple.</p>

        <h3>Manifest Files</h3>
        <p>Each of these directories will have an index file (index.scss). This is called your manifest file. When a new file is added to a directory, it will automatically be added to this manifest file. Feel free to reorder the import statements in this file to something that works best for you. Also, if you would like to exclude a file from compilation, you can just comment it out until you are ready to incorporate it back into the code.</p>

        <h3>Main Style Manifest</h3>
        <p>
            At the root of your
            <code>less</code> or
            <code>sass</code> directory, you should see your main manifest file (if you used the default configuration, it will be called
            <code>styles.scss</code>). This file is your main manifest file. Inside you will find import statements for each of the manifest files from the various subdirectories.
        </p>

        <pre>

        @import './00_Abstracts/index.scss';
        @import './01_Base/index.scss';
        @import './02_Vendors/index.scss';
        @import './03_Elements/index.scss';
        @import './04_Components/index.scss';
        @import './05_Layouts/index.scss';
        @import './06_Pages/index.scss';
        @import './07_Utilities/index.scss';
        </pre>

        <h2>Customize the Architecture</h2>
        <p>That's right! If this naming Convention doesn't work for you or you feel like it is missing something, feel free to change it up. Just make sure you update the references in the main manifest file.</p>

        <h3>Adding New Directories</h3>
        <p>
            Not only can you rename directories, but you can also create and remove directories. A popular trend is to create a directory called "Shame". This directory is used for adding style hot fixes until the style can be added to the appropriate file later. The idea is to have this file lower down in the architecture so I overrides any of the previous rules. Adding a new directory is similar to adding a new file, but we use the
            <code>directory</code> keyword.
        </p>
        <code>clarion add directory 08_Shame</code>
        <br>
        <br>
        <p>
            You should now see the new directory along with your other style directories and in it you will see the
            <code>index</code> manifest file. You will also see a reference to the new directory's manifest file in the main
            <code>styles</code> manifest file.
        </p>

        <h2>Scripts</h2>
        <p>
            The default script section was intentionally left fairly simple. The
            <code>components</code> directory is used for component-specific JavaScript like menus and modals. The
            <code>services</code> directory is used for reusable functions and methods.
        </p>
    </div>
</template>

<script>
export default {
    name: 'Architecture',
    layout: 'documentation'
};
</script>
