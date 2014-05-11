$(document).ready(function () {

    loginCtrl.isConnected(
        // Si il est connecte
        function () {
            window.location.href = 'dashboard.html';
        },
        // Si il est deconnecte
        function () { }
    );

    $('#login').on('submit', function (event) {
        event.preventDefault();
        var password = $('#password').val();

        $('#password').blur();
        $('#password').val('');

        loginCtrl.isAutorized(password,
            // En cas de succes
            function () {
                window.location.href = 'dashboard.html';
            },
            // En cas d'erreur
            function () {
                alert('Mot de passe invalide');
            }
        );
    });

});