<template>
    <page-wrapper>
        <div class="row">
            <div class="col col-md-8">
                <nuxt/>
            </div>
            <div class="col col-md-4">
                <div class="list-group c-sub-nav" id="list-tab" role="tablist">
                    <nuxt-link
                        class="list-group-item list-group-item-action js-docs-new"
                        to="/documentation/new/"
                        aria-controls="new project"
                    >New Project</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-docs-architecture"
                        to="/documentation/architecture/"
                        aria-controls="architecture"
                    >Architecture</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-docs-add"
                        to="/documentation/add/"
                        aria-controls="add and remove files"
                    >Add / Remove Files</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-docs-config"
                        to="/documentation/configuration/"
                        aria-controls="configuration"
                    >Configuration</nuxt-link>
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
