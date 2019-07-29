<template>
    <div class="color-palette">
        <div class="color">
            <div class="name">white</div>
            <div :class="['base', 'bg-white']">white</div>
        </div>
        <div class="color">
            <div class="name">black</div>
            <div :class="['base', 'bg-black']">black</div>
        </div>
        <div class="color" v-for="color in colors" :key="color">
            <div class="name">{{color}}</div>
            <div :class="['base', 'bg-' + color]">base</div>
            <div class="variations">
                <div
                    :class="`variation bg-${color}-${variation}`"
                    v-for="variation in variations"
                    :key="color + '-' + variation"
                >
                    {{ variation }} (<span class="hex"></span>)
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import colorUtil from "../utils/colors.js";
import { setTimeout } from "timers";

export default {
    data() {
        return {
            colors: [
                "primary",
                "secondary",
                "success",
                "info",
                "warning",
                "danger",
                "light",
                "dark"
            ],
            variations: ["lighter", "light", "base", "dark", "darker"],
            hexValues: []
        };
    },
    computed: {
        getHexColor() {}
    },
    methods: {
        getBackgroundColor(color, variation) {
            // const selector = `.bg-${color}${
            //     !variation || variation === 'base' ? '' : '-' + variation
            // }`;
            // if(this.refs)
            //     return this.$refs.style.backgroundColor;
            // if(this.$el)
            // return this.$el.querySelector(`.bg-${color}-${variation}`).style.backgroundColor;
            // return '';
        },
        getBgColor(className) {
            // const color = window
            //     .getComputedStyle(this.$el.querySelector(`.${className}`), null)
            //     .getPropertyValue("background-color");
            // return colorUtil.colorToHex(color);;

            // setTimeout(() => {
            //     const colorElement = this.$el.querySelector(`.${className}`);
            //     console.log(val);
            //     const color = window
            //         .getComputedStyle(colorElement, null)
            //         .getPropertyValue("background-color");
            //     const hex = colorUtil.colorToHex(color);
            //     console.log(hex);
            //     return hex;
            // });
        }
    },
    mounted() {
        setTimeout(() => {
            const colorElements = this.$el.querySelectorAll(`.variation`);
            colorElements.forEach(x => {                
                const color = window
                    .getComputedStyle(x, null)
                    .getPropertyValue("background-color");
                const hex = colorUtil.colorToHex(color);
                x.children[0].innerHTML = hex;
            });
        });
    }
};
</script>