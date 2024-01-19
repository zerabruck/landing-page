// setTimeout with clear
function setTimeoutClear(varName,callback,timeVal)
{
    if(window[varName]) clearTimeout(window[varName]);
    window[varName] = setTimeout(function(){ callback(); },timeVal); 
}

// jQuery getViewport Plugin v1.0.0 - Copyright (c) 2018 Mixel - mixel@mixel.co.il
(function($){
    "use strict";    
    // Constructor
    var methods = {
        init: function() {
            methods.viewport = {};
            methods.set();
        },
        set: function(action) {
            // Get viewport width
            if(!action || action=='width')
            {
            	if(typeof window.innerWidth != 'undefined') {methods.viewport['width'] = window.innerWidth}
            	else if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){methods.viewport['width'] = document.documentElement.clientWidth}
            	else{methods.viewport['width'] = document.getElementsByTagName('body')[0].clientWidth;}
            }
            
            // Get viewport height
            if(!action || action=='height')
            {
            	if(typeof window.innerHeight != 'undefined') {methods.viewport['height'] = window.innerHeight}
            	else if(typeof document.documentElement != 'undefined' && typeof document.documentElement.clientHeight != 'undefined' && document.documentElement.clientHeight != 0){methods.viewport['height'] = document.documentElement.clientHeight}
            	else{methods.viewport['height'] = document.getElementsByTagName('body')[0].clientHeight;}
            }
            
            if(action)
                return methods.viewport[action];
        },
        get: function(action)
        {
            return methods.viewport[action];
        }
    }

    // jQuery plugin interface
    $.getViewport = function(opt) {
        if(methods[opt]) return methods[opt].apply( this, Array.prototype.slice.call(arguments, 1));
        else if(typeof opt === 'object' || !opt) return methods.init.apply(this, arguments);
    };
}(jQuery));

