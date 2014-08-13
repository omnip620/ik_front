function displayField() {
    $("input#type-other").click(function () {
        if ($("input#type-other").is(":checked")) {
            $(".other-details").fadeIn(200)
        } else {
            $(".other-details").fadeOut(200)
        }
    })
}
function initSuccessModal() {
    $(".success-modal a.close").click(function () {
        toggleSuccessModal(false);
        return false
    })
}
function toggleSuccessModal(e) {
    if (e) {
        $(".overlay").fadeIn(200)
    } else {
        $(".overlay").fadeOut(200)
    }
}
function ajaxSubmitForm(e) {
    $("div.loading").show();
    $("button[type=submit]").hide();
    $(e).ajaxSubmit({success: function (e, t) {
        if (e == "ok") {
            planner_form_validator.resetForm();
            $("#planner-form")[0].reset();
            $("#planner-form input[type=hidden]").val("");
            if (dropzone_active) {
                $("#planner-files-dropzone").replaceWith('<div id="planner-files-dropzone" />');
                $("#planner-files-dropzone").dropzone()
            }
            $("div.loading").hide();
            $("button[type=submit]").show();
            toggleSuccessModal(true)
        }
    }, error: function () {
        alert("There was a problem submitting your form, please try again")
    }})
}
function initDropzone() {
    Dropzone.autoDiscover = false;
    Dropzone.options.plannerFilesDropzone = {paramName: "pp-file", maxFilesize: 10, acceptedFiles: "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf", url: "upload.php", addRemoveLinks: true, forceFallback: false, clickable: true, fallback: function () {
        dropzone_active = false;
        $("#planner-files-dropzone").remove();
        $("input[name=pp-files-list]").remove();
        $("#planner-form").attr("action", $("#planner-form").attr("action") + "?single_upload=1")
    }, init: function () {
        dropzone_active = true;
        $("input[name=pp-file]").remove();
        this.on("addedfile", function (e) {
            $('button[type="submit"]').attr("disabled", "disabled")
        });
        this.on("removedfile", function (e) {
            $.ajax({type: "POST", url: "removed.php", data: {token: e.upload_ticket}});
            var t = $("input[name=pp-files-list]");
            var n = t.val().split(",");
            var r = $.inArray(e.upload_ticket, n);
            if (r !== -1) {
                n.splice(r, 1)
            }
            t.val(n.length > 0 ? n.join(",") : "")
        });
        this.on("success", function (e, t) {
            e.upload_ticket = t;
            var n = $("input[name=pp-files-list]");
            var r = [];
            if (n.val() != "") {
                r = n.val().split(",")
            }
            r.push(e.upload_ticket);
            n.val(r.length > 0 ? r.join(",") : "")
        });
        this.on("complete", function (e) {
            if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                $('button[type="submit"]').removeAttr("disabled")
            }
        });
        this.on("error", function (e, t, n) {
            this.removeFile(e)
        })
    }};
    $("#planner-files-dropzone").dropzone();
    $("#planner-files-dropzone .instructions").click(function (e) {
        var t = Dropzone.forElement("#planner-files-dropzone");
        t.hiddenFileInput.click();
        e.preventDefault()
    })
}
var planner_form_validator;
var dropzone_active = false;
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $("header,#mob-nav").addClass("stuck")
        } else {
            $("header,#mob-nav").removeClass("stuck")
        }
    });
    $("#mob-nav").click(function () {
        $(this).addClass("close");
        $("body").append('<div class="screen"><div class="inner" /></div><div class="screenW" />');
        if ($(window).height() < 440) {
            $(".screen").css({position: "absolute"});
            $("html, body").animate({scrollTop: "0"}, 100)
        }
        setTimeout(function () {
            $(".screen .inner").addClass("active");
            $(".screenW").addClass("active")
        }, 100);
        $("nav").clone().appendTo(".screen .inner");
        $(".screen").click(function () {
            $("#mob-nav").removeClass("close");
            $(".screen .inner").addClass("out");
            setTimeout(function () {
                $(".screenW").removeClass("active")
            }, 400);
            setTimeout(function () {
                $(".screen,.screenW").remove()
            }, 1e3)
        });
        return false
    });
    displayField();
    initSuccessModal();
    $(".noUiSlider").noUiSlider({range: [10, 150], start: [50, 110], connect: true, behaviour: "tap-drag", step: 10, slide: function () {
        $("input.range").val("");
        var e = $(this).val();
        $("input.range").val("$" + e[0] + "k - $" + e[1] + "k");
        if (e[1] == "150") {
            $("input.range").val("$" + e[0] + "k - $" + e[1] + "k +")
        }
    }, behaviour: "extend-tap", serialization: {to: [
        [$(".value-one")],
        [$(".value-two")]
    ], resolution: 1}});
    var e = $('<label for="pp-project-type[]" class="error">Please select one or more project types</label>');
    $("div.project-type .field").append(e.hide());
    planner_form_validator = $(".planner").validate({rules: {"pp-project-type[]": {required: true}, "pp-other-details": {required: {depends: function (e) {
        return $("#type-other").is(":checked")
    }}}}, submitHandler: function (e) {
        ajaxSubmitForm(e)
    }});
    initDropzone()
})