(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{190:function(t,e,o){"use strict";o.r(e);var a=o(0),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h1",{attrs:{id:"adding-the-clarion-to-an-existing-project"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#adding-the-clarion-to-an-existing-project"}},[t._v("#")]),t._v(" Adding the Clarion to an Existing Project")]),t._v(" "),o("p",[t._v("If you already have build pipeline for your front-end code, but want to take advantage of the Clarion Style Architecture or Framework, adding Clarion to your project is a cinch.")]),t._v(" "),o("div",{staticClass:"tip custom-block"},[o("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),o("p",[t._v("If you don't have a build pipeline for your code, feel free to create an new project using the "),o("router-link",{attrs:{to:"/cli/documentation/new.html"}},[t._v("Clarion CLI")]),t._v(" and pull over what you would like.")],1)]),t._v(" "),o("h2",{attrs:{id:"adding-clarion-using-the-cli"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#adding-clarion-using-the-cli"}},[t._v("#")]),t._v(" Adding Clarion Using the CLI")]),t._v(" "),o("ol",[o("li",[t._v("In your terminal or command-line tool, navigate to the directory where you would like to add Clarion")])]),t._v(" "),o("div",{staticClass:"tip custom-block"},[o("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),o("p",[t._v("When using the Clarion CLI to add and remove files and directories, it will look in th "),o("code",[t._v("/src")]),t._v(" directory by default. If you add your styles to a different directory (another common place is the "),o("code",[t._v("/assets")]),t._v(" directory), you can configure Clarion to use a specified directory.")])]),t._v(" "),o("ol",{attrs:{start:"2"}},[o("li",[t._v("Run the command "),o("code",[t._v("clarion new")])]),t._v(" "),o("li",[t._v("Select "),o("code",[t._v("Manual Configuration")])]),t._v(" "),o("li",[t._v("If you would like the Architecture and Style Framework select "),o("code",[t._v("Styles Only")]),t._v(", otherwise select "),o("code",[t._v("Architecture Only")])]),t._v(" "),o("li",[t._v("Select the format you would like your styles to be in (for this demo I will choose "),o("code",[t._v("SCSS")]),t._v(")")])]),t._v(" "),o("p",[t._v("You should now see a new directory based on your style format (in this case called "),o("code",[t._v("/scss")]),t._v(").")]),t._v(" "),o("h2",{attrs:{id:"adding-you-new-styles-to-your-build-pipeline"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#adding-you-new-styles-to-your-build-pipeline"}},[t._v("#")]),t._v(" Adding You New Styles to your Build Pipeline")]),t._v(" "),o("p",[t._v("Different build tools handle preprocessors differently so make sure you consult the documentation on how to incorporate them into your build pipeline. If you are using a tool like webpack, incorporating them into your project may be as easy as adding importing the "),o("a",{attrs:{href:"http://localhost:8080/framework/documentation/architecture.html#manifest-files",target:"_blank",rel:"noopener noreferrer"}},[t._v("main manifest"),o("OutboundLink")],1),t._v(" to your main script file (some "),o("a",{attrs:{href:"https://webpack.js.org/loaders/sass-loader/",target:"_blank",rel:"noopener noreferrer"}},[t._v("additional set up"),o("OutboundLink")],1),t._v(" may be required).")]),t._v(" "),o("p",[t._v("If you are using a framework like "),o("a",{attrs:{href:"https://vue-loader.vuejs.org/guide/pre-processors.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue.js"),o("OutboundLink")],1),t._v(" or "),o("a",{attrs:{href:"https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet",target:"_blank",rel:"noopener noreferrer"}},[t._v("React"),o("OutboundLink")],1),t._v(", they have made it very simple to add a your styles to the project pipeline. Again, consult the documentation for additional information and support.")]),t._v(" "),o("h2",{attrs:{id:"configuring-your-project-for-the-clarion-cli"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#configuring-your-project-for-the-clarion-cli"}},[t._v("#")]),t._v(" Configuring Your Project for the Clarion CLI")]),t._v(" "),o("div",{staticClass:"tip custom-block"},[o("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),o("p",[t._v("As stated above, if you added your styles to the "),o("code",[t._v("/src")]),t._v(" directory, you do not have to do this step.")])]),t._v(" "),o("p",[t._v("For this example, let's say the the styles are in the "),o("code",[t._v("/assets")]),t._v(" directory. To up date the configuration:")]),t._v(" "),o("ol",[o("li",[t._v("In your terminal or command-line tool navigate to the root of your project.")]),t._v(" "),o("li",[t._v("Run the command "),o("code",[t._v("clarion config")])]),t._v(" "),o("li",[t._v("You will be prompted with "),o("code",[t._v("What is the path to your styles directory?")])]),t._v(" "),o("li",[t._v("Type "),o("code",[t._v("./assets")])]),t._v(" "),o("li",[t._v("Feel free to update the values with your project's configuration or just press enter to use the default values.")])]),t._v(" "),o("p",[t._v("At the root of your project you should now see a new file named "),o("code",[t._v("clarion-config.json")]),t._v(". The contents are fairly simple:")]),t._v(" "),o("div",{staticClass:"language-json extra-class"},[o("pre",{pre:!0,attrs:{class:"language-json"}},[o("code",[o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),o("span",{pre:!0,attrs:{class:"token property"}},[t._v('"paths"')]),o("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),o("span",{pre:!0,attrs:{class:"token property"}},[t._v('"styles"')]),o("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),o("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./assets"')]),t._v("\n\t"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),o("span",{pre:!0,attrs:{class:"token property"}},[t._v('"format"')]),o("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),o("span",{pre:!0,attrs:{class:"token property"}},[t._v('"styles"')]),o("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),o("span",{pre:!0,attrs:{class:"token string"}},[t._v('"scss"')]),t._v("\n\t"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),o("span",{pre:!0,attrs:{class:"token property"}},[t._v('"addToManifest"')]),o("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),o("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),o("span",{pre:!0,attrs:{class:"token property"}},[t._v('"importAbstracts"')]),o("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),o("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),o("p",[t._v("If you would like to manually update these values rather than using the CLI, you should be able to without any problems.")]),t._v(" "),o("div",{staticClass:"tip custom-block"},[o("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),o("p",[t._v("For more information on configuring your project, check out the "),o("router-link",{attrs:{to:"/cli/documentation/configuration.html"}},[t._v("official documentation")]),t._v(".")],1)])])}),[],!1,null,null,null);e.default=r.exports}}]);