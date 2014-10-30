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

}(window.jQuery);

+function ($){
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

}(window.jQuery);


+function ($){
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


(function ($){
  var PwdStr = function (element, options){
    this.$element = $(element);
    this.options = $.extend({}, $.fn.pwdstr.defaults, options);

    this.characters = 0;
    this.capitalletters = 0;
    this.loweletters = 0;
    this.number = 0;
    this.special = 0;
    this.upperCase = new RegExp('[A-Z]');
    this.lowerCase = new RegExp('[a-z]');
    this.numbers = new RegExp('[0-9]');
    this.specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');
    this.$element.on('keyup', $.proxy(this.show, this));
  };
  PwdStr.prototype = {
    check: function (){
      var val = this.$element.val();
      this.characters = val.length > 8 ? 1 : 0;
      this.capitalletters = val.match(this.upperCase) ? 1 : 0;
      this.loweletters = val.match(this.lowerCase) ? 1 : 0;
      this.number = val.match(this.numbers) ? 1 : 0;
      this.special = val.match(this.specialchars) ? 1 : 0;
      return this.characters + this.capitalletters + this.loweletters + this.number + this.special;
    },
    show: function (){
      var $text = this.$element.nextAll('.pwdstr');
      if(!this.$element.val()) {
        $text.remove();
        return;
      }
      var text = '密码安全度：';
      var style;
      var level = this.check();
      if(level == 1) {
        text += '菜B';
        style = "text-hot";
      }
      else if(level == 2) {
        text += '还行';
        style = "text-primary";
      }
      else if(level >= 3) {
        text += '牛B';
        style = "text-primary";
      }
      if($text.length) {
        $text.eq(0).html(text).attr('class', 'pwdstr ' + style);
        return;
      }
      this.$element.after('<p class="pwdstr ' + style + '">' + text + '</p> ');
    }
  };

  $.fn.pwdstr = function (option){
    var methodReturn;
    var $set = this.each(function (){
      var $this = $(this);
      var data = $this.data('pwdstr');
      if(!data) {
        var options = typeof option === 'object'&&option;
        $this.data('pwdstr', new PwdStr(this, options));
      }
      if(typeof option === "string") methodReturn = data[option](value);
    });
    return (methodReturn === undefined) ? $set : methodReturn;
  };
  $.fn.pwdstr.defaults = {};
  $.fn.pwdstr.Constructor = PwdStr;
})(window.jQuery);

$(function (){
  $('[data-toggle="pwdstr"]').pwdstr();
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

  $('[data-toggle="popover"]').popover({
    trigger: "hover",
    title: '没有收到验证码怎么办？',
    html: true,
    content: '<p>亲爱的用户，验证码短信/邮件正常都会在数秒钟内发送，如果您未收到短信/邮件，请参照如下常见情况进行解决：</p>' +
      '<p>1、由于您的手机或邮箱软件设定了某些安全设置，验证码短信/邮件可能被拦截进了垃圾箱。请打开垃圾箱查看，并将销售易号码添加为白名单。</p>' +
      '<p>2、由于运营商通道故障造成了短信/邮件发送时间延迟，请耐心稍候片刻或点击重新获取验证码。</p>' +
      '<p>3、关于手机号验证，目前支持移动、联通和电信的所有号码，暂不支持国际及港澳台地区号码。</p>' +
      '<p>如果您尝试了上述方式后均未解决，或存有其他疑问，请通过热线电话4000-365-711获取客户协助。</p>',
    template: '<div class="popover w-520px" role="tooltip" ><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })

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
