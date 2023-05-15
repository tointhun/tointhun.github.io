let ua = navigator.userAgent;
let os, app, browser, sub;
let defferedPrompt;


fetch("https://script.googleusercontent.com/macros/echo?user_content_key=9FZ0cdUJAu5yZKYvgWzCGHOE21g1f-i0Iv03wLVgLtICGLD7tKnU0ytC_Mu5sFtHJ4XbNfrzKbTSHGECkgbdmc3WPUfnOzNZm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAeCIcpSa012AyTMJ-X0Vzzc4zCpQMhb-11qGGf9lrtlPXuaG_jZQUwnsmGmat7GXWC7IGC77W2tu03GIxocmJ4NCD3Exnk0Mg&lib=MzZqeVlym1ki2NgvoPLjKQ5XvWRuAoVU2")
  .then(response => response.json())
  .then(data => {
    document.getElementById("hs_content").innerHTML = data.latestHS;
    document.getElementById("jhs_content").innerHTML = data.latestJHS;
    console.log(data.latestHS_URL);
    console.log(data.latestJHS_URL);
  })
  .catch(error => console.error(error));


if(ua.indexOf("iPhone") > 0){
    os = "ios";
}else if(ua.indexOf("iPad") > 0){
    os = "ios";
}else if(ua.indexOf("iPod") > 0){
    os = "ios";
}else if(ua.indexOf("Android") > 0){
    os = "android";
}else if(ua.indexOf("Linux") > 0){
    os = "android";
}else{
    os = "other";
}


if(os == "ios"){
    if(window.navigator.standalone){
        app = "pwa";
    }else{
        app = "browser";
    }
}else if(os == "android"){
    app = "browser";
    const mqStandAlone = '(display-mode: fullscreen)';
    if(window.matchMedia(mqStandAlone).matches){
        app = 'pwa';
    }
}else{
    app = "browser"
}


if(os == "ios"){
    if(window.navigator.userAgent.toLowerCase().indexOf("safari") != -1 && window.navigator.userAgent.indexOf("GSA") == -1){
        browser = "safari";
    }else if(window.navigator.userAgent.toLowerCase().indexOf("safari") != -1 && window.navigator.userAgent.indexOf("GSA") != -1){
        browser = "google app";
    }else{
        browser = "other";
    }
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

/*
    sub = "unsub";

    const permission = OneSignal.getNotificationPermission();
    
    if (permission === "granted") {
      sub = "sub";
    }


try{
    OneSignal.getNotificationPermission().then(function(permission){
        if(permission == "granted"){
            sub = "sub";
        }else{
            sub = "unsub";
        }
    })
}catch(error){
    sub = "unsub";
}

*/

    if(os == "ios"){
        if(app == "pwa"){
            if(localStorage.getItem("situation") == "set_notify"){
                show_page("middle_index");
            }else{
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
            /*
            if(sub == "sub"){
                show_page("middle_index");
            }else{
                show_page("middle_sub");
            }
            */
            if(localStorage.getItem("situation") == "set_notify"){
                show_page("middle_index");
            }else{
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
            show_page("middle_index");
        }
    }
});


const sub_button = () => {
    if(document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-unsubscribed").length == 1){
        document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-unsubscribed")[0].click();
        localStorage.setItem("situation","set_notify");
    }else if(document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-subscribed").length == 1){
        document.getElementsByClassName("onesignal-reset onesignal-customlink-subscribe medium button state-subscribed")[0].click();
    }
}


window.addEventListener('beforeinstallprompt', function(event) {
    event.preventDefault();
    defferedPrompt = event;
    return false;
})


const add_to_home = () => {
    if (defferedPrompt) {
        defferedPrompt.prompt();
        defferedPrompt.userChoice.then(function(choiceResult) {
            if(choiceResult.outcome === 'dismissed'){
            }else{
            }
            defferedPrompt = null;
        });
    }
}


OneSignal.push(function() {
    OneSignal.on('notificationPermissionChange', function(permissionChange) {
        if(permissionChange.to == "granted"){
            show_page("middle_index");
        }
    });
});