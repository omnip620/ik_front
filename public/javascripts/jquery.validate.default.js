/**
 * Created by pan on 14-7-16.
 */
$.validator.setDefaults({
    highlight: function(element) {
        $(element).addClass('validate-input-error');
    },
    unhighlight: function(element) {
        $(element).removeClass('validate-input-error');
    }
});



/* 手机号码验证*/
jQuery.validator.addMethod("mobile", function (value, element){
  var length = value.length;
  return this.optional(element)||(length == 11&&/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(value));
}, "请输入正确的手机号码");

/**/
jQuery.validator.addMethod("tel", function (value, element){
  var length = value.length;
  var mobile = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
  var tel = /^(0\d{2,3}-?)?\d{7,9}(-\d{1,8})?$/g;
  return this.optional(element)||tel.test(value)||(length == 11&&mobile.test(value));
}, "请输入正确的电话号码");

/*当前元素值是否小于目标元素值*/
$.validator.addMethod('gt', function (value, element, param){
  var $target = $(param);
  if(this.settings.onfocusout) {
    $target.unbind(".validate-lt").bind("blur.validate-lt", function (){
      $(element).valid();
    });
  }
  return value >= $target.val();
});

jQuery.extend(jQuery.validator.messages, {
  required: "必选字段",
  remote: "请修正该字段",
  email: "请输入正确格式的电子邮件",
  url: "请输入合法的网址，且以http(s)://开头",
  date: "请输入合法的日期",
  dateISO: "请输入合法的日期 (ISO).",
  number: "请输入合法的数字",
  digits: "只能输入整数",
  creditcard: "请输入合法的信用卡号",
  equalTo: "请再次输入相同的值",
  accept: "请输入拥有合法后缀名的字符串",
  maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
  minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
  rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
  range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
  max: jQuery.validator.format("请输入一个最大为{0} 的值"),
  min: jQuery.validator.format("请输入一个最小为{0} 的值")
});