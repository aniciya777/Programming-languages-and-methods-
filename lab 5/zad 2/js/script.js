const COUNT_IMAGES = 7;
const IMAGE_WIDTH = 480;

let images = Array();
let current_image = 0;
for (let i = 0; i < COUNT_IMAGES; ++i) {
    images.push(`images/${i + 1}.jpg`);
}

let target_elem = $('.images_container').first();

window.onload = function () {
    images.forEach(function (item, i) {
        let new_image_elem = document.createElement('img');
        $(new_image_elem).attr('src', item);
        $(new_image_elem).attr('alt', `Изображение ${i + 1}`);
        target_elem.append(new_image_elem);
    });

    $('.images_container img').bind('wheel', function(e) {
        let elem = $(this);
        if (elem.hasClass('orig_size')) {
            elem.removeClass('orig_size');
        } else {
            elem.addClass('orig_size');
        }
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    })
};
