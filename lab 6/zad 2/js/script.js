const ru_format = new Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 2});
const name_elem = $("#name"), consist_elem = $("#consist"), price_elem = $("#price"),
    allFields = $([]).add(name_elem).add(consist_elem).add(price_elem);
var form, dialog;

window.onload = function () {
    dialog = $("#dialog-form").dialog({
        autoOpen: true,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Добавление нового товара": addItem
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addItem();
    });

    $("#create-roll").button().on("click", function () {
        dialog.dialog("open");
    });

    $('input[name="price"]').mask('# ##0.00', {
        reverse: true,
    });

    reloadMenu();
}

function reloadMenu() {
    let table = $('#rolls-contain tbody').first();
    table.html('');
    menu['rolls'].forEach(function (item, i) {
        let new_row = document.createElement('tr');

        let cell_id = document.createElement('td');
        $(cell_id).text(i + 1);
        new_row.append(cell_id);

        let cell_name = document.createElement('td');
        $(cell_name).text(item.name);
        new_row.append(cell_name);

        let cell_consits = document.createElement('td');
        $(cell_consits).text(item.consists);
        new_row.append(cell_consits);

        let cell_price = document.createElement('td');
        let price = ru_format.format(item.price);
        $(cell_price).text(price);
        new_row.append(cell_price);

        table.append(new_row);
    });
}

function addItem() {
    allFields.removeClass("ui-state-error");
    menu['rolls'].push({
        "name": $('#name').val(),
        "consists": $('#consists').val(),
        "price": $('#price').val()
    })
    reloadMenu();
    dialog.dialog("close");
}

