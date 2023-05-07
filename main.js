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
    let pages = ["middle_index","middle_sub","middle_blank","middle_iosadd","middle_androidadd"];
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

        if(os == "ios"){
            if(app == "pwa"){
                if(sub == "sub"){
                    show_page("middle_index");
                }else if(sub == "unsub"){
                    show_page("middle_sub");
                }
            }else if(app == "browser"){
                if(browser == "safari"){
                    show_page("middle_iosadd")
                }else if(browser == "google app"){
                    //tosafari_fromgoogle.html
                }else if(browser == "other"){
                    //tosafari.html
                }
            }
        }else if(os == "android"){
            if(app == "pwa"){
                if(sub == "sub"){
                    show_page("middle_index");
                }else if(sub == "unsub"){
                    show_page("middle_sub");
                }
            }else if(app == "browser"){
                show_page("middle_androidadd");
            }
        }else{
            if(sub == "sub"){
                show_page("middle_index");
            }else if(sub == "unsub"){
                show_page("middle_sub");
            }
        }
    });
});





const sub_button = () => {
    if(document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-unsubscribed").length == 1){
        document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-unsubscribed")[0].click();
        
    }else if(document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-subscribed").length == 1){
        document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-subscribed")[0].click();
    }
}


const add_to_home = () => {
    let deferred_prompt;

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferred_prompt = e;
        
        deferred_prompt.prompt();
        deferred_prompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              alert('ユーザーがホーム画面に追加しました');
            } else {
              alert('ユーザーがホーム画面に追加しませんでした');
            }
            deferred_prompt = null;
        })
    })
}




OneSignal.push(function() {
    OneSignal.on('notificationPermissionChange', function(permissionChange) {
        if(permissionChange.to == "granted"){
            show_page("middle_index");
        }
    });
});