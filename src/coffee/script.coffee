# root
root = exports ? (window ? this)
# jquery
$ = jQuery

$(document).ready ->

	### 
	const BASE_API = 'https://api.dev.covid19-carso.com/'; 
	const BASE_API = 'https://api.covid19-carso.com/'; 
	###

	BASE_API = 'https://api.fcs-monitoreo.com/'

	### Variables ###

	BASE_URL = '/'
	URL_Password = '/updatePassword.html'
	URL_PathName = window.location.pathname
	URL_Location = window.location
	URL_Origin = window.location.origin + '/'

	###
	const BASE_URL = 'https://wireframes.tmx-internacional.net/Claroshop/Covid19Carso/'; 
	var  URL_Password = 'https://wireframes.tmx-internacional.net/Claroshop/Covid19Carso/updatePassword.html';
	var  URL_PathName = window.location.pathname;
	var  URL_Location = window.location;
	var  URL_Origin = 'https://wireframes.tmx-internacional.net/Claroshop/Covid19Carso/'; 
	###

	request202 = ->
		console.log 'Send  success...'
		return

	request404 = ->
		console.log 'Page no found...'
		return

	request500 = ->
		console.log 'Server error...'
		return

	toast = (message) ->
		if $('.toast').length == 0
			$('main').prepend '<div class="toast"><span class="modalClose">x</span><div class="message">' + message + '</div></div>'
			setTimeout closeModals, 5000
		else
			return false
		return

	closeModals = ->
		$('.toast, .loaderPrincipal, .modalView').remove()
		return

	returnToHome = ->
		location.href = 'home.html'
		return

	historyBack = ->
		history.back -1
		return

	resetPortal = (type) ->
		if type == 'hard'
			localStorage.clear()
			return
		else if type == 'low'
			deleteStorage64 'yokoso'
			deleteStorage64 'tokunRedis'
			deleteStorage64 'RegistryFirst'
			deleteStorage64 'RegistryLast'
			deleteStorage64 'arrayDiseases'
			return
		return

	validateEmail = (email) ->
		re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		re.test email

	validateNumber = (number) ->
		re = /^\d+$/
		re.test number

	addZero = (num) ->
		if num < 10
			num = '0' + num
		num

	dateToday = do ->
		`var dateToday`
		hoy = new Date
		dd = hoy.getDate()
		mm = hoy.getMonth() + 1
		yyyy = hoy.getFullYear()
		dateToday = yyyy + '-' + addZero(mm) + '-' + addZero(dd)
		dateToday
	dateMinBirthady = do ->
		`var dateMinBirthady`
		hoy = new Date
		dd = hoy.getDate()
		mm = hoy.getMonth() + 1
		yyyy = hoy.getFullYear() - 18
		dateMinBirthady = yyyy + '-' + addZero(mm) + '-' + addZero(dd)
		dateMinBirthady

	###agrega  loading secundario ###

	addLoader = (message) ->
		$('main').prepend '<div class="modalView"><div class="contentModal"><span class="modalClose">x</span><div class="message">' + message + '</div></div></div>'
		console.log()
		return

	###remueve el loading principal ###

	removeLoader = ->
		$('.loaderPrincipal').hide()
		$('.loaderPrincipal').remove()
		return

	upErrorMessage = ->
		topError = $('.error').offset().top - 30
		$(document).scrollTop topError
		return

	setStorage64 = (key, value) ->
		keyString = JSON.stringify(key)
		valueString = JSON.stringify(value)
		localStorage.setItem btoa(keyString), btoa(valueString)
		return

	getStorage64 = (key) ->
		llave = JSON.stringify(key)
		keyString = btoa(llave)
		valueString = localStorage.getItem(keyString)
		response = atob(valueString)
		try
			llave = JSON.parse(response)
		catch error
			console.log error
			llave = response
		llave

	deleteStorage64 = (key) ->
		llave = JSON.stringify(key)
		keyString = btoa(llave)
		valueString = localStorage.removeItem(keyString)
		return

	###Guarda en codigo de entrada pasandolo a base64  ###

	setCodeEnter = (param) ->
		localStorage.setItem 'kodoNyuryoku', btoa(param)
		return

	###Extrae en codigo de entrada pasandolo a base64 ###

	getCodeEnter = ->
		codeEnter = localStorage.getItem('kodoNyuryoku')
		codeEnter

	###Genera acceso para usuario a las demas secciones###

	setSusumu = ->
		localStorage.setItem 'yokoso', btoa('wakatta')
		return

	###Extrae acceso para usuario a las demas secciones###

	getSusumu = ->
		susumu = localStorage.getItem('yokoso')
		susumu

	###Guarda token redis a base64  ###

	setIdRedis = (param) ->
		localStorage.setItem 'tokunRedis', btoa(param)
		tokunRedis

	getIdRedis = ->
		idRedis = localStorage.getItem('tokunRedis')
		idRedis

	###Evalua la locacion para saber si tiene acceso  ###

	evaLocation = do ->
		getSusumu()
		if URL_PathName == URL_Password
			return
		else if URL_Origin != URL_Location
			console.log 'estas en ' + URL_PathName
			if susumu == null or susumu != btoa('wakatta')
				location.href = BASE_URL
				return
			return
		else
			if susumu != null
				location.href = 'home.html'
				return
			else
				return

			###localStorage.removeItem('yokoso') ###

	### Validate Forms  ###

	validatePProtect = ->
		getCodeEnter()
		valInput = $('.passwordProtect input').val()
		if valInput == '' or valInput == undefined or valInput == null
			$('.passwordProtect input').addClass 'error'
			$('.passwordProtect .errorMessage').text 'Campo vacio'
		else
			if valInput == atob(codeEnter)
				setSusumu()
				returnToHome()
			else
				$('.passwordProtect input').addClass 'error'
				$('.passwordProtect .errorMessage').text 'Valor Incorrecto'
		return

	validateLoginAPP = (data) ->
		console.log data
		if data == undefined
			deleteStorage64 'LoginAPP'
		else
			setStorage64 'LoginAPP', data
		return

	validateLogin = ->
		valInputEmail = $('[name="emailLogin"]').val()
		valInputPass = $('[name="passwordLogin"]').val()
		dataLogin = 
			'email': valInputEmail
			'password': valInputPass
		if valInputEmail == '' or valInputEmail == undefined or valInputEmail == null
			$('[name="emailLogin"]').addClass 'error'
			$('[name="emailLogin"] + .errorMessage').text 'Campo vacio'
		else if !validateEmail(valInputEmail)
			$('[name="emailLogin"]').addClass 'error'
			$('[name="emailLogin"] + .errorMessage').text 'Formato de correo invalido'
		else if valInputPass == '' or valInputPass == undefined or valInputPass == null
			$('[name="passwordLogin"]').addClass 'error'
			$('[name="passwordLogin"] + .errorMessage').text 'Campo vacio'
		else
			axiosVaidateReddis()
			sendLogin dataLogin
		return

	validateRecoveryPass = ->
		valInput = $('[name="recoveryPassword"]').val()
		console.log validateEmail(valInput)
		if valInput == '' or valInput == undefined or valInput == null
			$('.passwordRecovery input').addClass 'error'
			$('.passwordRecovery .errorMessage').text 'Campo vacio'
		else if !validateEmail(valInput)
			$('.passwordRecovery input').addClass 'error'
			$('.passwordRecovery .errorMessage').text 'Formato de correo invalido'
		else
			sendRecoveryPass valInput
		return

	###Listo datos Enfermedades  ###

	valideArrayDiseases = do ->
		if $('.registryModule').length == 1
			source = []
			setStorage64 'arrayDiseases', source
			$('.arrayDiseases input').change ->
				$this = $(this)
				valueSel = $this.attr('value')
				$('.arrayDiseases').removeClass 'error'
				if $this.attr('name') == 'ninguna'
					$('.arrayDiseases [type="checkbox"]').not('[name="ninguna"]').prop 'checked', false
					source = []
					setStorage64 'arrayDiseases', source
					source
				else
					$('.arrayDiseases [name="ninguna"]').prop 'checked', false
					source = []
					$('.arrayDiseases [type="checkbox"]:checked').each ->
						`var $this`
						$this = $(this)
						source.push Number($this.attr('value'))
						return
					setStorage64 'arrayDiseases', source
					source
		return

	###Listo datos Sintomas  ###

	valideArraySymptoms = do ->
		if $('.monitoringModule').length == 1
			source = []
			setStorage64 'arraySymptoms', source
			$('.arraySymptoms input').change ->
				$this = $(this)
				valueSel = $this.attr('value')
				$('.arraySymptoms').removeClass 'error'
				if $this.attr('name') == 'sintomaNinguna'
					$('.arraySymptoms [type="checkbox"]').not('[name="sintomaNinguna"]').prop 'checked', false
					source = []
					setStorage64 'arraySymptoms', source
					setStorage64 'sintomaNinguna', 'true'
					source
				else
					$('.arraySymptoms [name="sintomaNinguna"]').prop 'checked', false
					source = []
					$('.arraySymptoms [type="checkbox"]:checked').each ->
						`var $this`
						$this = $(this)
						source.push Number($this.attr('value'))
						return
					setStorage64 'arraySymptoms', source
					setStorage64 'sintomaNinguna', 'false'
					source
		return
	validateQuarantine = do ->
		$('.isolation .btn.secundario').on 'click', ->
			$this = $(this)
			typeButton = $this.html()
			$('.isolation .btn.secundario').removeClass 'active'
			$this.addClass 'active'
			if typeButton == 'Si'
				setStorage64 'ifQuarantine', 'yes'
				$('.contMonitoringIsolation').removeClass 'hidden'
			else if typeButton == 'No'
				setStorage64 'ifQuarantine', 'no'
				$('.contMonitoringIsolation').addClass 'hidden'
				$('.contMonitoringIsolation select').prop 'selectedIndex', 0
				$('.contMonitoringIsolation input[type="radio"]').prop 'checked', false
				$('.contMonitoringIsolation input[type="date"]').val ''
			return
		return

	###listo datos registro ###

	validateRegistryFormFirst = ->
		valInputId = $('[name="idEmpleadoReg"]').val()
		valInputEmail = $('[name="emailReg"]').val()
		valInputPass = $('[name="passwordReg"]').val()
		valInputName = $('[name="nombreReg"]').val()
		valInputPaternal = $('[name="apelldoPaternoReg"]').val()
		valInputMaternal = $('[name="apellidoMaternoReg"]').val()
		valInputBirthday = $('[name="fechaNacimientoReg"]').val()
		if valInputBirthday.length > 1
			Birthday = $('[name="fechaNacimientoReg"]').val().split('-')
			valInputBirthday = Birthday[2] + '-' + Birthday[1] + '-' + Birthday[0]
		valInputGender = $('[name="genderReg"]:checked').val()
		valInputDiseases = $('.arrayDiseases [type="checkbox"]:checked').length
		dataRegistryUser = 
			'name': valInputName
			'paternal': valInputPaternal
			'maternal': valInputMaternal
			'email': valInputEmail
			'gender': valInputGender
			'birthdate': valInputBirthday
			'type': '1'
			'employ_id': valInputId
			'password': valInputPass
			'source': '3'
		dataRegistryDiseases = getStorage64('arrayDiseases')
		if valInputEmail == '' or valInputEmail == undefined or valInputEmail == null
			$('[name="emailReg"]').addClass 'error'
			$('[name="emailReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if !validateEmail(valInputEmail)
			$('[name="emailReg"]').addClass 'error'
			$('[name="emailReg"] + .errorMessage').text 'Formato de correo invalido'
			upErrorMessage()
		else if valInputId == '' or valInputId == undefined or valInputId == null
			$('[name="idEmpleadoReg"]').addClass 'error'
			$('[name="idEmpleadoReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if valInputPass == '' or valInputPass == undefined or valInputPass == null
			$('[name="passwordReg"]').addClass 'error'
			$('[name="passwordReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if valInputPass.length <= 5
			$('[name="passwordReg"]').addClass 'error'
			$('[name="passwordReg"] + .errorMessage').text 'Contraseñas menor a 6 caracteres'
			upErrorMessage()
		else if valInputName == '' or valInputName == undefined or valInputName == null
			$('[name="nombreReg"]').addClass 'error'
			$('[name="nombreReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if valInputPaternal == '' or valInputPaternal == undefined or valInputPaternal == null
			$('[name="apelldoPaternoReg"]').addClass 'error'
			$('[name="apelldoPaternoReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if valInputMaternal == '' or valInputMaternal == undefined or valInputMaternal == null
			$('[name="apellidoMaternoReg"]').addClass 'error'
			$('[name="apellidoMaternoReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if valInputBirthday == '' or valInputBirthday == undefined or valInputBirthday == null
			$('[name="fechaNacimientoReg"]').addClass 'error'
			$('[name="fechaNacimientoReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if valInputDiseases == 0
			$('.arrayDiseases').addClass 'error'
			$('.arrayDiseases + .errorMessage').text 'No se ha seleccionado ninguna opción'
			upErrorMessage()
		else
			setStorage64 'registryFormFirst', dataRegistryUser
			sendRegistryFirst dataRegistryUser, dataRegistryDiseases
		return

	validateRegistryFormLast = ->
		valInputEmpresa = $('[name="selecEmpresaReg"]').val()
		valInputArea = $('[name="selecAreaReg"]').val()
		valInputTelCel = $('[name="telefonoCeluilarReg"]').val()
		valInputFamiliar = $('[name="nombreFamiliarReg"]').val()
		valInputTelEmerg = $('[name="telefonoEmergenciaReg"]').val()
		valInputTelWork = $('[name="telefonoTrabajoReg"]').val()
		dataRegistryCompany = 
			'company': valInputEmpresa
			'area': valInputArea
			'department': '1'
			'cell_phone': valInputTelCel
			'work_phone': valInputTelWork
			'emergency_phone': valInputTelEmerg
			'emergency_contact': valInputFamiliar
		if valInputEmpresa == '' or valInputEmpresa == undefined or valInputEmpresa == null
			$('[name="selecEmpresaReg"]').parent().addClass 'error'
			$('[name="selecEmpresaReg"]').parent().next().text 'Campo vacio'
			upErrorMessage()
		else if valInputArea == '' or valInputArea == undefined or valInputArea == null
			$('[name="selecAreaReg"]').parent().addClass 'error'
			$('[name="selecAreaReg"] ').parent().next().text 'Campo vacio'
			upErrorMessage()
		else if valInputTelCel == '' or valInputTelCel == undefined or valInputTelCel == null
			$('[name="telefonoCeluilarReg"]').addClass 'error'
			$('[name="telefonoCeluilarReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if valInputTelCel.length != 10
			$('[name="telefonoCeluilarReg"]').addClass 'error'
			$('[name="telefonoCeluilarReg"] + .errorMessage').text 'El teléfono debe de contar con 10 dígitos'
			upErrorMessage()
		else if !validateNumber(valInputTelCel)
			$('[name="telefonoCeluilarReg"]').addClass 'error'
			$('[name="telefonoCeluilarReg"] + .errorMessage').text 'Formato invalido'
			upErrorMessage()
		else if valInputFamiliar == '' or valInputFamiliar == undefined or valInputFamiliar == null
			$('[name="nombreFamiliarReg"]').addClass 'error'
			$('[name="nombreFamiliarReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if valInputTelEmerg == '' or valInputTelEmerg == undefined or valInputTelEmerg == null
			$('[name="telefonoEmergenciaReg"]').addClass 'error'
			$('[name="telefonoEmergenciaReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if !validateNumber(valInputTelEmerg)
			$('[name="telefonoEmergenciaReg"]').addClass 'error'
			$('[name="telefonoEmergenciaReg"] + .errorMessage').text 'Formato invalido'
			upErrorMessage()
		else if valInputTelEmerg.length != 10
			$('[name="telefonoEmergenciaReg"]').addClass 'error'
			$('[name="telefonoEmergenciaReg"] + .errorMessage').text 'El teléfono debe de contar con 10 dígitos'
			upErrorMessage()
		else if valInputTelWork == '' or valInputTelWork == undefined or valInputTelWork == null
			$('[name="telefonoTrabajoReg"]').addClass 'error'
			$('[name="telefonoTrabajoReg"] + .errorMessage').text 'Campo vacio'
			upErrorMessage()
		else if !validateNumber(valInputTelWork)
			$('[name="telefonoTrabajoReg"]').addClass 'error'
			$('[name="telefonoTrabajoReg"] + .errorMessage').text 'Formato invalido'
			upErrorMessage()
		else if valInputTelWork.length != 10
			$('[name="telefonoTrabajoReg"]').addClass 'error'
			$('[name="telefonoTrabajoReg"] + .errorMessage').text 'El teléfono debe de contar con 10 dígitos'
			upErrorMessage()
		else
			$('.registryModule .form.FormLast').addClass 'hidden'
			$('.registryModule .card.thanksMonitoringCaseOne').removeClass 'hidden'
			setStorage64 'registryFormLast', dataRegistryCompany
			sendRegistryLast dataRegistryCompany
		return

	validateMonitoringFormFirst = ->
		valInputTemperatura = $('[name="selecTemp"]').val()
		valInputBreatheProblem = $('[name="breatheProblem"]:checked').val()
		dataRegistrySymptoms = $('.arraySymptoms [type="checkbox"]:checked').length
		dataMonitoringUser = 
			'symptoms': BreatheProblem
			'temperature': valInputTemperatura
		if valInputTemperatura == '' or valInputTemperatura == undefined or valInputTemperatura == null
			$('[name="selecTemp"]').parent().addClass 'error'
			$('[name="selecTemp"]').parent().next().text 'Selecciona una opcion'
			upErrorMessage()
		else if valInputBreatheProblem == '' or valInputBreatheProblem == undefined or valInputBreatheProblem == null
			$('.problemsBreathe').addClass 'error'
			$('.problemsBreathe + .errorMessage').text 'No se ha seleccionado ninguna opción'
			upErrorMessage()
		else if dataRegistrySymptoms == 0
			$('.arraySymptoms').addClass 'error'
			$('.arraySymptoms + .errorMessage').text 'No se ha seleccionado ninguna opción'
			upErrorMessage()
		else
			if valInputBreatheProblem == '7'
				BreatheProblem = getStorage64('arraySymptoms')
				BreatheProblem.push 7
				dataMonitoringUser =
					'symptoms': BreatheProblem
					'temperature': valInputTemperatura
			else if valInputBreatheProblem == '8'
				dataMonitoringUser =
					'symptoms': getStorage64('arraySymptoms')
					'temperature': valInputTemperatura
			setStorage64 'monitoringFormFirst', dataMonitoringUser
			sendMonitoringFirst dataMonitoringUser
		return

	validateMonitoringFormLast = ->
		hayCuarentena = getStorage64('ifQuarantine')
		valInputIsolation = $('[name="isolation"]:checked').val()
		valInputWhereIsolation = $('[name="whereIsolation"]:checked').val()
		valInputWhyIsolation = $('[name="whyIsolation"]').val()
		valInputDateFirstIsolation = $('[name="dateFirstIsolation"]').val()
		if valInputDateFirstIsolation.length > 1
			DateFirstIsolation = $('[name="dateFirstIsolation"]').val().split('-')
			valInputDateFirstIsolation = DateFirstIsolation[2] + '-' + DateFirstIsolation[1] + '-' + DateFirstIsolation[0]
		dataMonitoringUser = 
			'type': valInputWhereIsolation
			'reason': valInputWhyIsolation + ' | ' + valInputDateFirstIsolation
		if hayCuarentena == 'yes'
			if valInputWhereIsolation == '' or valInputWhereIsolation == undefined or valInputWhereIsolation == null
				$('.whereIsolation').addClass 'error'
				$('.whereIsolation + .errorMessage').text 'No se ha seleccionado ninguna opción'
				upErrorMessage()
			else if valInputWhyIsolation == '' or valInputWhyIsolation == undefined or valInputWhyIsolation == null
				$('[name="whyIsolation"]').parent().addClass 'error'
				$('[name="whyIsolation"]').parent().next().text 'Selecciona una opcion'
				upErrorMessage()
			else if valInputDateFirstIsolation == '' or valInputDateFirstIsolation == undefined or valInputDateFirstIsolation == null
				$('[name="dateFirstIsolation"]').addClass 'error'
				$('[name="dateFirstIsolation"] + .errorMessage').text 'Campo vacio'
				upErrorMessage()
			else
				setStorage64 'monitoringFormFirst', dataMonitoringUser
				sendMonitoringLast dataMonitoringUser
		else if hayCuarentena == 'no'
		else
		return

	###Functiones Send data ###

	sendRecoveryPass = (email) ->
		console.log 'submit email: ' + email
		$('.passRecovery .card.passwordRecovery').remove()
		$('.passRecovery .textInfo').remove()
		$('.passRecovery .card.thanksRecoveryPass').removeClass 'hidden'
		$('.thanksRecoveryPass .btn.primario').on 'click', returnToHome
		return

	sendLogin = (data) ->
		dataActivate = getStorage64('userRedisT')
		useReddisPending = getStorage64('validateRedisT')
		console.log 'data: ' + dataActivate + ' /  reddis:' + useReddisPending
		if useReddisPending == dataActivate
			toast 'Tus datos todavia se encuenran en validación'
			console.log data
		else if useReddisPending == 'notFound'
			console.log 'nada de nada 1'
			axiosLogin data
		else
			console.log 'nada de nada 2'
			axiosLogin data
		return

	sendRegistryFirst = (data) ->
		axiosUsers data
		console.log data
		$('.registryModule .form.FormFirst').addClass 'hidden'
		$('.registryModule .form.FormLast').removeClass 'hidden'
		return

	sendRegistryLast = (data) ->
		diseases = 'diseases': getStorage64('arrayDiseases')
		axiosDiseases diseases
		console.log diseases
		axiosCompany data

		###console.log( data )###

		$('.registryModule .form.FormLast').addClass 'hidden'
		$('.registryModule').addClass 'hidden'
		return

	sendMonitoringFirst = (data) ->
		axiosSymptoms data
		flag = getStorage64('sintomaNinguna')
		temperature = Number($('[name="selecTemp"]').val())
		dificulty = Number($('[name="breatheProblem"]:checked').val())
		if flag == 'true'
			$('.monitoringModule .form.FormFirst').addClass 'hidden'
			$('.monitoringModule .card.thanksMonitoringCaseOne').removeClass 'hidden'
			$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').addClass 'hidden'
			if temperature >= 38
				$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass 'hidden'
			if dificulty == 7
				$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass 'hidden'
			axiosActivate()
		else
			$('.monitoringModule .form.FormFirst').addClass 'hidden'
			$('.monitoringModule .form.FormLast').removeClass 'hidden'
		return

	sendMonitoringLast = (data) ->
		axiosQuarantine data
		axiosActivate()
		$('.monitoringModule .form.FormLast').addClass 'hidden'
		$('.monitoringModule .card.thanksMonitoringCaseOne').removeClass 'hidden'
		return

	### Peticiones AXIOS ###

	axiosCode = ->

		###const config = {
			metodo: 'get',
			url: 'https://api.myjson.com/bins/oxp16',
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head
		})
		.then(function (res){
			if(res.status === 200) {
				setCodeEnter(res.data.data.codeEnter)
				setCodeEnter('Carso123.')
			}
		})
		.catch(function (error) {
			console.log('error: '+error);
		});
		###

		setCodeEnter 'Carso123.'
		return

	axiosUsers = (dataUsers) ->
		config = 
			metodo: 'post'
			url: BASE_API + 'covid-19/v1/users'
			cred: false
			head: 'Content-Type': 'application/json'
		axios(
			method: config.metodo
			url: config.url
			withCredentials: config.cred
			headers: config.head
			data: dataUsers).then((res) ->
			if res.status == 202
				regSuccess = res.data.id
				setStorage64 'userRedisT', regSuccess
				setStorage64 'RegistryFirst', 'true'
				request202()
				console.log res.data.id
				console.log 'axiosUsers'
			return
		).catch (error) ->
			if error.response.status == 404
				console.error error.response
				request404()
			else if error.response.status == 500
				console.error error.response
				request500()
			else
				console.error error
				console.error error.response
			return
		return

	axiosDiseases = (dataDiseases) ->
		dataActivate = getStorage64('userRedisT')
		config = 
			metodo: 'post'
			url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/diseases'
			cred: false
			head: 'Content-Type': 'application/json'
		axios(
			method: config.metodo
			url: config.url
			withCredentials: config.cred
			headers: config.head
			data: dataDiseases).then((res) ->
			if res.status == 202
				regSuccess = res.data.id
				setStorage64 'diseasesRedisT', regSuccess
				request202()
				console.log 'axiosDiseases'
				console.log res
			return
		).catch (error) ->
			if error.response.status == 404
				console.error error.response
				request404()
			else if error.response.status == 500
				console.error error.response
				request500()
			else
				console.error error
				console.error error.response
			return
		return

	axiosCompany = (dataCompany) ->
		dataActivate = getStorage64('userRedisT')
		config = 
			metodo: 'post'
			url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/company'
			cred: false
			head: 'Content-Type': 'application/json'
		axios(
			method: config.metodo
			url: config.url
			withCredentials: config.cred
			headers: config.head
			data: dataCompany).then((res) ->
			if res.status == 202
				regSuccess = res.data.id
				setStorage64 'companyRedisT', regSuccess
				setStorage64 'RegistryLast', 'true'
				request202()
				location.href = 'monitoring.html'
				console.log res.data.id
				console.log 'axiosCompany'
			return
		).catch (error) ->
			if error.response.status == 404
				console.error error.response
				request404()
			else if error.response.status == 500
				console.error error.response
				request500()
			else
				console.error error
				console.error error.response
			return
		return

	axiosSymptoms = (dataSymptoms) ->
		dataActivate = getStorage64('userRedisT')
		config = 
			metodo: 'post'
			url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/symptoms'
			cred: false
			head: 'Content-Type': 'application/json'
		axios(
			method: config.metodo
			url: config.url
			withCredentials: config.cred
			headers: config.head
			data: dataSymptoms).then((res) ->
			if res.status == 202
				regSuccess = res.data.id
				setStorage64 'symptomsRedisT', regSuccess
				request202()
				console.log res
				console.log 'axiosSymptoms'
			return
		).catch (error) ->
			if error.response.status == 404
				console.error error.response
				request404()
			else if error.response.status == 500
				console.error error.response
				request500()
			else
				console.error error
				console.error error.response
			return
		return

	axiosQuarantine = (dataQuarantine) ->
		dataActivate = getStorage64('userRedisT')
		config = 
			metodo: 'post'
			url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/quarantine'
			cred: false
			head: 'Content-Type': 'application/json'
		axios(
			method: config.metodo
			url: config.url
			withCredentials: config.cred
			headers: config.head
			data: dataQuarantine).then((res) ->
			if res.status == 202
				regSuccess = res.data.id
				setStorage64 'quarantineRedisT', regSuccess
				request202()
				console.log res
				console.log 'axiosQuarantine'
			return
		).catch (error) ->
			if error.response.status == 404
				console.error error.response
				request404()
			else if error.response.status == 500
				console.error error.response
				request500()
			else
				console.error error
				console.error error.response
			return
		return

	axiosLogin = (dataLogin) ->
		config = 
			metodo: 'post'
			url: BASE_API + 'covid-19/v1/login'
			cred: false
			head: 'Content-Type': 'application/json'
		axios(
			method: config.metodo
			url: config.url
			withCredentials: config.cred
			data: dataLogin
			headers: config.head).then((res) ->
			if res.status == 200
				regSuccess = res.data.token
				setStorage64 'userRedisT', regSuccess
				setStorage64 'userAppT', regSuccess
				request202()
				location.href = 'monitoring.html'
			return
		).catch (error) ->
			if error.response.status == 401
				toast 'Usuario y/o Contraseña no valido'
			else if error.response.status == 404
				console.error error.response
				request404()
			else if error.response.status == 500
				console.error error.response
				request500()
			console.error error.response
			return
		return

	axiosVaidateReddis = ->
		dataActivate = getStorage64('userRedisT')
		config = 
			metodo: 'get'
			url: BASE_API + 'covid-19/v1/queue/' + dataActivate
			cred: false
			head: 'Content-Type': 'application/json'
		axios(
			method: config.metodo
			url: config.url
			withCredentials: config.cred
			headers: config.head).then((res) ->
			if res.status == 200
				regSuccess = res.data.key
				setStorage64 'validateRedisT', regSuccess
				request202()
				console.log regSuccess
				console.log getStorage64('validateRedisT')
			else if res.status == 404
				console.log res.data.error
				setStorage64 'validateRedisT', 'notFound'
				request404()
			else if res.status == 500
				console.log res
				request500()
			return
		).catch (error) ->
			if error.response.status == 401
				console.error error.response
			else if error.response.status == 404
				console.error error.response
				request404()
			else if error.response.status == 500
				console.error error.response
				request500()
			console.log error.response
			return
		return

	axiosActivate = ->
		dataActivate = getStorage64('userRedisT')
		config = 
			metodo: 'post'
			url: BASE_API + 'covid-19/v1/queue/' + dataActivate + '/activate'
			cred: false
			head: 'Content-Type': 'application/json'
		axios(
			method: config.metodo
			url: config.url
			withCredentials: config.cred
			headers: config.head).then((res) ->
			if res.status == 202
				regSuccess = res.data.id
				request202()
				console.log res
				console.log 'Success Final End...'
			return
		).catch (error) ->
			if error.response.status == 404
				console.log res
				request404()
			else if error.response.status == 500
				console.log res
				request500()
			return
		return

	### Scripts Generales ###

	$('.menuReturn').on 'click', historyBack
	$('.formLogin .btn.primario').on 'click', validateLogin
	$('.passwordProtect .btn.primario').on 'click', validatePProtect
	$('.passwordRecovery .btn.primario').on 'click', validateRecoveryPass
	$('input[type="date"]').attr 'max': dateToday
	$('input[name="fechaNacimientoReg"]').attr 'max': dateMinBirthady
	$('.registryModule .firstForm').on 'click', validateRegistryFormFirst
	$('.registryModule .lastForm').on 'click', validateRegistryFormLast
	$('.monitoringModule .firstForm').on 'click', validateMonitoringFormFirst
	$('.monitoringModule .lastForm').on 'click', validateMonitoringFormLast
	$('.problemsBreathe').on 'click', ->
		$(this).removeClass 'error'
		return
	
	$('body').on 'click', '.modalClose', closeModals

	###$('footer .logoCarso').on('click', function(){resetPortal('low')}) ###

	$('[name="passProtect"]').on 'keypress', (e) ->
		if e.which == 13 or e.keyCode == 13
			$('.btn.primario').trigger 'click'
		return
	
	$('input, select').focus ->
		$this = $(this)
		$this.removeClass 'error'
		$this.parent().removeClass 'error'
		return
	
	$('.forTwo, forThree').on 'click', ->
		$this = $(this)
		$this.removeClass 'error'
		return
	
	$('.cerrarBtn').on 'click', ->
		$('.downloadAPP').remove()
		return

	if /Android/i.test(navigator.userAgent)
		$('.downloadIos').remove()
	if /iPhone|iPad|iPod/i.test(navigator.userAgent)
		$('.downloadAndroid').remove()

	axiosCode()
	setTimeout removeLoader, 2000

	###Window on load ###

	if !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		$(window).on 'load', ->
			removeLoader()
			return
	else
		removeLoader()
		$('body').on 'click', '.toast', closeModals
		document.addEventListener 'DOMContentLoaded', ->
			removeLoader()
			return
	return