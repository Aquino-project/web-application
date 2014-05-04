var notificationCtrl = {

    add: function(id, title, message)
    {
        var marginTop = ($('body').height() / 2);
        
        $('#notifications-container').append("<div id='"+ id +"' class='notification-overlay'> <div class='notification-box'><div class='ion-close close' data-id='"+ id +"' onclick='notificationCtrl.close(this);'></div><h1>"+ title +"</h1><p>"+ message +"</p></div> </div></div>");
    },

    close: function(current)
    {
        var id = $(current).attr('data-id');

        $('#notifications-container #'+ id).remove();
    }

}