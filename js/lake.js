var imageCarousel = {
    elems: undefined,
    timer: undefined,
    pos: [],
    margin: 30,
    endofline: 0,

    event_anime: undefined,
    event_resize: undefined,

    init: function() {
        let _ = this;

        _.elems = document.querySelectorAll(".lake_img_item");

        _.event_anime = function(e) {
            imageCarousel.animation(_);
        };

        _.event_resize = function(e) {
            imageCarousel.resize(_);
        };

        window.addEventListener("resize", _.event_resize);

        _.loading(_);
    },

    build: function(_) {
        let prevPos = 0,
            W = 0;

        for (let i = 0; i < _.elems.length; i++) {
            W = i != 0 ? _.elems[i - 1].offsetWidth + _.margin : 0;
            _.pos[i] = prevPos + W;
            _.elems[i].style.transform = `translate3d(${_.pos[i]}px,0,0)`;
            prevPos = _.pos[i];
            if (i < _.elems.length - 1)
                _.endofline += _.elems[i].offsetWidth + _.margin;
        }
    },

    animation: function(_) {
        for (let i = 0, W; i < _.elems.length; i++) {
            W = _.elems[i].offsetWidth;

            _.pos[i] = _.pos[i] - 1;
            if (_.pos[i] < -W) _.pos[i] = _.endofline + _.margin;
            _.elems[i].style.transform = `translate3d(${_.pos[i]}px,0,0)`;
        }
        _.timer = requestAnimationFrame(_.event_anime);
    },

    loading: function(_) {
        const Loader = function(expectedCnt, callback) {
            let cnt = 0;
            return function() {
                if (++cnt >= expectedCnt) callback();
            };
        };

        const callback = Loader(_.elems.length, function() {
            _.build(_);
            _.event_anime();
        });

        for (let i = 0; i < _.elems.length; i++) {
            var img = document.createElement("img");
            var image = _.elems[i].querySelector("img");
            img.onload = callback;
            img.src = image.src;
        }
    },

    resize: function(_) {
        cancelAnimationFrame(_.timer);
        _.build(_);
        _.timer = requestAnimationFrame(_.event_anime);
    },

    destroy: function() {
        let _ = imageCarousel;

        cancelAnimationFrame(_.timer);
        window.removeEventListener("resize", _.event_resize);
    },
};

function onLoadCompleted() {
    imageCarousel.init();
}

function pjax_destroyInstance() {
    imageCarousel.destroy();
    imageCarousel = null;

    onLoadCompleted = null;
    pjax_destroyInstance = null;
}

document.addEventListener("DOMContentLoaded", function() { imageCarousel.init() });