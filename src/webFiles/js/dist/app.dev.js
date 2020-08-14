"use strict";

// Your web app's Firebase configuration
// var firebaseConfig = {
// 	apiKey: "AIzaSyBNaK4dWJ-aVVrxDzvgDo663_AvZOh3U0A",
// 	authDomain: "durable-tangent-198220.firebaseapp.com",
// 	databaseURL: "https://durable-tangent-198220.firebaseio.com",
// 	projectId: "durable-tangent-198220",
// 	storageBucket: "durable-tangent-198220.appspot.com",
// 	messagingSenderId: "576781567516",
// 	appId: "1:576781567516:web:1fe23f8351ee77412b01d9"
// };
var firebaseConfig = {
  apiKey: "AIzaSyDRdxyPYRyB8qMdNlw6CB14fIk8rZXL1zs",
  authDomain: "covid-19-carso.firebaseapp.com",
  databaseURL: "https://covid-19-carso.firebaseio.com",
  projectId: "covid-19-carso",
  storageBucket: "covid-19-carso.appspot.com",
  messagingSenderId: "661012740928",
  appId: "1:661012740928:web:17e2f0f1f9859dd72398a5",
  measurementId: "G-37ZVSH0GDT"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig); //firebase.analytics();

var messaging = firebase.messaging(); //messaging.usePublicVapidKey('BPsFE5tj9IkzSOR_vYfk0S0ZBU0XAlyCErGXj_tUqD-DSZmeZT_QU7v6LJrXGt9r7Urn2c4e4ncAwRLlCOVYCJ4');

messaging.usePublicVapidKey('BFnnbAnQwV6DOKcv7OL1DwvW0XD0p8pYzw8uZIzcNPkdm3gL0b4fKYH5kG0H-qraHtqbutC3db64b_jNHXG5GJM');
var tokenDivId = 'token_div';
var permissionDivId = 'permission_div';
messaging.onTokenRefresh(function () {
  messaging.getToken().then(function (refreshedToken) {
    console.log('Token refreshed.'); // Indicate that the new Instance ID token has not yet been sent to the
    // app server.

    setTokenSentToServer(false); // Send Instance ID token to app server.

    sendTokenToServer(refreshedToken); // [START_EXCLUDE]
    // Display new Instance ID token and clear UI of all previous messages.

    resetUI(); // [END_EXCLUDE]
  })["catch"](function (err) {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});

if (!("Notification" in window)) {
  alert('Tu navegador no soporta notificaciones');
}

if (Notification.permission !== "granted") {
  Notification.requestPermission();
}
/* Solicita permisos y consigue token */


Notification.requestPermission().then(function () {
  //console.log('have permission')
  return messaging.getToken();
}).then(function (token) {//console.log(token)
})["catch"](function (err) {
  console.log(err);
});
/* Evalua la vida del token */

messaging.onMessage(function (payload) {
  console.log('onMessage: ', payload); //appendMessage(payload)

  var notification = new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.image,
    vibrate: [100, 50, 100]
  });

  if (payload.data) {
    notification.onclick = function () {
      location.href = "/monitoring.html";
    };
  }

  return notification;
});

function resetUI() {
  //clearMessages();
  showToken('loading...'); // [START get_token]
  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.

  messaging.getToken().then(function (currentToken) {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.'); // Show permission UI.

      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  })["catch"](function (err) {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  }); // [END get_token]
}

function showToken(currentToken) {
  // Show token in console and UI.
  var tokenElement = document.querySelector('#token');
  tokenElement.textContent = currentToken;
} // Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics


function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...'); // TODO(developer): Send the current token to your server.

    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again ' + 'unless it changes');
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

function showHideDiv(divId, show) {
  var div = document.querySelector('#' + divId);

  if (show) {
    div.style = 'display: visible';
  } else {
    div.style = 'display: none';
  }
}

function requestPermission() {
  console.log('Requesting permission...'); // [START request_permission]

  Notification.requestPermission().then(function (permission) {
    if (permission === 'granted') {
      console.log('Notification permission granted.'); // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // [START_EXCLUDE]
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.

      resetUI(); // [END_EXCLUDE]
    } else {
      console.log('Unable to get permission to notify.');
    }
  }); // [END request_permission]
}

function deleteToken() {
  // Delete Instance ID token.
  // [START delete_token]
  messaging.getToken().then(function (currentToken) {
    messaging.deleteToken(currentToken).then(function () {
      console.log('Token deleted.');
      setTokenSentToServer(false); // [START_EXCLUDE]
      // Once token is deleted update UI.

      resetUI(); // [END_EXCLUDE]
    })["catch"](function (err) {
      console.log('Unable to delete token. ', err);
    }); // [END delete_token]
  })["catch"](function (err) {
    console.log('Error retrieving Instance ID token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
  });
} // Add a message to the messages element.


function appendMessage(payload) {
  var messagesElement = document.querySelector('#messages');
  var dataHeaderELement = document.createElement('h5');
  var dataElement = document.createElement('pre');
  dataElement.style = 'overflow-x:hidden;';
  dataHeaderELement.textContent = 'Received message:';
  dataElement.textContent = JSON.stringify(payload, null, 2);
  messagesElement.appendChild(dataHeaderELement);
  messagesElement.appendChild(dataElement);
} // Clear the messages element of all children.


function clearMessages() {
  var messagesElement = document.querySelector('#messages');

  while (messagesElement.hasChildNodes()) {
    messagesElement.removeChild(messagesElement.lastChild);
  }
}

function updateUIForPushEnabled(currentToken) {
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}

function updateUIForPushPermissionRequired() {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
} //resetUI();