// jQuery customSelect Plugin v1.0.0 - Copyright (c) 2018 Mixel - mixel@mixel.co.il
(function($){
  	"use strict";
    // Constructor
    function constructor(item, options) {
        this.options = $.extend({
            customClass: '',
            onInit: function(){},
            onOpen: function(){},
            onClose: function(){},
            onOptionSelected: function(){},
            onUpdate: function(){},
        }, options);
        
        this.item = $(item);
        this.select = $(item);
        
        this.closeCustomSelectTimeout;
        this.charCountClick = 0;
        this.currentChar;
        
        this.init();
    }
    constructor.prototype = {
        init: function() {            
            this.renderSelect();
            this.bindEvents();
            this.options.onInit.call(this);
            this.item.trigger('init.customSelect');
        },
        bindEvents: function($select) {
            var plugin = this,
                $selectCustom = this.selectCustom,
                $selectCont = this.selectCont;

            // On click open select
            $selectCont.on('click','.title',function(){
                if($(this).hasClass('title_open') && !$selectCustom.hasClass('open'))
                    plugin.openSelect();
                else if(!plugin.selectSearchInput.is(":focus"))
                    plugin.closeSelect();
                return false;
            });
            
            // On select list option hover
            $selectCont.on('mouseenter','.list li',function(){
                $selectCont.find('li.active').removeClass('active');
                $(this).addClass('active');
                plugin.charCountClick = 0;
            });
            
            // On click option
            $selectCont.on('click','li',function(){
                if(!$(this).hasClass('disabled'))
                    plugin.optionSelect($(this).index());
                return false;
            });
            
            // On click option
            $selectCont.on('change','select',function(){
                plugin.optionSelect($(this).find('option:selected').index());
                return false;
            });

            // On key press search input
            plugin.selectSearchInput.on('focus',function(){
                plugin.selectSearchInput.select();
                if(!$selectCustom.hasClass('open'))
                    plugin.openSelect();
            });  
            plugin.selectSearchInput.add($selectCustom.find('.title')).on('blur',function(){
                if($selectCustom.hasClass('open'))
                    plugin.closeSelect();
            });            
            plugin.selectSearchInput.on('keyup',function(e){
                plugin.searchResults(e);
            });
            
            // Keyboard navigation
            $selectCont.on('keydown','a.title,.search_input',function(e){
                plugin.keyboardNavigation(e);
            });
        },
        renderSelect: function() {         
            var searchPlaceholder = typeof this.select.attr('data-placeholder') !== 'undefined' ? this.select.attr('data-placeholder') : '',
                selectOptionSelectedText = this.select.find("option:selected").text();
            this.isSearch = this.select.attr('data-search')=='true' ? true : false;
            
            if(!this.select.hasClass('cselect_select'))
                this.select.addClass('cselect_select').wrap('<div class="cselect_cont '+this.options.customClass+'"></div>');
            else
                this.select.next('.cselect_custom').remove();
                
            var htmlContainer = '<div class="cselect_custom'+(this.isSearch ? ' hasSearch' : '')+'">';
            if(!this.isSearch)
                htmlContainer += '<a href="javascript:;" class="title title_open"><span class="text">'+selectOptionSelectedText+'</span><span class="icon icon-chev_down"></span></a>'
            else
                htmlContainer += '<div class="title title_open"><input type="text" class="search_input" placeholder="'+searchPlaceholder+'" value="'+(searchPlaceholder=='' ? selectOptionSelectedText : '')+'" /><span class="icon icon-arrow_down"></span></div>'
                htmlContainer += '<div class="list"><div class="title title_list"><span class="text">'+selectOptionSelectedText+'</span><span class="icon icon-chev_down"></span></div><ul class="scrollbar-inner">';
                    this.select.find('option').each(function(){
                        var $this = $(this);
                        htmlContainer += '<li data-value="'+$this.val()+'" class="show'+($this.is(':selected') ? ' checked active' : '')+($this.is(':disabled') ? ' disabled' : '')+'">'+$this.text()+'</li>';
                    });
                htmlContainer += '</ul></div></div>';
                
            this.select.after(htmlContainer);
            this.selectCont = this.select.parent();
            this.selectCustom = this.selectCont.find('.cselect_custom'); 
            this.selectSearchInput = this.selectCustom.find('.search_input');
            this.selectScrollbar = this.selectCustom.find('.scrollbar-inner')
        },
        openSelect: function($this) {
            if(!this.selectCustom.hasClass('open'))
            {
                this.closeSelect(false,true);
                this.selectCustom.addClass('open overflow');                                                
                if(this.isSearch)
                {                
                    this.selectCustom.find('.list li').addClass('show').show();
                    this.selectSearchInput.focus();                                        
                }
                this.options.onOpen.call(this);
                this.item.trigger('open.customSelect');
            }
        },
        closeSelect: function(clicked,nosearch) {
            var $cselect_open = $('.cselect_custom.open'),
                $thiss = this;
            if($cselect_open.length > 0)
            {
                $cselect_open.each(function(){
                    var $this = $(this),
                        $thisSearchInput = $this.find('.search_input');
                        
                    $this.removeClass('open');
                    if(this.closeCustomSelectTimeout)
                        clearTimeout(this.closeCustomSelectTimeout);
                    this.closeCustomSelectTimeout = setTimeout(function(){
                        $this.removeClass('overflow').find('li.active').removeClass('active');
                        $this.find('li.checked').addClass('active');
                    },251);
                    
                    if($thisSearchInput.length > 0 && !nosearch)
                        $thisSearchInput.blur().val($this.parent().find('.cselect_select option:selected').text());
                    $thiss.options.onClose.call(this);
                    $thiss.item.trigger('close.customSelect');
                });
            }
        },
        optionSelect: function(index) {
            var selectSelected = this.select.find('option:eq('+index+')'),
                selectSelectedText = selectSelected.text();
                
            this.selectCont.find('li.checked').removeClass('checked');
            this.selectCont.find('li:eq('+index+')').addClass('checked');
            this.selectCont.find('.title .text').text(selectSelectedText);
            selectSelected.prop('selected',true);
            this.selectSearchInput.blur().val(selectSelectedText);
            
            this.options.onOptionSelected.call(this,selectSelected.val(),selectSelectedText);
            this.item.trigger('selected.customSelect',[selectSelected.val(),selectSelectedText]);
            this.closeSelect(true,false);
        },
        searchResults: function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code != 9 && code != 40 && code != 38)
            {
                var $thisVal = this.selectSearchInput.val(),
                    $liContainVal = this.selectCustom.find('.list li:contains("'+$thisVal+'")').filter(function(i){ return $(this).text().indexOf($thisVal) == 0; });
                
                this.selectCustom.find('.list li.show').removeClass('show');
                $liContainVal.show().addClass('show');
                this.selectCustom.find('.list li:not(.show)').hide();
                this.selectCustom.find('.list li').removeClass('active');
                $liContainVal.first().addClass('active');
                
                if(code == 13)
                {
                    if($liContainVal.length == 0 || $thisVal=='')
                        this.closeSelect();
                    else
                        this.optionSelect(this.selectCustom.find('.list li.active').index());
                    return false;
                }
            }
        },
        keyboardNavigation: function(e) {
            var code = (e.keyCode ? e.keyCode : e.which),
                $selectCustomKey = this.selectCustom;
                
            if(!$selectCustomKey.hasClass('open'))
            {
                if(code == 32)
                {
                    e.preventDefault();
                    this.openSelect();
                    return false;
                }
            }
            else
            {
                var $selectCustomKeyLi = $selectCustomKey.find('li.show'),
                    $selectCustomKeyLiLength = $selectCustomKeyLi.length,
                    $selectCustomKeyLiActive = $selectCustomKey.find('li.show.active'),
                    $selectCustomKeyLiActiveHeight = $selectCustomKeyLiActive.innerHeight(),
                    $selectCustomKeyScrollbar = this.selectScrollbar,
                    $selectCustomKeyScrollHeight = $selectCustomKeyScrollbar.height(),
                    $selectCustomKeyLiActiveIndex = $selectCustomKeyLiActive.index();
                    
                if (code == 13)
                {
                    e.preventDefault();
                    this.optionSelect($selectCustomKeyLiActive.index());
                }
                else if(code == 40 || code == 38)
                {
                    e.preventDefault();
                    $selectCustomKeyLiActive.removeClass('active');
                    
                    if(code == 40)
                    {
                        if($selectCustomKeyLiLength != ($selectCustomKeyLiActive.index()+1) && $selectCustomKeyLiLength > 1)
                            $selectCustomKeyLiActive.next('.show').addClass('active');
                        else
                            $selectCustomKey.find('li.show:first').addClass('active');
                    }
                    else if (code == 38)
                    {
                        if($selectCustomKeyLiActive.index()!=0 && $selectCustomKeyLiLength > 1)
                            $selectCustomKeyLiActive.prev('.show').addClass('active');
                        else
                            $selectCustomKey.find('li.show:last').addClass('active');
                    }

                    if(($selectCustomKeyScrollbar.scrollTop()+$selectCustomKeyScrollHeight) <= (($selectCustomKeyLiActiveIndex+1)*$selectCustomKeyLiActiveHeight))
                        $selectCustomKeyScrollbar.scrollTop(!$selectCustomKeyLi.first().hasClass('active') ? ((($selectCustomKeyLiActiveIndex+1)*$selectCustomKeyLiActiveHeight)-($selectCustomKeyScrollHeight-$selectCustomKeyLiActiveHeight)) : 0);
                    else if($selectCustomKeyScrollbar.scrollTop() >= (($selectCustomKeyLiActiveIndex-1)*$selectCustomKeyLiActiveHeight))
                        $selectCustomKeyScrollbar.scrollTop(!$selectCustomKeyLi.last().hasClass('active') ? (($selectCustomKeyLiActiveIndex-1)*$selectCustomKeyLiActiveHeight) : 999999);
                }
                else if((code >= 65 && code <= 90) || code==188)
                {
                    var keycodeToCharArr = {65:"ש",66:"נ",67:"ב",68:"ג",69:"ק",70:"כ",71:"ע",72:"י",73:"ן",74:"ח",75:"ל",76:"ך",77:"צ",78:"מ",79:"ם",80:"פ",81:false,82:"ר",83:"ד",84:"א",85:"ו",86:"ה",87:false,88:"ס",89:"ט",90:"ז",};
                    if(keycodeToCharArr[code])
                    {    
                        var $liContainVal = $selectCustomKey.find('.list li.show').filter(function(i){ return $(this).text().indexOf(keycodeToCharArr[code]) == 0; });
                        
                        if(this.currentChar==code && ($liContainVal.length-1)>charCountClick)
                            charCountClick++
                        else
                            charCountClick = 0;

                        $selectCustomKeyLiActive.removeClass('active');
                        $($liContainVal[charCountClick]).addClass('active');
                            
                        var $selectCustomKeyLiActive = $($liContainVal[charCountClick]);
                            
                        if((($selectCustomKeyScrollbar.scrollTop()+$selectCustomKeyScrollHeight) < (($selectCustomKeyLiActiveIndex+1)*$selectCustomKeyLiActiveHeight)) || ((($selectCustomKeyLiActiveIndex)*$selectCustomKeyLiActiveHeight) < $selectCustomKeyScrollbar.scrollTop()))
                            $selectCustomKeyScrollbar.scrollTop((($selectCustomKeyLiActiveIndex+1)*$selectCustomKeyLiActiveHeight)-$selectCustomKeyScrollHeight);
                            
                        this.currentChar = code;
                    }
                }
            }
        },
        updateData: function(jsonUrl,ignoreFirst) {
            var $this = this,
                $thisSelect = this.select;
                
            $.getJSON(jsonUrl).done(function(data){
                
                // If ignore first option
                if(ignoreFirst)
                    data.options.splice(0, 1);
                
                // Set new data
                var optionsHtml = '';
                $.each(data.options, function(i, item) {
                    optionsHtml += '<option value="'+item[0]+'">'+item[1]+'</option>';
                });
                $thisSelect.html(optionsHtml);
                
                // Render again
                $this.renderSelect();
                
                $this.options.onUpdate.call(this);
                $this.item.trigger('update.customSelect');
            });
        }
    }

    // jQuery plugin interface
    $.fn.customSelect = function(opt){
        // Construct plugin
        var args = Array.prototype.slice.call(arguments, 1);
        if($(this).length > 0)
            return this.each(function(){
                var item = $(this), instance = item.data('constructor');
                if(!instance) item.data('constructor', new constructor(this, opt));
                else if(instance && typeof opt === 'string') instance[opt].apply(instance, args);
            });
        else
            return this;
    }
}(jQuery));

