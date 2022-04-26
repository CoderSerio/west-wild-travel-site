var swipeObject = {
    slider: undefined,
    swiper: [],
    pagination: [],
    
    init: function () {
      let _ = this;
      _.slider = document.querySelectorAll(".swiper");
      _.build(_);
    },
    
    build: function (_) {
      for (let i = 0; i < _.slider.length; i++) {
        _.pagination[i] = _.slider[i].querySelector(".swiper-pagination");
    
        _.swiper[i] = new Swiper(_.slider[i], {
          effect: "fade",
          speed: 600,
          loop: true,
          pagination: {
            el: _.pagination[i],
            clickable: true,
          },
        });
      }
    },
    
    destroy: function () {
      for (let i = 0; i < swipeObject.slider.length; i++) {
        swipeObject.swiper[i].destroy();
      }
    },
};
    
function onLoadCompleted() {
    swipeObject.init();
}
    
function pjax_destroyInstance() {
    swipeObject.destroy();
    swipeObject = null;
    
    onLoadCompleted = null;
    pjax_destroyInstance = null;
}
    
   
document.addEventListener("DOMContentLoaded", function () {
    swipeObject.init();
});
  