$(document).ready(function(){

	/*  
	const BASE_API = 'https://api-rc1.fcs-monitoreo.com/';
	const BASE_API = 'https://api.fcs-monitoreo.com/';
	*/

	const BASE_API = 'https://api.dev.covid19-carso.com/';
	
	/*  Variables */
	
	const BASE_URL = '/'; 
	var  URL_Password = '/updatePassword.html';
	var  URL_PathName = window.location.pathname;
	var  URL_Location = window.location;
	var  URL_Origin = window.location.origin+'/';
	var coordLatit, coordLong;
	

	/*  Mensajes de Notificacion  */
	const warningMessages = {
		0: 'Campo vacío',
		1: 'Formato inválido',
		2: 'Selecciona una opcion',
		3: 'Formato de correo invalido',
		4: 'Contraseñas menor a 6 caracteres',
		5: 'El Código postal no puede ser mayor a 5 caracteres',
		6: 'El teléfono debe de contar con 10 dígitos',
		7: 'El formato debe ser DD-MM-AAAA',
		8: 'Este campo solo acepta números',
		9: 'Correo ya registrado',
		10: 'Tu sesión ha expirado.',
		11: 'El peso debe ser en (kg)',
		12: 'El peso debe ser mayor a 1 kg',
		13: 'El peso debe ser menor a 300 kg',
		14: 'La estatura debe ser en (cm)',
		15: 'La estatura debe ser mayor a 1 cm',
		16: 'La estatura debe ser menor de 210 cm',
		17: ''
	}

	const imagesFAQ = [
		'cubrebocas1.jpg',
		'signos_de_alarma.jpg',
		'personas_mayores.jpg',
		'prevencion_en_el_hogar.jpg',
		'si_me_cuido.jpg',
		'medidas_generales_de_prevencion.jpg',
		'no_mano_no_abrazo_no_beso_no_contagio.jpg',
		'medidas_generales_de_prevencion_empleados.jpg',
		'limpieza_de_celular-01.jpg',
		'lavado_de_manos-01.jpg',
		// 'lavado_de_manos-02.jpg',
		// 'lavado_de_manos-03.jpg',
		// 'lavado_de_manos-04.jpg',
		// 'lavado_de_manos-05.jpg',
		// 'lavado_de_manos-06.jpg',
		'elevador.jpg',
		'diagnostico_confirmado.jpg',
		'cuidados_generales_para_personas_enfermas.jpg'
	]

	var urlDownloadApp = 'download/monitoreo_V5.apk'

	var addImagesFAQs = function(){
		let imag = 0
		while(imag < imagesFAQ.length){

			$('.imagesFAQs').append('<div class=\"imageInfo\"><img src=\"img\/faqs\/'+imagesFAQ[imag]+'\" alt=\"'+imagesFAQ[imag]+'"\/><\/div>')
			//$('.imagesFAQs').append('<p>'+imagesFAQs.imgFaq+'</p>')
			//console.log( imagesFAQs.imag)
			imag++
		}
	}

	var showCoord = function(){
		navigator.geolocation.getCurrentPosition(
			function(position){
				window.coordLatit = position.coords.latitude
				window.coordLong = position.coords.longitude
				localStorage.setItem("myLatitud", coordLatit)
				localStorage.setItem("myLongitud", coordLong)
			},
			function(error) {
				var errores = {1: 'Permiso denegado', 2: 'Posición no disponible', 3: 'Expiró el tiempo de respuesta'};
				console.log("Error: " + errores[error.code]);
			},
			{
				enableHighAccuracy: true,
				maximumAge:  5000,
				timeout: 10000
			}
		);
	}

	var clickGeo = function(){
	}

	var request202 = function(){
		addLoader('false')
		console.log('Send  success...')
	}
	var request401 = function(){
		addLoader('false')
		toast('Por seguridad se ha cerrado tu sesion')
		localStorage.clear()
		setCodeEnter('carso123')
		setSusumu()
		setTimeout(function(){
			redirectUrl('home')}, 2000
		)
	}
	var request404 = function(){
		addLoader('false')
		console.log('Page no found...')
	}
	var request440 = function(){
		addLoader('false')
		toast('Tu sesión ha expirado')
		localStorage.clear()
		setCodeEnter('carso123')
		setSusumu()
		setTimeout(function(){
			redirectUrl('home')},1000
		)
	}
	var request500 = function(){
		addLoader('false')
		console.log('Server error...')
	}

	/* Notificaciones y Modals */
	var toast = function(message){
		if($('.toast').length === 0){
			$('main').prepend('<div class=\"toast\"><span class=\"modalClose\">x</span><div class=\"message\">'+ message +'<\/div><\/div>')
			setTimeout(closeModals, 3500)
		}
		else{
			return false
		}
	}
	var closeModals = function(){
		$('.toast, .loaderPrincipal, .splashAndroid').remove()
	}
	var closeModalsC = function(){
		$('.notificationAlert').remove()
	}


	var redirectUrl = function(Url){
		let urlPath = Url
		location.href = urlPath+'.html'
	}

	var returnToHome = function(){
		location.href = 'home.html'
	}

	var historyBack = function(){
		history.back(-1)
	}

	var logOutPortal = function(type){
		console.log('close Portal')
		return
	}

	/* Prellenado de datos */
	var dataUserCharge = function(){
		var dataUserCont = getStorage64('dataUserCont')
		var dataCompanyCont = getStorage64('dataCompanyCont')
		try{
			var fullName = dataUserCont.nombre+' '+dataUserCont.paterno+' '+dataUserCont.materno
			var idUser = dataUserCont.id_usuario
			var idEmployee = dataCompanyCont.numero_empleado
			var emailUser = dataUserCont.email
			var birthdayUser = returnFormatDateSub(dataUserCont.nacimiento)
			var sexUser = dataUserCont.sexo
			var phoneUser = dataUserCont.telefono
			var areaUser = dataCompanyCont.departamento.nombre
			var employeeUser = dataCompanyCont.empresa.nombre
			
		}catch(err){}
		
		$('.countDataUser .userName').text(fullName)
		$('.countDataUser .userID').text('ID de Seguimiento: '+idUser)
		if(idEmployee != null){
			$('.employementID').text('No. de empleado: '+idEmployee)
		}
		else{
			$('.employementID').parent().remove()
		}
		$('.personalData .dataEmail').text(emailUser)
		$('.personalData .dataBirthday span').text(birthdayUser)
		if(sexUser === 'm' || sexUser === 'M'){
			sexUser = 'Masculino'
			$('.personalData .dataSex span').text('Masculino')
		}else if(sexUser === 'f' || sexUser === 'F'){
			$('.personalData .dataSex span').text('Femenino')
		}
		$('.personalData .dataPhone span').text(phoneUser)

		$('.employData .dataArea span').text(areaUser)
		$('.employData .dataEmploye span').text(employeeUser)

		if(dataCompanyCont != 'null'){
			$('.employData').removeClass('hidden')
		}else {
			$('.employData').remove()
		}
		
		// console.log(dataUserCont)
		// console.log(dataCompanyCont)	
	}
	var dataSimptomsCharge = function(){
		var dataUserCont = getStorage64('dataUserCont')
		var dataImcCont = getStorage64('dataImcCont')
		var dataDiseasesCont = getStorage64('dataDiseasesCont')
		
		var initialDate = dataUserCont.fecha_registro.split(' ')
		var sexUser = dataUserCont.sexo.toUpperCase()
		var IMC = calculateIMC(dataImcCont.peso, dataImcCont.estatura)
		var simptomsList = dataDiseasesCont.enfermedades

		$('.myClinicalCards .simptomsList li').remove()

		$('.myClinicalCards .dateProfile dd').text( returnFormatDateSub(initialDate[0]) )
		if(sexUser === 'M'){
			sexUser = 'Masculino'
			$('.myClinicalCards .sexProfile dd').text('Masculino')
			$('.myClinicalCards .pregnatProfile').remove()

		}else if(sexUser === 'F'){
			$('.myClinicalCards .sexProfile dd').text('Femenino')
		}
		if(dataImcCont != 'null'){
			//$('.myClinicalCards .imcWeightProfile dd').text(dataImcCont.peso+' Kg')
			//$('.myClinicalCards .imcHeightProfile dd').text(dataImcCont.estatura+' cm')
			//$('.myClinicalCards .imcDiagnostic dd').text(IMC[1])
			$('.myClinicalCards .imcProfile dd').text(IMC[0])
		}else{ 
			$('.myClinicalCards .imcProfile dd span').remove()
			$('.myClinicalCards .imcProfile dd').append('<span class\=\"warningMessage\"> *Falta registro<\/span>')
		}

		if(dataDiseasesCont != 'null'){
			if(simptomsList.length != 0){
				let i = 0
				while(i < simptomsList.length){
					$('.myClinicalCards .simptomsList').append('<li>'+simptomsList[i].nombre+'<\/li>')
					i++
				}
			}
		}else{$('.myClinicalCards .simptomsList').append('<li>Ninguno<\/li>')}

		// console.log(dataUserCont)
		// console.log(dataImcCont)
		// console.log(dataDiseasesCont)
	}
	var preChargeIMCData = function(){
		var dataImcCont = getStorage64('dataImcCont')
		let peso
		if(dataImcCont.peso != undefined){
			peso = Number(dataImcCont.peso).toFixed(2)
		}else{
			peso = ''
		}
		//console.log(dataImcCont.peso)
		$('[name="imcPesoReg"]').val(peso)
		$('[name="imcAlturaReg"]').val(dataImcCont.estatura)
	}
	var preChargeSimptompsData = function(){
		//debugger
		//axiosListDiseases()
		var dataUserCont = getStorage64('dataUserCont')
		var sexUser = dataUserCont.sexo.toUpperCase()
		var dataDiseasesCont = getStorage64('dataDiseasesCont')
		var simptomsList = dataDiseasesCont.enfermedades
		//console.log(dataDiseasesCont)

		if(dataDiseasesCont != 'null'){
			//debugger
			if(simptomsList.length === 1){
				 if(simptomsList[0].id != 10){
					$('[name="diseases_'+simptomsList[0].id+'"]').trigger('click')
					if(sexUser === 'F'){
						$('[name="pregnantReg"]:eq(1)').trigger('click')
					}
				}
				 else if(simptomsList[0].id === 10){
					$('[name="pregnantReg"]:eq(0)').trigger('click')
					$('[name="ninguna"]').trigger('click')
				}
			}
			else if(simptomsList.length != 0){
				let i = 0
				while(i < simptomsList.length){
					if(simptomsList[i].id != 10){
						$('[name="diseases_'+simptomsList[i].id+'"]').trigger('click')
						$('[name="pregnantReg"]:eq(1)').trigger('click')
					}
					else if(simptomsList[i].id === 10){
						$('[name="pregnantReg"]:eq(0)').trigger('click')
					}
					i++
				}
			}
		}else{
			if(sexUser === 'F'){
				$('[name="ninguna"]').trigger('click')
				$('[name="pregnantReg"]:eq(1)').trigger('click')
			}
			else if(sexUser === 'M'){
				$('[name="ninguna"]').trigger('click')
			}
		}
	}
	var updateIMC = function(){
		let valInputImcPesoReg = $('[name="imcPesoReg"]').val()
		let valInputImcAlturaReg = $('[name="imcAlturaReg"]').val()
	
		if(valInputImcPesoReg === '' || valInputImcPesoReg === undefined  || valInputImcPesoReg === null ){
			errorInputNotify('imcPesoReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateFoat(valInputImcPesoReg)){
			errorInputNotify('imcPesoReg', warningMessages[8])
			toast(warningMessages[8])
		}
		else if( Number(valInputImcPesoReg)  <= 0 ){
			errorInputNotify('imcPesoReg', warningMessages[12])
			toast(warningMessages[12])
		}
		else if( Number(valInputImcPesoReg)  >= 301  ){
			errorInputNotify('imcPesoReg', warningMessages[13])
			toast(warningMessages[13])
		}
		else if(valInputImcAlturaReg === '' || valInputImcAlturaReg === undefined  || valInputImcAlturaReg === null ){
			errorInputNotify('imcAlturaReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateNumber(valInputImcAlturaReg)){
			errorInputNotify('imcAlturaReg', warningMessages[8])
			toast(warningMessages[8])
		}
		else if( Number(valInputImcAlturaReg)  <= 0){
			errorInputNotify('imcAlturaReg', warningMessages[15])
			toast(warningMessages[15])
		}
		else if( Number(valInputImcAlturaReg) >= 211 ){
			errorInputNotify('imcAlturaReg', warningMessages[16])
			toast(warningMessages[16])
		}
		else{
			calculateIMC( Number(valInputImcPesoReg), Number(valInputImcAlturaReg) )
			let dataRegistryIMC= {
				"height": Number(valInputImcAlturaReg),
				"weight": Number.parseFloat(valInputImcPesoReg).toFixed(2)
			}
			setStorage64('registryFormMiddleIMC', dataRegistryIMC)
			sendRegistryMiddleIMC(dataRegistryIMC)
		}
	}
	var updateSimptomps = function(){
		//debugger
		var dataUserCont = getStorage64('dataUserCont')
		let valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val()
		let valInputPregnantValidate = $('.pregnantType [name="pregnantReg"]:checked').length
		let valInputDiseases = $('.arrayDiseases [type="checkbox"]:checked').length

		var sexUser = dataUserCont.sexo.toUpperCase()
		let dataRegistryDiseases = getStorage64('arrayDiseases')

		if(sexUser === 'M'){
			//console.log('sex M')
			valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val('')

			if(valInputPregnant !== "no"){
				//debugger
				//console.log('valInputPregnant !== vacio')
				if(valInputDiseases === 0){
					errorRadioNotify('arrayDiseases', warningMessages[2])
					toast(warningMessages[2])
					dataRegistryDiseases = getStorage64('arrayDiseases')
				}
				else{
					//console.log(dataRegistryDiseases)
					setStorage64('registryFormMiddle', dataRegistryDiseases)
					sendRegistryMiddle(dataRegistryDiseases)
				}
			}
		}

		if( sexUser === 'F'){
			//console.log('sexF')
			if(valInputPregnantValidate === 0){
				//console.log('sexF y preg 0')
				errorRadioNotify('pregnantType', warningMessages[2])
				toast(warningMessages[2])
			}
			else if(valInputPregnant !== "no"){
				//debugger
				//console.log('valInputPregnant !== vacio')
				if($('.pregnantType [name="pregnantReg"]:checked').val() !== undefined  && $('.pregnantType [name="pregnantReg"]:checked').val() !== ""){
					valInputPregnant = parseInt( $('.pregnantType [name="pregnantReg"]:checked').val() )
					dataRegistryDiseases.push(valInputPregnant)
					if(valInputDiseases === 0){
						//console.log('pregnantReg  Val YES')
						errorRadioNotify('arrayDiseases', warningMessages[2])
						toast(warningMessages[2])
						dataRegistryDiseases = getStorage64('arrayDiseases')
					}
					else{
						//console.log('todo full YES')
						//console.log(dataRegistryDiseases)
						setStorage64('registryFormMiddle', dataRegistryDiseases)
						sendRegistryMiddle(dataRegistryDiseases)
					}
				}
			}
			else if(valInputDiseases === 0){
				//console.log('pregnantReg  Val NO')
				errorRadioNotify('arrayDiseases', warningMessages[2])
				toast(warningMessages[2])
				dataRegistryDiseases = getStorage64('arrayDiseases')
			}
			else{
				//console.log('todo full NO')
				//console.log(dataRegistryDiseases)
				setStorage64('registryFormMiddle', dataRegistryDiseases)
				sendRegistryMiddle(dataRegistryDiseases)
			}
		}	
	}
	var validateEmptySimptomps = function(){
		//debugger
		//console.log('valida sintomas al cargar')
		var dataUserCont = getStorage64('dataUserCont')
		try{
			var sexUser = dataUserCont.sexo.toUpperCase()
		}catch(err){console.log(err)}
		if(sexUser === 'M'){
			valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val('')
		}
		else if( sexUser === 'F'){
			$('.pregnantHide').removeClass('hidden')
		}
		$('.card.clinicalProfile').addClass('incompleteProf')
	}
	var succesUpdateSimp = function(){
		//console.log('charge success')
		if(window.location.pathname.indexOf('/clinicalProfile') !== -1){
			var dataDiseasesCont = getStorage64('dataDiseasesCont')
			var simptomsList = dataDiseasesCont.enfermedades

			$('.myClinicalCards .simptomsList li').remove()
			if(dataDiseasesCont != 'null'){
				if(simptomsList.length != 0){
					let i = 0
					while(i < simptomsList.length){
						$('.myClinicalCards .simptomsList').append('<li>'+simptomsList[i].nombre+'<\/li>')
						i++
					}
				}
			}else{$('.myClinicalCards .simptomsList').append('<li>Ninguno<\/li>')}
		}
	}
	var succesUpdateImc = function(){
		console.log('charge success')
		//debugger
		if(window.location.pathname.indexOf('/clinicalProfile') !== -1){
			var dataImcCont = getStorage64('dataImcCont')
			var IMC = calculateIMC(dataImcCont.peso, dataImcCont.estatura)

			if(dataImcCont != 'null'){
				//$('.myClinicalCards .imcWeightProfile dd').text(dataImcCont.peso+' Kg')
				//$('.myClinicalCards .imcHeightProfile dd').text(dataImcCont.estatura+' cm')
				//$('.myClinicalCards .imcDiagnostic dd').text(IMC[1])
				$('.myClinicalCards .imcProfile dd').text(IMC[0])
			}else{
				$('.myClinicalCards .imcProfile dd span').remove()
				$('.myClinicalCards .imcProfile dd').append('<span class\=\"warningMessage\"> *Falta registro<\/span>')
				$('.clinicalProfile').addClass('incompleteProf')
			}
		}
		if(window.location.pathname.indexOf('/userProfile') !== -1 || window.location.pathname.indexOf('/myAccount') !== -1){
			var dataImcCont = getStorage64('dataImcCont')
			if(dataImcCont === 'null'){
				$('.clinicalProfile').addClass('incompleteProf')
			}
		}
	}
	var succesUpdateInfoGral = function(){
		if(window.location.pathname.indexOf('/userProfile') !== -1){
			var dataUserCont = getStorage64('dataUserCont')

			var fullName = dataUserCont.nombre+' '+dataUserCont.paterno+' '+dataUserCont.materno
			var idUser = dataUserCont.id_usuario
			var emailUser = dataUserCont.email
			var birthdayUser = returnFormatDateSub(dataUserCont.nacimiento)
			var sexUser = dataUserCont.sexo
			var phoneUser = dataUserCont.telefono

			$('.countDataUser .userID').text('ID de Seguimiento: '+idUser)
			if(idEmployee != null){
				$('.employementID').text('No. de empleado: '+idEmployee)
			}
			else{
				$('.employementID').parent().remove()
			}
			$('.personalData .dataEmail').text(emailUser)
			$('.personalData .dataBirthday span').text(birthdayUser)
			if(sexUser === 'm' || sexUser === 'M'){
				sexUser = 'Masculino'
				$('.personalData .dataSex span').text('Masculino')
			}else if(sexUser === 'f' || sexUser === 'F'){
				$('.personalData .dataSex span').text('Femenino')
			}
			$('.personalData .dataPhone span').text(phoneUser)
		}
		if(window.location.pathname.indexOf('/clinicalProfile') !== -1){
			var dataUserCont = getStorage64('dataUserCont')
			var initialDate = dataUserCont.fecha_registro.split(' ')
			var sexUser = dataUserCont.sexo.toUpperCase()

			$('.myClinicalCards .dateProfile dd').text( returnFormatDateSub(initialDate[0]) )
			if(sexUser === 'M'){
				sexUser = 'Masculino'
				$('.myClinicalCards .sexProfile dd').text('Masculino')
				$('.myClinicalCards .pregnatProfile').remove()

			}else if(sexUser === 'F'){
				$('.myClinicalCards .sexProfile dd').text('Femenino')
			}
		}
	}
	var succesUpdateCompany = function(){
		if(window.location.pathname.indexOf('/userProfile') !== -1){
			var dataCompanyCont = getStorage64('dataCompanyCont')
			if(dataCompanyCont != 'null'){
				$('.employData').removeClass('hidden')
				var areaUser = dataCompanyCont.departamento.nombre
				var employeeUser = dataCompanyCont.empresa.nombre
				$('.employData .dataArea span').text(areaUser)
				$('.employData .dataEmploye span').text(employeeUser)
			}else {
				$('.employData').remove()
			}
		}

	}


	/* Validaciones de tipo de dato */
	var validateEmail = function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	var validateNumber = function(number) {
		var re = /^\d+$/;
		return re.test(number);
	}
	var validateFoat = function(float) {
		var re = /^[+-]?\d+(\.\d+)?$/;
		return re.test(float);
	}
	var validateString = function(string) {
		var re = /^[a-z,A-Z]*$/;
		return re.test(string);
	}
	var validatteDate = function(date){
		var re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/ig;
		return re.test(date);
	}
	var stripCode = function(code){
		var  originalCode = code
		let codeStrip = originalCode.replace(/(<([^>]+)>)/ig,"")
		return codeStrip
	}
	var validateTypeDate = function(code){
		var re = /^[0-9\/-]*$/;
		return re.test(code);
	}
	var returnFormatDate = function(dateValue){
		var fecha = String(dateValue)
		let dateCount = fecha.length
		let dateNormal = fecha.indexOf('-') >= 1
		let dateSafari = fecha.indexOf('/') >= 1
		if(dateCount !== 10){
			var fail = 'fail'
			return  fail
		}
		else if(dateNormal >= 1){
			let fechaArray = fecha.split('-')
			let fechaArreglada
			if(fechaArray[0].length == 4){
				fechaArreglada  =  fechaArray[0]+'-'+fechaArray[1]+'-'+fechaArray[2]
				return fechaArreglada
			}else if(fechaArray[0].length == 2){
				fechaArreglada  =  fechaArray[2]+'-'+fechaArray[1]+'-'+fechaArray[0]
				return fechaArreglada
			}
		}
		else if(dateSafari >= 1){
			let fechaArray = fecha.split('/')
			let fechaArreglada
			if(fechaArray[0].length == 4){
				fechaArreglada  =  fechaArray[0]+'-'+fechaArray[1]+'-'+fechaArray[2]
				return fechaArreglada
			}else if(fechaArray[0].length == 2){
				fechaArreglada  =  fechaArray[2]+'-'+fechaArray[1]+'-'+fechaArray[0]
				return fechaArreglada
			}
		}
	}
	var returnFormatDateSub = function(dateValue){
		var fecha = String(dateValue)
		let dateCount = fecha.length
		let dateNormal = fecha.indexOf('-') >= 1
		let dateSafari = fecha.indexOf('/') >= 1
		if(dateCount !== 10){
			var fail = 'fail'
			return  fail
		}
		else if(dateNormal >= 1){
			let fechaArray = fecha.split('-')
			let fechaArreglada
			if(fechaArray[0].length == 4){
				fechaArreglada  =  fechaArray[2]+'-'+fechaArray[1]+'-'+fechaArray[0]
				return fechaArreglada
			}else if(fechaArray[0].length == 2){
				fechaArreglada  =  fechaArray[0]+'-'+fechaArray[1]+'-'+fechaArray[2]
				return fechaArreglada
			}
		}
		else if(dateSafari >= 1){
			let fechaArray = fecha.split('/')
			let fechaArreglada
			if(fechaArray[0].length == 4){
				fechaArreglada  =  fechaArray[2]+'-'+fechaArray[1]+'-'+fechaArray[0]
				return fechaArreglada
			}else if(fechaArray[0].length == 2){
				fechaArreglada  =  fechaArray[0]+'-'+fechaArray[1]+'-'+fechaArray[2]
				return fechaArreglada
			}
		}
	}
	

	var addZero = function(num){
		if (num< 10) {
			num = '0' + num;
		}
		return num;
	}
	var dateToday = function(){
		var hoy = new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth()+1;
		var yyyy = hoy.getFullYear();
		var dateToday = yyyy+'-'+addZero(mm)+'-'+addZero(dd)

		return dateToday
	}()
	var dateMinBirthady = function(){
		var hoy = new Date();
		var dd = hoy.getDate();
		//var mm = hoy.getMonth()+1;
		//var yyyy = hoy.getFullYear()-18;
		var mm = hoy.getMonth();
		var yyyy = hoy.getFullYear();
		var dateMinBirthady = yyyy+'-'+addZero(mm)+'-'+addZero(dd)

		return dateMinBirthady
	}()
	var calculateIMC = function(peso, altura){
		let imc = peso / Math.pow(altura, 2)
		let valRound = imc*10000 
		imcTotal = []
		imcTotal.push( valRound.toFixed(2) )
		if (imcTotal[0] < 18.5){ imcTotal.push('Peso insuficiente')}
		if (imcTotal[0] >= 18.6 && imcTotal[0] <= 24.9){ imcTotal.push('Peso normal')}
		if (imcTotal[0] >= 25 && imcTotal[0] <= 26.9){ imcTotal.push('Sobrepeso grado I')}
		if (imcTotal[0] >= 27 && imcTotal[0] <= 29.9){ imcTotal.push('Sobrepeso grado II (preobesidad)')}
		if (imcTotal[0] >= 30 && imcTotal[0] <= 34.9){imcTotal.push('Obesidad de tipo I')}
		if (imcTotal[0] >= 35 && imcTotal[0] <= 39.9){imcTotal.push('Obesidad de tipo II')}
		if (imcTotal[0] >= 40 && imcTotal[0] <= 49.9){imcTotal.push('Obesidad de tipo III (mórbida)')}
		if (imcTotal[0] >= 50){imcTotal.push('Obesidad de tipo IV (extrema)')}
		return imcTotal
	}


	/* agrega  loading secundario */
	var addModal = function(message){
		$('main').prepend('<div class=\"modalView\"><div class=\"contentModal\"><span class=\"modalClose\">x</span><div class=\"message\">'+ message +'<\/div><\/div><\/div>')
	}
	var addLoader = function(active){
		var activo = String(active)
		if(activo === 'false'){
			$('.loaderCharge').hide()
			$('.loaderCharge').remove()
			return
		}else{
			$('body').prepend('<div class=\"loaderCharge\"><div class=\"contentLoading\"><span class=\"loadImage\"><\/span><\/div><\/div>')
			return
		}
	}

	/* remueve el loading principal */
	var removeLoader = function(){
		$('.loaderPrincipal').hide()
		$('.loaderPrincipal').remove()
	}

	var splashAndroid = function(){
		$('body').prepend('<div class=\"splashAndroid\"><span class="modalClose"></span><div class=\"contentLoading\"><div class="contAppAndroidS"><p class=\"h2\">Descarga el app<\/p><img src=\"img\/logo-monitor.png" class=\"logoMonitor\"/><p>y monitorea tu salud diariamente.<\/p><a href=\"download/monitoreo_V5.apk\"><img src=\"img\/android.png\" \/><\/a><\/div><\/div><\/div>')
	}


	var upTop = function(param){
		$(document).scrollTop(0)
	}

	var upErrorMessage = function(){
		let topError = $('.error').offset().top - 30
		$(document).scrollTop(topError)
	}

	/* Funciones del storage */
	var setStorage64 = function(key, value){
		var keyString = JSON.stringify(key)
		var valueString = JSON.stringify(value)
		localStorage.setItem(btoa(keyString), btoa(valueString))
		return 
	}
	var getStorage64 = function(key){
		var llave = JSON.stringify(key)
		var keyString = btoa(llave)
		var valueString = localStorage.getItem(keyString)
		var response =  atob(valueString)
		try{
			llave = JSON.parse(response)
		}
		catch(error){
			llave = response
		}
		return llave
	}
	var deleteStorage64 = function(key){
		var llave = JSON.stringify(key)
		var keyString = btoa(llave)
		var valueString = localStorage.removeItem(keyString)
		return
	}

	var getParams = function(){
		var loc = document.location.href;
		var getString = loc.split('?')[1];
		var GET = getString.split('&');
		var get = {};
		for(var i = 0, l = GET.length; i < l; i++){
			var tmp = GET[i].split('=');
			get[tmp[0]] = unescape(decodeURI(tmp[1]));
		}
		return get;
	}


	var insertUser = function(){
		var user = getStorage64('userAppU')
		var name = getStorage64('userAppN')
		var loginIn = getStorage64('userLoginSession')
		$('.userID').text(' ID seguimiento:  '+ user)
		$('.userName').text(' ¡Hola '+ name+' !')

		if(loginIn === "true" ){
			$('.userID, .userName, .sessionInit').removeClass('hidden')
			$('.headCard').addClass('hidden')
		}
	}()
	
	var sessionUserActive =function(destruct){
		var end = String(destruct)
		var redis = getStorage64('userRedisT')
		var tok = getStorage64('userAppT')
		var user = getStorage64('userAppU')
		if(end === "true"){
			deleteStorage64('userAppT')
			deleteStorage64('userAppU')
			deleteStorage64('userLoginSession')
		}
		else{
			setStorage64('userLoginSession','true')
		}
	}


	/* Guarda en codigo de entrada pasandolo a base64  */
	var setCodeEnter = function(param){
		localStorage.setItem('kodoNyuryoku', btoa(param))
		return 
	}

	/* Extrae en codigo de entrada pasandolo a base64 */
	var getCodeEnter = function(){
		codeEnter = localStorage.getItem('kodoNyuryoku')
		return codeEnter
	}


	/* Genera acceso para usuario a las demas secciones*/
	var setSusumu = function(){
		localStorage.setItem('yokoso', btoa('wakatta'))
		return 
	}

	/* Extrae acceso para usuario a las demas secciones*/
	var getSusumu = function(){
		susumu = localStorage.getItem('yokoso')
		return susumu
	}
	

	/* Guarda token redis a base64  */
	var setIdRedis = function(param){
		localStorage.setItem('tokunRedis', btoa(param))
		return tokunRedis
	}

	var getIdRedis = function(){
		idRedis = localStorage.getItem('tokunRedis')
		return idRedis
	}



	/* Evalua la locacion para saber si tiene acceso  */
	var evaLocation = function(){
		getSusumu()
		if(URL_PathName === URL_Password){
			return
		}
		else if(URL_Origin != URL_Location){
			/*  console.log('estas en ' + URL_PathName) */
			if(susumu === null  || susumu != btoa('wakatta')){
				location.href = BASE_URL
				return
			}
			return
		}else{
			if(susumu != null ){
				location.href = 'home.html'
				return
			}
			else{
				return
			}
			/*   localStorage.removeItem('yokoso') */
		}
	}()



	/*  Validate Forms  */
	var validatePProtect = function(){
		getCodeEnter()
		let valInput = $('.passwordProtect input').val()
		if(valInput === '' || valInput === undefined  || valInput === null ){
			$('.passwordProtect input').addClass('error')
			$('.passwordProtect .errorMessage').text('Campo vacio')
		}
		else{
			if(valInput == atob(codeEnter) ){
				setSusumu()
				returnToHome()
			}
			else{
				$('.passwordProtect input').addClass('error')
				$('.passwordProtect .errorMessage').text('Valor Incorrecto')
			}
		}
	}

	var validateLoginAPP = function(data){
		if(data === undefined){
			deleteStorage64('LoginAPP')
		}
		else{
			setStorage64('LoginAPP', data)
		}
	}

	var validateLogin= function(){
		let valInputEmail = $('[name="emailLogin"]').val()
		let valInputPass = $('[name="passwordLogin"]').val()


		let dataLogin = {
			"email": valInputEmail,
			"password": valInputPass
		}

		if(valInputEmail === '' || valInputEmail === undefined  || valInputEmail === null ){
			$('[name="emailLogin"]').addClass('error')
			$('[name="emailLogin"] + .errorMessage').text('Campo vacio')
		}
		else if(!validateEmail(valInputEmail)){
			$('[name="emailLogin"]').addClass('error');
			$('[name="emailLogin"] + .errorMessage').text('Formato de correo invalido');
		}
		else if(valInputPass === '' || valInputPass === undefined  || valInputPass === null ){
			$('[name="passwordLogin"]').addClass('error')
			$('[name="passwordLogin"] + .errorMessage').text('Campo vacio')
		}
		else{
			addLoader()
			sendLogin(dataLogin)
		}
	}

	var showLogin = function(){
		$('.formLogin').removeClass('hidden')
		$('.formQuestion').addClass('hidden')
		$('.formRecord').addClass('hidden')
	}
	var showRegistry = function(){
		$('.formRecord').removeClass('hidden')
		$('.formLogin').addClass('hidden')
		$('.formQuestion').addClass('hidden')
	}

	var validateRecoveryPass = function(){
		let valInput = $('[name="recoveryPassword"]').val()

		let dataRecoveryPass = {
			"email": valInput
		}

		if(valInput === '' || valInput === undefined  || valInput === null ){
			$('.passwordRecovery input').addClass('error')
			$('.passwordRecovery .errorMessage').text('Campo vacio')
		}
		else if(!validateEmail(valInput)){
			$('.passwordRecovery input').addClass('error');
			$('.passwordRecovery .errorMessage').text('Formato de correo invalido');
		}
		else{
			sendRecoveryPass(dataRecoveryPass)
		}
	}

	var validateUpdatePass = function(){
		let valInputUp = String( $('[name="updatePassword"]').val() )
		let valInputRec = String( $('[name="confirmUpPass"]').val() )
		let token = getStorage64('getTokenR')

		let upadtePass = {
			"password": valInputRec,
			"token": token
		}

		if(valInputUp === '' || valInputUp === undefined  || valInputUp === null ){
			$('[name="updatePassword"]').addClass('error')
			$('[name="updatePassword"] + .errorMessage').text('Campo vacio')
			upErrorMessage()
		}
		else if(valInputUp.length <= 5 ){
			$('[name="updatePassword"]').addClass('error')
			$('[name="updatePassword"] + .errorMessage').text('Contraseñas menor a 6 caracteres')
			upErrorMessage()
		}
		else if(valInputRec === '' || valInputRec === undefined  || valInputRec === null ){
			$('[name="confirmUpPass"]').addClass('error')
			$('[name="confirmUpPass"] + .errorMessage').text('Campo vacio')
			upErrorMessage()
		}
		else if(valInputRec !== valInputUp){
			$('[name="confirmUpPass"]').addClass('error');
			$('[name="confirmUpPass"] + .errorMessage').text('Las contraseñas no son iguales');
			upErrorMessage()
		}
		else{
			sendUpdatePass(upadtePass)
		}
	}


	/* Cambio genero  */
	var validateGenere = function(){
		if( $('.registryModule, .registryFamilyModule').length === 1 ){
			generoLS = getStorage64('registryGender')
			//console.log('LS: '+generoLS)
			if(generoLS === 'f' ){
				//console.log('Female')
				$('.FormMiddle .pregnantHide').removeClass('hidden')
			}
			else{
				//console.log('Man')
				$('.FormMiddle .pregnantHide').addClass('hidden')
			}
			
			$('body').on('change','.genereType', function(){
				var genero =  $('.genereType [name="genderReg"]:checked').val()
				//console.log('change: '+genero)

				if(genero === 'f'){
					//console.log('Female')
					$('.FormMiddle .pregnantHide').removeClass('hidden')
					setStorage64('registryGender','f')
				}
				else{
					//console.log('Man')
					$('.FormMiddle .pregnantHide').addClass('hidden')
					setStorage64('registryGender','m')
				}
			})
		}	
	}()

	/* Listo datos Enfermedades  */
	var valideArrayDiseases = function(){
		if( $('.registryModule, .registryFamilyModule, .FormSimptomps').length === 1 ){
			var source = []
			setStorage64('arrayDiseases', source)
			$('body').on('change','.arrayDiseases input, .pregnantType input', function(){
				//debugger
				var $this = $(this)
				let valueSel =  $this.attr('value')
				$('.arrayDiseases').removeClass('error')
				

				if($this.attr('name') === 'ninguna'){
					$('.arrayDiseases [type="checkbox"]').not('[name="ninguna"]').prop('checked', false)
					source = []
					setStorage64('arrayDiseases', source)
					// console.log( '------1------')
					// console.log( getStorage64('arrayDiseases') )
					return source
				}
				else{
					if($this.parent().parent().hasClass('arrayDiseases') ){
						//console.log('arrayDiseases')
						$('.arrayDiseases [name="ninguna"]').prop('checked', false)
						source = []
						$('.arrayDiseases [type="checkbox"]:checked').each(function(){
							var $this = $(this)
							source.push( Number( $this.attr('value') ) )
						})
						setStorage64('arrayDiseases', source)
						// console.log( '------2------')
						// console.log( getStorage64('arrayDiseases') )
						return source
					}
					else if($this.parent().parent().hasClass('pregnantType')){
						console.log('pregnantType')
						source = []
						$('.arrayDiseases [type="checkbox"]:checked').each(function(){
							var $this = $(this)
							source.push( Number( $this.attr('value') ) )
						})
						if(source.indexOf(0) >=0){
							source.sort(function(a,b){return a - b})
							source.shift()
						}

						setStorage64('arrayDiseases', source)
						//console.log( '------3------')
						//console.log( getStorage64('arrayDiseases') )
						return source
					}
				}
			})
		}
	}()
	/* Listo datos Sintomas  */
	var valideArraySymptoms = function(){
		if( $('.monitoringModule').length === 1 ){
			var source = []
			setStorage64('arraySymptoms', source)
			$('body').on('change','.arraySymptoms input', function(){
				//debugger
				var $this = $(this)
				let valueSel =  $this.attr('value')
				$('.arraySymptoms').removeClass('error')

				if($this.attr('name') === 'sintomaNinguna'){
					$('.arraySymptoms [type="checkbox"]').not('[name="sintomaNinguna"]').prop('checked', false)
					source = []
					setStorage64('arraySymptoms', source)
					setStorage64('sintomaNinguna', 'true')
					console.log('asdT'+getStorage64('sintomaNinguna'))
					validateDateSymptoms()
					return source
				}
				else{
					$('.arraySymptoms [name="sintomaNinguna"]').prop('checked', false)
					source = []
					$('.arraySymptoms [type="checkbox"]:checked').each(function(){
						var $this = $(this)
						source.push( Number( $this.attr('value') ) )
					})
					setStorage64('arraySymptoms', source)
					setStorage64('sintomaNinguna', 'false')
					console.log('asdasdF'+getStorage64('sintomaNinguna'))
					validateDateSymptoms()
					return source
				}
			})
		}
	}()

	var validateDateSymptoms = function(){
		var temp = $('[name=selecTemp]').val()
		var problem = $('.problemsBreathe [name="breatheProblem"]:checked').val()
		var sintom = $('.arraySymptoms [name=sintomaNinguna]').prop('checked')
		var probVac = $('.problemsBreathe [type=radio]:checked').length
		var sinVac = $('.arraySymptoms input[type="checkbox"]:checked').length

		if( Number(temp) <= 37.9   &&  ( Number(problem) === 8 || Number(probVac) === 0  ) &&  ( sintom === true || Number(sinVac) ===0 ) ){
			$('.firstDateSymptoms').addClass('hidden')
			$('[name="dateFirstSymptom"]').val('')
		}
		else{
			$('.firstDateSymptoms').removeClass('hidden')
		}
	}
	var executeDateSymptom = function(){
		setTimeout(function(){
			validateDateSymptoms()
			},700
		)
		$('.card.monitoring').on('change',function(){
			validateDateSymptoms()
		})
	}()
	var validateQuarantine = function(){
		$('.isolation .btn.secundario').on('click', function(){
			var $this = $(this)
			var typeButton = $this.html()

			$('.isolation .btn.secundario').removeClass('active')
			$this.addClass('active')


			if(typeButton === 'Si'){
				setStorage64('ifQuarantine', 'yes')
				$('.contMonitoringIsolation').removeClass('hidden')
			}
			else if( typeButton === 'No' ){
				setStorage64('ifQuarantine', 'no')
				$('.contMonitoringIsolation').addClass('hidden')
				$('.contMonitoringIsolation select').prop('selectedIndex',0)
				$('.contMonitoringIsolation input[type="radio"]').prop('checked', false)
				$('.contMonitoringIsolation input[type="date"]').val('')
			}
		})
	}()


	/* Data success Family */
	var sendFamilyData = function(){
		addLoader('false')
		upTop()
		redirectUrl('familyRegistry')
		request202()
	}
	/* Data success registro */
	var sendUserData = function(){
		addLoader('false')
		upTop()
		$('.registryModule .form.FormFirst').addClass('hidden')
		$('.registryModule .form.FormMiddle').removeClass('hidden')
		request202()
	}
	var sendUserFamilyData = function(){
		addLoader('false')
		upTop()
		$('.registryFamilyModule .form.FormFirst').addClass('hidden')
		$('.registryFamilyModule .form.FormMiddle').removeClass('hidden')
		request202()
	}
	var sendDiseasesData = function(){
		addLoader('false')
		upTop()
		$('.registryModule .form.FormMiddle').addClass('hidden')
		$('.registryModule .form.FormMiddleIMC').removeClass('hidden')
		$('.registryFamilyModule .form.FormMiddle').addClass('hidden')
		$('.registryFamilyModule .form.FormMiddleIMC').removeClass('hidden')
		request202()
	}
	var updateDiseasesData = function(){
		console.log('click en diseases update')
		setTimeout(function(){
			upTop()
			addLoader('false')
			redirectUrl('clinicalProfile')
		},500)
	}
	var sendIMCData = function(){
		addLoader('false')
		upTop()
		$('.registryModule .form.FormMiddleIMC').addClass('hidden')
		$('.registryModule .form.FormLast').removeClass('hidden')
		$('.registryFamilyModule .form.FormMiddleIMC').addClass('hidden')
		$('.registryFamilyModule .form.FormLast').removeClass('hidden')
		request202()
	}
	var updateIMCData = function(){
		setTimeout(function(){
			upTop()
			addLoader('false')
			redirectUrl('clinicalProfile')
		},500)
	}
	var sendCompanyData = function(){
		addLoader('false')
		request202()
		location.href = 'monitoring.html' 
	}
	var emaiInUse = function(){
		$('.registryModule .form.FormFirst').removeClass('hidden')
		$('.registryModule .form.FormLast').addClass('hidden')
		errorInputNotify('emailReg', warningMessages[9])
		toast(warningMessages[9])
		addLoader('false')
	}
	var sessionTimeOut = function(){
		toast(warningMessages[10])
		//toast('Tu sesión ha expirado.')
	}
	var sintomasSuccess = function(){
		addLoader('false')
		upupTop()
		request202()
		/* console.log('axiosSymptoms'); */
	}


	/*  Funcion de errores */
	var errorInputNotify = function(name, text){
		$('[name="'+ name +'"]').addClass('error')
		$('[name="'+ name +'"] + .errorMessage').text( text )
		upErrorMessage()
	}
	var errorRadioNotify = function(name, text){
		$('.'+ name).addClass('error')
		$('.'+ name +' + .errorMessage').text( text )
		upErrorMessage()
	}
	var errorSelectNotify = function(name, text){
		$('[name="'+ name +'"]').parent().addClass('error')
		$('[name="'+ name +'"]').parent().next().text( text )
		upErrorMessage()
	}

	var validateAccessFamily = function(){
		let valInputId = $('[name="idSeguimiento"]').val()
		let valInputEmail = $('[name="emailFamily"]').val()
		let valInputRelation = $('[name="familyRelationship"]').val()
		let valInputFamilar = $('.familiarType [name="familiarReg"]:checked').val()
		let valInputFamiliarValidate = $('.familiarType [name="familiarReg"]:checked').length

		let dataValidateFamily = {
			"email": valInputEmail,
			"relatives_id": Number(valInputRelation)
		}

		if(valInputId === '' || valInputId === undefined  || valInputId === null ){
			errorInputNotify('idSeguimiento', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateNumber(valInputId)){
			errorInputNotify('idSeguimiento', warningMessages[8])
			toast(warningMessages[8])
		}
		else if(valInputEmail === '' || valInputEmail === undefined  || valInputEmail === null ){
			errorInputNotify('emailFamily', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateEmail(valInputEmail)){
			errorInputNotify('emailFamily', warningMessages[3])
			toast(warningMessages[3])
		}
		else if(valInputRelation === '' || valInputRelation === undefined  || valInputRelation === null ){
			errorSelectNotify('familyRelationship', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(valInputFamiliarValidate === 0){
			errorRadioNotify('familiarType', warningMessages[2])
			toast(warningMessages[2])
		}
		else{
			setStorage64('liveInHouse', valInputFamilar)
			sendEvalueFamily(dataValidateFamily, valInputId)
			/*
			console.log(dataValidateFamily)
			console.log(valInputId)
			console.log( getStorage64('liveInHouse') )
			*/
		}
	}


	/* listo datos registro */
	var validateRegistryFormFirst = function(){
		let familiar_ID = getStorage64('userRedisParentT')
		//console.log('familiar token: '+familiar_ID)
		let valInputId = $('[name="idEmpleadoReg"]').val()
		let valInputEmail = $('[name="emailReg"]').val()
		let valInputPass = $('[name="passwordReg"]').val()
		let valInputName = $('[name="nombreReg"]').val()
		let valInputPaternal = $('[name="apelldoPaternoReg"]').val()
		let valInputMaternal = $('[name="apellidoMaternoReg"]').val()
		let valInputCP = $('[name="codigoPostalReg"]').val()
		var valInputBirthday = $('[name="fechaNacimientoReg"]').val()
		if(valInputBirthday.length > 1){
			valInputBirthday = returnFormatDateSub( $('[name="fechaNacimientoReg"]').val() )
		}
		let valInputGender = $('.genereType [name="genderReg"]:checked').val()
		let valInputGenderValidate = $('.genereType [name="genderReg"]:checked').length


		if(valInputEmail === '' || valInputEmail === undefined  || valInputEmail === null ){
			errorInputNotify('emailReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateEmail(valInputEmail)){
			errorInputNotify('emailReg', warningMessages[3])
			toast(warningMessages[3])
		}
		else if(valInputPass === '' || valInputPass === undefined  || valInputPass === null ){
			errorInputNotify('passwordReg', warningMessages[0])
			toast(warningMessages[0])
			upErrorMessage()
		}
		else if(valInputPass.length <= 5 ){
			errorInputNotify('passwordReg', warningMessages[4])
			toast(warningMessages[4])
		}
		else if(valInputName === '' || valInputName === undefined  || valInputName === null ){
			errorInputNotify('nombreReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(valInputPaternal === '' || valInputPaternal === undefined  || valInputPaternal === null ){
			errorInputNotify('apelldoPaternoReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(valInputMaternal === '' || valInputMaternal === undefined  || valInputMaternal === null ){
			errorInputNotify('apellidoMaternoReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(valInputCP === '' || valInputCP === undefined  || valInputCP === null ){
			errorInputNotify('codigoPostalReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateNumber(valInputCP)){
			errorInputNotify('codigoPostalReg', warningMessages[8])
			toast(warningMessages[8])
		}
		else if(valInputCP.length !== 5){
			errorInputNotify('codigoPostalReg', warningMessages[5])
			toast(warningMessages[5])
		}
		else if(valInputBirthday === '' || valInputBirthday === undefined  || valInputBirthday === null ){
			errorInputNotify('fechaNacimientoReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateTypeDate(valInputBirthday)){
			errorInputNotify('fechaNacimientoReg', warningMessages[7])
			toast(warningMessages[7])
		}
		else if(valInputBirthday.length !== 10){
			errorInputNotify('fechaNacimientoReg', warningMessages[7])
			toast(warningMessages[7])
		}
		else if(valInputGenderValidate === 0){
			errorRadioNotify('genereType', warningMessages[2])
			toast(warningMessages[2])
		}
		// else if(valInputDiseases === 0){
		// 	errorRadioNotify('arrayDiseases', warningMessages[2])
		// 	toast(warningMessages[2])
		// }
		else{
			let valTypeFamiliar = getStorage64('liveInHouse')
			if(familiar_ID.length >= 10 ){
				let dataRegistryUser = {
					"name": valInputName,
					"paternal": valInputPaternal,
					"maternal": valInputMaternal,
					"email": valInputEmail,
					"cp" : String(valInputCP),
					"gender": valInputGender,
					"birthdate": valInputBirthday,
					"type": valTypeFamiliar,
					"password": valInputPass,
					"source": "3"
				}
				setStorage64('registryFormFirst', dataRegistryUser)
				setStorage64('registryGender', valInputGender)
				//console.log('familiar')
				sendRegistryFamilyFirst(dataRegistryUser)
			}
			else{
				let dataRegistryUser = {
					"name": valInputName,
					"paternal": valInputPaternal,
					"maternal": valInputMaternal,
					"email": valInputEmail,
					"cp" : String(valInputCP),
					"gender": valInputGender,
					"birthdate": valInputBirthday,
					"type": "1",
					"employ_id": valInputId,
					"password": valInputPass,
					"source": "3"
				}
				setStorage64('registryFormFirst', dataRegistryUser)
				setStorage64('registryGender', valInputGender)
				//console.log('normal')
				sendRegistryFirst(dataRegistryUser)	
			}
			
		}
		console.log(getStorage64('registryFormFirst') )
	}
	var validateRegistryFormMiddle = function(){
		//debugger
		let valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val()
		let valInputPregnantValidate = $('.pregnantType [name="pregnantReg"]:checked').length
		let valInputDiseases = $('.arrayDiseases [type="checkbox"]:checked').length

		let genero = getStorage64('registryGender')
		let dataRegistryDiseases = getStorage64('arrayDiseases')

		if(genero === 'm'){
			//console.log('sex M')
			valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val('')
			if(valInputPregnant !== "no"){
			//debugger
			//console.log('valInputPregnant !== vacio')
			if(valInputDiseases === 0){
				errorRadioNotify('arrayDiseases', warningMessages[2])
				toast(warningMessages[2])
				dataRegistryDiseases = getStorage64('arrayDiseases')
			}
			else{
				//console.log(dataRegistryDiseases)
				setStorage64('registryFormMiddle', dataRegistryDiseases)
				sendRegistryMiddle(dataRegistryDiseases)
			}
		}
		}
		if(genero === 'f'){
			//console.log('sexF')
			if(valInputPregnantValidate === 0){
				//console.log('sexF y preg 0')
				errorRadioNotify('pregnantType', warningMessages[2])
				toast(warningMessages[2])
			}
			else if(valInputPregnant !== "no"){
				if($('.pregnantType [name="pregnantReg"]:checked').val() !== undefined  && $('.pregnantType [name="pregnantReg"]:checked').val() !== ""){
					valInputPregnant = parseInt( $('.pregnantType [name="pregnantReg"]:checked').val() )
					dataRegistryDiseases.push(valInputPregnant)
					if(valInputDiseases === 0){
						//console.log('pregnantReg  Val YES')
						errorRadioNotify('arrayDiseases', warningMessages[2])
						toast(warningMessages[2])
						dataRegistryDiseases = getStorage64('arrayDiseases')
					}
					else{
						//console.log('todo full YES')
						//console.log(dataRegistryDiseases)
						setStorage64('registryFormMiddle', dataRegistryDiseases)
						sendRegistryMiddle(dataRegistryDiseases)
					}
				}
			}
			else if(valInputDiseases === 0){
				//console.log('pregnantReg  Val NO')
				errorRadioNotify('arrayDiseases', warningMessages[2])
				toast(warningMessages[2])
				dataRegistryDiseases = getStorage64('arrayDiseases')
			}
			else{
				//console.log('todo full NO')
				//console.log(dataRegistryDiseases)
				setStorage64('registryFormMiddle', dataRegistryDiseases)
				sendRegistryMiddle(dataRegistryDiseases)
			}
		}
	}
	var validateRegistryFormMiddleIMC = function(){
		let valInputImcPesoReg = $('[name="imcPesoReg"]').val()
		let valInputImcAlturaReg = $('[name="imcAlturaReg"]').val()
	
		if(valInputImcPesoReg === '' || valInputImcPesoReg === undefined  || valInputImcPesoReg === null ){
			errorInputNotify('imcPesoReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateFoat(valInputImcPesoReg)){
			errorInputNotify('imcPesoReg', warningMessages[8])
			toast(warningMessages[8])
		}
		/*
		else if( Number(valInputImcPesoReg)  >= 0  && Number(valInputImcPesoReg)  <= 44 ){
			errorInputNotify('imcPesoReg', warningMessages[12])
			toast(warningMessages[12])
		}
		*/
		else if( Number(valInputImcPesoReg)  <= 0 ){
			errorInputNotify('imcPesoReg', warningMessages[12])
			toast(warningMessages[12])
		}
		else if( Number(valInputImcPesoReg)  >= 301  ){
			errorInputNotify('imcPesoReg', warningMessages[13])
			toast(warningMessages[13])
		}
		else if(valInputImcAlturaReg === '' || valInputImcAlturaReg === undefined  || valInputImcAlturaReg === null ){
			errorInputNotify('imcAlturaReg', warningMessages[0])
			toast(warningMessages[0])
		}
		else if(!validateNumber(valInputImcAlturaReg)){
			errorInputNotify('imcAlturaReg', warningMessages[8])
			toast(warningMessages[8])
		}
		/*
		else if( Number(valInputImcAlturaReg)  >= 0  && Number(valInputImcAlturaReg)  <= 119){
			errorInputNotify('imcAlturaReg', warningMessages[15])
			toast(warningMessages[15])
		}
		*/
		else if( Number(valInputImcAlturaReg)  <= 0){
			errorInputNotify('imcAlturaReg', warningMessages[15])
			toast(warningMessages[15])
		}
		else if( Number(valInputImcAlturaReg) >= 211 ){
			errorInputNotify('imcAlturaReg', warningMessages[16])
			toast(warningMessages[16])
		}
		else{
			calculateIMC( Number(valInputImcPesoReg), Number(valInputImcAlturaReg) )

			let dataRegistryIMC= {
				"height": Number(valInputImcAlturaReg),
				"weight": Number.parseFloat(valInputImcPesoReg).toFixed(2)
			}

			setStorage64('registryFormMiddleIMC', dataRegistryIMC)

			//console.log(dataRegistryIMC)
			sendRegistryMiddleIMC(dataRegistryIMC)
		}
	}
	var validateRegistryFormLast = function(){
		let familiar_ID = getStorage64('userRedisParentT')
		console.log('familiar token: '+familiar_ID)
		let valInputEmpresa = $('[name="selecEmpresaReg"]').val()
		let valInputArea = $('[name="selecAreaReg"]').val()
		let valInputTelCel = $('[name="telefonoCeluilarReg"]').val()
		let valInputFamiliar = $('[name="nombreFamiliarReg"]').val()
		let valInputTelEmerg = $('[name="telefonoEmergenciaReg"]').val()
		let valInputTelWork = ''


		if(familiar_ID.length >= 10 ){
			
			if(valInputTelCel === '' || valInputTelCel === undefined  || valInputTelCel === null ){
				$('[name="telefonoCeluilarReg"]').addClass('error')
				$('[name="telefonoCeluilarReg"] + .errorMessage').text('Campo vacio')
				upErrorMessage()
			}
			else if(valInputTelCel.length != 10){
				$('[name="telefonoCeluilarReg"]').addClass('error');
				$('[name="telefonoCeluilarReg"] + .errorMessage').text('El teléfono debe de contar con 10 dígitos');
				upErrorMessage()
			}
			else if(!validateNumber(valInputTelCel)){
				$('[name="telefonoCeluilarReg"]').addClass('error');
				$('[name="telefonoCeluilarReg"] + .errorMessage').text('Formato invalido');
				upErrorMessage()
			}
			else if(valInputFamiliar === '' || valInputFamiliar === undefined  || valInputFamiliar === null ){
				$('[name="nombreFamiliarReg"]').addClass('error');
				$('[name="nombreFamiliarReg"] + .errorMessage').text('Campo vacio');
				upErrorMessage()
			}
			else if(valInputTelEmerg === '' || valInputTelEmerg === undefined  || valInputTelEmerg === null ){
				$('[name="telefonoEmergenciaReg"]').addClass('error')
				$('[name="telefonoEmergenciaReg"] + .errorMessage').text('Campo vacio')
				upErrorMessage()
			}
			else if(!validateNumber(valInputTelEmerg)){
				$('[name="telefonoEmergenciaReg"]').addClass('error');
				$('[name="telefonoEmergenciaReg"] + .errorMessage').text('Formato invalido');
				upErrorMessage()
			}
			else if(valInputTelEmerg.length != 10){
				$('[name="telefonoEmergenciaReg"]').addClass('error');
				$('[name="telefonoEmergenciaReg"] + .errorMessage').text('El teléfono debe de contar con 10 dígitos');
				upErrorMessage()
			}
			else{
				let dataRegistryCompany = {
					"cell_phone": valInputTelCel,
					"emergency_phone": valInputTelEmerg,
					"emergency_contact": valInputFamiliar
				}
				setStorage64('registryFormLast', dataRegistryCompany)
				// console.log('familiar')
				// console.log(dataRegistryCompany)
				sendRegistryFamilyLast(dataRegistryCompany)
			}

		}
		else{

			if(valInputEmpresa === '' || valInputEmpresa === undefined  || valInputEmpresa === null ){
				errorSelectNotify('selecEmpresaReg', warningMessages[0])
				toast(warningMessages[0])
			}
			else if(valInputArea === '' || valInputArea === undefined  || valInputArea === null ){
				$('[name="selecAreaReg"]').parent().addClass('error');
				$('[name="selecAreaReg"] ').parent().next().text('Campo vacio');
				upErrorMessage()
			}
			else if(valInputTelCel === '' || valInputTelCel === undefined  || valInputTelCel === null ){
				$('[name="telefonoCeluilarReg"]').addClass('error')
				$('[name="telefonoCeluilarReg"] + .errorMessage').text('Campo vacio')
				upErrorMessage()
			}
			else if(valInputTelCel.length != 10){
				$('[name="telefonoCeluilarReg"]').addClass('error');
				$('[name="telefonoCeluilarReg"] + .errorMessage').text('El teléfono debe de contar con 10 dígitos');
				upErrorMessage()
			}
			else if(!validateNumber(valInputTelCel)){
				$('[name="telefonoCeluilarReg"]').addClass('error');
				$('[name="telefonoCeluilarReg"] + .errorMessage').text('Formato invalido');
				upErrorMessage()
			}
			else if(valInputFamiliar === '' || valInputFamiliar === undefined  || valInputFamiliar === null ){
				$('[name="nombreFamiliarReg"]').addClass('error');
				$('[name="nombreFamiliarReg"] + .errorMessage').text('Campo vacio');
				upErrorMessage()
			}
			else if(valInputTelEmerg === '' || valInputTelEmerg === undefined  || valInputTelEmerg === null ){
				$('[name="telefonoEmergenciaReg"]').addClass('error')
				$('[name="telefonoEmergenciaReg"] + .errorMessage').text('Campo vacio')
				upErrorMessage()
			}
			else if(!validateNumber(valInputTelEmerg)){
				$('[name="telefonoEmergenciaReg"]').addClass('error');
				$('[name="telefonoEmergenciaReg"] + .errorMessage').text('Formato invalido');
				upErrorMessage()
			}
			else if(valInputTelEmerg.length != 10){
				$('[name="telefonoEmergenciaReg"]').addClass('error');
				$('[name="telefonoEmergenciaReg"] + .errorMessage').text('El teléfono debe de contar con 10 dígitos');
				upErrorMessage()
			}
			else{
				let dataRegistryCompany = {
					"company": valInputEmpresa,
					"area": "1",
					"department":  valInputArea,
					"cell_phone": valInputTelCel,
					"work_phone": valInputTelWork,
					"emergency_phone": valInputTelEmerg,
					"emergency_contact": valInputFamiliar
				}
				setStorage64('registryFormLast', dataRegistryCompany)
				// console.log('normal')
				// console.log(dataRegistryCompany)
				sendRegistryLast(dataRegistryCompany)
			}
		}
	}
	var validateMonitoringFormFirst = function(){
		let valInputTemperatura = $('[name="selecTemp"]').val()
		let valInputBreatheProblem = $('[name="breatheProblem"]:checked').val()
		let dataRegistrySymptoms = $('.arraySymptoms [type="checkbox"]:checked').length
		var valInputDateFirstSymptom = $('[name="dateFirstSymptom"]').val()
		if(valInputDateFirstSymptom.length > 1){
			valInputDateFirstSymptom = returnFormatDateSub( $('[name="dateFirstSymptom"]').val() )
		}
		var BreatheProblem = getStorage64('arraySymptoms')

		let dataMonitoringUser = {
			"symptoms": BreatheProblem,
			"temperature": valInputTemperatura,
			"start_date": valInputDateFirstSymptom,
			"source": "3"
		}

		if(valInputTemperatura === '' || valInputTemperatura === undefined  || valInputTemperatura === null ){
			$('[name="selecTemp"]').parent().addClass('error')
			$('[name="selecTemp"]').parent().next().text('Selecciona una opcion')
			upErrorMessage()
		}
		else if(valInputBreatheProblem === '' || valInputBreatheProblem === undefined  || valInputBreatheProblem === null ){
			$('.problemsBreathe').addClass('error')
			$('.problemsBreathe + .errorMessage').text('No se ha seleccionado ninguna opción')
			upErrorMessage()
		}
		else if(dataRegistrySymptoms === 0){
			$('.arraySymptoms').addClass('error')
			$('.arraySymptoms + .errorMessage').text('No se ha seleccionado ninguna opción')
			upErrorMessage()
		}
		else if($('.firstDateSymptoms').hasClass('hidden') !== true && ( $('[name=dateFirstSymptom]').hasClass('hidden')  !== true && $('[name=dateFirstSymptom]').val() === '' ) ){
			if(valInputDateFirstSymptom === '' || valInputDateFirstSymptom === undefined  || valInputDateFirstSymptom === null ){
				$('[name="dateFirstSymptom"]').addClass('error')
				$('[name="dateFirstSymptom"] + .errorMessage').text('Campo vacio')
				upErrorMessage()
			}
			else if(!validateTypeDate(valInputDateFirstSymptom)){
				$('[name="dateFirstSymptom"]').addClass('error')
				$('[name="dateFirstSymptom"] + .errorMessage').text('El formato debe ser DD-MM-AAAA')
				upErrorMessage()
			}
			else if(valInputDateFirstSymptom.length !== 10){
				$('[name="dateFirstSymptom"]').addClass('error')
				$('[name="dateFirstSymptom"] + .errorMessage').text('El formato debe ser DD-MM-AAAA')
				upErrorMessage()
			}
		}
		else{
			if(valInputBreatheProblem === "7"){
				var BreatheProblem = getStorage64('arraySymptoms')
				let positionA = BreatheProblem.indexOf(7)
				if(positionA  == -1){
					BreatheProblem.push(7)
				}

				dataMonitoringUser = {
					"symptoms": BreatheProblem,
					"temperature": valInputTemperatura,
					"start_date": valInputDateFirstSymptom,
					"source": "3"
				}
			}
			else if(valInputBreatheProblem === "8"){
				var BreatheProblem = getStorage64('arraySymptoms')
				let positionA = BreatheProblem.indexOf(7)
				BreatheProblem.splice(positionA,1)

				dataMonitoringUser = {
					"symptoms": BreatheProblem,
					"temperature": valInputTemperatura,
					"start_date": valInputDateFirstSymptom,
					"source": "3"
				}
			}
			//console.log(dataMonitoringUser)
			setStorage64('monitoringFormFirst', dataMonitoringUser)
			sendMonitoringFirst(dataMonitoringUser)
		}
	}
	var validateMonitoringFormLast = function(){
		var btnIsolationActive = $('.forTwo.isolation .btn.secundario.active').length
		var hayCuarentena = getStorage64('ifQuarantine')
		let valInputIsolation = $('[name="isolation"]:checked').val()
		let valInputWhereIsolation = $('[name="whereIsolation"]:checked').val()
		let valInputWhyIsolation = $('[name="whyIsolation"]').val()
		var valInputDateFirstIsolation = $('[name="dateFirstIsolation"]').val()
		if(valInputDateFirstIsolation.length > 1){
			valInputDateFirstIsolation = returnFormatDateSub( $('[name="dateFirstIsolation"]').val() )
		}
		let dataMonitoringUser = {
			"type": Number(valInputWhereIsolation),
			"reason": valInputWhyIsolation,
			"start_date" : valInputDateFirstIsolation,
			"source": "3"
		}


		if(btnIsolationActive >=1){
			if(hayCuarentena === 'yes'){
				if(valInputWhereIsolation === '' || valInputWhereIsolation === undefined  || valInputWhereIsolation === null ){
					$('.whereIsolation').addClass('error')
					$('.whereIsolation + .errorMessage').text('No se ha seleccionado ninguna opción')
					upErrorMessage()
				}
				else if(valInputWhyIsolation === '' || valInputWhyIsolation === undefined  || valInputWhyIsolation === null ){
					$('[name="whyIsolation"]').parent().addClass('error')
					$('[name="whyIsolation"]').parent().next().text('Selecciona una opcion')
					upErrorMessage()
				}
				else if(valInputDateFirstIsolation === '' || valInputDateFirstIsolation === undefined  || valInputDateFirstIsolation === null ){
					$('[name="dateFirstIsolation"]').addClass('error')
					$('[name="dateFirstIsolation"] + .errorMessage').text('Campo vacio')
					upErrorMessage()
				}
				else if(!validateTypeDate(valInputDateFirstIsolation)){
					$('[name="dateFirstIsolation"]').addClass('error')
					$('[name="dateFirstIsolation"] + .errorMessage').text('El formato debe ser DD-MM-AAAA')
					upErrorMessage()
				}
				else if(valInputDateFirstIsolation.length !== 10){
					$('[name="dateFirstIsolation"]').addClass('error')
					$('[name="dateFirstIsolation"] + .errorMessage').text('El formato debe ser DD-MM-AAAA')
					upErrorMessage()
				}
				else{
					setStorage64('monitoringFormFirst', dataMonitoringUser)
					sendMonitoringLast(dataMonitoringUser)
					$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass('hidden')
				}
			}
			else if(hayCuarentena === 'no'){
				var appT = getStorage64('userAppT')
				getStorage64('sintomaNinguna')
				$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').addClass('hidden')
				var enferm = getStorage64('monitoringFormFirst')

				if(enferm.temperature < 38  &&  enferm.symptoms.length === 0 ){
					$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').addClass('hidden')
				}
				else{
					$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass('hidden')
				}
				if(appT.length <= 45){
					axiosActivate()
				}else{
					console.log('no hay cuarentena')
					/* axiosQuarantineDel() */
				}

				setStorage64('monitoringFormFirst', dataMonitoringUser)
				$('.registryMonitoring .form.FormLast').addClass('hidden')
				$('.registryMonitoring .card.thanksMonitoringCaseOne').removeClass('hidden')
			}
		}
		else{
			$('.forTwo.isolation').addClass('error')
			$('.forTwo.isolation + .errorMessage').text('No se ha seleccionado ninguna opción')
			toast('no hay botones seleccionado')
		}
	}



	/* Functiones Send data */
	var sendRecoveryPass = function(email){
		addLoader()
		axiosPasswords(email)
	}
	var sendUpdatePass = function(tok){
		addLoader()
		axiosPassUpdate(tok)
	}

	var sendLogin = function(data){
		var dataActivate = getStorage64('userRedisT')
		var useReddisPending =  getStorage64('validateRedisT')
		axiosLogin( data )
	}

	var sendLogout = function(){
		addLoader()
		axiosLogout()
	}
	var sendMyAccount = function(){
		/* console.log('as') */
		if( $('.inicioNavBar.active').length  >= 1 ){
			return
		}else{
			/* console.log('click My acount') */
			redirectUrl('myAccount')
		}
	}
	var sendInfo = function(){
		/* console.log('asd') */
		if( $('.infoNavBar.active').length >= 1 ){
			return
		}else{
			/* console.log('click info') */
			redirectUrl('info')
		}
	}
	var sendUserProfile = function(){
		/* console.log('asd') */
		if( $('.userProfileNavBar.active').length >= 1 ){
			return
		}else{
			/* console.log('click info') */
			redirectUrl('userProfile')
		}
	}

	//- Links
	var sendActivitiesRegitrer = function(){
		redirectUrl('monitoring')
	}
	var sendClinicalProfile = function(){
		redirectUrl('clinicalProfile')
	}

	var sendEvalueFamily = function(data, idUser){
		addLoader()
		axiosParents(data, idUser)
	}
	var sendRegistryFamilyFirst = function(data){
		addLoader()
		axiosUsersFamily(data)
	}
	var sendRegistryFamilyLast = function(data){
		addLoader()
		axiosContacts(data)
	}
	var sendRegistryFirst = function(data){
		addLoader()
		axiosUsers(data)
	}
	var sendRegistryMiddle = function(data){
		addLoader()
		var diseases = {
			"diseases": data
		}
		axiosDiseases(diseases)
	}
	var sendRegistryMiddleIMC = function(data){
		addLoader()
		axiosIMC(data)
	}
	var sendRegistryLast = function(data){
		addLoader()
		axiosCompany(data)
	}
	var sendMonitoringFirst = function(data){
		axiosSymptoms(data)
		var flag = getStorage64('sintomaNinguna')
		var temperature = Number( $('[name="selecTemp"]').val() ) 
		var dificulty = Number( $('[name="breatheProblem"]:checked').val() )

		if(flag ==='true'){
			$('.monitoringModule .form.FormFirst').addClass('hidden')
			$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').addClass('hidden')
			if(temperature >= 38){
				$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass('hidden')
			}
			if(dificulty === 7){
				$('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass('hidden')
			}
			$('.monitoringModule .form.FormFirst').addClass('hidden')
			$('.monitoringModule .form.FormLast').removeClass('hidden')
			upTop()
		}
		else{
			$('.monitoringModule .form.FormFirst').addClass('hidden')
			$('.monitoringModule .form.FormLast').removeClass('hidden')
			upTop()
		}
	}
	var sendMonitoringLast = function(data){
		axiosQuarantine(data)
		$('.monitoringModule .form.FormLast').addClass('hidden')
		$('.monitoringModule .card.thanksMonitoringCaseOne').removeClass('hidden')
	}

	/* Get  data List*/
	var addCompany = function(value){
		var company = value
		let i = 0
		setStorage64('catalogCompany', company)
		while( i < company.length) {
			$('[name="selecEmpresaReg"]').append('<option value="'+ company[i].company_id +'">'+ company[i].name +'</option>')
			i++
		}
	}
	var addDepartment = function(value){
		var departments = value
		let i = 0
		setStorage64('catalogDepartment', departments)
		while( i < departments.length) {
			$('[name="selecAreaReg"]').append('<option value="'+ departments[i].department_id +'">'+ departments[i].name +'</option>')
			i++
		}
	}
	var addDiseases = function(value){
		var diseases = value
		let i = 0
		setStorage64('catalogDiseases', diseases)
		while( i < diseases.length) {
			$('.forTwo.arrayDiseases').append('<div class=\"contCheckRadio checkbox\"><input type=\"checkbox\" name=\"diseases_'+diseases[i].id+'\" id=\"diseases_'+diseases[i].id+'\" value="'+diseases[i].id+'"><label for="diseases_'+diseases[i].id+'">'+diseases[i].name+'<\/label><\/div>')
			i++
		}
		$('.forTwo.arrayDiseases').append('<div class=\"contCheckRadio checkbox\"><input type=\"checkbox\" name=\"ninguna\" id=\"ninguna\" value=\"0\"><label for=\"ninguna\">Ninguna<\/label><\/div>')
	}
	var addSymptoms = function(value){
		var symptoms = value
		let i = 0
		setStorage64('catalogSymptoms', symptoms)
		while( i < symptoms.length) {
			$('.arraySymptoms').append('<div class=\"contCheckRadio checkbox\"><input type=\"checkbox\" name=\"diseases_'+symptoms[i].id+'\" id=\"symptoms_'+symptoms[i].id+'\" value="'+symptoms[i].id+'"><label for="symptoms_'+symptoms[i].id+'">'+symptoms[i].name+'<\/label><\/div>')
			i++
		}
		$('.arraySymptoms').append('<div class=\"contCheckRadio checkbox\"><input type=\"checkbox\" name=\"sintomaNinguna\" id=\"sintomaNinguna\" value=\"0\"><label for=\"sintomaNinguna\">Ninguna<\/label><\/div>')
	}
	var addQuestions = function(value){
		// var questions = value
		// let i = 0
		// setStorage64('catalogQuestions', questions)
		// while( i < questions.length) {
		// 	$('[name="selecAreaReg"]').append('<option value="'+ questions[i].questions_id +'">'+ questions[i].name +'</option>')
		// 	i++
		// }
	}
	var addReasons = function(value){
		var reasons = value
		let i = 0
		setStorage64('catalogReasons', reasons)
		while( i < reasons.length) {
			$('[name="whyIsolation"]').append('<option value="'+ reasons[i].name +'">'+ reasons[i].name +'</option>')
			i++
		}
		//$('[name="whyIsolation"]').append('<option value="Otra">Otra</option>')
	}
	var addFamilyRelationship = function(value){
		var familyRelationship = value
		let i = 0
		setStorage64('catalogFamilyRelationship', familyRelationship)
		while( i < familyRelationship.length) {
			$('[name="familyRelationship"]').append('<option value="'+ familyRelationship[i].id +'">'+ familyRelationship[i].name +'</option>')
			i++
		}
	}

	/* Pre  llenado de campos */
	var preSelectedLastSyntoms = function(sym){
		var symArray = sym

		let fechaInicioSintomas = returnFormatDate( symArray.start_date )

		$('[name="selecTemp"] option[value="'+symArray.temperature+'"]').prop('selected','selected')
		$('[name="dateFirstSymptom"]').val(fechaInicioSintomas)
		i = 0

		
		if(symArray.symptoms.length === 0){
			$('input[name="breatheProblem"][value="8"]').prop('checked','checked')
			$('[name=sintomaNinguna]').prop('checked','checked')
		}
		else if(symArray.symptoms.length >= 1){
			while(i <= (symArray.symptoms.length - 1) ){
				if(symArray.symptoms[i] === 7){
					$('input[name="breatheProblem"][value="7"]').prop('checked','checked')
					$('[name=sintomaNinguna]').prop('checked','checked')
				}
				else if(symArray.symptoms[i] !== 7){
					$('.arraySymptoms [value="'+symArray.symptoms[i]+'"]').prop('checked','checked')
					$('input[name="breatheProblem"][value="8"]').prop('checked','checked')
				}else{
					$('.forTwo.isolation .btn.secundario:eq(0)').addClass('active')
					$('.contMonitoringIsolation').removeClass('hidden')
				}
				i++
			}
		}
		else{
			$('.arraySymptoms [type=checkbox]').prop('checked', '')
			$('input[name="breatheProblem"][value="8"').prop('checked','checked')
			$('input[name="sintomaNinguna"]').prop('checked','checked')
		}
		$('.registryMonitoring .FormFirst').prepend('<div class=\"notificationAlert\"><span class=\"modalC\">X<\/span><p>Para tu comodidad tus datos del día anterior estan precargados.<\/p><strong>¡Verifica que no han cambiado!<\/strong><\/div>')
	}
	var preSelectedLastQuar = function(quar){
		var quarArray = quar
		let reasonText = quarArray.reason
		let reasonDate = quarArray.start_date

		let fechaInicioCuarentena = returnFormatDate( reasonDate )

		if(quarArray.type === 1 || quarArray.type === '1' ){
			$('.forTwo.isolation .btn.secundario:eq(0)').trigger('click')
		}
		else if(quarArray.type === 2 || quarArray.type === '2' ){
			$('.forTwo.isolation .btn.secundario:eq(1)').trigger('click')
		}
		
		$('input[name="whereIsolation"][value="'+quarArray.type+'"]').prop('checked','checked')
		$('[name="whyIsolation"] option[value="'+reasonText+'"]').prop('selected','selected')
		$('input[name="dateFirstIsolation"]').val(fechaInicioCuarentena)
	}


	/*  Peticiones AXIOS  GET*/
	/* Add Data List */
	var axiosListDiseases= function(){
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/diseases',
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
				var diseases = (res.data.diseases)
				addDiseases(diseases)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosListSymptoms= function(){
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/symptoms',
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
				var symptoms = (res.data.symptoms)
				addSymptoms(symptoms)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosListQuestions= function(){
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/questions',
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
				var questions = (res.data.questions)
				addQuestions(questions)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosListReasons= function(){
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/reasons',
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
				var reasons = (res.data.reasons)
				addReasons(reasons)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosListRelatives= function(){
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/relatives',
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
				var relatives = (res.data.relatives)
				addFamilyRelationship(relatives)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}

	/* Add Data Profile User */
	var axiosDataUser= function(){
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v2/users/'+appU,
			cred: false,
			head: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ appT
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
				var userData = (res.data.data)
				setStorage64('dataUserCont', userData)
				succesUpdateInfoGral()
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				request401()
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				succesUpdateInfoGral()
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosDataCompany= function(){
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/users/'+appU+'/company',
			cred: false,
			head: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ appT
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
				var companyData = (res.data.data)
				setStorage64('dataCompanyCont', companyData)
				succesUpdateCompany()
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				request401()
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				setStorage64('dataCompanyCont', 'null')
				succesUpdateCompany()
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosDataIMC= function(){
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/users/'+appU+'/bmi',
			cred: false,
			head: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ appT
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
				var bmiData = (res.data.data)
				setStorage64('dataImcCont', bmiData)
				succesUpdateImc()
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				request401()
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				setStorage64('dataImcCont', 'null')
				succesUpdateImc()
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosDataDiseases= function(){
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/users/'+appU+'/diseases',
			cred: false,
			head: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ appT
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
				var diseasesData = (res.data.data)
				setStorage64('dataDiseasesCont', diseasesData)
				succesUpdateSimp()
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				request401()
			}
			else if(error.response.status === 404) {
				setStorage64('dataDiseasesCont', 'null')
				succesUpdateSimp()
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}


	/* Add Data Catalogs */
	var axiosCatCompany= function(){
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/company',
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
				var company = (res.data.companies)
				addCompany(company)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosCatDepartment = function(){	
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/department',
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
				var department = res.data.departments
				addDepartment(department)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	
	/* Precharge Data */
	var axiosPreChargeSyntoms = function(){
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')

		var config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/users/'+appU+'/symptoms',
			cred: false,
			head: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ appT
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
				console.log(res.data.data)
				var temp = res.data.data.temperatura
				var fecha = res.data.data.fecha
				var sintom = res.data.data.sintomas

				let symptoms = {
					symptoms: sintom, 
					temperature: Number(temp).toFixed(2),
					start_date: fecha
				}
				preSelectedLastSyntoms(symptoms)
				setStorage64('arraySymptoms', sintom)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 440) {
				request440()
			}
		});
	}
	var axiosPreChargeQuarantine = function(){
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')

		var config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/users/'+appU+'/quarantine',
			cred: false,
			head: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ appT
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
				var aislamiemto = res.data.data.id_cat_tipo_aislamiento
				var motivo = res.data.data.motivo
				var fecha = res.data.data.fecha.split(' ')

				let quarantine =  {
					type: aislamiemto, 
					reason: motivo,
					start_date: fecha[0]
				}
				preSelectedLastQuar(quarantine)	
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				//console.log(error.request.responseText)
			}
			if(error.response.status === 440) {
				request440()
			}
		});
	}


	/* var axiosCatDivision = function(){} */
	var axiosCode = function(){
		/*const config = {
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
		});*/

		setCodeEnter('carso123')
	}
	var axiosVaidateReddis = function(){
		var dataActivate = getStorage64('userRedisT')
		const config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/queue/'+dataActivate,
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
				var regSuccess = res.data.key
				setStorage64('validateRedisT', regSuccess)
				request202()
				/*
				console.log(regSuccess);
				console.log(getStorage64('validateRedisT') );
				 */
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				//addLoader('false')
				/*console.log(error.request.responseText)*/
			}
			if(error.response.status === 401) {
				setStorage64('validateRedisT', 'tokenEnd')
				console.log('El token se ha perdido')
				console.error(error.response);
			}
			else if(error.response.status === 404) {
				setStorage64('validateRedisT', 'notFound')
				/*  console.error(error.response);  */
				//request404()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				//request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}


	/*  Peticiones AXIOS  POST*/
	var axiosParents = function(dataParents, userID){
		let user_ID = userID
		const config = {
			metodo: 'post',
			url: BASE_API + 'covid-19/v1/users/'+user_ID+'/relatives',
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataParents
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('userRedisParentT', regSuccess)
				sendFamilyData()
				/*
				console.log(res.data.id);
				console.log('axiosParents');
				*/
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 400) {
				var errors = error.response.data.error
				addLoader('false')
				toast(errors[0].error.regexNotMatch)
				
			}
			else if(error.response.status === 401) {
				toast(error.response.data.message)
				//toast('Datos de usuario no válidos');
				request404()
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 409) {
				emaiInUse()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosUsersFamily = function(dataUsers){
		let familiar_ID = getStorage64('userRedisParentT')
		const config = {
			metodo: 'post',
			url: BASE_API + 'covid-19/v2/users/'+familiar_ID,
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataUsers
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('userRedisT', regSuccess)
				setStorage64('RegistryFirst','true')
				sendUserFamilyData()
				console.log(res.data.id);
				console.log('axiosUsers');
				/*
				 */
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 400) {
				var errors = error.response.data.error
				/*
				console.log(errors[0].field)
				console.log(' : ')
				console.log(errors[0].error.regexNotMatch)
				console.error(errors);
				console.log(error.response.data.error)
				*/
				addLoader('false')
				toast(errors[0].error.regexNotMatch)
				
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 409) {
				emaiInUse()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosUsers = function(dataUsers){
		const config = {
			metodo: 'post',
			url: BASE_API + 'covid-19/v1/users',
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataUsers
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('userRedisT', regSuccess)
				setStorage64('RegistryFirst','true')
				sendUserData()
				/*
				console.log(res.data.id);
				console.log('axiosUsers');
				 */
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 400) {
				var errors = error.response.data.error
				/*
				console.log(errors[0].field)
				console.log(' : ')
				console.log(errors[0].error.regexNotMatch)
				console.error(errors);
				console.log(error.response.data.error)
				*/
				addLoader('false')
				toast(errors[0].error.regexNotMatch)
				
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 409) {
				emaiInUse()
			}
			else if(error.response.status === 500) {
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosDiseases = function(dataDiseases){
		var dataActivate = getStorage64('userRedisT')
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')
		if(appT.length >= 40){
			var config = {
				metodo: 'put',
				url: BASE_API + 'covid-19/v1/users/'+appU+'/diseases',
				cred: false,
				head: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+ appT
				}
			}
		}
		else{
			var config = {
				metodo: 'post',
				url: BASE_API + 'covid-19/v1/users/'+dataActivate+'/diseases',
				cred: false,
				head: {
					'Content-Type': 'application/json'
				}
			}
		}	

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataDiseases
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('diseasesRedisT', regSuccess)
				setStorage64('RegistryMiddle','true')
				if(appT.length >= 40){
					//-- aquiesta
					//setStorage64('dataImcCont', getStorage64('enfermedadesArray') )
					updateDiseasesData()
				}
				else{
					sendDiseasesData()
				}
				/*
				console.log('axiosDiseases');
				console.log(res);
				 */
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosIMC = function(dataIMC){
		var dataActivate = getStorage64('userRedisT')
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')

		if(appT.length >= 40){
			var config = {
				metodo: 'post',
				url: BASE_API + 'covid-19/v1/users/'+appU+'/bmi',
				cred: false,
				head: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+ appT
				}
			}
		}
		else{
			var config = {
				metodo: 'post',
				url: BASE_API + 'covid-19/v1/users/'+dataActivate+'/bmi',
				cred: false,
				head: {
					'Content-Type': 'application/json'
				}
			}
		}
		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataIMC
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('imcRedisT', regSuccess)
				setStorage64('RegistryMiddleIMC','true')
				if(appT.length >= 40){
					let updateIMC ={
						id_usuario: appU, 
						peso: dataIMC.weight, 
						estatura: dataIMC.height
					}
					setStorage64('dataImcCont', updateIMC)
					updateIMCData()
				}
				else{
					sendIMCData()
				}
				/*
				console.log('axiosIMC');
				console.log(res);
				imcSuccess()
				*/
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				request401()
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosCompany = function(dataCompany){
		var dataActivate = getStorage64('userRedisT')
		const config = {
			metodo: 'post',
			url: BASE_API + 'covid-19/v1/users/'+dataActivate+'/company',
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataCompany
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('companyRedisT', regSuccess)
				setStorage64('RegistryLast','true')

				sendCompanyData()
				/*
				console.log(res.data.id);
				console.log('axiosCompany');
				*/
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosContacts = function(dataContacts){
		var dataActivate = getStorage64('userRedisT')
		const config = {
			metodo: 'post',
			url: BASE_API + 'covid-19/v1/users/'+dataActivate+'/contacts',
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataContacts
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('companyRedisT', regSuccess)
				setStorage64('RegistryLast','true')

				sendCompanyData()
				/*
				console.log(res.data.id);
				console.log('axiosCompany');
				 */
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosSymptoms = function(dataSymptoms){
		var dataActivate = getStorage64('userRedisT')
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')

		if(appT.length >= 40){
			var config = {
				metodo: 'post',
				url: BASE_API + 'covid-19/v1/users/'+appU+'/symptoms',
				cred: false,
				head: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+ appT
				}
			}
		}
		else{
			var config = {
				metodo: 'post',
				url: BASE_API + 'covid-19/v1/users/'+dataActivate+'/symptoms',
				cred: false,
				head: {
					'Content-Type': 'application/json'
				}
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataSymptoms
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('symptomsRedisT', regSuccess)
				setStorage64('symResp', dataSymptoms)
				sintomasSuccess()
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				request401()
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosQuarantine = function(dataQuarantine){
		var dataActivate = getStorage64('userRedisT')
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')
		if(appT.length >= 40){
			var config = {
				metodo: 'post',
				url: BASE_API + 'covid-19/v1/users/'+appU+'/quarantine',
				cred: false,
				head: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+ appT
				}
			}
		}
		else{
			var config = {
				metodo: 'post',
				url: BASE_API + 'covid-19/v1/users/'+dataActivate+'/quarantine',
				cred: false,
				head: {
					'Content-Type': 'application/json'
				}
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			headers: config.head,
			data: dataQuarantine
		})
		.then(function (res){
			if(res.status === 202) {
				var regSuccess = res.data.id
				setStorage64('quarantineRedisT', regSuccess)
				getStorage64('quarResp', dataQuarantine)
				//sessionUserActive('true')
				request202()
				if(appT.length <= 45){
					axiosActivate(regSuccess)	
					console.log('Cuenta Activada...')
				}
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				request401()
				//sessionUserActive('true')
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				//sessionUserActive('true')
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosQuarantineDel = function(){
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')
		var config = {
			metodo: 'delete',
			url: BASE_API + 'covid-19/v1/users/'+appU+'/quarantine',
			cred: false,
			head: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ appT
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
				setStorage64('quarantineRedisT', regSuccess)
				deleteStorage64('quarResp')
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				request401()
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 405) {

			}
			else if(error.response.status === 440) {
				request440()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				//sessionUserActive('true')
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosLogin = function(dataLogin){
		const config = {
			metodo: 'post',
			url: BASE_API + 'covid-19/v1/login',
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			data: dataLogin,
			headers: config.head
		})
		.then(function (res){
			if(res.status === 200) {
				var regSuccessToken = res.data.token
				var regSuccessUser = res.data.user_id
				var regSuccessUserName = res.data.user_name
				//setStorage64('userRedisT', regSuccessUser)
				setStorage64('userAppResp', res.data)
				setStorage64('userAppT', regSuccessToken)
				setStorage64('userAppU', regSuccessUser)
				setStorage64('userAppN', regSuccessUserName)
				sessionUserActive()
				request202()
				redirectUrl('myAccount')
				//location.href = 'monitoring.html'
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 401) {
				toast('Usuario y/o Contraseña no valido')
			}
			else if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosPasswords = function(dataPassword){
		const config = {
			metodo: 'post',
			url: BASE_API + 'covid-19/v1/users/passwords',
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			data: dataPassword,
			headers: config.head
		})
		.then(function (res){
			/*console.log(res.status)*/
			if(res.status === 200) {
				$('.passRecovery .card.passwordRecovery').remove()
				$('.passRecovery .textInfo').remove()
				$('.passRecovery .card.thanksRecoveryPass').removeClass('hidden')
				$('.thanksRecoveryPass .btn.primario').on('click', returnToHome)
				addLoader('false')
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			console.log(error)
			addLoader('false')
			toast('Por favor intentalo de nuevo')
		});
	}
	var axiosPassUpdate = function(dataUpPass){
		const config = {
			metodo: 'put',
			url: BASE_API + 'covid-19/v1/users/passwords',
			cred: false,
			head: {
				'Content-Type': 'application/json'
			}
		}

		axios({
			method: config.metodo,
			url: config.url,
			withCredentials: config.cred,
			data: dataUpPass,
			headers: config.head
		})
		.then(function (res){
			/*console.log(res.status)*/
			if(res.status === 200) {
				$('.passUpdate .card.passwordUpdate').remove()
				$('.passUpdate .textInfo').remove()
				$('.passUpdate .card.thanksUpdatePass').removeClass('hidden')
				$('.thanksUpdatePass .btn.primario').on('click', returnToHome)
				addLoader('false')
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			console.log(error)
			addLoader('false')
			toast('Por favor intentalo de nuevo')
		});
	}
	var axiosActivate = function(){
		var dataActivate = getStorage64('userRedisT')
		const config = {
			metodo: 'post',
			url: BASE_API + 'covid-19/v1/queue/'+dataActivate+'/activate',
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
			if(res.status === 202) {
				var regSuccess = res.data.id
				request202()
				deleteStorage64('userRedisParentT')
				deleteStorage64('liveInHouse')
				deleteStorage64('liveInHouse')
				/*
				console.log(res);
				console.log('Success Final End...')
				 */
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 500) {
				console.error(error.response);
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}
	var axiosLogout = function(){
		var appT = getStorage64('userAppT')
		var appU = getStorage64('userAppU')
		var config = {
			metodo: 'get',
			url: BASE_API + 'covid-19/v1/users/'+appU+'/logout',
			cred: false,
			head: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ appT
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
				localStorage.clear()
				setCodeEnter('carso123')
				setSusumu()
				setTimeout(function(){
					redirectUrl('home')},1000
				)
			}
		})
		.catch(function (error) {
			if(error.message == 'Network Error'){
				addLoader('false')
				toast('Error de conexión')
			}
			else if(error.request){
				addLoader('false')
				console.log(error.request.responseText)
			}
			if(error.response.status === 404) {
				console.error(error.response);
				request404()
			}
			else if(error.response.status === 405) {
				console.error(error.response);
				localStorage.clear()
				setCodeEnter('carso123')
				setSusumu()
				setTimeout(function(){
					redirectUrl('home')},1000
				)
			}
			else if(error.response.status === 440) {
				request404
			}

			else if(error.response.status === 500) {
				console.error(error.response);
				request500()
			}
			else{
				console.error(error.response.status);
				console.error(error.response);
			}
		});
	}

	/*  Scripts Generales */
	$('.menuReturn').on('click', historyBack)

	$('.formQuestion .btn.primario, .returnLogin').on('click', showLogin)
	$('.formQuestion .btn.secundario, .downloadA').on('click', showRegistry)
	$('.formLogin .colorBlue').on('click', showRegistry)

	$('.formLogin .btn.primario').on('click', validateLogin)
	$('.passwordProtect .btn.primario').on('click', validatePProtect)
	$('.passwordRecovery .btn.primario').on('click', validateRecoveryPass)
	$('.passwordUpdate .btn.primario').on('click', validateUpdatePass)
	$('input[type="date"]').attr({'max': dateToday})
	$('input[name="fechaNacimientoReg"]').attr({'max': dateMinBirthady})

	$('.registryFamilyModule .familyAccess').on('click', validateAccessFamily)
	$('.registryFamilyModule .firstForm').on('click', validateRegistryFormFirst)
	$('.registryFamilyModule .middleForm').on('click', validateRegistryFormMiddle)
	$('.registryFamilyModule .middleIMCForm').on('click', validateRegistryFormMiddleIMC)
	$('.registryFamilyModule .lastForm').on('click', validateRegistryFormLast)

	$('.FormIMC .middleIMCForm').on('click', updateIMC)
	$('.FormSimptomps .middleForm').on('click', updateSimptomps)

	$('.registryModule .firstForm').on('click', validateRegistryFormFirst)
	$('.registryModule .middleForm').on('click', validateRegistryFormMiddle)
	$('.registryModule .middleIMCForm').on('click', validateRegistryFormMiddleIMC)
	$('.registryModule .lastForm').on('click', validateRegistryFormLast)


	$('.monitoringModule .firstForm').on('click', validateMonitoringFormFirst)
	$('.monitoringModule .lastForm').on('click', validateMonitoringFormLast)
	$('.problemsBreathe').on('click',function(){$(this).removeClass('error')})
	$('body').on('click', '.modalClose', closeModals)
	$('body').on('click', '.modalC', closeModalsC)
	$('.activarGeo').on('click', clickGeo)
	$('.card.thanksMonitoringCaseOne .btn.primario').on('click', function(){
		var loginIn = getStorage64('userLoginSession')
		if(loginIn !== "true" ){
			redirectUrl('home')
		}
		else{
			redirectUrl('myAccount')
		}
		//sessionUserActive('true')
	})
	$('.inicioNavBar').on('click', sendMyAccount)
	$('.infoNavBar').on('click', sendInfo)
	$('.userProfileNavBar').on('click', sendUserProfile)
	$('.logOutNavBar').on('click', sendLogout)

	$('.activitiesRegitrer').on('click', sendActivitiesRegitrer)
	$('.clinicalProfile').on('click', sendClinicalProfile)


	/* Locaciones */
	if(window.location.pathname.indexOf('/index') !== -1){
		console.log('page: index')
	}
	if(window.location.pathname.indexOf('/home') !== -1){
		//sessionUserActive(true)
		console.log('page: home')
		var loginIn = getStorage64('userLoginSession')
		if(loginIn !== "true" ){
			//redirectUrl('home')
		}
		else{
			redirectUrl('myAccount')
		}
	}
	else if(window.location.pathname.indexOf('/registryFamilyData') !== -1){
		deleteStorage64('userRedisParentT')
		deleteStorage64('liveInHouse')
		var loginIn = getStorage64('userLoginSession')
		if(loginIn !== "true" ){
			axiosListRelatives()
		}
		else{
			redirectUrl('myAccount')
		}
	}
	else if(window.location.pathname.indexOf('/familyRegistry') !== -1){
		var loginIn = getStorage64('userRedisParentT')
		if(loginIn.length >= 10 ){
			axiosListDiseases()
		}
		else{
			redirectUrl('registryFamilyData')
		}
	}
	else if(window.location.pathname.indexOf('/registry') !== -1){
		deleteStorage64('userRedisParentT')
		deleteStorage64('liveInHouse')
		var loginIn = getStorage64('userLoginSession')
		if(loginIn !== "true" ){
			//sessionUserActive(true)
			axiosCatCompany()
			axiosCatDepartment()
			axiosListDiseases()
		}
		else{
			redirectUrl('myAccount')
		}
	}
	else if(window.location.pathname.indexOf('/myAccount') !== -1){
		var aaa = getStorage64('userAppResp')
		var  a = getStorage64('userAppT')
		var  b = getStorage64('userAppU')
		var  c = getStorage64('userAppN')
		
		var name = getStorage64('userAppN').split(' ')
		var firstName = name[0]

		var loginIn = getStorage64('userLoginSession')
		if(loginIn !== "true" ){
			redirectUrl('home')
			/* console.log('logout') */
		}
		else{
			/* console.log('logoin') */
			axiosDataUser()
			axiosDataCompany()
			axiosDataIMC()
			axiosDataDiseases()
			$('.userProfileNavBar').text( firstName )
			//console.log(a)
		}
	}
	else if(window.location.pathname.indexOf('/userProfile') !== -1){
		var loginIn = getStorage64('userLoginSession')
		var name = getStorage64('userAppN').split(' ')
		var firstName = name[0]
		if(loginIn !== "true" ){
			redirectUrl('home')
		}
		else{
			axiosDataUser()
			axiosDataCompany()
			axiosDataIMC()
			axiosDataDiseases()
			$('.userProfileNavBar').text( firstName )
			setTimeout(function(){
				dataUserCharge()
			}, 350)
		}
	}
	else if(window.location.pathname.indexOf('/clinicalProfile') !== -1){
		var loginIn = getStorage64('userLoginSession')
		var name = getStorage64('userAppN').split(' ')
		var firstName = name[0]
		if(loginIn !== "true" ){
			redirectUrl('home')
		}
		else{
			axiosDataUser()
			axiosDataCompany()
			axiosDataIMC()
			axiosDataDiseases()
			$('.userProfileNavBar').text( firstName )
			setTimeout(function(){
				dataSimptomsCharge()
			}, 350)
		}
	}
	else if(window.location.pathname.indexOf('/simptompsUpdate') !== -1){
		var loginIn = getStorage64('userLoginSession')
		var name = getStorage64('userAppN').split(' ')
		// deleteStorage64('userRedisParentT')
		// deleteStorage64('liveInHouse')
		var firstName = name[0]
		if(loginIn !== "true" ){
			redirectUrl('home')
		}
		else{
			axiosListDiseases()
			validateEmptySimptomps()
			$('.userProfileNavBar').text( firstName )
			setTimeout(function(){
				preChargeSimptompsData()
			},1000)
		}
	}
	else if(window.location.pathname.indexOf('/bmiUpdate') !== -1){
		var loginIn = getStorage64('userLoginSession')
		var name = getStorage64('userAppN').split(' ')
		// deleteStorage64('userRedisParentT')
		// deleteStorage64('liveInHouse')
		var firstName = name[0]
		if(loginIn !== "true" ){
			redirectUrl('home')
		}
		else{
			$('.userProfileNavBar').text( firstName )
			preChargeIMCData()
		}
	}
	else if(window.location.pathname.indexOf('/monitoring') !== -1){
		/* console.log('page: monitoring') */
		/* var  b = getStorage64('userAppU') */
		axiosListSymptoms()
		axiosListReasons()
		var loginIn = getStorage64('userLoginSession')
		if(loginIn !== "true" ){
			//redirectUrl('home')
		}
		else{
			axiosPreChargeQuarantine()
			axiosPreChargeSyntoms()
		}
	}
	else if(window.location.pathname.indexOf('/recoveryPassword') !== -1){
		console.log('page: recoveryPassword')
	}
	else if(window.location.pathname.indexOf('/updatePassword') !== -1){
		try{
			var keyToken = getParams()['key']
			setTokenR = setStorage64('getTokenR', keyToken)
		}
		catch(e){
			console.log('no hay parametros GET');
		}
	}
	else if(window.location.pathname.indexOf('/info.') !== -1){
		var loginIn = getStorage64('userLoginSession')
		var name = getStorage64('userAppN').split(' ')
		var firstName = name[0]
		if(loginIn !== "true" ){
			redirectUrl('home')
		}
		else{
			$('.userProfileNavBar').text( firstName )
			addImagesFAQs()
		}
	}
	else if(window.location.pathname.indexOf('/infoMobile') !== -1){
		addImagesFAQs()
	}



	$('[name="passProtect"]').on('keypress', function(e){
		if(e.which === 13 || e.keyCode === 13){ $('.btn.primario').trigger('click') }
	})


	$('input, select').focus(function(){
		var $this = $(this)
		$this.removeClass('error')
		$this.parent().removeClass('error')
	});
	$('.forTwo, forThree').on('click',function(){
		var $this = $(this)
		$this.removeClass('error')
	})

	$('.cerrarBtn').on('click',function(){
		$('.downloadAPP').remove()
	})

	if( $('main + .navBar').length >=1){
		$('main').addClass('menuFooter')
	}

	if(/Android/i.test(navigator.userAgent)){
		$('.downloadIos').remove()
		if(window.location.pathname.indexOf('/home') !== -1){
			$('.downloadAPP').remove()
			splashAndroid()
		}
	}


	if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
		$('.downloadAndroid').remove()
		$('.downloadA').remove()
	}


	if($('.card.passwordProtect').length === 1){
		setTimeout(function(){
			$('.card.passwordProtect .btn.primario').trigger('click')
			}, 700
		)
		/* console.log('passwordProtect activate') */
	}

	axiosCode()

	setTimeout(removeLoader, 2000)

	/* Window on load */
	if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){	
		$(window).on('load', function(){
			removeLoader()
		})
	}
	else{
		removeLoader()
		$('body').on('click', '.toast', closeModals)
		 document.addEventListener("DOMContentLoaded", function (){
			removeLoader()
		});
	}

});