"use strict";var firebaseConfig={apiKey:"AIzaSyDRdxyPYRyB8qMdNlw6CB14fIk8rZXL1zs",authDomain:"covid-19-carso.firebaseapp.com",databaseURL:"https://covid-19-carso.firebaseio.com",projectId:"covid-19-carso",storageBucket:"covid-19-carso.appspot.com",messagingSenderId:"661012740928",appId:"1:661012740928:web:17e2f0f1f9859dd72398a5",measurementId:"G-37ZVSH0GDT"};firebase.initializeApp(firebaseConfig);var messaging=firebase.messaging();messaging.usePublicVapidKey("BFnnbAnQwV6DOKcv7OL1DwvW0XD0p8pYzw8uZIzcNPkdm3gL0b4fKYH5kG0H-qraHtqbutC3db64b_jNHXG5GJM");var tokenDivId="token_div",permissionDivId="permission_div";function resetUI(){showToken("loading..."),messaging.getToken().then(function(e){e?(sendTokenToServer(e),updateUIForPushEnabled(e)):(console.log("No Instance ID token available. Request permission to generate one."),updateUIForPushPermissionRequired(),setTokenSentToServer(!1))}).catch(function(e){console.log("An error occurred while retrieving token. ",e),showToken("Error retrieving Instance ID token. ",e),setTokenSentToServer(!1)})}function showToken(e){document.querySelector("#token").textContent=e}function sendTokenToServer(e){isTokenSentToServer()?console.log("Token already sent to server so won't send it again unless it changes"):(console.log("Sending token to server..."),setTokenSentToServer(!0))}function isTokenSentToServer(){return"1"===window.localStorage.getItem("sentToServer")}function setTokenSentToServer(e){window.localStorage.setItem("sentToServer",e?"1":"0")}function showHideDiv(e,n){var o=document.querySelector("#"+e);o.style=n?"display: visible":"display: none"}function requestPermission(){console.log("Requesting permission..."),Notification.requestPermission().then(function(e){"granted"===e?(console.log("Notification permission granted."),resetUI()):console.log("Unable to get permission to notify.")})}function deleteToken(){messaging.getToken().then(function(e){messaging.deleteToken(e).then(function(){console.log("Token deleted."),setTokenSentToServer(!1),resetUI()}).catch(function(e){console.log("Unable to delete token. ",e)})}).catch(function(e){console.log("Error retrieving Instance ID token. ",e),showToken("Error retrieving Instance ID token. ",e)})}function appendMessage(e){var n=document.querySelector("#messages"),o=document.createElement("h5"),t=document.createElement("pre");t.style="overflow-x:hidden;",o.textContent="Received message:",t.textContent=JSON.stringify(e,null,2),n.appendChild(o),n.appendChild(t)}function clearMessages(){for(var e=document.querySelector("#messages");e.hasChildNodes();)e.removeChild(e.lastChild)}function updateUIForPushEnabled(e){showHideDiv(tokenDivId,!0),showHideDiv(permissionDivId,!1),showToken(e)}function updateUIForPushPermissionRequired(){showHideDiv(tokenDivId,!1),showHideDiv(permissionDivId,!0)}messaging.onTokenRefresh(function(){messaging.getToken().then(function(e){console.log("Token refreshed."),setTokenSentToServer(!1),sendTokenToServer(e),resetUI()}).catch(function(e){console.log("Unable to retrieve refreshed token ",e),showToken("Unable to retrieve refreshed token ",e)})}),"Notification"in window||alert("Tu navegador no soporta notificaciones"),"granted"!==Notification.permission&&Notification.requestPermission(),Notification.requestPermission().then(function(){return messaging.getToken()}).then(function(e){}).catch(function(e){console.log(e)}),messaging.onMessage(function(e){console.log("onMessage: ",e);var n=new Notification(e.notification.title,{body:e.notification.body,icon:e.notification.image,vibrate:[100,50,100]});return e.data&&(n.onclick=function(){location.href="/monitoring.html"}),n});