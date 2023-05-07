let ua = navigator.userAgent;
let os, app, browser, sub;


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


if(window.navigator.userAgent.toLowerCase().indexOf("safari") != -1 && window.navigator.userAgent.indexOf("GSA") == -1){
    browser = "safari";
}else if(window.navigator.userAgent.toLowerCase().indexOf("safari") != -1 && window.navigator.userAgent.indexOf("GSA") != -1){
    browser = "google app"
}else{
    browser = "other"
}




const show_page = (page) =>{
    let pages = ["middle_index","middle_sub"];
    for(let i = 0; i < pages.length; i++){
        if(page != pages[i]){
            document.getElementById(pages[i]).style.display = "none";
        }else{
            document.getElementById(pages[i]).style.display = "block";
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    OneSignal.getNotificationPermission().then(function(permission) {
        if(permission == "granted"){
            sub = "sub";
        }else{
            sub = "unsub";
        }


        //alert(os + "," + app + "," + browser + "," + sub)

        if(os == "ios"){
            if(app == "pwa"){
                if(sub == "sub"){
                    show_page("middle_index");
                }else if(sub == "unsub"){
                    show_page("middle_sub");
                }
            }else if(app == "browser"){
                if(browser == "safari"){
                    //add_home.html
                }else if(browser == "google app"){
                    //tosafari_fromgoogle.html
                }else if(browser == "other"){
                    //tosafari.html
                }
            }
        }else if(os == "android"){
            if(app == "pwa"){
                if(sub == "sub"){
                    //index.html
                }else if(sub == "unsub"){
                    //sub.html
                }
            }else if(app == "browser"){
                //add.html
            }
        }else{
            if(sub == "sub"){
                //index.html
            }else if(sub == "unsub"){
                //sub.html
            }
        }
    });
});





const sub_button = () => {
    if(document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-unsubscribed").length == 1){
        document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-unsubscribed")[0].click();
        show_page("middle_index");
    }else if(document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-subscribed").length == 1){
        document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-subscribed")[0].click();
    }
}


alert("a")
OneSignal.on('notificationPermissionChange', function(permissionChange) {
    var permission = permissionChange.to;
    if (permission === 'granted') {
        // 通知の許可が与えられた場合の処理
        alert('通知が許可されました');
    } else {
        // 通知の許可が与えられなかった場合の処理
        alert('通知が拒否されました');
    }
});