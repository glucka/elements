var actMenuIndex = 0;

document.querySelectorAll('nav.menu > ul > li > a.sub').forEach(function (link) {
    link.addEventListener('click', function (event) {

        event.preventDefault();
        var menuIndex = elementindex(link.parentElement);

        if (menuIndex == actMenuIndex) {
            this.parentElement.classList.remove('open');
            actMenuIndex = 0;

        } else {
            this.parentElement.classList.add('open');

            if (this.parentElement.parentElement.childNodes[actMenuIndex - 1]) {
                this.parentElement.parentElement.childNodes[actMenuIndex - 1].classList.remove('open');
            }
            actMenuIndex = menuIndex;
        }
    });
});

/*
var submenuTimerOver = 0;
var submenuTimerOut = 0;

document.querySelectorAll('nav.menu > ul > li.sub').forEach(function (li) {
    li.addEventListener('mouseenter', function (event) {
        clearTimeout(submenuTimerOut);
        submenuTimerOver = setTimeout(function () {
            li.classList.add('hover');
            getSiblings(li).forEach(function (sibling) {
                sibling.classList.remove('hover');
            });
        }, 200);
    });
    li.addEventListener('mouseleave', function (event) {
        clearTimeout(submenuTimerOver);
        submenuTimerOut = setTimeout(function () {
            li.classList.remove('hover');
        }, 200);
    });
});
*/