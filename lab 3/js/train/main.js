import {Station} from "./station.js";
import {Direction} from "./direction.js";
import {Flight} from "./flight.js";
import {Time} from "./time.js";
import {User} from "./user.js";


const ru_format = new Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 2});
const toast = new bootstrap.Toast($('#liveToast'));


function reloadStations() {
    let list1 = $('#fromStationListOptions');
    let list2 = $('#toStationListOptions');
    let list3 = $('#stationList');
    let list4 = $('#new-from-station');
    let list5 = $('#new-to-station');
    list1.html('');
    list2.html('');
    list3.html('');
    list4.html('');
    list5.html('');
    cities.forEach(function (item, i) {
        list1.append($(document.createElement('option')).val(item.toString()));
        list2.append($(document.createElement('option')).val(item.toString()));
        let cityLabel = $(document.createElement('label')).addClass('list-group-item');
        cityLabel
            .text(item.toString())
            .prepend(
                $(document.createElement('input'))
                    .addClass('form-check-input me-1 check-city')
                    .attr({'type': 'checkbox'})
                    .val(i)
            );
        list3.append(cityLabel);
        list4.append($(document.createElement('option')).text(item.toString()).val(item.toString()));
        list5.append($(document.createElement('option')).text(item.toString()).val(item.toString()));
    })
}

function showBoard() {
    function createDateCell(station, date, time) {
        return $(document.createElement('td'))
            .append(
                $(document.createElement('div'))
                    .addClass('train_datetime')
                    .append(
                        $(document.createElement('div'))
                            .addClass('train_date')
                            .text(
                                date.getDate() + ' ' + date.toLocaleString('ru-RU', {month: 'short'})
                                    .replace('.', '')
                            )
                    )
                    .append(
                        $(document.createElement('div'))
                            .addClass('train_time')
                            .text(time.toString())
                    )
            )
            .append(
                $(document.createElement('span'))
                    .addClass('train_station')
                    .text(station)
            )
    }

    let data = flights;
    let date = $('#dateInput').datepicker('getDate');
    if (date === null) {
        date = new Date();
    }
    let dayOfWeek = (date.getDay() + 6) % 7;
    data = data.filter(flight => flight.daysOnWeek[dayOfWeek]);
    let fromStation = $('#fromStationList').val();
    let toStation = $('#toStationList').val();
    if (fromStation) {
        data = data.filter(flight => flight.direction.station1.toString() === fromStation);
    }
    if (toStation) {
        data = data.filter(flight => flight.direction.station2.toString() === toStation);
    }

    let board = $('#board-tbody')
        .html('');
    if (data.length === 0) {
        board.append(
            $(document.createElement('tr'))
                .append(
                    $(document.createElement('td'))
                        .text('Рейсов по указанным параметрам не найдено (')
                        .attr(
                            {
                                'colspan': 5
                            }
                        )
                        .css('text-align', 'center')
                )
        )
    } else {
        data.forEach(function (item, i) {
            let new_row = $(document.createElement('tr'));
            new_row
                .append(
                    $(document.createElement('th'))
                        .text(i + 1)
                        .attr({'scope': 'row'})
                )
                .append(
                    createDateCell(
                        item.direction.station1.toString(),
                        item.getTimeStart().toDate(date),
                        item.getTimeStart()
                    )
                )
                .append(
                    createDateCell(
                        item.direction.station2.toString(),
                        item.getTimeEnd().toDate(date),
                        item.getTimeEnd()
                    )
                )
                .append(
                    $(document.createElement('td'))
                        .append(
                            $(document.createElement('div'))
                                .text(item.getDurationString())
                                .addClass('train_duration')
                        )
                        .append(
                            $(document.createElement('div'))
                                .text(item.getNumber())
                                .addClass('train_number')
                        )
                )
                .append(
                    $(document.createElement('td'))
                        .append(
                            $(document.createElement('div'))
                                .text(ru_format.format(item.price))
                                .addClass('train_price')
                        )
                        .append(
                            $(document.createElement('button'))
                                .text('Купить билет')
                                .addClass('train_buy')
                                .click(function () {
                                    window.open('https://www.rzd.ru/', '_blank');
                                })
                        )
                )
            board.append(new_row);
        });
    }
}

function showToast(caption, addCaption, text) {
    toast.show();
    $('#liveToast strong').html('&nbsp;' + caption);
    $('#liveToast small').text(addCaption);
    $('#liveToast div.toast-body').text(text);
}

