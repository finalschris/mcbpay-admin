        <!-- BEGIN LOGO -->
        <div class="logo">
            <a href="<?=base_url();?>">
                <img class="login-logo" src="<?=base_url();?>files/media/<?=$core_settings->logo;?>" alt="" width="10%" /> </a>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content">
            <!-- BEGIN LOGIN FORM -->
         <?php echo form_open_multipart($form_action, 'class="login-form" id="login-form"');?>
                <h3 class="form-title font-green">Sign In</h3>
                <div class="alert alert-danger display-hide">
                    <button class="close" data-close="alert"></button>
                    <span class='error-message'></span>
                </div>
                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">Username</label>
                    <input autofocus class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username"<?php if(isset($username)){ echo "value = '". $username ."'"; } ?> required /><span></span> </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">Password</label>
                    <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="password" /><span></span> </div>
                <div class="form-actions">
                    <button type="submit" class="btn green uppercase">Login</button>
                    <a href="javascript:;" id="forget-password" class="forget-password">Forgot Password?</a>
                </div>
                <div class="create-account">
                    <p>
                        <a href="register" id="register-btn" class="uppercase">Create an account</a>
                    </p>
                </div>
            <?=form_close();?>
            <!-- END LOGIN FORM -->
            <!-- BEGIN FORGOT PASSWORD FORM -->
			<?php echo form_open_multipart($form_action_forget, 'class="forget-form" id="forgotpass"');?>
                <h3 class="font-green">Forget Password ?</h3>
                <p> Enter your e-mail address below to reset your password. </p>
                <div class="form-group">
                    <input class="form-control placeholder-no-fix form-group" type="email" autocomplete="off" placeholder="Email" name="email" required /> </div>
                <div class="form-actions">
                    <button type="button" id="back-btn" class="btn green btn-outline">Back</button>
                    <button type="submit" class="btn btn-success uppercase pull-right">Submit</button>
                </div>
         <?=form_close();?>
            <!-- END FORGOT PASSWORD FORM -->
			
        </div>
        <div class="copyright"> Copyrights <?php 
$copyYear = 2017; 
$curYear = date('Y'); 
echo $copyYear . (($copyYear != $curYear) ? '-' . $curYear : '');
?> &copy; All rights reserved. Created by <?=$core_settings->company;?>. </div>
