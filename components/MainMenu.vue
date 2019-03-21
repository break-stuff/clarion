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
                    <nuxt-link class="nav-link" to="/" exact>Quick Start</nuxt-link>
                </li>
                <li class="nav-item cli dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >CLI</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <nuxt-link class="nav-link dropdown-item" to="/cli/documentation/">Documentation</nuxt-link>
                        <nuxt-link class="nav-link dropdown-item" to="/cli/examples/">Examples</nuxt-link>
                    </div>
                </li>
                <li class="nav-item styl-framework dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >Style Framework</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <nuxt-link class="nav-link dropdown-item" to="/style-framework/documentation/">Documentation</nuxt-link>
                        <nuxt-link class="nav-link dropdown-item" to="/style-framework/examples/">Examples</nuxt-link>
                    </div>
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
                        <span class="sr-only">NPM Link</span>
                        <i class="fab fa-npm"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        target="_blank"
                        href="https://github.com/break-stuff/clarion"
                    >
                        <span class="sr-only">GitHub Link</span>
                        <i class="fab fa-github"></i>
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
