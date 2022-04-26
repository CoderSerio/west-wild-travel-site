//进度条动画
setTimeout("changeState()", 2000);
function changeState() {
    document.body.classList.replace('pageLoading', 'pageCompleted');
}
setTimeout("changeVisible()", 3000);
function changeVisible() {
     $("#state").addClass("animated fadeIn").css("visibility", "visible");
}


const navigationToggle = function() {
    const body = document.body,
        news = document.querySelector(".gnav-news-list");

    let scrlTop = document.body.scrollTop || document.documentElement.scrollTop,
        winW = window.innerWidth,
        winH = window.innerHeight,
        tg = null,
        flg = false,
        sPos = 0;

    const checkList = {
        gnav: function() {
            if (body.classList.contains("gnav_open")) {
                body.classList.remove("gnav_open");
                body.classList.add("gnav_close");
                flg = false;
            } else if (body.classList.contains("gnav_close")) {
                body.classList.remove("gnav_close");
                body.classList.add("gnav_open");
                flg = true;
            } else {
                body.classList.add("gnav_open");
                flg = true;
            }
        },

        close: function() {
            if (body.classList.contains("gnav_open")) {
                body.classList.remove("gnav_open");
            }
        },
    };

    function classNameCheck(obj, elem) {
        let data = elem.dataset.name,
            key = null;

        for (let index in obj) {
            if (data != undefined && data === index) key = index;
        }
        return key;
    }

    function toggleEvent(e) {
        let key = null;

        tg = e.target;

        while (tg.nodeName != "BODY") {
            if (tg.nodeName === "A" && !!tg.hash) {
                key = "close";
            } else if (!!tg.dataset) {
                key = classNameCheck(checkList, tg);
            } else {
                return false;
            }

            if (!!key) {
                e.preventDefault();
                checkList[key](tg);

                if (body.classList.contains("gnav_open")) {
                    scroll = window.pageYOffset;
                    body.style.position = "fixed";
                    body.style.marginTop = -scroll + "px";
                    window.removeEventListener("scroll", scrollEvent);
                } else {
                    body.style.position = "static";
                    body.style.marginTop = "0px";
                    window.scrollTo(0, scrlTop);
                    window.addEventListener("scroll", scrollEvent);
                }

                break;
            } else {
                if (tg.parentNode === "A") {
                    return false;
                } else {
                    e.preventDefault;
                    tg = tg.parentNode;
                }
            }
        }
    }

    let rect, distance;

    if (!!news) {
        rect = news.getBoundingClientRect();
        distance = Math.floor(rect.height + winW * 0.1 - winH);
    }

    function navNewsScroll() {
        news.style.transform = "translate3d(0," + sPos + "px,0)";
    }

    function scrollEvent() {
        scrlTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrlTop > 100) body.classList.add("scroll");
        else body.classList.remove("scroll");
    }

    function resize() {
        winW = window.innerWidth;
        winH = window.innerHeight;

        if (!!news) {
            rect = news.getBoundingClientRect();
            distance = Math.floor(rect.height + winW * 0.1 - winH);
            sPos = 0;
            navNewsScroll();
        }
    }

    function wheel(e) {
        e.preventDefault();

        if (!!flg) {
            if (sPos - e.deltaY > 0) {
                sPos = 0;
            } else if (sPos - e.deltaY <= -distance) {
                sPos = -distance;
            } else {
                sPos -= e.deltaY;
            }

            navNewsScroll();
        }
    }

    (function() {
        const nav = document.querySelector(".gnav");
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.dataset.name = "close";
        nav.appendChild(overlay);

        const menu = document.createElement("div");
        menu.className = "menu";
        menu.dataset.name = "gnav";
        for (let i = 0; i < 2; i++) {
            let div = document.createElement("div");
            menu.appendChild(div);
        }

        const reserve = document.querySelector(".header-wrap");
        reserve.parentNode.insertBefore(menu, reserve);
    })();

    document.addEventListener("click", toggleEvent);
    window.addEventListener("scroll", scrollEvent);
    window.addEventListener("resize", resize);

    if (!!news) window.addEventListener("wheel", wheel);
};

const pageScrollBehavior = function() {
    const margin = 80;
    const smooth =
        "scrollBehavior" in document.documentElement.style ? true : false;

    function anchorClickEvent(e) {
        let tg = e.target;

        while (tg.nodeName != "BODY") {
            if (tg.nodeName === "A") {
                let url = location.href.split("#")[0];
                let path = tg.href.split("#")[0];

                if (url === path && tg.getAttribute("href").includes("#")) {
                    e.preventDefault();
                    smoothScroll(tg);
                }

                break;
            } else {
                tg = tg.parentNode;
            }
        }
    }

    function smoothScroll(tg) {
        const speed = 300;
        const step = 20;
        let name = tg.hash;

        let destination = document.querySelector(name);
        let position =
            window.pageYOffset + destination.getBoundingClientRect().top - margin;

        if (smooth) {
            window.scrollTo({ top: position, behavior: "smooth" });
        } else {
            let scrollStep = position / (speed / step);
            let current = window.pageYOffset;

            let smoothScrollTimer = setInterval(function() {
                if (current >= position) {
                    window.scrollTo(0, position);
                    clearInterval(smoothScrollTimer);
                } else {
                    current += scrollStep;
                    window.scrollTo(0, current);
                }
            }, step);
        }
    }

    document.addEventListener("click", anchorClickEvent);
};

const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
};

var movieAttributesSetting = {
    movies: undefined,
    event_listeners: {},
    ua: undefined,

    init: function() {
        let _ = this;

        _.ua = _.checkUA();

        if (_.ua === "SP") return false;

        _.movies = document.querySelectorAll("video");

        for (let i = 0, src; i < _.movies.length; i++) {
            src = _.movies[i].src;
            _.movies[i].src = src;
            // _.movies[i].play();
            playVideo(_.movies[i]);
        }

        async function playVideo(video) {
            try {
                await video.play();
            } catch (err) {
                console.log(err);
            }
        }
    },

    moviePlay: function(video) {},

    checkUA: function() {
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

    destroy: function() {
        movieAttributesSetting.movies = null;
    },
};

const currentPageNavigation = function() {
    let item = document.querySelectorAll(".gnav-anc");
    let url = location.href;

    for (let i = 0; i < item.length; i++) {
        if (url.indexOf(item[i].href) > -1) item[i].classList.add("current");
        else item[i].classList.remove("current");
    }
};

function pjax_onLoadCommonCompleted() {
    movieAttributesSetting.init();
    currentPageNavigation();
    FONTPLUS.reload(false);
}

function pjax_destroyCommonInstance() {
    movieAttributesSetting.destroy();
}

document.addEventListener("DOMContentLoaded", function() {
    navigationToggle();
    setFillHeight();
    currentPageNavigation();

    let userAgent = window.navigator.userAgent.toLowerCase();
    let name =
        userAgent.indexOf("android") != -1 ||
        userAgent.indexOf("mobile") != -1 ||
        userAgent.indexOf("ipad") != -1 ||
        userAgent.indexOf("ipod") != -1 ||
        userAgent.indexOf("iphone") != -1 ?
        "SP" :
        "PC";
    if (name != "SP") {
        window.addEventListener("resize", setFillHeight);
    }

    let scrollIndicator = document.createElement("div");
    scrollIndicator.classList.add("scrollIndicator");
    document.body.appendChild(scrollIndicator);
}, { passive: false });