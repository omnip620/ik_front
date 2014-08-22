/**
 * Created by pan on 14-7-15.
 */
(function ($) {
    $('.rl .nav a').on('click', function () {
        var $self = $(this);
        $self.toggleClass('close-me');
    });

    /*validate countdown*/
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
        var $header=$('.header');
        $('body')[0].scrollTop > 91? $header.addClass('scroll'):$header.removeClass('scroll');
    })

})(window.jQuery);