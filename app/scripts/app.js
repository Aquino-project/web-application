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
    $('body').on('click', '.change-page', function (event) {
        event.preventDefault();
        var page = $(this).attr('data-page');
        var $content = $('#content');

        Template.load(page, $content);
    });

    // Selectionne les tabs du menu
    $('#nav').on('click', 'h3', function () {
        $('#nav').removeClass('active');
        $('#content').removeClass('active');
        $('#header').removeClass('active');
        
        $('#nav h3.active').removeClass('active');
        $(this).addClass('active');
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

    $('body').on('click', '.disp-back', function() {
        UI.showBack();
    });

    $('#to-feed').on('click', function() {
        apiCtrl.connect('/feed/now', [], function (result) {
            alert(result);
        });
    });

});