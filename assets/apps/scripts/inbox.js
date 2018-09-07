var AppInbox = function () {

    var content = $('.inbox-content');
    var listListing = '';
    var navi = '';
    var start_page = 0;
    var total_records;
    var total_pages;

    var loadInbox = function (el, name, filter, start, page) {
        var url;
        var title = el.attr('data-title');
        var ext = '';
        listListing = name;
        navi = title;

        App.blockUI({
            target: content,
            overlayColor: 'none',
            animate: true
        });

        toggleButton(el);

        switch(title){
            case 'Inbox':
                  ext = 'inbox';
            break;

            case 'Important':
                  ext = 'important';
            break;

            case 'Spam':
                  ext = 'spam';
            break;

            case 'Sent':
                 ext = 'sent';
            break;

            case 'Trash':
                 ext = 'trash';
            break;
        }
        
        $filter = $('#filter').val();
        
        url = base_url+'messages/load_message_list/'+ext;

        $.ajax({
            type: "GET",
            cache: false,
            url: url,
            dataType: "json",
            data: {filter: filter, start: start, page: page,},

            success: function(res) 
            {
                toggleButton(el);
                total_records = res.total_records;
                App.unblockUI('.inbox-content');
                
                var record_start;

                record_start =  res.display_start;
                start_page = record_start;

                var display_list =  (total_records > 0)? record_start + ' - ' + res.records_end + ' of ' + total_records : '';
                
                $('.pagination-info').html(display_list);

                if (!total_records) {
                   $('#filter').prop('disabled', true);
                   $('.dropdown-toggle').prop('disabled', true);
                   $('.mail-group-checkbox').prop('disabled', true);
                   $('.pagination-panel-input').hide();
                   $('.next').hide();
                   $('.prev').hide();

                } else {
                   $('#filter').prop('disabled', false);
                   $('.dropdown-toggle').prop('disabled', false);
                   $('.mail-group-checkbox').prop('disabled', false);
                   $('.next').show();
                   $('.next').show(); 
                   $('.pagination-panel-input').show();
                }

                if (res.records_end == total_records) {
                    $('.next').prop('disabled', true);
                } else if(res.records_end < total_records){
                    $('.next').prop('disabled', false);
                } 

                if(record_start == 1){
                    $('.prev').prop('disabled', true);
                } else if(record_start > 1){
                    $('.prev').prop('disabled', false);
                } 

                total_pages = res.current_page + " of " + res.total_pages;
                $('.inbox-nav > li.active').removeClass('active');
                el.closest('li').addClass('active');
                $('.inbox-header > h1').text(title);
                $('.table').show();
                $('.viewer').hide();
                $('.pagination-panel-input').val(res.current_page + " of " + res.total_pages);
                
                var html = '';
                    $.each(res.data, function(key, value){
                        html += value[0];
                        html += value[1];
                        html += value[2];
                        html += value[3];
                        html += value[4];
                        html += value[5];
                    });
                  
                $('#mail_contents').html(html);

                update_message_counter();

                if (Layout.fixContentHeight) {
                    Layout.fixContentHeight();
                }
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
                toggleButton(el);
            },
            async: false
        });

        // handle group checkbox:
        jQuery('body').on('change', '.mail-group-checkbox', function () {
            var set = jQuery('.mail-checkbox');
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                $(this).attr("checked", checked);
            });
        });
    }

    var loadMessage = function (el, name, resetMenu) {
        var url = base_url+'messages/view_message';

        App.blockUI({
            target: content,
            overlayColor: 'none',
            animate: true
        });

        toggleButton(el);

        if (!el) {
           var message_id = App.getURLParameter("msg")
        } else {
           var message_id = el.parent('tr').attr("data-messageid");  
        }
         
        $.ajax({
            type: "GET",
            cache: false,
            url: url,
            dataType: "html",
            data: {'message_id': message_id},
            success: function(res) 
            {
                App.unblockUI(content);
                update_message_counter();

                toggleButton(el);

                if (resetMenu) {
                    $('.inbox-nav > li.active').removeClass('active');
                }
                $('.inbox-header > h1').text('View Message');

                $('.table').hide();
                $('.viewer').show();
                $('.viewer').html(res);
                Layout.fixContentHeight();
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
                toggleButton(el);
            },
            async: false
        });
    }

    function update_message_counter(){
        
                 $.ajax({
                            type: "GET",
                            cache: false,
                            url: base_url+'messages/check_counters',
                            dataType: "JSON",
                            
                            success: function(res) 
                            {   
                                if (res.inbox > 0) {
                                    $('.message-counter').removeClass('display-none');
                                    $('.message-counter').html(res.inbox);
                                    $('.message-peeker').html(res.peek);
                                    $('.message-badge').html('You have <span class="bold">' + res.inbox + ' new</span> messages.');
                                } else {
                                    $('.message-counter').html('');
                                    $('.message-peeker').html('');
                                    $('.message-badge').html('You have no new messages.');
                                }
                                
                                if (res.important > 0) {
                                    $('.message-counter-important').html(res.important);
                                } else {
                                    $('.message-counter-important').html('');
                                }

                                if (res.spam > 0) {
                                    $('.message-counter-spam').html(res.spam);
                                } else {
                                    $('.message-counter-spam').html('');
                                }

                                if (res.trash > 0) {
                                    $('.message-counter-trash').html(res.trash);
                                } else {
                                    $('.message-counter-trash').html('');
                                }
                                
                            },
                            error: function(xhr, ajaxOptions, thrownError)
                            {
                                console.log('error');
                            },
                            async: false      
                    });
    }

    var initWysihtml5 = function () {
        $('.inbox-wysihtml5').summernote({
            height: 300,
             toolbar: [
                        ['style', ['style']],
                        //['font', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
                        ['fontname', ['fontname']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'hr']],
                        ['view', ['fullscreen', 'undo', 'redo'/*, 'codeview' */]],   // remove codeview button 
                        ['help', ['help']]
                      ],
        });
    }

    var initFileupload = function () {

        $('#fileupload').fileupload({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: base_url+'assets/global/plugins/jquery-file-upload/server/php/index.php',
            autoUpload: true
        });

        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                url: base_url+'assets/global/plugins/jquery-file-upload/server/php/index.php',
                type: 'HEAD'
            }).fail(function () {
                $('<span class="alert alert-error"/>')
                    .text('Upload server currently unavailable - ' +
                    new Date())
                    .appendTo('#fileupload');
            });
        }
    }

    var loadCompose = function (el) {
        var url = base_url+'messages/load_composer';

        App.blockUI({
            target: content,
            overlayColor: 'none',
            animate: true
        });

        toggleButton(el);

        // load the form via ajax
        $.ajax({
            type: "GET",
            cache: false,
            url: url,
            dataType: "html",
            success: function(res) 
            {
                App.unblockUI(content);
                toggleButton(el);

                $('.inbox-nav > li.active').removeClass('active');
                $('.inbox-header > h1').text('Compose');
                $('.table').hide();
                $('.viewer').show();
                $('.viewer').html(res);

                initFileupload();
                initWysihtml5();

                $('.inbox-wysihtml5').focus();
                Layout.fixContentHeight();
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
                toggleButton(el);
            },
            async: false
        });
    }

    var loadReply = function (el) {
        var messageid = $(el).attr("data-messageid");
        var url = base_url+'messages/load_reply';

        
        App.blockUI({
            target: content,
            overlayColor: 'none',
            animate: true
        });

        toggleButton(el);

        // load the form via ajax
        $.ajax({
            type: "GET",
            cache: false,
            url: url,
            dataType: "html",
            data: {'message_id': messageid},

            success: function(res) 
            {
                App.unblockUI(content);
                toggleButton(el);

                $('.inbox-nav > li.active').removeClass('active');
                $('.inbox-header > h1').text('Reply');

                $('.table').hide();
                $('.viewer').show();
                $('.viewer').html(res);
                $('[name="message"]').val($('#reply_email_content_body').html());

                handleCCInput(); // init "CC" input field

                initFileupload();
                initWysihtml5();
                Layout.fixContentHeight();
            },
            error: function(xhr, ajaxOptions, thrownError)
            {
                toggleButton(el);
            },
            async: false
        });
    }

    var handleCCInput = function () {
        var the = $('.inbox-compose .mail-to .inbox-cc');
        var input = $('.inbox-compose .input-cc');
        the.hide();
        input.show();
        $('.close', input).click(function () {
            input.hide();
            the.show();
        });
    }

    var handleBCCInput = function () {

        var the = $('.inbox-compose .mail-to .inbox-bcc');
        var input = $('.inbox-compose .input-bcc');
        the.hide();
        input.show();
        $('.close', input).click(function () {
            input.hide();
            the.show();
        });
    }

    var toggleButton = function(el) {
        if (typeof el == 'undefined') {
            return;
        }
        if (el.attr("disabled")) {
            el.attr("disabled", false);
        } else {
            el.attr("disabled", true);
        }
    }

    return {
        //main function to initiate the module
        init: function () {
            // handle compose btn click
            $('.inbox').on('click', '.compose-btn', function () {
                loadCompose($(this));
            });

            // handle discard btn
            $('.inbox').on('click', '.inbox-discard-btn', function(e) {
                e.preventDefault();
                loadInbox($(this), listListing);
            });

            // handle reply and forward button click
            $('.inbox').on('click', '.reply-btn', function () {
                loadReply($(this));
            });

            // handle view message
            $('.inbox').on('click', '.view-message', function () {
                loadMessage($(this));
            });

            $('.inbox').on('change', '#filter', function(event) {
                event.preventDefault();
                var that = $(this);
                
                  $('.inbox-nav > li.active >a').each(function(index, el) {
                       loadInbox($(this), listListing, $(that).val(), start_page);
                  });

            });

            $('.inbox').on("keypress", ".pagination-panel-input", function (e) {
              if (e.keyCode == 13){
                  e.preventDefault();
                  
                  $('.inbox-nav > li.active >a').each(function(index, el) {
                       loadInbox($(this), listListing, $('#filter').val(), start_page, $('.pagination-panel-input').val());
                  });
              }
            });

             $(document).keydown(function(event) {
                if (event.keyCode == 39) {
                    $('.next').click();
                }   

                if (event.keyCode == 37) {
                    $('.prev').click();
                }  
             });

            $('.inbox').on('focus, click', '.pagination-panel-input', function(event) {
                event.preventDefault();
                $(this).val('');
            });

            $('.inbox').on('focusout', '.pagination-panel-input', function(event) {
                event.preventDefault();
                $(this).val(total_pages);  
                
            });

            $('.inbox').on('click', '.pagination-control > a', function(event) {
                event.preventDefault();
                var that = $(this);

                if (that.hasClass('next')) {
                    start_page = parseInt(start_page) + parseInt($('#filter').val());
                } else {
                    start_page = parseInt(start_page) - parseInt($('#filter').val());
                }

                $('.inbox-nav > li.active >a').each(function(index, el) {
                  loadInbox($(this), listListing, $('#filter').val(), start_page);
                });
            });

            $('.inbox').on('click', '.list-actions > li > a', function (e) {
                e.preventDefault();

                var that = $(this);
                var Url = $(that).attr('href');
                var data = { 'mail_ids[]' : []};
                
                $("input[name='mails[]']:checked").each(function(){
                    //console.log(this.value);
                    data['mail_ids[]'].push(this.value);
                });

                var postData = { 'mail_ids[]' : data['mail_ids[]'], 'token' : token };
                
                $.ajax({
                    url: Url,
                    type: 'post',
                    dataType: 'json',
                    data: postData,
                })
                .done(function(response) {
                    token_name = response.token_name;
                    token = response.token;

                    $('.inbox-nav > li.active >a').each(function(index, el) {
                       loadInbox($(this), listListing, $('#filter').val(), start_page);
                    });

                    update_message_counter();
                    $('.mail-group-checkbox').prop('checked', false);
                    //$('.inbox-nav > li:first > a').click();
                    
                })
            });

            $('.inbox').on('click', '.star-marker', function () {
                var that = $(this);
                var message_id = $(this).attr('data-id');

                //console.log($(this).attr('data-id'));
                url = base_url + "messages/mark";
                $(that).prop('disabled', true);

                $.ajax({
                    type: "GET",
                    cache: false,
                    url: url,
                    dataType: "json",
                    data: { message_id: message_id },
                    
                    success: function(res) 
                    {   
                        if ($('.inbox-title').text() != 'Important') {
                            if ($(that).hasClass('inbox-started')) {
                                $(that).removeClass('inbox-started');
                            } else {
                                $(that).addClass('inbox-started');
                            } 
                            update_message_counter();

                        } else {
                            $('.inbox-nav > li.active >a').each(function(index, el) {
                                loadInbox($(this), listListing, $('#filter').val(), start_page);
                            });  
                        }
                    },

                    complete : function(){
                            $(that).prop('disabled', false);
                    },

                    async: false
                });
                
            });

            // handle inbox listing
            $('.inbox-nav > li > a').click(function () {
                loadInbox($(this), listListing, $('#filter').val(), start_page);
            });

            //handle compose/reply cc input toggle
            $('.inbox-content').on('click', '.mail-to .inbox-cc', function () {
                handleCCInput();
            });

            //handle compose/reply bcc input toggle
            $('.inbox-content').on('click', '.mail-to .inbox-bcc', function () {
                handleBCCInput();
            });

            //handle loading content based on URL parameter
            if (App.getURLParameter("a") === "view") {
                loadMessage();
            } else if (App.getURLParameter("a") === "compose") {
                loadCompose();
            } else {
               $('.inbox-nav > li:first > a').click();
            }

        }

    };

}();

jQuery(document).ready(function() {
    AppInbox.init();
});