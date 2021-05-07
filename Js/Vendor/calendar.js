/**
 * calendar
 * @version 1.1.0
 * @author Attila Glück
 * @license The MIT License (MIT)
 * @todo set locale function
 */

function calendar(selector, options) {
    selector.forEach(function (el) {
        new calendarSetup(el, options);
    });
}

function calendarSetup(calendarEl, options) {

    if (!calendarEl || calendarEl.length == 0) {
        return false;
    }

    var settings = extend({
        showMonths: 1,
        mNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        startWithMonday: false,
    }, options);

    var today = dayjs();
    var actMonth = dayjs().set('date', 1);
    var calendar = this;
    var monthsEl = calendarEl.querySelector('div.months');
    var days, actMonthFirstDay, rangeStart, rangeEnd;

    this.init = function () {

        calendarEl.querySelector('img.next').addEventListener('click', function () {
            calendar.next();
        });
        calendarEl.querySelector('img.prev').addEventListener('click', function () {
            calendar.prev();
        });

        calendar.draw();

    };

    this.prev = function () {
        actMonth = actMonth.subtract(1, 'month');
        calendar.draw();
    };

    this.next = function () {
        actMonth = actMonth.add(1, 'month');
        calendar.draw();
    };

    this.draw = function () {

        while (monthsEl.firstChild) monthsEl.removeChild(monthsEl.firstChild);

        if(window.innerWidth >= 768){
            for (var i = 0; i < settings.showMonths; i++) {
                calendar.drawMonths(i);
            }
        } else{
            calendar.drawMonths(0);
        }

        days = calendarEl.querySelectorAll('[data-date]');
    };

    this.drawMonths = function (nrOfMonths) {

        var month = actMonth.add(nrOfMonths, 'month');
        actMonthFirstDay = month.day();

        var monthEl = document.createElement('div');
        monthEl.setAttribute('class', 'month');
        var titleEl = document.createElement('div');
        titleEl.setAttribute('class', 'title');
        titleEl.innerHTML = settings.mNames[month.month()] + ' ' + month.year();
        var headEl = document.createElement('div');
        headEl.setAttribute('class', 'head');
        var bodyEl = document.createElement('div');
        bodyEl.setAttribute('class', 'body');

        if (settings.startWithMonday) {
            for (var i = 1; i <= 7; i++) {
                var index = i == 7 ? 0 : i;
                var dayNameEl = document.createElement('div');
                dayNameEl.innerHTML = settings.dNames[index];
                headEl.appendChild(dayNameEl);
            }
            var blanks = actMonthFirstDay == 0 ? 7 : actMonthFirstDay;
            for (var i = 1; i < blanks; i++) {
                var phEl = document.createElement('div');
                var phInnerEl = document.createElement('div');
                phEl.appendChild(phInnerEl);
                bodyEl.appendChild(phEl);
            }
        } else {
            for (var i = 0; i < 7; i++) {
                var dayNameEl = document.createElement('div');
                dayNameEl.innerHTML = settings.dNames[index];
                headEl.appendChild(dayNameEl);
            }
            for (var i = 0; i < actMonthFirstDay; i++) {
                var phEl = document.createElement('div');
                var phInnerEl = document.createElement('div');
                phEl.appendChild(phInnerEl);
                bodyEl.appendChild(phEl);
            }
        }

        for (var i = 1; i <= month.daysInMonth(); i++) {

            var calDay = dayjs(month).set('date', i);
            var dayEl = document.createElement('div');
            dayEl.setAttribute('data-date', calDay.format('YYYYMMDD'));
            var dayInnerEl = document.createElement('div');
            var dayInnerSpanEl = document.createElement('span');
            dayInnerSpanEl.innerHTML = i;
            dayInnerEl.appendChild(dayInnerSpanEl);
            dayEl.appendChild(dayInnerEl);

            if (calDay.isBefore(today)) {
                dayEl.classList.add('p');
            } else {
                dayEl.addEventListener('click', function () {

                    var clickDate = dayjs(this.getAttribute('data-date'));

                    if (calendar.rangeStart && calendar.rangeEnd) {
                        calendar.rangeStart = undefined;
                        calendar.rangeEnd = undefined
                        days.forEach(function (day) {
                            day.classList.remove('hover');
                        });

                    }

                    if (typeof calendar.rangeStart == 'undefined') {
                        calendar.rangeStart = clickDate;
                    }

                    if (calendar.rangeStart && clickDate.isBefore(calendar.rangeStart)) {
                        calendar.rangeEnd = calendar.rangeStart;
                        calendar.rangeStart = clickDate;
                    }
                    if (calendar.rangeStart && clickDate.isAfter(calendar.rangeStart)) {
                        calendar.rangeEnd = clickDate;
                    }

                    document.querySelector('#checkin').classList.add('filled');
                    document.querySelector('#checkin').value = calendar.rangeStart.format('DD-MM-YYYY');
                    document.querySelector('.calendar').classList.remove('error');

                    if (calendar.rangeEnd) {
                        document.querySelector('#checkout').classList.add('filled');
                        document.querySelector('#checkout').value = calendar.rangeEnd.format('DD-MM-YYYY');
                    }


                    days.forEach(function (day) {
                        day.classList.remove('rangeStart', 'rangeEnd');
                    });

                    calendarEl.querySelector("[data-date='" + calendar.rangeStart.format('YYYYMMDD') + "']").classList.add('rangeStart');
                    if (typeof calendar.rangeEnd != 'undefined') {
                        calendarEl.querySelector("[data-date='" + calendar.rangeEnd.format('YYYYMMDD') + "']").classList.add('rangeEnd');
                        calendarEl.classList.remove('rangePositiv', 'rangeNegativ');
                    }


                });

                dayEl.addEventListener('mouseenter', function () {

                    var mouseenterDate = dayjs(this.getAttribute('data-date'));

                    if (calendar.rangeStart) {

                        if (typeof calendar.rangeEnd == 'undefined') {

                            days.forEach(function (day) {

                                var i = dayjs(day.getAttribute('data-date'));
                                if ((i.isAfter(calendar.rangeStart) && i.isBefore(mouseenterDate) || i.isBefore(calendar.rangeStart) && i.isAfter(mouseenterDate))) {
                                    day.classList.add('range');
                                } else {
                                    day.classList.remove('range');
                                }
                            });

                            calendarEl.classList.remove('rangePositiv', 'rangeNegativ');
                            if (mouseenterDate.diff(calendar.rangeStart, 'day') > 0) {
                                calendarEl.classList.add('rangePositiv');
                            } else {
                                calendarEl.classList.add('rangeNegativ');
                            }

                        }
                    }
                });

            }

            if (calendar.rangeStart && calDay.isSame(calendar.rangeStart, 'day')) {
                dayEl.classList.add('rangeStart');
            }
            if (calDay.isAfter(calendar.rangeStart) && calDay.isBefore(calendar.rangeEnd)) {
                dayEl.classList.add('range');
            }
            if (calendar.rangeEnd && calDay.isSame(calendar.rangeEnd, 'day')) {
                dayEl.classList.add('rangeEnd');
            }

            bodyEl.appendChild(dayEl);
        }

        monthEl.appendChild(titleEl)
        monthEl.appendChild(headEl)
        monthEl.appendChild(bodyEl);
        monthsEl.appendChild(monthEl);

    };

    calendar.init();
    return this;

}