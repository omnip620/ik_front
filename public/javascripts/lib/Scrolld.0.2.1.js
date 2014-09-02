/*
 * Scrolld v0.2.1
 * © Copyright Charlie Geiger 2014
 * Built on: 08-20-2014
 */

!function (a) {
    "use strict";
    a.fn.scrolld = function (b) {
        function c() {
            i = f.height()
        }

        var d, e = this, f = a(window), g = a("html"), h = a("body"), i = f.height(), j = a.extend({position: "top", speed: 1100, offset: 0, easing: "scrolldEasing", callback: null}, b);
        return function () {
            var a;
            f.on("resize", function () {
                a ? clearTimeout(a) : 0, a = setTimeout(c, 150)
            })
        }(), function () {
            var a = "undefined" != typeof InstallTrigger;
            d = a ? g : h
        }(), function () {
            for (var b = e.length, f = 0; b > f; f++)a(e[f]).on("click", function () {
                c();
                var b = a(this).data("scrolld"), e = a("#" + b), f = e.offset().top, g = e.outerHeight(), h = ~~(f + j.offset);
                "center" === j.position && i > g && (h = ~~(f - (i / 2 - g / 2))), d.stop(!0).animate({scrollTop: h}, j.speed, j.easing, function () {
                    "function" == typeof j.callback && j.callback()
                })
            })
        }(), jQuery.extend(jQuery.easing, {scrolldEasing: function (a, b, c, d, e) {
            var f = (b /= e) * b, g = f * b;
            return c + d * (-.749999 * g * f + 2.5 * f * f + -2 * g + -1.5 * f + 2.75 * b)
        }}), this
    }
}(jQuery);