/**
 * jQuery DateTimeSelector Plugin
 * Version: 0.1
 * Update: 09/20/2016
 *
 * Author: Valery Koretsky
 * Copyrigth: 2016, Valery Koretsky, valerykoretsky.com
 *
 * License: MIT
 * https://github.com/AtaELL/jquery.dateTimeSelector/blob/master/LICENSE
 */

(function($){
    jQuery.fn.dateTimeSelector = function(options){
        options = $.extend({
            // Format options
            // Y - year, m - month, d - day, H - hour, i - minute, s - second
            format : 'Y-m-d H:i:s',

            // Container options
            sectionTag : '',
            sectionClass : '',
            sectionDateTag : '',
            sectionDateClass : '',
            sectionTimeTag : '',
            sectionTimeClass : '',

            // Year options
            yearDefault : 'Select year',
            yearValue : (new Date).getFullYear(),
            yearMin   : (new Date).getFullYear()-5,
            yearMax   : (new Date).getFullYear()+5,
            yearClass : '',

            // Month options
            monthDefault : 'Select month',
            monthValue : '',
            monthNames : {
                    1 : 'January',
                    2 : 'February',
                    3 : 'March',
                    4 : 'April',
                    5 : 'May',
                    6 : 'June',
                    7 : 'July',
                    8 : 'August',
                    9 : 'September',
                    10 : 'October',
                    11 : 'November',
                    12 : 'December'
                },
            monthClass : '',

            // Day options
            dayDefault : 'Select day',
            dayValue : '',
            dayClass : '',

            // Hour options
            hourDefault : 'Select hour',
            hourValue : '',
            hourClass : '',

            // Minute options
            minuteDefault : 'Select minute',
            minuteValue : '',
            minuteClass : '',

            // Second options
            secondDefault : 'Select second',
            secondValue : '',
            secondClass : ''
        }, options);

        var formatArray = [];
        var separatorArray = [];
        var dateValueArray = '';

        // Prefix & suffix for selectors name
        var selector_start = 'dts_';
        var selector_end = '_dte';

        var getOption = {
            y : function(value){
                var min = options.yearMin;
                var max = options.yearMax;
                value = (value) ? value : options.yearValue;
                var result = (options.yearDefault) ? '<option value="----">' + options.yearDefault + '</option>' : '';
                var selected = '';

                for(var i = min; i <= max; i++) {
                    selected = '';
                    if(i == value) { selected = 'selected'; }

                    result += '<option value="' + i +'" ' + selected + '>' + i + '</option>';
                }

                return result;
            },
            m : function(value){
                value = (value) ? value : options.monthValue;
                var names = options.monthNames;
                var result = (options.monthDefault) ? '<option value="--">' + options.monthDefault + '</option>' : '';
                var selected = '';

                for(var i = 1; i <= 12; i++) {
                    selected = '';
                    print_i = i;
                    if(i == value) { selected = 'selected'; }
                    if(print_i < 10) { print_i = '0' + print_i; }

                    result += '<option value="' + print_i +'" ' + selected + '>' + names[i] + '</option>';
                }

                return result;
            },
            d : function(value){
                value = (value) ? value : options.dayValue;
                var result = (options.dayDefault) ? '<option value="--">' + options.dayDefault + '</option>' : '';
                var selected = '';

                for(var i = 1; i <= 31; i++) {
                    selected = '';
                    print_i = i;
                    if(i == value) { selected = 'selected'; }
                    if(print_i < 10) { print_i = '0' + print_i; }

                    result += '<option value="' + print_i +'" ' + selected + '>' + print_i + '</option>';
                }

                return result;
            },
            h : function(value){
                value = (value) ? value : options.hourValue;
                var result = (options.hourDefault) ? '<option value="--">' + options.hourDefault + '</option>' : '';
                var selected = '';

                for(var i = 0; i <= 23; i++) {
                    selected = '';
                    print_i = i;
                    if(i == value && value != '') { selected = 'selected'; }
                    if(print_i < 10) { print_i = '0' + print_i; }

                    result += '<option value="' + print_i +'" ' + selected + '>' + print_i + '</option>';
                }

                return result;
            },
            i : function(value){
                value = (value) ? value : options.minuteValue;
                var result = (options.minuteDefault) ? '<option value="--">' + options.minuteDefault + '</option>' : '';
                var selected = '';

                for(var i = 0; i <= 59; i++) {
                    selected = '';
                    print_i = i;
                    if(i == value && value != '') { selected = 'selected'; }
                    if(print_i < 10) { print_i = '0' + print_i; }

                    result += '<option value="' + print_i +'" ' + selected + '>' + print_i + '</option>';
                }

                return result;
            },
            s : function(value){
                value = (value) ? value : options.secondValue;
                var result = (options.secondDefault) ? '<option value="--">' + options.secondDefault + '</option>' : '';
                var selected = '';

                for(var i = 0; i <= 59; i++) {
                    selected = '';
                    print_i = i;
                    if(i == value && value != '') { selected = 'selected'; }
                    if(print_i < 10) { print_i = '0' + print_i; }

                    result += '<option value="' + print_i +'" ' + selected + '>' + print_i + '</option>';
                }

                return result;
            }
        };

        var getFormat = function(){
            var format = options.format;
            format = format.toLowerCase();

            formatArray = format.replace(/\W/g, '').split('');
            separatorArray = format.replace(/\w/g, '').split('');
            if(dateValueArray != '') {
                dateValueArray = dateValueArray.replace(/\W/g, '-').split('-');
            }

            return false;
        };

        var getValue = function(selector){
            return $(selector).val();
        };

        var getName = function(selector){
            return $(selector).attr('name');
        };

        var getId = function(selector){
            return $(selector).attr('id');
        };

        var getClass = function(index){
            var _class = '';

            switch (index) {
                case 'y':
                    _class = options.yearClass;
                    break;
                case 'm':
                    _class = options.monthClass;
                    break;
                case 'd':
                    _class = options.dayClass;
                    break;
                case 'h':
                    _class = options.hourClass;
                    break;
                case 'i':
                    _class = options.minuteClass;
                    break;
                case 's':
                    _class = options.secondClass;
                    break;
            }

            return _class;
        }

        var getSelect = function(index, selector, option){
            var result = '';
            var _class = getClass(index);

            result = '<select id="' + selector + '_' + index + selector_end + '" name="' + selector + '[' + index + ']" class="' + _class + '" data-format="' + options.format + '">';
            result += option;
            result += '</select>';
            return result;
        };

        var selectCreate = function(selector){
            var result = '';
            var tmp = '';
            var index = '';
            var container = 0;
            var container_type = '';

            for(var i = 0; i < formatArray.length; i++) {
                index = formatArray[i];
                tmp = getOption[index](dateValueArray[i]);

                if(index == 'y' || index == 'd' || index == 'm') {
                    if(container_type == 'Time') {
                        result += '</' + options.sectionTimeTag + '>';
                        container_type = '';
                    }
                    if(container_type != 'Date' && options.sectionDateTag.length) {
                        container_type = 'Date';
                        container = 'start';
                    }
                }
                if(index == 'h' || index == 'i' || index == 's') {
                    if(container_type == 'Date') {
                        result += '</' + options.sectionDateTag + '>';
                        container_type = '';
                    }
                    if(container_type != 'Time' && options.sectionTimeTag.length) {
                        container_type = 'Time';
                        container = 'start';
                    }
                }
                if(container == 'start') {
                    result += '<' + options['section' + container_type + 'Tag'] + ' class="' + options['section' + container_type + 'Class'] + '">';
                    container = '';
                }
                result += getSelect(index, selector, tmp);
            }
            if(container_type != '') {
                result += '</' + options['section' + container_type + 'Tag'] + '>';
            }

            return result;
        };

        var getSelectParams = function(id){
            var re = /dts_(id|name)_(.*)_(y|m|d|h|i|s)_dte/ig,
                match, params = {},
                decode = function (s) {return s.replace(/\+/g, " ");};

            var match = re.exec(id);
            return match;
        };

        var getSelectValue = function(selector){
            var result = '';
            var index = '';
            var value = '';

            for(var i = 0; i < formatArray.length; i++) {
                index = formatArray[i];
                value = getValue('#' + selector + '_' + index + selector_end);

                if(separatorArray[i] == undefined) { separatorArray[i] = ''; }
                result += value + separatorArray[i];
            }

            return result;
        };

        var clear = function(){
            formatArray = [];
            separatorArray = [];
            dateValueArray = '';
            return false;
        };

        $(document).on("change", "select[id^=dts_][id$=_dte]", function() {
            options.format = $(this).data('format');
            getFormat();

            var id = getId(this);
            var params = getSelectParams(id);
            var type = params[1];
            var name = params[2];
            var selector = selector_start + type + '_' + name;
            var value = getSelectValue(selector);

            selector = "[" + type + "='" + name + "']";
            $(selector).val(value);
            return false;
        });

        var init = function(element) {
            var selector = '';
            var name = getName(element);
            var id = getId(element);
            dateValueArray = getValue(element);
            getFormat();

            if(id != undefined) {
                selector = selector_start + 'id_' + id;
            } else {
                selector = selector_start + 'dts_name_' + name;
            }

            var selectHTML = selectCreate(selector);
            if(options.sectionTag != '') {
                selectHTML = '<' + options.sectionTag + ' class="' + options.sectionClass + '">' + selectHTML + '</' + options.sectionTag + '>';
            }
            $(element).hide();
            $(element).parent().append(selectHTML);

            //clear();

            return false;
        };

        return this.each(function() {
            init(this);
        });
    }
})(jQuery);