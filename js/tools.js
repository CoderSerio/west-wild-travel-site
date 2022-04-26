
//Scroll事件，对每一个image_single的img添加fadeInUp动画
    $(function() {
        this.handleScroll = function() {
            let currentScroll = window.pageYOffset + window.innerHeight;
            // console.log(currentScroll);
            //$(".imgae_single img")是一个对象数组
            let el = $(".image_single img");
            // console.log(el);
            for (let i = 0; i < el.length; i++) {
                if (el[i].offsetTop < currentScroll) {
                    $(el[i]).addClass('animated fadeInUp');
                    // console.log('success!');
                } else {
                    $(el[i]).removeClass('fadeInUp');
                }
            }
        }
        window.addEventListener('scroll', this.handleScroll, true);
    })

    //高亮事件
    $(function() {
        //鼠标进入的时候,其他的li标签透明度：0.5
        $(".image_multi li").hover(function() {
            $(this).siblings().stop().fadeTo(400, 0.5);
        }, function() {
            // 鼠标离开，其他li 透明度改为 1
            $(this).siblings().stop().fadeTo(400, 1);
        })
    });

    //进度条动画

    setTimeout("changeState()", 2000);

    function changeState() {
        document.body.classList.replace('pageLoading', 'pageCompleted');
    }
    setTimeout("changeVisible()", 3000);

    function changeVisible() {
        $("#state").addClass("animated fadeIn").css("visibility", "visible");
    }