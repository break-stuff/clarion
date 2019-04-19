<template>
    <page-wrapper>
        <div class="row">
            <div class="col col-md-8">
                <nuxt/>
            </div>
            <div class="col col-md-4">
                <div class="list-group c-sub-nav" id="list-tab" role="tablist">
                    <nuxt-link
                        class="list-group-item list-group-item-action js-ex-angular"
                        to="/cli/examples/angular/"
                        aria-controls="angular"
                    >Angular</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-ex-aspnet"
                        to="/cli/examples/aspnet/"
                        aria-controls="jekyll"
                    >ASP.Net</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-ex-bootstrap"
                        to="/cli/examples/bootstrap/"
                        aria-controls="bootstrap"
                    >Bootstrap</nuxt-link>
                    <!-- <nuxt-link
                        class="list-group-item list-group-item-action js-ex-ghost"
                        to="/cli/examples/ghost/"
                        aria-controls="jekyll"
                    >Ghost Blog</nuxt-link> -->
                    <nuxt-link
                        class="list-group-item list-group-item-action js-ex-jekyll"
                        to="/cli/examples/jekyll/"
                        aria-controls="jekyll"
                    >Jekyll</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-ex-react"
                        to="/cli/examples/react/"
                        aria-controls="react"
                    >React</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-ex-vuejs"
                        to="/cli/examples/vuejs/"
                        aria-controls="vuejs"
                    >Vue.js</nuxt-link>
                </div>
            </div>
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from '../components/PageWrapper';

export default {
    components: {
        PageWrapper
    }
};
</script>
