var pageScrollAnimation = {
    body: document.body,
    page: undefined,
    btn: undefined,
    winH: undefined,

    touchStartValue: 0,
    touchMoveValue: 0,
    len: 0,
    count: 0,
    ua: undefined,

    event_listeners: {},
    event_list: [
        "resize",
        "transitionend",
        "wheel",
        "touchstart",
        "touchmove",
        "touchend",
    ],

    init: function () {
        let _ = this;

        _.ua = _.checkUA();
        _.page = document.querySelectorAll(".home-contents");
        _.btn = document.querySelectorAll(".home-pagination__anc");
        _.len = _.page.length;
        _.getresizeData(_);
        document.body.classList.add("first-page");

        for (let i = 0; i < _.event_list.length; i++) {
            _.event_listeners[_.event_list[i]] = function (e) {
                pageScrollAnimation[_.event_list[i]](e, _);
            };

            window.addEventListener(
                _.event_list[i],
                _.event_listeners[_.event_list[i]]
            );
        }

        _.build(_);

        // 点击跳转
        for (let i = 0; i < _.btn.length; i++) {

            _.btn[i].addEventListener('click', e => {
                e.preventDefault();
                console.log(i, _.count);
                if (i > _.count) {
                    let j = i - _.count;
                    while (j--) {
                        _.toAnimation(_, 1);
                    }
                } else {
                    if (i < _.count) {
                        let j = _.count - i;
                        while (j--) {
                            _.toAnimation(_, -1);
                        }
                    }
                }

                // i > _.count ? _.toAnimation(_, 1) : _.slideAnimation(_, -1);
                // i > _.count ? _.toAnimation(_, 1) : _.slideAnimation(_, -1);
            })
        }

        _.jp = document.getElementsByClassName('jp');
        _.jp[0].addEventListener('click', e => {
            e.preventDefault();
            console.log(0, _.count);
            if (0 < _.count) {
                let j = _.count - 0;
                while (j--) {
                    _.toAnimation(_, -1);
                }
            }
        })
    },

    build: function (_) {
        let H = _.winH;

        for (let i = 0, index = _.len; i < _.len; i++) {
            _.page[i].style.zIndex = index;

            if (i < _.count) {
                _.page[i].style.transform = `translate3d(0, ${-H}px, 0)`;
            } else if (i === _.count) {
                _.page[i].style.transform = `translate3d(0, 0, 0)`;
                _.btn[i].classList.add("active");
            } else if (i > _.count) {
                if (i === 1) {
                    _.page[i].style.transform = `translate3d(0, 0, 0)`;
                } else {
                    _.page[i].style.transform = `translate3d(0, ${H / 2}px, 0)`;
                    _.page[i].classList.add("down");
                }
            }

            index--;
        }
    },

    slideAnimation: function (_, Y) {
        let prevnum = _.count,
            H;

        if (document.body.classList.contains("is-moving")) return false;

        if (Y > 0) {
            if (_.count < _.len - 1) {
                _.count++;
                H = -_.winH;
            }
        } else if (Y < 0) {
            if (_.count > 0) {
                _.count--;
                H = _.count === 0 ? 0 : _.winH / 2;
            }
        }

        if (_.count != prevnum) {
            _.page[prevnum].style.transform = `translate3d(0, ${H}px, 0)`;
            _.page[prevnum].classList.remove("active");
            _.btn[prevnum].classList.remove("active");
            document.body.classList.add("is-moving");
            if (_.count != 0) _.page[prevnum].classList.add("down");
        }

        if (_.count === 0) document.body.classList.add("first-page");
        else document.body.classList.remove("first-page");

        _.page[_.count].style.transform = "translate3d(0, 0, 0)";
        _.page[_.count].classList.remove("down");
        _.page[_.count].classList.add("active");
        _.btn[_.count].classList.add("active");
    },

    toAnimation: function (_, Y) {
        let prevnum = _.count,
            H;

        // if (document.body.classList.contains("is-moving")) return false;

        if (Y > 0) {
            if (_.count < _.len - 1) {
                _.count++;
                H = -_.winH;
            }
        } else if (Y < 0) {
            if (_.count > 0) {
                _.count--;
                H = _.count === 0 ? 0 : _.winH / 2;
            }
        }

        if (_.count != prevnum) {
            _.page[prevnum].style.transform = `translate3d(0, ${H}px, 0)`;
            _.page[prevnum].classList.remove("active");
            _.btn[prevnum].classList.remove("active");
            document.body.classList.add("is-moving");
            if (_.count != 0) _.page[prevnum].classList.add("down");
        }

        if (_.count === 0) document.body.classList.add("first-page");
        else document.body.classList.remove("first-page");

        _.page[_.count].style.transform = "translate3d(0, 0, 0)";
        _.page[_.count].classList.remove("down");
        _.page[_.count].classList.add("active");
        _.btn[_.count].classList.add("active");
    },

    getresizeData: function (_) {
        _.winH = _.page[0].offsetHeight;
    },

    resize: function (e, _) {
        _.getresizeData(_);
        _.build(_);
    },

    wheel: function (e, _) {
        _.slideAnimation(_, e.deltaY);
    },

    touchstart: function (e, _) {
        _.touchStartValue = e.touches[0].pageY;
        _.touchMoveValue = e.touches[0].pageY;
    },

    touchmove: function (e, _) {
        _.touchMoveValue = e.touches[0].pageY;
    },

    touchend: function (e, _) {
        let touchDistance = _.touchStartValue - _.touchMoveValue;
        _.slideAnimation(_, touchDistance);
    },

    pagination: function (e, _) {
        return function (e) {
            e.preventDefault();
        };
    },

    transitionend: function (e, _) {
        if (
            e.target.classList.contains("pageScrollItem") &&
            e.propertyName === "transform"
        ) {
            document.body.classList.remove("is-moving");
        }
    },

    checkUA: function () {
        let userAgent = window.navigator.userAgent.toLowerCase();
        let name =
            userAgent.indexOf("android") != -1 ||
            userAgent.indexOf("mobile") != -1 ||
            userAgent.indexOf("ipad") != -1 ||
            userAgent.indexOf("ipod") != -1 ||
            userAgent.indexOf("iphone") != -1 ?
            "SP" :
            "PC";
        return name;
    },

    destroy: function () {
        let _ = pageScrollAnimation;

        for (let i = 0; i < _.event_list.length; i++) {
            window.removeEventListener(
                _.event_list[i],
                _.event_listeners[_.event_list[i]]
            );
        }
    },
};

function onLoadCompleted() {
    pageScrollAnimation.init();
}

document.addEventListener("DOMContentLoaded", function () {
    onLoadCompleted();
}, {
    passive: false
});