<template>
    <main class="container">
        <h1 class="u-text--center">Make Your Life Easier With CSS Architecture!</h1>

        <p>
            CSS doesn't suck (or at least it doesn't have to)! The days of the monolithic
            <code>styles.css</code> page are gone! Use Clarion to help you and your teams build better projects that are easier to maintain, collaborate in and built for scale. The last thing you need to do is waste your time wrestling with styles that don't seem to cooperate.
        </p>
        <br>
        <div class="row headliners">
            <div class="col">
                <div class="card">
                    <!-- <img
                        class="card-img-top"
                        src="~/assets/images/code_icon.png"
                        alt="code icon"
                    >-->
                    <i class="fas fa-code card-img-top"></i>
                    <div class="card-body">
                        <h5 class="card-title">Maintainable and Scalable CSS</h5>
                        <p class="card-text">
                            The Clarion CSS Architecture is designed so your CSS actually "cascades" and allows you to avoid sprinkling those pesky
                            <code>!important</code> attributes throughout your code. Now you can avoid spending hours trying to figure out why your menu won't align properly.
                        </p>
                        <nuxt-link
                            to="documentation/architecture"
                            class="btn btn-primary"
                        >Docs on Architecture →</nuxt-link>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <!-- <img
                        class="card-img-top"
                        src="~/assets/images/round_terminal.png"
                        alt="terminal icon"
                    >-->
                    <i class="fas fa-terminal card-img-top"></i>
                    <div class="card-body">
                        <h5 class="card-title">Easy Scaffolding</h5>
                        <p class="card-text">
                            Creating new projects and making sure all of the necessary components are working properly can slow things
                            <i>WAY</i> down. After you've done that, adding new files and maintaining references can get confusing and frustrating. Using the CLI, you can scaffold out projects and create new integrated style sheets with no additional work.
                        </p>
                        <nuxt-link to="documentation/" class="btn btn-primary">Docs on the CLI →</nuxt-link>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <!-- <img
                        class="card-img-top"
                        src="~/assets/images/screwdriver_logo.png"
                        alt="screwdriver icon"
                    >-->
                    <i class="fas fa-tools card-img-top"></i>
                    <div class="card-body">
                        <h5 class="card-title">Use Your Favorite Tools</h5>
                        <p
                            class="card-text"
                        >Clarion makes it easy to use your favorite tools! Write your styles in SASS, SCSS, or LESS. Run your projects with your favorite task runners and bundlers like Grunt, Gulp, WebPack, or Parcel. the goal is to get you up and running as quickly as possible and help you create amazing things.</p>
                        <nuxt-link
                            to="documentation/new/"
                            class="btn btn-primary"
                        >Docs on New Projects →</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <h2>Getting Started</h2>
        <p>
            <em>
                <strong>
                    Make sure you have
                    <a href="https://nodejs.org/">Node.js and npm</a> installed.
                </strong>
            </em>
        </p>
        <div class="demo">
            <div class="container">
                <div class="row">
                    <div class="col col-xs-12 col-sm-6">
                        <div class="card c-card--terminal">
                            <div class="card-header">Terminal: New Project Quick-Steps</div>
                            <div class="card-body">
                                <div>
                                    <span class="bash-base">></span>npm install -g clarion
                                    <em>&nbsp;or&nbsp;</em> yarn global add clarion
                                </div>
                                <div>
                                    <span class="bash-base">></span>clarion new
                                </div>
                                <div>
                                    <span class="bash-base">></span>cd &lt;project-name&gt;
                                </div>
                                <div>
                                    <span class="bash-base">></span>npm run dev
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-xs-12 col-sm-6 demo__text">Get started in just a few steps!</div>
                </div>
            </div>
        </div>

        <h3>Your New Project</h3>
        <p>The project architecture implements the
            <nuxt-link to="/documentation/architecture/">Clarion CSS Architecture</nuxt-link>.
        </p>

        <h2>Adding a New File</h2>
        <p>Additional style files can easily be manged through the CLI as well. In your terminal type the following command:</p>
        <p>
            <code>clarion add element headings</code>
        </p>
        <p>
            This will create the file
            <code>_headings.scss</code> in the
            <code>03_Elements</code> directory as well as add
            <code>@import '_headings.scss';</code> import statement to the directory manifest file so it can be included in your final CSS file.
        </p>

        <h2>Removing a File</h2>
        <p>Similar to adding a file, removing files can also be done through the CLI:</p>
        <p>
            <code>clarion remove element headings</code>
        </p>
        <p>
            This will remove the file
            <code>_headings.scss</code> in the
            <code>03_Elements</code> directory as well as remove
            <code>@import '_headings.scss';</code> import statement from the directory manifest file.
        </p>

        <h2>Building Your Project for Production</h2>
        <p>To build your application for final use, run the build command:</p>
        <p>
            <code>npm run build</code>
        </p>
        <p>
            The final compiled JavaScript and CSS file are in
            <code>build</code> directory in the root of your project.
        </p>

        <h2>What Next?</h2>
        <p>Check out the
            <nuxt-link to="/documentation">documentation</nuxt-link>to see what other amazing things you can do with Clarion!
        </p>
    </main>
</template>

<script>
export default {
    name: 'Home',
    head: {
        title: 'Clarion CLI and Style Framework',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'See how the Clarion CLI and style framework can make managing styles in your project simpler.'
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content:
                    'See how the Clarion CLI and style framework can make managing styles in your project simpler.'
            },
            {
                hid: 'og:url',
                name: 'og:url',
                content: 'https://projectclarion.com/'
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary'
            },
            {
                hid: 'twitter:creator',
                name: 'twitter:creator',
                content: '@stuffbreaker'
            }
        ]
    }
};
</script>
