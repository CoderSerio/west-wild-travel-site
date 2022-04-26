let tool = {

    theme: "light",
    element: undefined,
    icon: undefined,
    head_logo: undefined,
    main_home_logo:undefined,
    lake_page_letter: undefined,
    mountain_page_letter: undefined,
    river_page_letter: undefined,
    sea_page_letter: undefined,
    mountain: undefined,
    ocean: undefined,
    river: undefined,
    lake: undefined,
    switch:undefined,

    init: function () {
        let _ = this;
        if (window.sessionStorage['theme']){
            _.theme=window.sessionStorage['theme'];
            if (window.sessionStorage['theme']==='dark'){
                document.body.classList.toggle("darktype")
            }
        }else {
            window.sessionStorage.setItem('theme', 'light');
        }
        _.element = document.body;
        //山页面图片
        _.icon = document.getElementById('moon')
        _.head_logo = document.getElementById('head_logo')
        _.main_home_logo=document.getElementById('main_home_logo')
        _.lake_page_letter = document.getElementById('lake_letter')
        _.mountain_page_letter = document.getElementById('mountain_letter')
        _.river_page_letter = document.getElementById('river_letter')
        _.sea_page_letter = document.getElementById('sea_letter')
        //目录页图
        _.ocean = document.getElementById("ocean")
        _.lake = document.getElementById("lake")
        _.river = document.getElementById("river")
        _.mountain = document.getElementById("mountain")
        _.switch=document.getElementById("switch")
        _.switch.addEventListener("click", function (){
            _.switchMode(_)
        })
        _.switchMode(_)
        _.build(_);
    },

    build: function (_) {

        _.switchMode(_);

    },


    loading: function (_) {

    },


    destroy: function () {
        window.removeEventListener("click", function (){
            _.switchMode(_)
        })

    },

    switchMode: function (_) {
        document.body.classList.toggle("darktype")
        if (_.theme === "dark") {
            //主页部分图片变化为浅色主题状态
            _.icon.src = "./images/common/moon.svg"
            _.head_logo.src = "./images/home/head_logo.png"
            if(_.main_home_logo!==null)
            {
                _.main_home_logo.src="./images/home/head_logo.png"
            }
            if(_.lake_page_letter !==null)
                _.lake_page_letter.src = "./images/common/title/lake_letter.png"
            if(_.mountain_page_letter !==null)
                _.mountain_page_letter.src = "./images/common/title/mountain_letter.png"
            if(_.river_page_letter !==null)
                _.river_page_letter.src = "./images/common/title/river_letter.png"
            if(_.sea_page_letter !==null)
                _.sea_page_letter.src = "./images/common/title/sea_letter.png"
            //目录页部分图片变化为浅色主题状态
            _.ocean.src = "./images/common/title/sea_letter.png"
            _.lake.src = "./images/common/title/lake_letter.png"
            _.river.src = "./images/common/title/river_letter.png"
            _.mountain.src = "./images/common/title/mountain_letter.png"
            _.theme = "light"
            window.sessionStorage.setItem('theme', 'light');

        } else {
            _.icon.src = "./images/common/sun.svg"
            _.head_logo.src = "./images/home/head_logo_dark.png"
            if(_.main_home_logo!==null)
            {
                _.main_home_logo.src="./images/home/head_logo_dark.png"
            }

            if(_.lake_page_letter !==null)
                _.lake_page_letter.src = "./images/common/title/lake_letter_dark.png"
            if(_.mountain_page_letter !==null)
                _.mountain_page_letter.src = "./images/common/title/mountain_letter_dark.png"
            if(_.river_page_letter !==null)
                _.river_page_letter.src = "./images/common/title/river_letter_dark.png"
            if(_.sea_page_letter !==null)
                _.sea_page_letter.src = "./images/common/title/sea_letter_dark.png"
            //目录页部分图片变化为浅色主题状态
            _.ocean.src = "./images/common/title/sea_letter_dark.png"
            _.lake.src = "./images/common/title/lake_letter_dark.png"
            _.river.src = "./images/common/title/river_letter_dark.png"
            _.mountain.src = "./images/common/title/mountain_letter_dark.png"
            _.theme = "dark"
            window.sessionStorage.setItem('theme', 'dark');

        }
    },

};

function onLoadCompleted() {
    tool.init();
}

function pjax_destroyInstance() {
    tool.destroy();
    tool = null;

    onLoadCompleted = null;
    pjax_destroyInstance = null;
}

document.addEventListener("DOMContentLoaded", function () {
    tool.init()
});