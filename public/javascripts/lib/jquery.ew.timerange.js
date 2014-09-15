+function ($) {
    var EWTimerange = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.ewtimerange, options)
    }
}(window.jQuery);