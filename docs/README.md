# Tools for Building Your Design Systems

## A CSS and Design System Framework for Building Your Applications

Clarion is a toolbox to accelerate your web development and make your code more maintainable and scalable. Out of the box it comes with a _CLI Tool_ (for scaffolding and maintenance) and a _Style Framework_ (for rapid application development).

## Easy Scaffolding

Creating new projects and making sure all of the necessary components are working properly can slow things _WAY_ down. After you've done that, adding new files and maintaining references can get confusing and frustrating. With the CLI, scaffolding and maintaining projects is a breeze.

## Use What You Want

Feel free to use only those aspects of the tooling you want. If there is an part of the framework you don't want to use or you are not ready for yet, _no problem_. It is designed so that any unused piece will not be added to to your final build.

Both the CLI and the Framework are highly configurable and extendable. If you prefer you directory names to be different than the default, _change them_! If you have more custom variables than are available, _add them_! You have complete control over your tools and how they get used.

## This is _Your_ Toolbox

Many frameworks are abstracted into NPM packages and you are limited to customize the things that they allow you to. With Clarion, everything is scaffolded out for you in your source code and not in an NPM package, so you have complete control on customizing it. This also means your customizations get checked into your source control (which NPM packages typically do not).

## UX Consistency

All of the [design tokens](/framework/documentation/variables.html) are centrally stored in one place and the _mixins_ and _functions_ are designed to use of those tokens. This will provide consistency in your Design and User Experience.

## Maintainable and Scalable

As your application grows in size and complexity, your code should be able to grow and scale right along with it. Having a clean, easy to follow architecture makes this much more manageable (especially in teams).

I addition to that, the [Clarion Style Architecture](/framework/documentation/architecture.html) is designed so your CSS _"cascades"_ and allows you to avoid sprinkling those pesky `!important` attributes throughout your code. Well architected CSS allows you code to be predictable so you are never up late at night wondering why your menu isn't lining up.

## Use Your Favorite Tools

Clarion makes it easy to use your [favorite tools](/cli/documentation/new.html)! Write your styles in `SASS`, `SCSS`, or `LESS`*. Run your projects with your favorite task runners and bundlers like `Grunt`, `Gulp`, `WebPack`, or `Parcel`. the goal is to get you up and running as quickly as possible and help you create amazing things.

<small><em>*The Style Framework is not currently available for `LESS`. However, the CLI and Style Architecture are fully supported.</em></small>
