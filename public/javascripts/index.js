/**
 * Created by pan on 14-7-15.
 */

  +function ($){
    var userAgent = navigator.userAgent.toLowerCase();
    $.browser = {
      version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],
      safari: /webkit/.test(userAgent),
      opera: /opera/.test(userAgent),
      msie: /msie/.test(userAgent)&& !/opera/.test(userAgent),
      mozilla: /mozilla/.test(userAgent)&& !/(compatible|webkit)/.test(userAgent)
    };

  }(window.jQuery)

  + function ($){
  var attr = 'placeholder', nativeSupported = attr in document.createElement('input')

  $.fn.placeholder = function (options){
    return this.each(function (){
      var $input = $(this)

      if(typeof options === 'string') {
        options = { text: options }
      }

      var opt = $.extend({
        text: '',
        style: {},
        namespace: 'placeholder',
        useNative: true,
        hideOnFocus: true
      }, options||{})

      if(!opt.text) {
        opt.text = $input.attr(attr)
      }

      if(!opt.useNative) {
        $input.removeAttr(attr)
      } else if(nativeSupported) {
        // 仅改变文本
        $input.attr(attr, opt.text)
        return
      }

      var width = $input.width(), height = $input.height()
      var box_style = ['marginTop', 'marginLeft', 'paddingTop', 'paddingLeft', 'paddingRight']

      var show = function (){ $layer.show() }
      var hide = function (){ $layer.hide() }
      var is_empty = function (){ return !$input.val() }
      var check = function (){ is_empty() ? show() : hide() }

      var position = function (){
        var pos = $input.position()
        if(!opt.hideOnFocus) {
          // 按鍵隱藏的情况，需要移動光標两像素
          pos.left += 2
        }
        $layer.css(pos)
        $.each(box_style, function (i, name){
          $layer.css(name, $input.css(name))
        })
      }

      var layer_style = {
        color: 'gray',
        cursor: 'text',
        textAlign: 'left',
        position: 'absolute',
        fontSize: $input.css('fontSize'),
        fontFamily: $input.css('fontFamily'),
        display: is_empty() ? 'block' : 'none'
      }

      // create
      var layer_props = {
        text: opt.text,
        width: width,
        height: 'auto'
      }

      // 确保只绑定一次
      var ns = '.' + opt.namespace, $layer = $input.data('layer' + ns)
      if(!$layer) {
        $input.data('layer' + ns, $layer = $('<div>', layer_props).appendTo($input.offsetParent()))
      }

      // activate
      $layer
        .css($.extend(layer_style, opt.style))
        .unbind('click' + ns)
        .bind('click' + ns, function (){
          opt.hideOnFocus&&hide()
          $input.focus()
        })

      $input
        .unbind(ns)
        .bind('blur' + ns, check)

      if(opt.hideOnFocus) {
        $input.bind('focus' + ns, hide)
      } else {
        $input.bind('keypress keydown' + ns, function (e){
          var key = e.keyCode
          if(e.charCode||(key >= 65&&key <= 90)) {
            hide()
          }
        })
          .bind('keyup' + ns, check)
      }

      // 由于 ie 记住密码的特性，需要监听值改变
      // ie9 不支持 jq bind 此事件
      $input.get(0).onpropertychange = check

      position()
      check()
    })
  }

}(window.jQuery)


  + function ($){
  var Scrollwhere = function (element, options){
    this.$element = $(element);
    this.options = $.extend({}, $.fn.scrollwhere, options);
    this.items = this.$element.children('a');
    this.items.on('click.ew', $.proxy(this.click, this));
    this.aoffsetTops = [];
    this.getoffsetTops();
    $(window).on('scroll.ew', $.proxy(this.scroll, this))
  };
  Scrollwhere.prototype = {
    click: function (e){
      e.preventDefault();
      var e = e||window.event;
      var obj = e.target||e.srcElement;
      var parent = $(obj);
      parent = parent.is('a') ? parent : parent.parent();
      var h = $(this.aoffsetTops[parent.index()].id).offset().top;
      $("html,body").stop(!0).animate({scrollTop: h}, this.options.speed, this.options.easingType)
    },
    getoffsetTops: function (){
      var i = this.items.length;
      while (i--){
        var item = {id: this.items[i].getAttribute('href')}
        this.aoffsetTops.push(item);
      }
      this.aoffsetTops.reverse();
    },
    actived: function (element){
      var parent = $('[href="' + element + '"]');
      parent = parent.is('a') ? parent : parent.parent();
      parent.siblings().children('i').removeClass('active');
      parent.children('i').addClass('active');
    },
    scroll: function (){
      var i = this.aoffsetTops.length;
      var windowoffsetTop = $(window).scrollTop() + 200;
      while (i--){
        var section = $(this.aoffsetTops[i].id),
          top = section.offset().top,
          bottom = section.outerHeight(true) + top;

        if(windowoffsetTop >= top&&windowoffsetTop <= bottom) {
          this.actived(this.aoffsetTops[i].id);
        }
      }
      if(windowoffsetTop + $(window).height() >= $(document).height()) {
        this.actived(this.aoffsetTops[3].id);
      }
    }
  };
  $.fn.scrollwhere = function (option){
    var methodReturn;
    var $set = this.each(function (){
      var $this = $(this);
      var data = $this.data('rank');
      var options = typeof option === 'object'&&option;
      if(!data) $this.data('rank', (data = new Scrollwhere(this, options)));
      if(typeof option === "string") methodReturn = data[option](value);
    })
    return (methodReturn === undefined) ? $set : methodReturn;
  }

  $.fn.scrollwhere.defaults = {};

  $.fn.scrollwhere.Constructor = Scrollwhere;


}(window.jQuery);
$(function (){
  $('.rl .nav a').on('click', function (){
    var $self = $(this);
    $self.toggleClass('close-me');
  });

  $('.J-getcode').on('click', function (){
    getcode(this)
  });

  function getcode(e){
    var $self = $(e), count = $self.data('count')||30;
    $self.text('获取验证码 ' + count.toString()).addClass('disabled');
    var Interval = setInterval(function (){
      if(count--) {
        $self.text('获取验证码 ' + count.toString()).addClass('disabled');
      }
      else {
        $self.text('获取验证码').removeClass('disabled');
        clearInterval(Interval);
      }
    }, 1000);
  }

  $(document).scroll(function (){
    var $header = $('.header');
    $('body')[0].scrollTop > 40 ? $header.addClass('scroll').css('top', 0) : $header.removeClass('scroll').css('top', 'auto');
  });
  $('.quick-nav').scrollwhere({
    speed: 500,
    easingType: "easeOutQuart"
  });
  $('#remove-warning').on('click', function (){
    $(this).closest('.warning').remove();
  });

  if($.browser.msie&&$.browser.version < 9) {
    $('.warning').removeClass('hide');
  }
  $('input[placeholder]').placeholder();

});
