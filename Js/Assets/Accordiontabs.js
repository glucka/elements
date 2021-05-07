function checkTabs(accordiontabs) {
    if (accordiontabs.getAttribute('data-tabsat') > 0 && window.innerWidth >= accordiontabs.getAttribute('data-tabsat')) {
        accordiontabs.classList.add('tabs-visible')
    } else {
        accordiontabs.classList.remove('tabs-visible')
    }
}

function openContent(accordiontabs, index) {

    var actIndex = index;

    accordiontabs.querySelectorAll('.head').forEach(function (head) {
        var className = 'head';

        if (index == head.getAttribute('data-index')) {
            className = 'head act';
        }
        if (index == accordiontabs.getAttribute('data-index')) {
            className = 'head';

        }
        head.className = className;

    });

    accordiontabs.querySelectorAll('.content').forEach(function (content) {
        var contentHeight = 0;

        if (index == content.getAttribute('data-index')) {
            contentHeight = parseInt(getComputedStyle(content.firstElementChild)['height']);
        }
        if (index == accordiontabs.getAttribute('data-index')) {
            contentHeight = 0;
        }
        content.style.maxHeight = contentHeight + 'px';
    });


    if (index == accordiontabs.getAttribute('data-index')) {
        actIndex = -1;
    }

    accordiontabs.setAttribute('data-index', actIndex);

}

function bindAccordiontabsEvents() {

    document.querySelectorAll('.accordiontabs').forEach(function (accordiontabs) {

        window.addEventListener('resizewidth', function () {
            checkTabs(accordiontabs);
        });

        checkTabs(accordiontabs);

        accordiontabs.querySelectorAll('.head').forEach(function (head) {
            head.addEventListener('click', function () {
                var index = head.getAttribute('data-index');
                openContent(accordiontabs, index);
            });
        });

    });

    document.querySelectorAll('.accordiontabs[data-openfirst]').forEach(function (accordiontabs) {
        setTimeout(function () {
            accordiontabs.querySelector('.head').click();
        }, 800);

    });

}

bindAccordiontabsEvents();
