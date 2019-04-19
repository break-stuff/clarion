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
                        to="/style-framework/documentation/functions/colors/"
                        aria-controls="new project"
                    >Colors</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-docs-architecture"
                        to="/style-framework/documentation/functions/spacing"
                        aria-controls="architecture"
                    >Spacing</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-docs-add"
                        to="/style-framework/documentation/functions/strings"
                        aria-controls="add and remove files"
                    >Strings</nuxt-link>
                    <nuxt-link
                        class="list-group-item list-group-item-action js-docs-config"
                        to="/style-framework/documentation/functions/z-index"
                        aria-controls="configuration"
                    >Z-Index</nuxt-link>
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
