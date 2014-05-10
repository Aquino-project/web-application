/*
 * COMMANDES
 * 0: UP
 * 1: STOP
 * 2: DOWN
 * 4: GAUCHE
 * 6: DROITE
*/
var opts = {
    user: "admin",
    pwd: ""
};

apiCtrl.request('/camera/address', [], function (datas) {
    if (datas.error) {
        return false;
    }
    
    opts['ip'] = datas.ip;
    initCam(opts);
});

function writeCommand(type, opts)
{
    var command = 1;

    switch (type) {
        case 'up':
            command = 0;
            break;
        case 'down': 
            command = 2;
            break;
        case 'left':
            command = 4;
            break;
        case 'right':
            command = 6;
            break;
    }

    $.ajax({
        url: 'http://'+ opts['ip'] +'/decoder_control.cgi?command='+ command +'&user='+ opts['user'] +'&pwd='+ opts['pwd']
    });
}

function initCam(opts)
{
    $.ajax({
        url: 'http://'+ opts['ip'] +'/set_misc.cgi?led_mode=2&ptz_patrol_rate=10&ptz_auto_patrol_interval=0&Ptz_patrol_v_round=0&Ptz_patrol_h_round=0&user='+ opts['user'] +'&pwd='+ opts['pwd']
    });
}