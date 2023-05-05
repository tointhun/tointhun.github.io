let os, app;
let ua = navigator.userAgent;
let notification;

if(window.navigator.standalone){
    app = "pwa";
}else{
    app = "browser";
}

if(ua.indexOf("iPhone") > 0){
    os = "ios";
}else if(ua.indexOf("iPad") > 0){
    os = "ios";
}else if(ua.indexOf("iPod") > 0){
    os = "ios";
}else if(ua.indexOf("Android") > 0){
    os = "android";
}else{
    os = "other";
}

OneSignal.push(() => {
    OneSignal.getNotificationPermission((permission) => {
        if(permission == "granted"){
            notification = "allowed";
        }else{
            notification = "forbided";
        }
    })
})

alert(os,app,notification);