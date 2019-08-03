<template>
    <div class="grid-wrap col-3">
        <rectangle v-for="value in values"
                   :title="`radius${value}(lg)`"
                   height="100"
                   :rectangle-class="`radius${value}-lg`" />
        <rectangle title="radius(pill)"
                   height="100"
                   rectangle-class="radius-pill" />
        <rectangle title="radius(circle)"
                   height="100"
                   rectangle-class="radius-circle" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            values: ["", "-t", "-tl", "-tr", "-b", "-bl", "-br"]
        };
    }
};
</script>
