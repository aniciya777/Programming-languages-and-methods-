const COUNT_IMAGES = 7;
const IMAGE_WIDTH = 480;

let images = Array();
let current_image = 0;
for (let i = 0; i < COUNT_IMAGES; ++i) {
    images.push(`images/${i + 1}.jpg`);
}

let target_slider = $('.slider').first();

window.onload = function () {
    images.forEach(function (item, i) {
        let new_image_elem = document.createElement('img');
        $(new_image_elem).attr('src', item);
        $(new_image_elem).attr('alt', `Изображение ${i + 1}`);
        target_slider.find('.slider_container').append(new_image_elem);
    });
};

target_slider.find('.slider_after').click(function () {
    if (current_image < COUNT_IMAGES - 1) {
        current_image++;
    }
    update_silder(target_slider);
});

target_slider.find('.slider_before').click(function () {
    if (current_image > 0) {
        current_image--;
    }
    update_silder(target_slider);
});

function update_silder(slider) {
    $(slider).find('.slider_container').animate(
        {'left': - current_image * IMAGE_WIDTH}, 500
    );
}