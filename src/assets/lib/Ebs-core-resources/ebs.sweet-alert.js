var ebs = ebs || {};
(function () {
    var showMessage = function (type, message, title, isHtml, opts) {

        ebs.ui.clearBusy();

        if (!title) {
            title = message;
            message = undefined;
        }

        opts = opts || {};
        opts.title = title;
        opts.icon = type;
        opts.confirmButtonText = opts.confirmButtonText || ebs.localization.ebs('Ok');

        if (isHtml) {
            opts.html = message;
        } else {
            opts.text = message;
        }

        return Swal.fire(opts);
    };
    

    ebs.message.info = function (message, title, isHtml, opts) {
        return showMessage('info', message, title, isHtml, opts);
    };

    ebs.message.success = function (message, title, isHtml, opts) {
        return showMessage('success', message, title, isHtml, opts);
    };

    ebs.message.warn = function (message, title, isHtml, opts) {
        return showMessage('warning', message, title, isHtml, opts);
    };

    ebs.message.error = function (message, title, isHtml, opts) {
        return showMessage('error', message, title, isHtml, opts);
    };

    ebs.message.confirm = function (message, titleOrCallback, callback, isHtml, opts) {

        var title = undefined;

        if (typeof titleOrCallback === "function") {
            callback = titleOrCallback;
        }
        else if (titleOrCallback) {
            title = titleOrCallback;
        };


        opts = opts || {};
        opts.title = title ? title : ebs.localization.ebs('AreYouSure');
        opts.icon = 'warning';

        opts.confirmButtonText = opts.confirmButtonText || ebs.localization.ebs('Yes');
        opts.cancelButtonText = opts.cancelButtonText || ebs.localization.ebs('Cancel');
        opts.showCancelButton = true;
        opts.reverseButtons = true;

        if (isHtml) {
            opts.html = message;
        } else {
            opts.text = message;
        }

        return Swal.fire(opts).then(function (result) {
            callback && callback(result.value);
        });
    };
})();
