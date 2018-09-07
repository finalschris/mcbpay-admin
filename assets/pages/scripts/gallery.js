var FormFileUpload = function () {
    return {
        //main function to initiate the module
        init: function () {

             // Initialize the jQuery File Upload widget:
            $('#fileupload').fileupload({
                disableImageResize: false,
                autoUpload: false,
                disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
                maxFileSize: 5000000,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                url: 'gallery_maintenance/upload'
                // Uncomment the following to send cross-domain cookies:
                //xhrFields: {withCredentials: true},                
            });

            $('#fileupload')
                .bind('fileuploaddestroyed', function (e, data) {
                 console.log(data);
                if (data.context.length == 0) {
                    $('#no_data').show();
                } else {
                    $('#no_data').hide();
                }    
            });

            $('#fileupload')
                .bind('fileuploadcompleted', function (e, data) {
                //console.log(data.context);
                if (data.context.length == 0) {
                    $('#no_data').show();
                } else {
                    $('#no_data').hide();
                }

            });    
            // Enable iframe cross-domain access via redirect option:
            $('#fileupload').fileupload(
                'option',
                'redirect',
                window.location.href.replace(
                    /\/[^\/]*$/,
                    '/cors/result.html?%s'
                )
            );

            // Upload server status check for browsers with CORS support:
            if ($.support.cors) {
                $.ajax({
                    type: 'HEAD'
                }).fail(function () {
                    $('<div class="alert alert-danger"/>')
                        .text('Upload server currently unavailable - ' +
                                new Date())
                        .appendTo('#fileupload');
                });
            }

            // Load & display existing files:
            $('#fileupload').addClass('fileupload-processing');
            $.ajax({
                // Uncomment the following to send cross-domain cookies:
                //xhrFields: {withCredentials: true},
                url: base_url+'gallery_maintenance/load_files',//$('#fileupload').attr("action"),
                dataType: 'json',
                context: $('#fileupload')[0]
            }).always(function () {
                $(this).removeClass('fileupload-processing');
            }).done(function (result) {
                $(this).fileupload('option', 'done')
                .call(this, $.Event('done'), {result: result});

                if (result.files.length == 0) {
                    $('#no_data').show();
                }
            });
        }

    };

}();

jQuery(document).ready(function() {
    FormFileUpload.init();
});