angular.module('app.services')

.factory("NotificaService",function($cordovaLocalNotification,$cordovaVibration,$cordovaDialogs){
   
    $cordovaLocalNotification.ontrigger = function (id, state, json) {
        var vibrate = localStorage.getItem("vibra")=="true";
        var sound = localStorage.getItem("sound")=="true";
        
        if(sound)
            $cordovaDialogs.beep(1);
        if(vibrate)
            $cordovaVibration.vibrate(100);
        
    };
    return{
        addNotification: function(id,msg,title,date){
            if(date)
                window.plugin.notification.local.add({
                  id: id,
                  title:   title,
                  message: msg,
                  date:date,
                });
            else
                window.plugin.notification.local.add({
                  id: id,
                  title:   title,
                  message: msg,                  
                });
        },
        notify: function(){
                var vibrate = localStorage.getItem("vibra")=="true";
                var sound = localStorage.getItem("sound")=="true";

                if(sound)
                    $cordovaDialogs.beep(1);
                if(vibrate)
                    $cordovaVibration.vibrate(2000);
            }
    };

});
