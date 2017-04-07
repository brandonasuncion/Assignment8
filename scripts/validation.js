(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        isDecafValid: function(order, strength) {
            return !(order.includes('decaf') && (strength > 20));
        },
        isEmailDuplicate: function(email) {
            var data;
            $.ajax({
                url: 'http://localhost:3002/coffeeorders?emailAddress=' + email,
                success: function(d) {
                    data = d;
                },
                async: false
            });
            return data !== null;

        }
    };
    App.Validation = Validation;
    window.App = App;
})(window);
