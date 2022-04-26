
var swipeObject = {
    swiper: undefined,

    init: function () {},

    build: function () {
        this.swiper = new Swiper(".swiper", {
            speed: 1000,
            slidesPerView: 2,
            spaceBetween: 40,
            centeredSlides: true,
            loop: true,
            loopFillGroupWithBlank: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 40,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 60,
                },
                1600: {
                    slidesPerView: 5,
                    spaceBetween: 60,
                },
            },
        });
    },

    destroy: function () {
        swipeObject.swiper.destroy();
    },
};

function onLoadCompleted() {
    swipeObject.build();
}

function pjax_destroyInstance() {
    swipeObject.destroy();
    swipeObject = null;

    onLoadCompleted = null;
    pjax_destroyInstance = null;
}

document.addEventListener("DOMContentLoaded", function () {
    swipeObject.build();
});
