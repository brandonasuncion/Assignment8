(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    App.achieved = [];

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }


        // Silver Challenge: Showing the Value as the Slider Changes
        $('#strengthLevel').on('input', function() {
            //console.log($(this).val());
            var label = $('#strengthValue');
            label.text($(this).val());
            label.css('color', 'hsl(' + (100 - $(this).val()) + ', 100%, 50%)');
        });
        $('#strengthLevel').trigger('input');


    }
    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            /*
            // Gold Challenge: Adding Achievements
            App.email = $('#emailInput').val();
            if ((App.achieved.indexOf(App.email) == -1) && (data['size'] == 'Coffee-zilla') && (data['strength'] == '100') && (data['flavor'] != '')) {
                console.log('Unlocked Achievement');
                $('#myModal').modal('show');
            }
            */
            console.log(data);
            fn(data).then(function() {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        });
    };

    /*
    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!'
                event.target.setCustomValidity(message);
            }
        });
    };
    */

    FormHandler.prototype.addInputHandler = function(fn, fn2) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!'
                event.target.setCustomValidity(message);
            }
        });

        this.$formElement.on('input', '[name="coffee"], [id="strengthLevel"]', function(event) {
            var message = '';
            if (fn2($('[name="coffee"]').val(), $('[id="strengthLevel"]').val())) {
                $('[id="strengthLevel"]').get(0).setCustomValidity('');
                //console.log('Valid strength value');
            } else {
                message = 'Strength value is not valid for decaf orders!'
                $('[id="strengthLevel"]').get(0).setCustomValidity(message);
                //console.log(message);
            }
        });
        $('[name="coffee"]').trigger('input');
    };


    /*
    // Gold Challenge: Adding Achievements
    $('#emailInput').on('input', function() {
        if (App.achieved.indexOf($(this).val()) != -1) {
            $('.powerUpOption').show();
        } else {
            $('.powerUpOption').hide();
        }
    });
    $('#emailInput').trigger('input');

    $(document).on('click', '.btn-primary', function() {
        if ((App.email != '') && (App.achieved.indexOf(App.email) == -1)) {
            App.achieved.push(App.email);
            console.log('Added ' + App.email + ' to achievement list.');
            $('#emailInput').trigger('input');
        }
    });
    */

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
