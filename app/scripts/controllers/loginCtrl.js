var loginCtrl = {

    isConnected: function (success, error)
    {
        if (!localStorage.token) {
            error();
            return false;
        }

        var token = localStorage.token;

        if (token == null) {
            localStorage.token = '';
            error();
            return false;
        }

        apiCtrl.request('/token/verify', {
            method: 'POST',
            data: {
                token: token
            }
        }, function (result) {
            if (result.error) {
                localStorage.token = '';
                error();
                return false;
            }

            success();
        });
    },

    isAutorized: function (password, success, error)
    {
        if (password == null) {
            error();
            return false;
        }

        apiCtrl.request('/token/request', {
            method: 'POST',
            data: {
                password: password
            }
        }, function (result) {
            if (result.error) {
                error();
                return false;
            }

            localStorage.token = result.token;
            success();
        });
    },

    destroyToken: function ()
    {
        localStorage.token = '';
    }

};