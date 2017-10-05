$(document).ready(function () {
    activatePageCategoryLink();
    activateSubNavCategoryLink();
});

function activatePageCategoryLink() {
    var className = '';
    switch (true) {
        case urlContainsString('documentation'):
            className = 'documentation';
            break;
        case urlContainsString('examples'):
            className = 'examples';
            break;
        case urlContainsString('contact'):
            className = 'contact';
            break;
        default:
            className = 'quick-start';
            break;

    }

    addActiveClassToElement(className);
}

function activateSubNavCategoryLink() {
    var className = '';

    switch (true) {
        case urlContainsString('new'):
            className = 'js-docs-new';
            break;
        case urlContainsString('architecture'):
            className = 'js-docs-architecture';
            break;
        case urlContainsString('add'):
            className = 'js-docs-add';
            break;
        case urlContainsString('config'):
            className = 'js-docs-config';
            break;
        case urlContainsString('angular'):
            className = 'js-ex-angular';
            break;
        case urlContainsString('aspnet'):
            className = 'js-ex-aspnet';
            break;
        case urlContainsString('ghost'):
            className = 'js-ex-ghost';
            break;
        case urlContainsString('jekyll'):
            className = 'js-ex-jekyll';
            break;
        case urlContainsString('react'):
            className = 'js-ex-react';
            break;
        case urlContainsString('vuejs'):
            className = 'js-ex-vuejs';
            break;
    }

    addActiveClassToElement(className);
}

function addActiveClassToElement(className) {
    if (className)
        $('.' + className).addClass('active');
}

function urlContainsString(stringToFind) {
    var hasStringInUrl = window.location.href.indexOf(stringToFind) > -1;
    return hasStringInUrl;
}