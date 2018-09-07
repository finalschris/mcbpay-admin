        <div class="logo">
            <a href="<?=base_url();?>">
                <img class="login-logo" src="<?=base_url();?>files/media/<?=$core_settings->logo;?>" alt="" width="10%"  /> </a>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content">

            <!-- BEGIN REGISTRATION FORM -->
			<?php echo form_open_multipart($form_action,' role="form" ');?>
                <h3 class="font-green">Sign Up</h3>
				<div class="alert alert-danger display-hide">
                    <button class="close" data-close="alert"></button>
                    <span class='error-message'></span>
                </div>
                <p class="hint"> Enter your personal details below: </p>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9" for="firstname">First Name</label>
                    <input class="form-control placeholder-no-fix" type="text" placeholder="First Name" name="firstname" id="firstname" required/> </div>
				<div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9" for="lastname">Last Name</label>
                    <input class="form-control placeholder-no-fix" type="text" placeholder="Last Name" name="lastname" id="lastname" /> </div>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9" for="email">Email</label>
                    <input class="form-control placeholder-no-fix" type="text" placeholder="Email" name="email" id="email" required/> </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9" for="mobile">Mobile Number</label>
                    <input class="form-control placeholder-no-fix" type="tel" placeholder="07032485759" name="mobile" id="mobile" required /> </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9" for="account_type">Account Type</label>
                    <select name="account_type" class="form-control" id="account_type" required>
                        <option value="">Select account type</option>
                        <option value="2">User</option>
                        <option value="3">Vendor</option>
                        <option value="4">Corporate</option>
                    </select>
                </div>
                <p class="hint"> Enter your account details below: </p>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9" for="username">Username</label>
                    <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username" id="username" required/> </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9" for="password">Password</label>
                    <input class="form-control placeholder-no-fix" type="password" autocomplete="off" id="register_password" placeholder="Password" name="password" id="password" required/> </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9" for="rpassword">Re-type Your Password</label>
                    <input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="Re-type Your Password" name="rpassword" id="rpassword" /> </div>
                <div class="form-group margin-top-20 margin-bottom-20">
                    <label class="mt-checkbox mt-checkbox-outline">
                        <input type="checkbox" name="remember" id="remember" value="1" required />
                        <input type="checkbox" name="tnc" /> I agree to the
                        <a href="javascript:;">Terms of Service </a> &
                        <a href="javascript:;">Privacy Policy </a>
                        <span></span>
                    </label>
					 <input  type="hidden" placeholder="status" name="status" id="status" />
                    <div id="register_tnc_error"> </div>
                </div>
                <div class="form-actions">
                    <a type="button" href="login" id="register-back-btn" class="btn green btn-outline">Back</a>
                    <button type="submit" id="register-submit-btn" class="btn btn-success uppercase pull-right">Submit</button>
                </div>
            <?=form_close();?>
            <!-- END REGISTRATION FORM -->
        </div>
        <div class="copyright"> Copyrights <?php 
$copyYear = 2017; 
$curYear = date('Y'); 
echo $copyYear . (($copyYear != $curYear) ? '-' . $curYear : '');
?> &copy; All rights reserved. Created by <?=$core_settings->company;?>. </div>
        <!--[if lt IE 9]>
<script src="../assets/global/plugins/respond.min.js"></script>
<script src="../assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
        <!-- BEGIN CORE PLUGINS -->
        <script src="../assets/global/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="../assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
        <script src="../assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="../assets/global/scripts/app.min.js" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
        <script src="../assets/pages/scripts/login.min.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <!-- END THEME LAYOUT SCRIPTS -->
		<script type="text/javascript">
    $('document').ready(function(){
        jQuery.validator.addMethod("notEqual", function(value, element, param) {
            return this.optional(element) || value != $(param).val();
        }, "This has to be different...");

        $.validator.addMethod("checkUsername", function(value, element) {
                var result = false;
                
                $.ajax({
                    type:"POST",
                    dataType: 'json',
                    data: { "username": value, "token": token,  "mode": "username"},
                    async: false,
                    processData: true,
                    url: base_url + "auth/verify",
                    
                    success: function(response) {
                        result = (response.message)? false: true;

                        token_name = response.token_name;
                        token = response.token;

                        //console.log(result);
                    }

                });
                return result;

                //console.log("value : " + value + " - xxx - element : " + element.name);
            }, 
           "Username already in use."
        );

        $.validator.addMethod("checkEmail", function(value, element) {
                var result = false;
                
                $.ajax({
                    type:"POST",
                    dataType: 'json',
                    data: { "email": value, "token": token,  "mode": "email"},
                    async: false,
                    processData: true,
                    url: base_url + "auth/verify",
                    
                    success: function(response) {
                        result = (response.message)? false: true;

                        token_name = response.token_name;
                        token = response.token;

                        //console.log(result);
                    }

                });
                return result;

                //console.log("value : " + value + " - xxx - element : " + element.name);
            }, 
           "Email address already in use."
        );

        $(".checkbox-beauty").labelauty({ 
            //checked_label: "You selected this",
            //unchecked_label: "You don't want it",
            minimum_width: "100%" 
        });

        $('form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: true, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input

            rules: {
                username: {
                    pattern: "(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$",
                    checkUsername: true,
                },

                email: {
                    checkEmail: true,
                    email: true,
                },

                password: {
                    required: true,
                    pattern: "^(?!\.[\d]+)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).+$",
                    notEqual: "#username",
                },

                rpassword: {
                    required: true,
                    equalTo: "input[name=password]",
                    notEqual: "#username",
                },
                mobile:{
                    pattern: "^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$",
                },
                firstname:{
                    pattern: "^[a-zA-Z][a-zA-Z ]*[\.']?[ a-zA-Z]+$",
                },
                lastname:{
                    pattern: "^[a-zA-Z][a-zA-Z ]*[\.']?[ a-zA-Z]+$",
                }
            },

            messages:{
                password: {
                    notEqual: "Password must not be the same as your username.",
                },
                rpassword: {
                    notEqual: "Password must not be the same as your username.",
                    equalTo: "Password does not match."
                }

            },
            errorPlacement: function(error, element) {
                if (element.is(':checkbox')) {
                    error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
                } else if (element.is(':radio')) {
                    error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },

            highlight: function(element) { // hightlight error inputs
                //if(element.type != 'checkbox'){ 
                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group 
                //}
            },

            unhighlight: function(element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

        });
    });
 </script>
    </body>

</html>