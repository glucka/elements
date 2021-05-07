/* Form Teaser */
document.querySelectorAll('form.ft-source').forEach(function (form) {
    form.addEventListener('submit', function () {
        form.querySelectorAll('[data-ft-name]').forEach(function (input) {
            Cookies.set('ft_' + input.getAttribute('data-ft-name'), input.value, {path: '/'});
        });
    });
});

document.querySelectorAll('form.ft-target [data-ft-name]').forEach(function (input) {
    var inputName = input.getAttribute('data-ft-name');
    if (Cookies.get('ft_' + inputName)) {
        input.value = Cookies.get('ft_' + inputName);
        Cookies.remove('ft_' + inputName);
    }
});