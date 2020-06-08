importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js');

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
  };
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging()
//messaging.usePublicVapidKey('BPsFE5tj9IkzSOR_vYfk0S0ZBU0XAlyCErGXj_tUqD-DSZmeZT_QU7v6LJrXGt9r7Urn2c4e4ncAwRLlCOVYCJ4');
messaging.usePublicVapidKey('BFnnbAnQwV6DOKcv7OL1DwvW0XD0p8pYzw8uZIzcNPkdm3gL0b4fKYH5kG0H-qraHtqbutC3db64b_jNHXG5GJM');

messaging.setBackgroundMessageHandler(function(payload){
	const options = {
		body: payload.data.status,
		icon: payload.data.status.image,
		vibrate: [100, 50, 100]
	};
	return self.registration.showNotification(title, options)
})