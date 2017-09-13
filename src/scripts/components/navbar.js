$(document).ready(function(){
    var currentUrl = window.location.href;
    var category = getPageCategory(currentUrl);

    $('.' + category).addClass('active');
});

function getPageCategory(currentUrl) {
    switch (true) {
        case currentUrl.indexOf('documentation') > -1:
            return 'documentation';
        case currentUrl.indexOf('examples') > -1:
            return 'examples';
        case currentUrl.indexOf('contact') > -1:
            return 'contact';
        default:
            return 'quick-start';
    }
}