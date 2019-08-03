<template>
    <div class="rectangle">
        <h3 v-if="title" class="title">
            <b>{{title}}</b>
        </h3>
        <svg :width="width" :height="height" :class="['fill-' + color,  rectangleClass]">
            <rect width="100%" height="100" />Sorry, your owser does not support inline SVG.
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "100%"
        },
        color: {
            type: String,
            default: "primary"
        },
        title: {
            type: String
        },
        rectangleClass: {
            type: String
        },
    }
};
</script>

<style lang="scss" scoped>
</style>