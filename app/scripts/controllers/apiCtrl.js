var apiCtrl = {

    url: "http://localhost",
    port: 1337,

    request: function (uri, params, success, error)
    {
        if (!params) {
            params = [];
        }

        if (!params.method) {
            params.method = "GET";
        }

        if (!params.data) {
            params.data = [];
        }

        if (!error) {
            error = function () { };
        }

        var apiContactUrl = this.url +":"+ this.port + uri;

        $.ajax({
            url: apiContactUrl,
            data: params.data,
            type: params.method
        }).
            success(function(result) 
            {
                success(result);
            }).
            error(function(error)
            {
                error(error);
            });
    }

};