// jQuery formValidator Plugin v1.0.0 - Copyright (c) 2018 Mixel - mixel@mixel.co.il
(function($){
    // Constructor
    function constructor(item, options) {
        this.options = $.extend({
            onValidSuccess: function(){},
            onValidError: function(){},
        }, options);
        
        this.item = $(item);
        this.form = $(item);

        this.init();
    }
    constructor.prototype = {
        init: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            var plugin = this,
                $form = this.form;
                
            // On submit form
            $form.on('submit',function(e){
                e.preventDefault();
                plugin.validate();
                return false;
            });
            $form.on('click','.submit',function(e){
                e.preventDefault();
                plugin.validate();
                return false;
            });
                
            // Reset form error
            $form.on('keypress keyup','.input_error input[type="text"],.input_error textarea', function(e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if((code >= 65 && code <= 90) || code==188 || code==32)
                    $(this).parents('.input_validate').removeClass('input_error');
            });
            $form.on('change','.input_error input[type="checkbox"]', function() {
                $(this).parents('.input_validate').removeClass('input_error');
            });
            $form.on('click','.input_error select,.input_error .cselect_cont', function() {
                $(this).parents('.input_validate').removeClass('input_error');
            });
        },
        validate: function() {
            var plugin = this,
                $form = this.form,
                contactErrors = false,
                cntFocus = 0;

            if(!$form.hasClass('submited'))
            {  
                $form.addClass('submited');
                
                // Remove previous errors
                $form.find('.input_error').removeClass('input_error');
                
                $form.find('.input_validate:visible').each(function(index){
                    // Input vars
                    var $this = $(this),
                        $thisInput = $this.find('input,textarea,select'),
                        $thisInputVal = $thisInput.val(),
                        $thisInputValueLength = $thisInputVal.replace(/ /g,'').length,
                        $thisInputEmpty = $thisInputValueLength == 0 ? true : false,
                        $thisDataMustFill = $thisInput.attr('data-mustfill')== 'true' ? true : false,
                        $thisDataInputType = $thisInput.attr('data-inputtype'),
                        $thisDataMinLength = $thisInput.attr('data-minlength'),
                        $thisDataMaxLength = $thisInput.attr('data-maxlength'),
                        $thisDataErrorMsg = typeof $thisInput.attr('data-errormsg')!='undefined' ? $thisInput.attr('data-errormsg') : false,
                        $thisTooltipError = $this.find('.tooltip_error'),
                        inputError = false,
                        inputError = '';
                            
                    // Check if input valid
                        // Check must fill
                        if($thisDataMustFill && $thisInputEmpty && $thisDataInputType!='checkbox')
                            inputError = 'יש למלא את השדה';
                                
                        // Check min length
                        else if($thisDataMinLength && $thisInputValueLength < $thisDataMinLength && !$thisInputEmpty)
                            inputError = 'הטקסט כאן קצר מידי, לפחות '+$thisDataMinLength+' תווים';

                        // Check max length
                        else if($thisDataMaxLength && $thisInputValueLength > $thisDataMaxLength)
                            inputError = 'הטקסט כאן ארוך מידי, מקסימום '+$thisDataMaxLength+' תווים';

                        // Check string no numbers
                        else if($thisDataInputType=='onlyletters' && !(/^[a-zA-Zא-ת'"]*$/.test($thisInputVal.replace(/ /g,''))) && !$thisInputEmpty)
                            inputError = 'אפשר למלא כאן רק אותיות';
    
                        // Check string only numbers
                        else if($thisDataInputType=='onlynumbers' && !(/^[0-9]*$/.test($thisInputVal)) && !$thisInputEmpty)
                            inputError = 'אפשר למלא כאן רק מספרים';
   
                        // Check email valid
                        else if($thisDataInputType=='email' && !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($thisInputVal)) && !$thisInputEmpty)
                            inputError = 'כתובת המייל לא תקינה';
   
                        // Check phone valid
                        else if($thisDataInputType=='phone' && !/^((\+972|972)|0)( |-)?([2-48-9]( |-)?\d{7}|(5|7)[0-9]( |-)?\d{7})$/.test($thisInputVal) && !$thisInputEmpty)
                            inputError = 'מספר הטלפון אינו תקין';

                        // Check id valid
                        else if($thisDataInputType=='id' && !plugin.customValidate('id',$thisInputVal) && !$thisInputEmpty)
                            inputError = 'תעודת הזהות לא תקינה';
   
                        // Check cvv valid
                        else if($thisDataInputType=='cvv' && !(/^[0-9]{3,4}$/.test($thisInputVal)) && !$thisInputEmpty)
                            inputError = 'קוד CVV אינו תקין';
    
                        // Check credit date
                        else if($thisDataInputType=='creditdate' && (parseInt($thisInputVal.split('/')[0]) < 1 || parseInt($thisInputVal.split('/')[0]) > 12 || parseInt($thisInputVal.split('/')[1]) < 17 || parseInt($thisInputVal.split('/')[1]) > 99) && !$thisInputEmpty)
                            inputError = 'תוקף הכרטיס אינו תקין';
   
                        // Validate fill for checkbox
                        else if($thisDataInputType=='checkbox' && !$thisInput.is(":checked") && $thisDataMustFill)
                            inputError = 'סמן בבקשה את הצ\'קבוקס';
                    
                    // Add class and set focus
                        if(inputError)
                        {
                            // Set errors true
                            contactErrors = true;
                            
                            // Set tooltip error
                            if($thisDataErrorMsg)
                                inputError = $thisDataErrorMsg;
                            if($thisTooltipError.length > 0)
                                $thisTooltipError.html(inputError);
                            else
                                $('<div class="tooltip_cont tooltip_error">'+inputError+'</div>').insertAfter($thisInput);
                                    
                            // Add class error to input
                            $this.addClass('input_error');
                                
                            // If its first error focus input
                            cntFocus++;
                            if(cntFocus==1 && !$thisInput.hasClass('cselect'))
                                $thisInput.focus();
                        }
                });
                
                if(!contactErrors)
                {
                    this.options.onValidSuccess.call(this);
                    this.item.trigger('validSuccess');
                }
                else
                {
                    $form.removeClass('submited');
                    this.options.onValidError.call(this);
                    this.item.trigger('validError');
                }
            }
        },
        customValidate: function(typeValidate,value) {
            switch(typeValidate){
                case 'id':
                    value += "";
                    if (value.length != 9 || isNaN(value))
                        return false;
                    var counter = 0, incNum;
                    for (i in value){
                        incNum = Number(value[i]) * ((i % 2) + 1);
                        counter += (incNum > 9) ? incNum - 9 : incNum;
                    }
                    return (counter % 10 == 0);
                    break;
            }
        }
    }

    // jQuery plugin interface
    $.fn.formValidator = function(opt){
        // Construct plugin
        var args = Array.prototype.slice.call(arguments, 1);
        if($(this).length > 0)
            return this.each(function(){
                var item = $(this), instance = item.data('constructor');
                if(!instance) item.data('constructor', new constructor(this, opt));
                else if(instance && typeof opt === 'string') instance[opt].apply(instance, args);
            });
        else
            return this;
    }
}(jQuery));