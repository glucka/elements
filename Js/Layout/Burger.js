document.querySelectorAll('.burger').forEach(function(burger) {
    burger.addEventListener('click', function () {
        if (document.body.classList.contains('visible-menu')) {
            document.body.classList.remove('visible-menu');
            setTimeout(function () {
                document.body.classList.remove('visible-menu-ended');
            }, 1000);
        } else {
            document.body.classList.add('visible-menu');
            setTimeout(function () {
                document.body.classList.add('visible-menu-ended');
            }, 1000);
        }
    });
});
