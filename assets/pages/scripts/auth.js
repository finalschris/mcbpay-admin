var Login = function() {

    var handleLogin = function() {
         $("#forgotpass").validate({

            submitHandler: function(r) {
                 var postData = $('#forgotpass').serializeArray();
                      var formURL = $('#forgotpass').attr("action");
                          
                      request = $.ajax({
                                            url: formURL,
                                            type: "post",
                                            data: postData,
                                            dataType: "json",
                                            mimeType:"multipart/form-data",
                                            cache: false,
                                            async: true,
                                        });

                                        $('.reset-pass').attr('disabled','disabled');
                                        $('input[type=email]').attr('disabled','disabled');
                                        // callback handler that will be called on success
                                        request.done(function (response, textStatus, jqXHR) {
                                            $(".message").html(response.message);
                                            $('input[type=hidden]').attr("name",response.token_name);
                                            $('input[type=hidden]').attr("value",response.token);
                                        });

                                        // callback handler that will be called on failure
                                        request.fail(function (jqXHR, textStatus, errorThrown) {
                                             $(".message").html("Something went wrong please try again later.");
                                        });

                                       request.always(function () {
                                          $('.reset-pass').removeAttr('disabled','disabled');
                                          $('input[type=email]').removeAttr('disabled','disabled');
                                      });
            }  
        }); 

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
            },

            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $(".error-message").html("Username and password is required.");
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                var postData = $('#login-form').serializeArray();
                      var formURL = $('#login-form').attr("action");
                          
                      request = $.ajax({
                                            url: formURL,
                                            type: "post",
                                            data: postData,
                                            dataType: "json",
                                            mimeType:"multipart/form-data",
                                            cache: false,
                                            async: true,
                                        });

                                        $('.login').attr('disabled','disabled');
                                        $('input[type=text]').attr('disabled','disabled');
                                        $('input[type=password]').attr('disabled','disabled');
                                        // callback handler that will be called on success
                                        request.done(function (response, textStatus, jqXHR) {
                                            if (response.message != "Username or password is invalid.") {
                                                $('body').fadeOut('slow');
                                                window.location = response.message;
                                            } else {
                                                    $(".error-message").html(response.message);
                                                    $('input[type=hidden]').attr("name",response.token_name);
                                                    $('input[type=hidden]').attr("value",response.token);
                                                    $(".alert-danger", $("#login-form")).show();                                  
                                            }
                                        });

                                        // callback handler that will be called on failure
                                        request.fail(function (jqXHR, textStatus, errorThrown) {
                                         
                                        });

                                       request.always(function () {
                                         $('.login').removeAttr('disabled','disabled');
                                         $('input[type=text]').removeAttr('disabled','disabled');
                                         $('input[type=password]').removeAttr('disabled','disabled');
                                      });
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        $('#forget-password').click(function(){
            $(".login-form").slideUp(), $(".forget-form").slideDown();
        });

        $('#back-btn').click(function(){
            $('input[type=email]').val("");
            $(".login-form").slideDown(), $(".forget-form").slideUp();
        });
    }

 
  

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();

            // init background slide images
            $('.login-bg').backstretch([
                "assets/pages/img/login/bg1.jpg",
                "assets/pages/img/login/bg2.jpg",
                "assets/pages/img/login/bg3.jpg"
                ], {
                  fade: 1000,
                  duration: 8000
                }
            );

            $('.forget-form').hide();

        }

    };

}();

jQuery(document).ready(function() {
    Login.init();
});