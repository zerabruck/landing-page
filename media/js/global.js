$(document).ready(function() {
    // On ready functions
    templates_render('ready');
        
    // On window load
    $(window).on('load',function() {
        templates_render('load');
    });
    
    // On window resize
    var resizeWidth = $.getViewport('get','width');
    $(window).on('resize',function() {
        setTimeoutClear('resizeTimeout',function(){
            if(resizeWidth!=$.getViewport('set','width'))
            {
                templates_render('resize');
                resizeWidth = $.getViewport('get','width');
            }
        },50); 
    });
});

// Functions 
    // Templates render
    var $templateName = $('.template_container').attr('data-templatename');
    function templates_render(eventType)
    {   
        template_global(eventType);
    }
    
    // Template global
    function template_global(eventType)
    {
        switch(eventType){
        // On ready
        case 'ready':
            // Set viewport
            $.getViewport();
            
            // Custom select
            $('.cselect').customSelect();
            $('.cselect').on('open.customSelect',function(event){
                $(this).parents('.input').removeClass('input_error');
            });
            
            // Loading animation
            $('#box_text .title_big').css('opacity',1);
            magHeadTimeline = new TimelineMax({delay:0.1})
                .to('#box_text .bg.cover',1.8,{opacity:1,scale:1,delay:0,force3D: !0, ease: Sine.easeOut},0)
                .staggerTo('#box_text .title .blue',0.7,{scaleX:1,force3D: !0, ease: Power3.easeOut},0.25,0)
                .staggerTo('#box_text .title .title_text',1.0,{opacity:1,force3D: !0, ease: Power3.easeOut,delay:0.3},0.2,0)
                .staggerTo('#box_text .animate_opacity',0.9,{opacity:1,y:0,force3D: !0, ease: Power3.easeOut,delay:0.55},0.035,0);
                
            // Form validator
            var $form_lead = $('#lead_form');
            $form_lead.formValidator({
                onValidSuccess: function(){
                    // Build data lead array
                    var dataLeadArray = {
                        'access_key' : '',
                        'name' : $form_lead.find('input[name="fullname"]').val(),
                        'phone' : $form_lead.find('input[name="phone"]').val(),
                        'email' : '',
                        'contact[unit_id]' : $form_lead.find('select[name="branch"] option:selected').attr('data-center'),
                        'contact[text_3]' : 'יום המשפחה',
                        'contact[lead_status_cat_id]' : '1696'
                    };
                    
                    // Send lead to mail  
                    $.ajax({
                        type: "POST",
                        url: $form_lead.attr('action')+'ajax-contact.php',
                        data: {
                            "submit": true,
                            "fullname": $form_lead.find('input[name="fullname"]').val(), 
                            "phone": $form_lead.find('input[name="phone"]').val(),
                            "email":'',
                            "branch":$form_lead.find('select[name="branch"] option:selected').val(),
                            "data_lead_arr":dataLeadArray
                        },
                        async: true,
                        success:function(){
                            var url = new URL(window.location.href);
                            var urlcallback = url.searchParams.get('callback');
                            urlcallback = urlcallback ? '&callback=' + urlcallback : '';
                            window.location = $form_lead.attr('action')+'?success=true' + urlcallback;
                        }
                    });
                    
                    // Show success message
                    
                }
            });
            
            // On click close thanks popup
            $('#thanks_popup').on('click','.btn_close',function(){
                TweenMax.to($('#thanks_popup'), 0.2,{opacity:0, force3D: !0, ease: Power1.easeOut,onComplete:function(){
                    $('#thanks_popup').hide();
                }});
                TweenMax.to($('#thanks_popup .box'), 0.2,{scale:0.95, ease: Power1.easeOut, force3D: !0});
                return false; 
            });

        break;
        // On load
        case 'load':
            console.log('load global');
        break;
        // On resize
        case 'resize':
            // Update viewport
            $.getViewport();
        break;                
        }
    }