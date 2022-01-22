const ru_format = new Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits:2});
const DELIVERY_COEFF = 15;

var count = 0;
var total_price = 0;
var delivery_price = 0;

$(function () {
    $("#accordion").accordion();
});

window.onload = function () {
    let table = $('#consist tbody').first();
    table.innerHTML = '';
    menu['rolls'].forEach(function (item, i) {
        item['count'] = 0;
        let new_row = document.createElement('tr');
        let cell_name = document.createElement('td');
        $(cell_name).text(item.name);
        new_row.append(cell_name);
        let cell_price = document.createElement('td');
        let price = ru_format.format(item.price);
        $(cell_price).text(price);
        new_row.append(cell_price);
        let cell_count = document.createElement('td');
        let cell_count_input = document.createElement('input');
        $(cell_count_input)
            .attr({
                'type': 'number',
                'value': 0,
                'min': 0,
                'data-roll-id': i,
                'required': 'required'
            })
            .addClass('count_input');
        cell_count.append(cell_count_input);
        new_row.append(cell_count);
        table.append(new_row);
    });

    $('input.count_input').change(changeCount);
}

$('form').submit(function(e) {
    let data = new Date();
    let new_row = document.createElement('tr');
    let cur_data_cell = document.createElement('td');
    $(cur_data_cell).html(data.toLocaleString().replace(', ', '<br>'));
    new_row.append(cur_data_cell);

    let order_data_cell = document.createElement('td');
    data.setHours(data.getHours() + Number($('#time').val()));
    $(order_data_cell).html(data.toLocaleString().replace(', ', '<br>'));
    new_row.append(order_data_cell);

    let consists = '';
    menu['rolls'].forEach(function (item) {
        if (item.count > 0) {
            if (consists !== '') {
                consists += '<br>';
            }
            consists += `${item.name} - ${item.count} шт.`;
        }
    });
    let consists_cell = document.createElement('td');
    $(consists_cell).html(consists);
    new_row.append(consists_cell);

    let address_cell = document.createElement('td');
    $(address_cell).text($('#address').val());
    new_row.append(address_cell);

    let count_stick_cell = document.createElement('td');
    $(count_stick_cell).text($('#count_stick').val());
    new_row.append(count_stick_cell);

    let phone_cell = document.createElement('td');
    $(phone_cell).text($('#phone').val());
    new_row.append(phone_cell);

    let email_cell = document.createElement('td');
    $(email_cell).text($('#email').val());
    new_row.append(email_cell);

    let price_cell = document.createElement('td');
    $(price_cell).text(ru_format.format(total_price));
    new_row.append(price_cell);

    let delivery_price_cell = document.createElement('td');
    $(delivery_price_cell).text(ru_format.format(delivery_price))
    new_row.append(delivery_price_cell);

    let all_price_cell = document.createElement('td');
    $(all_price_cell).text(ru_format.format(total_price + delivery_price));
    new_row.append(all_price_cell);

    $('#orders_tbody').prepend(new_row);
    $('html, body').animate({
        scrollTop: $("#orders_table").offset().top
    }, 200);
    e.preventDefault();
});

$("form").validate({
    invalidHandler: function(event, validator, element) {
        $('form1').find('.error.error-message').parents().show();
        console.log('s')
    }
});

function changeCount() {
    let id = $(this).attr('data-roll-id');
    let count = Number($(this).val());
    menu.rolls[id].count = count;
    updateOrder();
}

function updateOrder() {
    count = 0;
    total_price = 0;
    menu['rolls'].forEach(function (item) {
        count += item.count;
        total_price += item.count * item.price;
    });
    delivery_price = count * DELIVERY_COEFF;
    $('#price_delivery').text(ru_format.format(delivery_price));
    $('#total_price strong').text(ru_format.format(total_price));
}
