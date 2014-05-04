var apiCtrl = {

    url: "http://192.168.0.13",
    port: 1337,

    connect: function (uri, params, success)
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

        var apiContactUrl = this.url +":"+ this.port + uri;

        $.ajax({
            url: apiContactUrl,
            data: params.data,
            type: params.method
        }).
            success(function(result) 
            {
                success(result);
            });
    }

};