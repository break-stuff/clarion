<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark main-menu">
        <nuxt-link class="navbar-brand" to="/">Clarion</nuxt-link>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item quick-start">
                    <nuxt-link class="nav-link" to="/">Quick Start</nuxt-link>
                </li>
                <li class="nav-item documentation">
                    <nuxt-link class="nav-link" to="/documentation/">Documentation</nuxt-link>
                </li>
                <li class="nav-item examples">
                    <nuxt-link class="nav-link" to="/examples/">Examples</nuxt-link>
                </li>
                <li class="nav-item contact">
                    <nuxt-link class="nav-link" to="/contact/">Contact</nuxt-link>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        target="_blank"
                        href="https://www.npmjs.com/package/clarion"
                    >
                        <img src="~/assets/images/npm_icon_white.png" alt="npm icon">
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        target="_blank"
                        href="https://github.com/break-stuff/clarion"
                    >
                        <img src="~/assets/images/githubwhite.png" alt="github icon">
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'MainMenu'
};
</script>
