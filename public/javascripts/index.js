/**
 * Created by pan on 14-7-15.
 */

+function ($) {
    var Scrollwhere = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.scrollwhere, options);
        this.items = this.$element.children('a');
        this.items.on('click', $.proxy(this.click, this));
        this.aoffsetTops = [];
        $(window).on('scroll', this.scroll)
        this.getoffsetTops();
    };
    Scrollwhere.prototype = {
        click: function (e) {
            e.preventDefault();
            var e = e || window.event;
            var obj = e.target || e.srcElement;
            var parent = $(obj);
            parent = parent.is('a') ? parent : parent.parent();
            parent.siblings().children('i').removeClass('active');
            parent.children('i').addClass('active');
            var h = this.aoffsetTops[parent.index()].offsetTop;
            console.log(this.aoffsetTops)
            $("html,body").stop(!0).animate({scrollTop: h}, this.options.speed, this.options.easingType)
        },
        getoffsetTops: function () {
            var i = this.items.length;
            while (i--) {
                var item = {id: this.items[i].getAttribute('href'), offsetTop: document.getElementById(this.items[i].getAttribute('href').replace('#', '')).offsetTop - 150}
                this.aoffsetTops.unshift(item);
            }
        },
        actived: function (element) {
            var parent = $(element);
            parent = parent.is('a') ? parent : parent.parent();
            parent.siblings().children('i').removeClass('active');
            parent.children('i').addClass('active');
        }
//        scroll: function () {
//            console.log($(window).scrollTop());
//        }
    };


    $.fn.scrollwhere = function (option) {
        var methodReturn;
        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('rank');
            var options = typeof option === 'object' && option;
            if (!data) $this.data('rank', (data = new Scrollwhere(this, options)));
            if (typeof option === "string") methodReturn = data[option](value);
        })
        return (methodReturn === undefined) ? $set : methodReturn;
    }

    $.fn.scrollwhere.defaults = {};

    $.fn.scrollwhere.Constructor = Scrollwhere;


}(window.jQuery);


$(function () {
    $('.rl .nav a').on('click', function () {
        var $self = $(this);
        $self.toggleClass('close-me');
    });
    function getcode(e) {
        var $self = $(e), count = $self.data('count') || 30,
            Interval = setInterval(function () {
                if (count--) {
                    $self.text('获取验证码 ' + count.toString()).addClass('disabled');
                }
                else {
                    $self.text('获取验证码').removeClass('disabled');
                    clearInterval(Interval);
                }
            }, 1000);
    }

    $(document).scroll(function () {
        var $header = $('.header');
        $('body')[0].scrollTop > 91 ? $header.addClass('scroll') : $header.removeClass('scroll');
    });
    $('.quick-nav').scrollwhere({
        speed: 500,
        easingType: "easeOutQuart"
    });
});
