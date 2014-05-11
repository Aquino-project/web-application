$(document).ready(function () {

    loginCtrl.isConnected(
        // Si il est connecte
        function () { },
        // Si il est deconnecte
        function () {
            window.location.href = 'index.html';
        }
    );

    // Verification des notifs
    checkNotifs();
    setInterval(checkNotifs, 60000);

    // Verification logo state
    setInterval(logoState, 1000);

});

function checkNotifs ()
{
    apiCtrl.request('/alerts/count', [], function (datas) {
        if (datas.error) {
            return false;
        }

        if (datas.count > 0) {
            $('#alerts-count').html(datas.count);
        }
    });
}

function logoState ()
{
    var count = parseInt($('#alerts-count').html());
    var state = $('#aquarium-state');
    var type = state.attr('data-type');

    if (count > 0) {
        if (type == 'on') {
            $('#aquarium-state').attr('src', 'static/images/thumb/off.png');
            $('#aquarium-state').attr('data-type', 'off');
        }
    } else {
        if (type == 'off') {
            $('#aquarium-state').attr('src', 'static/images/thumb/on.png');
            $('#aquarium-state').attr('data-type', 'on');
        }
    }
}