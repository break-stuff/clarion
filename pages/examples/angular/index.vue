<template>
    <div>
        <h1>Custom Angular Themes Using Clarion</h1>

        <p>Clarion plays really well with Angular, especially if you are using Angular CLI. If you don't have it installed already, make sure you
            <a href="https://cli.angular.io/">install it now</a>.
        </p>

        <h2>Starting Your Project</h2>
        <p>Before you get started, make sure Clarion and the Angular CLI are installed:</p>
        <p>
            <code>npm install -g clarion @angular/cli</code>
        </p>

        <p>By default, new projects that are created using the Angular CLI use
            <code>.css</code> as the style format. Fortunately, the Angular team has built in a way for you to also configure your project with
            <code>.scss</code>,
            <code>.sass</code>, or
            <code>.less</code> when you create a new project. To get started we will run the command to create a new project, but specify the style option:
        </p>
        <p>
            <code>ng new MyProject --style=scss</code>
        </p>

        <h3>Changing an Existing Project</h3>
        <p>If you have an existing project that uses the default
            <code>.css</code> format or would like to change from one format to another, you can do so by changing the Angular CLI configuration. If you already have an existing
            <code>.angular-cli.json</code> configuration file located at the root of your project, you can manually change the
            <code>styleExt</code> property of your choice. If you would like to play it safe, you can also use the Angular CLI to update your project:
        </p>
        <p>
            <code>ng set defaults.styleExt scss</code>
        </p>
        <p>You should now see the
            <code>.angular-cli.json</code>. Inside that file you should see, under the
            <code>defaults</code> property, the
            <code>styleExt</code> value set to
            <code>scss</code>.
        </p>
        <p>If you already has styles written in another format, you will need to rewrite them in the new format. Angular will not convert them.</p>

        <h2>Adding Clarion</h2>
        <p>Adding Clarion to the project can be done in 4 easy steps:</p>

        <h4>1. Create a Folder For Your Styles</h4>
        <p>Under the
            <code>src</code> directory create a new folder called
            <code>sass</code>.
        </p>
        <p>
            <strong>Note: Clarion will look for the Clarion Style Architecture in folders called
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
        <p>In order to avoid overriding andy of the files provided by the You can add the Clarion architecture by using the
            <code>--only</code> or
            <code>-O</code> option. This will only install the Clarion Style Architecture.
        </p>
        <p>
            <code>clarion new -O</code>
        </p>

        <h4>4. Add the Styles Manifest to Angular</h4>
        <p>In the root of your project open the
            <code>.angular-cli.json</code> file and change the
            <code>styles</code> value to
            <code>sass/styles.scss</code>.
        </p>

        <h2>Conclusion</h2>
        <p>You should be able to use the Clarion CLI as you normally would. No additional configuration is necessary.</p>
    </div>
</template>

<script>
export default {
    name: 'AngularExample',
    layout: 'examples'
};
</script>
