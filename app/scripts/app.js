var currentPage = "dashboard/index";
var oldPage = "";

var app = {
    init: function ()
    {
        Template.load('dashboard/index', $('#content'));
    }
};

var UI = {
    showBack: function () {
        $('#display-nav').hide();
        $('#back').addClass('active');
    },

    hideBack: function () {
        $('#back').removeClass('active');
        $('#display-nav').show();
    }
};

var Template = {
    load: function (page, $content) {
        oldPage = currentPage;
        currentPage = page;

        $.get('views/'+ page +'.html', function (result) {
            $content.html(result);
        })
            .error(function () {
                var errorTemplate = $('#template-error').html();
                $('#content').html(errorTemplate);
            });
    }
};

$(document).ready(function() {

    FastClick.attach(document.body);

    app.init();
    
    // Systeme de changement de page
    $('body').on('click', '.change-page[data-page]', function (event) {
        event.preventDefault();
        var page = $(this).attr('data-page');
        var $nav = $('#nav');
        var $content = $('#content');
        var $header = $('#header');

        // Cache le menu si il est affiché
        if ($nav.hasClass('active')) {
            $nav.removeClass('active');
            $content.removeClass('active');
            $header.removeClass('active');
        }
        
        $('#nav h3.active').removeClass('active');
        $('#nav h3[data-page="'+ page +'"]').addClass('active');

        Template.load(page, $content);
    });

    // Affiche le menu
    $('#display-nav').on('click', function () {
        $('#nav, #header, #content').toggleClass('active');
    });

    // Affiche les notifs
    $('#display-notif').on('click', function() {
        $(this).hide();
        $('#hide-notif').show();
    });

    // Cache les notifs
    $('#hide-notif').on('click', function() {
        $(this).hide();
        $('#display-notif').show();

        Template.load(oldPage, $('#content'));
    });

    // Animation a la suppression
    $('#content').on('click', '.delete-item', function () {
        var $current = $(this);
        var $item = $(this).parent();
        var $list = $item.parent();

        $item.addClass('animated slideOutLeft');
        setTimeout(function() {
            $item.remove();
        }, 500);

        setTimeout(function() {
            if ($list.children('.item').length <= 0) {
                $list.html('<br><center>Aucune notification</center>');
            }
        }, 600);
    });

    // Back
    $('#back').on('click', function() {
        var hasClass = $(this).hasClass('active');

        if (hasClass == true) {
            Template.load(oldPage, $('#content'));
            UI.hideBack();
        } else {
            UI.showBack();
        }
    });

    // Fix du bouton back quand on click dans le menu
    $('body').on('click', '.disp-back', function() {
        UI.showBack();
    });

    // Donne la nourriture maintenant
    $('#to-feed').on('click', function() {
        apiCtrl.request('/feed/now', [], function (result) {
            if (result.error == true) {
                notificationCtrl.add('feed-no', 'Opération échouée', result.message);
                return false;
            }

            notificationCtrl.add('feed-ok', 'Opération réussie', result.message);
            return true;
        });
    });

    // Deconnecte l'utilisateur
    $('#logout').on('click', function () {
        loginCtrl.destroyToken();
        window.location.href = 'index.html';
    });

});