<template>
    <div>
        <h1>Color Functions</h1>

        <p>
            There are two main color functions we will be working with. The rest are vriations. These funtions are:
            <ol>
                <li><code>color()</code></li>
                <li><code>text-color()</code></li>
            </ol>
        </p>

        <br>

        <h2><code>color()</code></h2>
        <p>
            The color function allows you to select a color from the <code>$theme-colors</code> varible that is set up in your <code>00_Abstracts/_variables.scss</code> directory.
            This will allow you to maximize your reuse as well as provide some other cool features like theme chaining and dynamically generating components like buttons.
        </p>

        <h3>Example:</h3>
        <pre>
        h1 {
            color: color(primary);
        }

        - or -

        .alert {
            .warning {
                border: solid 1px color(warning);
            }

            .danger {
                border: solid 1px color(danger);
            }
        }
        </pre>

        <p>
            Now, using the <code>color()</code> function and passing in the color name is only the most basic feature availible.
            By default, passing in the name of the color you want as the only parameter will get the color value that you specified in the <code>00_Abstracts/_variables</code> file.
            However, there are 3 possible parameters that can be passed into this function to produce different results:
            <br>
            <br>
            <table class="table">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Value Type</th>
                        <th>Description</th>
                        <th>Default Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>string</td>
                        <td>name of the color specified in the <code>00_Abstracts/_variables</code> file (as seen in the example above)</td>
                        <td>primary</td>
                    </tr>
                    <tr>
                        <td>variant</td>
                        <td>string</td>
                        <td>selecting a variation of that color based on your color palette</td>
                        <td>base</td>
                    </tr>
                    <tr>
                        <td>opacity</td>
                        <td>number (between 0 and 1)</td>
                        <td>Adjustung this number between 0 and 1 will adjust the opacity of the color select. 0 is completely opaque and 1 is completely solid.</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </p>

        <h3>Variant</h3>
        <p>
            Behind the scenes, Clarion has constructed a color palette based on the colors you provided in your variable file. 
            This is a huge time saver in terms of finding color variations as well as it keeps your code light and clean.
            Out of the box, the palette consists of 5 variations (lighter, light, base, dark, and darker).
        </p>
        <div class="color-palette">
            <div class="color card" v-for="color in colors" :key="color">
                <div class="card-body">
                    <h5 class="card-title">{{color}}</h5>
                    <div :class="['base', `bg-${color}`]"><span class="value">{{`base (${getBgColor(`bg-${color}`)})`}}</span></div>
                    <div class="variations">
                        <div :class="['variation', `bg-${color}-${variation}`]"  v-for="variation in variations" :key="`bg-${color}-${variation}`">
                            <span class="value">{{`${variation} (${getBgColor(`bg-${color}-${variation}`)})`}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
import colorUtil from '../../../../../utils/colors';
export default {
    data() {
        return {
            title: 'Clarion Style Framework Documentation',
            doc: null,
            colors: [
                'primary',
                'secondary',
                'default',
                'success',
                'info',
                'warning',
                'danger',
                'light',
                'dark',
                'black',
                'white'
            ],
            variations: ['lighter', 'light', 'base', 'dark', 'darker']
        };
    },
    computed: {},
    methods: {
        getBgColor(className) {
            if (this.$el) {
                const color = window.getComputedStyle(this.$el.querySelector(`.${className}`), null).getPropertyValue("background-color");
                return colorUtil.colorToHex(color);
            }
        }
    },
    mounted() {
        // console.log(this.$el);
        this.doc = this.$refs;
    },
    head: {
        title: 'Clarion Color Functions',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    "Take advantage of Clarion's color functions to make color management and reuse easy in your application."
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content:
                    "Take advantage of Clarion's color functions to make color management and reuse easy in your application."
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content:
                    'https://projectclarion.com/style-framework/documentation/functions/colors'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Clarion Color Functions'
            }
        ]
    }
};
</script>
