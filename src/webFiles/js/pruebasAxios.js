var axiosRegistro = function(){
	const config = {
		metodo: 'post',
		url: BASE_URL + 'covid-19/v1/users',
		cred: true,
		head: {
			'Content-Type': 'application/json'
		},
		param: {
			'token': '9a9974ad8cd500dd3076476cf40f9909'
		}
	}

	axios({
		method: config.metodo,
		url: config.url,
		withCredentials: config.cred,
		headers: config.head,
		params: config.param
	})
	.then(function (res){
		if(res.status === 200) {
			console.log(res);
		}
	})
	.catch(function (error) {
		console.log('error: '+error);
	});
}


var axiosLogin = function(){
	const config = {
		metodo: 'get',
		//url: BASE_URL + '/covid-19/v1/login',
		url: 'https://csapi.claroshop.com/app/ApiRest/Login',
		cred: true,
		head: {
			'Content-Type': 'application/json'
		},
		param: {
			'token': '9a9974ad8cd500dd3076476cf40f9909'
		}
	}

	axios({
		method: config.metodo,
		url: config.url,
		withCredentials: config.cred,
		headers: config.head,
		params: config.param
	})
	.then(function (res){
		if(res.status === 200) {
			console.log(res);
		}
	})
	.catch(function (error) {
		console.log('error: '+error);
	});
}