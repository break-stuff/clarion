(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{207:function(t,a,n){"use strict";n.r(a);var s=n(0),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"spacing-mixins"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#spacing-mixins"}},[t._v("#")]),t._v(" Spacing  Mixins")]),t._v(" "),n("p",[t._v("The spacing mixins are some of the most handy in this framework. They can make managing layouts and aligning contents so much simpler. These mixins relate to "),n("em",[t._v("margins")]),t._v(" and "),n("em",[t._v("padding")]),t._v(", but additional uses can be made with the "),n("router-link",{attrs:{to:"/framework/documentation/functions/spacing.html"}},[t._v("spacing function")]),t._v(".")],1),t._v(" "),n("div",{staticClass:"tip custom-block"},[n("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),n("p",[t._v("At first glance, these may seem to be a little unconventionally named and you may be inspired to rename them (which you can). "),n("em",[t._v("However")]),t._v(", these are designed for a faster developer experience and once you become familiar with them, you may appreciate the naming convention.")])]),t._v(" "),n("p",[t._v("The mixins will pull the values based on the "),n("code",[t._v("$spacing-sizes")]),t._v(" "),n("router-link",{attrs:{to:"/framework/documentation/variables.html#spacing"}},[t._v("variable")]),t._v(" in the "),n("code",[t._v("_variables.scss")]),t._v(" file at the root of the "),n("code",[t._v("/00_Abstracts")]),t._v(" directory.")],1),t._v(" "),n("h2",{attrs:{id:"padding"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#padding"}},[t._v("#")]),t._v(" Padding")]),t._v(" "),n("p",[t._v("The available padding mixins are a s follows:")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("p()")]),t._v("  - padding for all four sides of element")]),t._v(" "),n("li",[n("code",[t._v("pt()")]),t._v(" - padding-top")]),t._v(" "),n("li",[n("code",[t._v("pl()")]),t._v(" - padding-left")]),t._v(" "),n("li",[n("code",[t._v("pr()")]),t._v(" - padding-right")]),t._v(" "),n("li",[n("code",[t._v("px()")]),t._v(" - padding-left and padding-right")]),t._v(" "),n("li",[n("code",[t._v("py()")]),t._v(" - padding-top and padding-bottom")])]),t._v(" "),n("h2",{attrs:{id:"margin"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#margin"}},[t._v("#")]),t._v(" Margin")]),t._v(" "),n("p",[t._v("The available margin mixins are a s follows:")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("m()")]),t._v("  - margin for all four sides of element")]),t._v(" "),n("li",[n("code",[t._v("mt()")]),t._v(" - margin-top")]),t._v(" "),n("li",[n("code",[t._v("ml()")]),t._v(" - margin-left")]),t._v(" "),n("li",[n("code",[t._v("mr()")]),t._v(" - margin-right")]),t._v(" "),n("li",[n("code",[t._v("mx()")]),t._v(" - margin-left and margin-right")]),t._v(" "),n("li",[n("code",[t._v("my()")]),t._v(" - margin-top and margin-bottom")])]),t._v(" "),n("h2",{attrs:{id:"example"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[t._v("#")]),t._v(" Example")]),t._v(" "),n("div",{staticClass:"language-scss extra-class"},[n("pre",{pre:!0,attrs:{class:"language-scss"}},[n("code",[n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".card ")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("@include")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("p")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("lg"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".card-header ")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("@include")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("mb")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("md"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".card-body ")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("@include")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("mb")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("md"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".card-footer ")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".button ")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("@include")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("px")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("lg"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("@include")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("py")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sm"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:"important"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#important"}},[t._v("#")]),t._v(" "),n("code",[t._v("!important")])]),t._v(" "),n("p",[t._v("Setting the "),n("code",[t._v("!important")]),t._v(" property on your rules is as simple as adding another value to your your mixin - "),n("code",[t._v("mb(lg, true)")]),t._v(". For mixins that accept more than one parameter, you can use a named parameter to bypass having to define all of the properties - "),n("code",[t._v("m(lg, $important: true)")]),t._v(";")])])}),[],!1,null,null,null);a.default=e.exports}}]);