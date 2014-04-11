$(document).ready(function() {
    
    // Affiche le menu
    $('#display-nav').on('click', function () {
        $('#nav, #header, #content').toggleClass('active');
    });

    // Animation a la suppression
    $('.delete-item').on('click', function () {
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

});