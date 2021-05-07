function setCustomPropertys() {
    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    document.documentElement.style.setProperty('--vhh', window.innerHeight * 0.01 + 'px');
    if (document.body) {
        document.documentElement.style.setProperty('--vw', document.body.clientWidth * 0.01 + 'px');
    } else {
        document.addEventListener("DOMContentLoaded", function (event) {
            document.documentElement.style.setProperty('--vw', document.body.clientWidth * 0.01 + 'px');
        });
    }
}

function isVisibleInViewport(elem) {
    var y = elem.offsetTop;
    var height = elem.offsetHeight;

    while (elem = elem.offsetParent)
        y += elem.offsetTop;

    var maxHeight = y + height;
    var isVisible = (y < (window.pageYOffset + window.innerHeight)) && (maxHeight >= window.pageYOffset);
    return isVisible;

}

window.lang = document.getElementsByTagName('html')[0].getAttribute('lang');

if (window.navigator.userAgent.toLowerCase().indexOf("trident") > -1) {
    if (lang == 'de') {
        window.location.href = '/oldbrowser';
    } else {
        window.location.href = '/' + lang + '/oldbrowser';
    }
}

window.dataLayer = window.dataLayer || [];
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.expFactor = 2;
window.lastWidth = window.innerWidth;
window.lastScrollTop = 0;
window.resizeWidth = new Event('resizewidth');
window.scrollUp = new Event('scrollup');
window.scrollDown = new Event('scrolldown');

setCustomPropertys();

window.addEventListener('resize', function () {
    clearTimeout(window.resizeTimeout);
    document.documentElement.style.setProperty('--vhh', window.innerHeight * 0.01 + 'px');
    window.resizeTimeout = setTimeout(function () {
        var newWidth = window.innerWidth;
        if (newWidth !== lastWidth) {
            lastWidth = newWidth;
            window.dispatchEvent(resizeWidth);
            setCustomPropertys();
        }
    }, 300);

});

window.addEventListener('scroll', function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && !document.body.classList.contains('scrolled-downwards')) {
        window.dispatchEvent(scrollDown);
    }
    if (st < lastScrollTop && !document.body.classList.contains('scrolled-upwards')) {
        window.dispatchEvent(scrollUp);
    }
    lastScrollTop = st <= 0 ? 0 : st;
});

window.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('domready');
});