$('#btn-select-all-stations').click(function () {
    $('.check-city').prop('checked', true);
});

$('#btn-deselect-all-stations').click(function () {
    $('.check-city').prop('checked', false);
});

$('#btn-remove-stations').click(function () {
    let arr = $('.check-city:checked');
    if (arr.length === 0) {
        showToast('Уводомление', '', 'Выберите станции');
    } else {
        toast.hide();
        if(confirm('Вы действительно хотите удалить отмеченные города/станции?')) {
            let vals = $.map(arr.parent(), val => $(val).text());
            cities = cities.filter(station => vals.indexOf(station.toString()) === -1);
            reloadStations();
        }
    }
});

$('#btn-add-new-station').click(function () {
    let inp = $('input[name="new-station"]');
    let text = inp.val().trim();
    if (text === '') {
        showToast('Уведомление', '', 'Введите название города/станции');
    } else {
        if (cities.some((station) => station.toString() === text)) {
            showToast('Ошибка', '', 'Данный город/станция уже существует');
        } else {
            cities.push(new Station(text));
            reloadStations();
            showToast('', '', `"${text}" успешно добавлено`);
        }
        inp.val('');
    }
});

$('#find-input-group input').change(showBoard);

$('input[name="new-price"]').mask('# ##0.00', {
    reverse: true,
});

$('#form-new-flight').on("submit", function (event) {
    event.preventDefault();
    let station1_text = $('#new-from-station').val();
    let station1 = cities.find(station => station.toString() === station1_text);
    let station2_text = $('#new-to-station').val();
    let station2 = cities.find(station => station.toString() === station2_text);
    if (station1 === station2) {
        showToast('Ошибка', '', 'Нельзя создать рейс между одной и той же станцией/городом!');
    } else {
        let week = $.map($('#new-week-group input'), val => val.checked);
        if (!week.some(val => val)) {
            showToast('Уведомление', '', 'Выберите хотя бы один день недели в расписании');
        } else {
            let price = Number($('#new-price').val().replace(' ', ''));
            let [hours, minutes] = $('#start-time').val().split(':').map(val => Number(val));
            flights.push(
                new Flight(
                    new Direction(station1, station2),
                    new Time(hours, minutes),
                    week,
                    price)
                    .setDuration(
                        Number($('#new-duration-minutes').val()),
                        Number($('#new-duration-hourses').val()),
                        Number($('#new-duration-days').val())
                    )
            );
            $('#form-new-flight').trigger("reset");
            $('.duration-control').parent().find('strong').text('0');
            showToast('', '', 'Рейс успешно добавлен');
            showBoard();
        }
    }
})

$('.duration-control').on('input', function() {
    $(this).parent().find('strong').text($(this).val());
})

let cities = [
    new Station('Волгоград'),
    new Station('Волжский'),
    new Station('Дубовка'),
    new Station('Жирновск'),
    new Station('Калач-на-Дону'),
    new Station('Камышин'),
    new Station('Котельниково'),
    new Station('Котово'),
    new Station('Краснослободск'),
    new Station('Ленинск'),
    new Station('Михайловка'),
    new Station('Новоаннинский'),
    new Station('Палласовка'),
    new Station('Петров Вал'),
    new Station('Серафимович'),
    new Station('Суровикино'),
    new Station('Урюпинск'),
    new Station('Фролово'),
    new Station('Уфа'),
    new Station('Стерлитамак'),
    new Station('Ишимбай'),
    new Station('Салават')
];
let directions = [
    new Direction(cities[18], cities[0]), // Уфа -> Волгоград
    new Direction(cities[0], cities[1]), // Волгоград -> Волжский
    new Direction(cities[7], cities[19]), // Котово -> Стерлитамак
]
let flights = [
    new Flight(directions[0], new Time(12, 20), [1, 0, 0, 0, 1, 0, 0], 2788)
        .setDuration(20, 1, 1),
    new Flight(directions[0], new Time(6, 5), [0, 1, 0, 0, 0, 0, 0], 2788)
        .setDuration(45, 0, 1),
    new Flight(directions[1], new Time(12, 0), [1, 1, 1, 1, 1, 1, 1], 84.99)
        .setDuration(40, 0, 0),
    new Flight(directions[2], new Time(18, 0), [0, 0, 0, 0, 1, 1, 0], 2456)
        .setDuration(20, 3, 1),
]
const user = new User('Анастасия', 'Остапчук', '88005553535');


reloadStations();
showBoard();
