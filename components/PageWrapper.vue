<template>
    <div class="page-wrapper">
        <main-menu/>
        <div class="container">
            <slot/>
        </div>
        <page-footer/>
    </div>
</template>

<script>
import MainMenu from '../components/MainMenu';
import PageFooter from '../components/PageFooter';

export default {
    components: {
        MainMenu,
        PageFooter
    },
    name: 'PageWrapper'
};
</script>
