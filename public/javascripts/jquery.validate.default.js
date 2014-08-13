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