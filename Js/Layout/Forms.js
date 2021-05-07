/* set referer bei powermail forms */
function setReferer() {
    if (document.querySelector('#powermail_field_ref')) {
        document.querySelector('#powermail_field_ref').value = Cookies.get('t_ref');
    }
    if (document.querySelector('#powermail_field_ref01')) {
        document.querySelector('#powermail_field_ref01').value = Cookies.get('t_ref');
    }
    if (document.querySelector('#powermail_field_ref02')) {
        document.querySelector('#powermail_field_ref02').value = Cookies.get('t_ref');
    }
}

/* check inline labels */
function checkFilled() {
    document.querySelectorAll('input, select, textarea').forEach(function (inputEl) {
        inputEl.value != '' ? inputEl.classList.add('filled') : inputEl.classList.remove('filled');
        inputEl.addEventListener('change', function () {
            inputEl.value != '' ? inputEl.classList.add('filled') : inputEl.classList.remove('filled');
        });
    });
    document.querySelectorAll('input[type=file]').forEach(function (uploadEl) {
        uploadEl.addEventListener('change', function () {
            uploadEl.parentElement.setAttribute('data-label', uploadEl.files[0].name);
            uploadEl.files[0].name != '' ? uploadEl.classList.add('filled') : uploadEl.classList.remove('filled');
        });
    });
}

/* set pristine validate */
function setValidate(formId, submitFunction) {

    var formElement = document.getElementById(formId);

    if (formElement) {

        if (typeof window['pristine' + formId] == "object" && window['pristine' + formId].constructor.name == 'Pristine') {
            window['pristine' + formId].destroy();
            window['pristine' + formId] = null;
        }

        window['pristine' + formId] = new Pristine(formElement, {
            classTo: 'field',
            errorTextParent: 'field',
        }, true);

        formElement.addEventListener('submit', function (e) {
            e.preventDefault();
            if (window['pristine' + this.getAttribute('id')].validate()) {
                document.body.classList.add('wait');
                if (submitFunction) {
                    submitFunction();
                } else {
                    document.getElementById(formId).submit();
                }
            } else {
                var firstFieldWithError = formElement.querySelectorAll('.has-danger')[0];
                if (firstFieldWithError && !isVisibleInViewport(firstFieldWithError)) {
                    firstFieldWithError.scrollIntoView();
                    window.scroll(0, firstFieldWithError.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight - 60);
                }
                return false
            }
        });
    }

    markRequired();

}

/* set * for required labels */
function markRequired() {

    document.querySelectorAll('[data-showifrequired]').forEach(function (inputWrapper) {
        if (inputWrapper.querySelector('[required]')) {
            /* not correct yet, use if only one element exist in selectbox and should not showing*/
            /*if (inputWrapper.getAttribute('data-hideifonlyone') != 1) {*/
                inputWrapper.style.display = inputWrapper.getAttribute('data-showifrequired');
            /*}*/
        } else {
            inputWrapper.style.display = 'none';
        }
    });

    document.querySelectorAll('input, select, textarea').forEach(function (input) {

        var label;

        if (input.getAttribute('type') == 'checkbox') {
            label = input.parentElement.querySelector('p');
        } else {
            if (input.nextElementSibling) {
                if (input.nextElementSibling.children.length > 0) {
                    label = input.nextElementSibling.firstChild;
                } else {
                    label = input.nextElementSibling;
                }
            }
        }

        if (label && (label.tagName.toLowerCase() == 'label' || label.tagName.toLowerCase() == 'p')) {

            label.innerHTML = label.innerHTML.replace(' *', '');
            label.innerHTML = label.innerHTML.trim();
            label.innerHTML = label.innerHTML.replace('&nbsp;*', '');
            if (input.hasAttribute('required')) {
                label.innerHTML += '&nbsp;*';
            }
        }

    });
}

checkFilled();
