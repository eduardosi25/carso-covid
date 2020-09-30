$(document).ready(function() {

    /*  
    const BASE_API = 'https://api-rc1.fcs-monitoreo.com/';
    const BASE_API = 'https://api.fcs-monitoreo.com/';
    */
    $('.card.registerFamily').hide()
    $('.card.newNormal').hide()
    $('.card.employData').hide();
        //$('#agradecimiento').text("Gracias")

    const BASE_API = 'https://api.fcs-monitor.net/';

    /*  Variables */

    const BASE_URL = '/';
    var URL_Password = '/updatePassword.html';
    var URL_PathName = window.location.pathname;
    var URL_Location = window.location;
    var URL_Origin = window.location.origin + '/';
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
        17: 'La oximetría debe ser entre 60 y 100',
        18: 'La oximetría debe ser entre 60 y 100',
        19: '',
        20: 'Acepta el Aviso de Privacidad',
        21: 'Token de registro es inválido'
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

    var urlDownloadApp = 'https://play.google.com/store/apps/details?id=com.americamovil.monitor'



    var addImagesFAQs = function() {
        let imag = 0
        while (imag < imagesFAQ.length) {

            $('.imagesFAQs').append('<div class=\"imageInfo\"><img src=\"img\/faqs\/' + imagesFAQ[imag] + '\" alt=\"' + imagesFAQ[imag] + '"\/><\/div>')
                //$('.imagesFAQs').append('<p>'+imagesFAQs.imgFaq+'</p>')
                //console.log( imagesFAQs.imag)
            imag++
        }
    }

    var showCoord = function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                window.coordLatit = position.coords.latitude
                window.coordLong = position.coords.longitude
                localStorage.setItem("myLatitud", coordLatit)
                localStorage.setItem("myLongitud", coordLong)
            },
            function(error) {
                var errores = { 1: 'Permiso denegado', 2: 'Posición no disponible', 3: 'Expiró el tiempo de respuesta' };
                console.log("Error: " + errores[error.code]);
            }, {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000
            }
        );
    }

    var clickGeo = function() {}

    var request202 = function() {
        addLoader('false')
        console.log('Send  success...')
    }
    var request401 = function() {
        addLoader('false')
        toast('Por seguridad se ha cerrado tu sesion')
        localStorage.clear()
        setCodeEnter('carso123')
        setSusumu()
        setTimeout(function() {
            redirectUrl('home')
        }, 2000)
    }
    var request404 = function() {
        addLoader('false')
        console.log('Page no found...')
    }
    var request440 = function() {
        addLoader('false')
        toast('Tu sesión ha expirado')
        localStorage.clear()
        setCodeEnter('carso123')
        setSusumu()
        setTimeout(function() {
            redirectUrl('home')
        }, 1000)
    }
    var request500 = function() {
        addLoader('false')
        console.log('Server error...')
    }

    /* Notificaciones y Modals */
    var toast = function(message) {
        if ($('.toast').length === 0) {
            $('main').prepend('<div class=\"toast\"><span class=\"modalClose\">x</span><div class=\"message\">' + message + '<\/div><\/div>')
            setTimeout(closeModals, 3500)
        } else {
            return false
        }
    }
    var closeModals = function() {
        $('.toast, .loaderPrincipal, .splashAndroid').remove()
    }
    var closeModalsC = function() {
        $('.notificationAlert').remove()
    }
    var closeModalResult = function() {
        $('.modalView').fadeOut()
        $(".tooltipOpener").removeClass("active")
    }
    var openModalResult = function(e) {
        e.preventDefault()
        $('.modalResult').fadeIn()
    }

    var redirectUrl = function(Url) {
        let urlPath = Url
        location.href = urlPath + '.html'
    }

    var returnToHome = function() {
        location.href = 'home.html'
    }

    var historyBack = function() {
        history.back(-1)
    }

    var logOutPortal = function(type) {
        console.log('close Portal')
        return
    }

    /* Tooltip */
    var tooltipOpen = function() {
        $(".tooltipOpener").toggleClass("active")
    }

    /* Modal cuestionario*/
    var modalCuestionario = function() {
        $('.modalCuestionaro').fadeIn()
    }
    var modalCuestionarioDin = function() {
        $('.modalCuestionarioDin').fadeIn()
       
    }


    /*:: Vistas modal ::*/
    // Next de vista
    var changeViewTest = function(e) {
        console.log('click')
        e.preventDefault()
        $(".modalItem0").removeClass("active")
        $(".modalItem1").addClass("active")
        $('.contentModal').animate({ scrollTop: 0 }, 200)
    }
    var changeView1 = function(e) {
        console.log('click first test')
        $('div.stepFollow > p:nth-child(1)').removeClass('active');
        $('div.stepFollow > p:nth-child(2)').addClass('active');
        e.preventDefault()
        $(".modalItem1").removeClass("active")
        $(".modalItem2").addClass("active")
        $('.contentModal').animate({ scrollTop: 0 }, 200)
    }
    var changeView2 = function(e) {
        console.log('click second test')
        $('div.stepFollow > p:nth-child(2)').removeClass('active');
        $('div.stepFollow > p:nth-child(3)').addClass('active');
        e.preventDefault()
        $(".modalItem2").removeClass("active")
        $(".modalItem3").addClass("active")
        $('.contentModal').animate({ scrollTop: 0 }, 200)
    }
    var changeView3 = function(e) {
        console.log('click third test')
        $('div.stepFollow > p:nth-child(3)').removeClass('active');
        $('div.stepFollow > p:nth-child(4)').addClass('active');
        e.preventDefault()
        $(".modalItem3").removeClass("active")
        $(".modalItem4").addClass("active")
        $('.contentModal').animate({ scrollTop: 0 }, 200)
    }
    var changeView4 = function(e) {
        console.log('click four test')
        $('div.stepFollow > p:nth-child(4)').removeClass('active');
        $('div.stepFollow > p:nth-child(5)').addClass('active');
        e.preventDefault()
        $(".modalItem4").removeClass("active")
        $(".modalItem5").addClass("active")
        $('.contentModal').animate({ scrollTop: 0 }, 200)
    }
    var changeView = function(e) {
        console.log('click')
        e.preventDefault()
        $(".modalItem").removeClass("active")
        $(".modalItemVivienda").addClass("active")
        $('.contentModal').animate({ scrollTop: 0 }, 200)
    }

    var changeViewVivienda = function() {
        //console.log('click vivienda')
        //e.preventDefault()
        $(".modalItemVivienda").removeClass("active")
        $(".modalItemTrabajo").addClass("active")
        $('.contentModal').animate({ scrollTop: 0 }, 200)
    }
    var changeViewTrabajo = function() {
        //console.log('click trabajo')
        //e.preventDefault()
        $(".modalItemTrabajo").removeClass("active")
        $(".modalItemMovilidad").addClass("active")
        $('.contentModal').animate({ scrollTop: 0 }, 200)
    }
    var changeViewMovilidad = function() {
            //console.log('click movilidad')
            //e.preventDefault()
            $(".modalItemMovilidad").removeClass("active")
            $(".modalItemFinalizar").addClass("active")
            $('.contentModal').animate({ scrollTop: 0 }, 200)
        }
        // Prev de vista
    var prevViewTrabajo = function(e) {
            e.preventDefault()
            $(".modalItemTrabajo").removeClass("active")
            $(".modalItemVivienda").addClass("active")
            $('.contentModal').animate({ scrollTop: 0 }, 200)

        }
        // Prev de vista
        // Prev de vista
    var prevViewMovilidad = function(e) {
            e.preventDefault()
            $(".modalItemMovilidad").removeClass("active")
            $(".modalItemTrabajo").addClass("active")
            $('.contentModal').animate({ scrollTop: 0 }, 200)

        }
        // Terminar vista
    var endView = function(e) {
        e.preventDefault()
        $('.modalView').fadeOut()
    }






    /* Moment date */
    moment.locale('es')
    var momentDate = function() {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
            .format(this.getAttribute("data-date-format"))
        )
    }
    $("#historicoDate").on("change", momentDate).trigger("change")

    /* Prellenado de datos */
    var dataUserCharge = function() {
        var dataUserCont = getStorage64('dataUserCont')
        var dataCompanyCont = getStorage64('dataCompanyCont')
        try {
            var fullName = dataUserCont.nombre + ' ' + dataUserCont.paterno + ' ' + dataUserCont.materno
            var idUser = dataUserCont.id_usuario
            var idEmployee = dataCompanyCont.numero_empleado
            var emailUser = dataUserCont.email
            var birthdayUser = returnFormatDateSub(dataUserCont.nacimiento)
            var sexUser = dataUserCont.sexo
            var phoneUser = dataUserCont.telefono
            var areaUser = dataCompanyCont.departamento.nombre
            var employeeUser = dataCompanyCont.empresa.nombre

        } catch (err) {}

        //$('.countDataUser .userName').text(fullName)
        $('.countDataUser .userID').text('ID de Seguimiento: ' + idUser)
        if (idEmployee != null) {
            $('.employementID').text('No. de empleado: ' + idEmployee)
        } else {
            $('.employementID').parent().remove()
        }
        $('.personalData .dataEmail').text(emailUser)
        $('.personalData .dataBirthday span').text(birthdayUser)
        if (sexUser === 'm' || sexUser === 'M') {
            sexUser = 'Masculino'
            $('.personalData .dataSex span').text('Masculino')
        } else if (sexUser === 'f' || sexUser === 'F') {
            $('.personalData .dataSex span').text('Femenino')
        }
        $('.personalData .dataPhone span').text(phoneUser)

        $('.employData .dataArea span').text(areaUser)
        $('.employData .dataEmploye span').text(employeeUser)

        if (dataCompanyCont != 'null') {
            $('.employData').removeClass('hidden')
        } else {
            $('.employData').remove()
        }

        // console.log(dataUserCont)
        // console.log(dataCompanyCont)	
    }

    var getPollVariables = () => {
        //localStorage.setItem("movilidad", movilidad)
        //localStorage.setItem("trabajo", trabajo)



        try {
            poll = getStorage64('poll')
            sections = getStorage64('sections')
            vivienda = getStorage64('vivienda')
            trabajo = getStorage64('trabajo')
                // setStorage64('movilidad', movilidad)
                //movilidad = getStorage64('movilidad')


            var movilidad = JSON.parse(localStorage.getItem('movilidad'))
            mainTitle = poll.title

            pollDescription = poll.description

            // var i; 
            // var j ;
            // 	for (i=0, j=1; i < vivienda.length; i++, j++) {

            // 		$('p.h6#'+j+'').text(vivienda[i].question)
            // 	}

            quesVivType1 = vivienda[0].question
            quesVivType2 = vivienda[1].question
            quesVivType3 = vivienda[1].choices[0].nested[0].question
            quesVivType4 = vivienda[2].question
            quesVivType5 = vivienda[3].question
            quesVivType6 = vivienda[4].question

            // var w = 7
            // 	for (w=7, i=0; i < trabajo.length; i++, w++) {
            // 		$('p.h6#'+w+'').text(trabajo[i].question)
            // 		//console.log(w)
            // 	}

            pollDescription = poll.description
                // quesVivType0 = vivienda[0].question
                // quesVivType1 = vivienda[1].question
                // quesVivType2 = vivienda[2].question
                // quesVivType4 = vivienda[3].question
                // quesVivType5 = vivienda[4].question
                // quesMovType16 = movilidad[0].question

            // quesMovType19 = movilidad[1].question
            // quesVivType5 = vivienda[4].question

            labelVivType1 = vivienda[0].choices[0].choice
            labelVivType2 = vivienda[0].choices[1].choice
            labelVivType3 = vivienda[1].choices[0].choice
            labelVivType4 = vivienda[1].choices[1].choice
            labelVivType5 = vivienda[2].choices[0].choice
            labelVivType6 = vivienda[2].choices[1].choice
            labelVivType7 = vivienda[3].choices[0].choice
            labelVivType8 = vivienda[3].choices[1].choice
            labelVivType9 = vivienda[4].choices[0].choice
            labelVivType10 = vivienda[4].choices[1].choice
            labelVivType11 = vivienda[4].choices[2].choice

            labeltrabajoType12 = trabajo[0].choices[0].choice
            labeltrabajoType13 = trabajo[0].choices[0].nested[0].choices[0].choice
            labeltrabajoType14 = trabajo[0].choices[0].nested[0].choices[1].choice
            labeltrabajoType15 = trabajo[0].choices[0].nested[0].choices[2].choice
            labeltrabajoType16 = trabajo[0].choices[0].nested[0].choices[3].choice
            labeltrabajoType17 = trabajo[0].choices[0].nested[0].choices[4].choice
            labeltrabajoType18 = trabajo[0].choices[0].nested[0].choices[5].choice
            labeltrabajoType19 = trabajo[0].choices[0].nested[0].choices[6].choice
            labeltrabajoType20 = trabajo[0].choices[0].nested[0].choices[7].choice
            labeltrabajoType21 = trabajo[0].choices[1].choice
            labeltrabajoType22 = trabajo[1].choices[0].choice
            labeltrabajoType23 = trabajo[1].choices[1].choice

            labeltrabajoType24 = trabajo[3].choices[0].choice
            labeltrabajoType25 = trabajo[3].choices[1].choice
            labeltrabajoType26 = trabajo[3].choices[2].choice
            labeltrabajoType27 = trabajo[3].choices[3].choice
            labeltrabajoType28 = trabajo[3].choices[4].choice
            labeltrabajoType29 = trabajo[3].choices[5].choice
            labeltrabajoType30 = trabajo[3].choices[6].choice

            labeltrabajoType31 = trabajo[4].choices[0].choice
            labeltrabajoType32 = trabajo[4].choices[1].choice

            labelMovType33 = movilidad[0].choices[0].choice
            labelMovType34 = movilidad[0].choices[0].nested[0].choices[0].choice
            labelMovType35 = movilidad[0].choices[0].nested[0].choices[1].choice
            labelMovType36 = movilidad[0].choices[1].choice
            labelMovType37 = movilidad[0].choices[2].choice
            labelMovType38 = movilidad[0].choices[3].choice
            labelMovType39 = movilidad[0].choices[4].choice
            labelMovType40 = movilidad[0].choices[5].choice
            labelMovType41 = movilidad[0].choices[5].nested[0].choices[0].choice
            labelMovType42 = movilidad[0].choices[5].nested[0].choices[1].choice
            labelMovType43 = movilidad[0].choices[5].nested[0].choices[2].choice
            labelMovType44 = movilidad[0].choices[5].nested[0].choices[3].choice
            labelMovType45 = movilidad[0].choices[5].nested[0].choices[4].choice
            labelMovType46 = movilidad[1].choices[0].choice
            labelMovType47 = movilidad[1].choices[1].choice
            labelMovType48 = movilidad[1].choices[2].choice
            labelMovType49 = movilidad[1].choices[3].choice
            labelMovType50 = movilidad[1].choices[4].choice
            labelMovType51 = movilidad[1].choices[5].choice
            labelMovType52 = movilidad[1].choices[6].choice


            quesWorkType7 = trabajo[0].question
            quesWorkType8 = trabajo[0].choices[0].nested[0].question
            quesWorkType9 = trabajo[0].choices[0].nested[0].choices[7].nested[0].question
            quesWorkType10 = trabajo[0].choices[1].nested[0].question

            quesWorkType11 = trabajo[1].question
            quesWorkType12 = trabajo[2].question
            quesWorkType13 = trabajo[3].question
            quesWorkType14 = trabajo[4].question

            quesTransType16 = movilidad[0].question
            quesTransType17 = movilidad[0].choices[0].nested[0].question
            quesTransType18 = movilidad[0].choices[5].nested[0].question
            quesTransType19 = movilidad[1].question

            //console.log(quesVivType1)
        } catch (err) {}

        $('#titlePrime').text(mainTitle)
        $('#pollDescription').text(pollDescription)
            //    $('#section').text(section)
            //    $('#section1').text(section1)
            //    $('#section2').text(section2)
        $('p.h6#1').text(quesVivType1)
        $('p.h6#2').text(quesVivType2)
        $('p.h6#3').text(quesVivType3)
        $('p.h6#4').text(quesVivType4)
        $('p.h6#5').text(quesVivType5)
        $('p.h6#6').text(quesVivType6)


        $('label[for=a1]').text(labelVivType1);
        $('label[for=a2]').text(labelVivType2);
        $('label[for=a3]').text(labelVivType3);
        $('label[for=a4]').text(labelVivType4);
        $('label[for=a5]').text(labelVivType5);
        $('label[for=a6]').text(labelVivType6);
        $('label[for=a7]').text(labelVivType7);
        $('label[for=a8]').text(labelVivType8);
        $('label[for=a9]').text(labelVivType9);
        $('label[for=a10]').text(labelVivType10);
        $('label[for=a11]').text(labelVivType11);
        // var z;
        // for (z=12; z < 33; z++) {
        // 		$('label[for=b'+z+']').text(labeltrabajoType+z);
        // 		console.log(z)
        // }
        $('label[for=b12]').text(labeltrabajoType12);
        $('label[for=b13]').text(labeltrabajoType13);
        $('label[for=b14]').text(labeltrabajoType14);
        $('label[for=b15]').text(labeltrabajoType15);
        $('label[for=b16]').text(labeltrabajoType16);
        $('label[for=b17]').text(labeltrabajoType17);
        $('label[for=b18]').text(labeltrabajoType18);
        $('label[for=b19]').text(labeltrabajoType19);
        $('label[for=b20]').text(labeltrabajoType20);
        $('label[for=b21]').text(labeltrabajoType21);
        $('label[for=b22]').text(labeltrabajoType22);
        $('label[for=b23]').text(labeltrabajoType23);
        $('label[for=b24]').text(labeltrabajoType24);
        $('label[for=b25]').text(labeltrabajoType25);
        $('label[for=b26]').text(labeltrabajoType26);
        $('label[for=b27]').text(labeltrabajoType27);
        $('label[for=b28]').text(labeltrabajoType28);
        $('label[for=b29]').text(labeltrabajoType29);
        $('label[for=b30]').text(labeltrabajoType30);
        $('label[for=b31]').text(labeltrabajoType31);
        $('label[for=b32]').text(labeltrabajoType32);

        $('label[for=c33]').text(labelMovType33);
        $('label[for=c34]').text(labelMovType34);
        $('label[for=c35]').text(labelMovType35);
        $('label[for=c36]').text(labelMovType36);
        $('label[for=c37]').text(labelMovType37);
        $('label[for=c38]').text(labelMovType38);
        $('label[for=c39]').text(labelMovType39);
        $('label[for=c40]').text(labelMovType40);
        $("label[for='transporteLista']").text(labelMovType41);
        $("label[for='transporteListb']").text(labelMovType42);
        $("label[for='transporteListc']").text(labelMovType43);
        $("label[for='transporteListd']").text(labelMovType44);
        $("label[for='transporteListe']").text(labelMovType45);
        $('label[for=c46]').text(labelMovType46);
        $('label[for=c47]').text(labelMovType47);
        $('label[for=c48]').text(labelMovType48);
        $('label[for=c49]').text(labelMovType49);
        $('label[for=c50]').text(labelMovType50);
        $('label[for=c51]').text(labelMovType51);
        $('label[for=c52]').text(labelMovType52);

        $('p.h6#7').text(quesWorkType7)
        $('.propiasType#8 > p.titleLabel').text(quesWorkType8)
        $('label[for=instalacionesClienteReg]').text(quesWorkType9)
        $('label[for=instaReg]').text(quesWorkType10)

        $('p.h6#11').text(quesWorkType11)
        $('p.h6#12').text(quesWorkType12)
        $('p.h6#13').text(quesWorkType13)
        $('p.h6#14').text(quesWorkType14)

        $('p.h6#16').text(quesTransType16)
        $('p.h6#17').text(quesTransType17)
        $('p.h6#18').text(quesTransType18)
        $('p.h6#19').text(quesTransType19)
            //$('p.h6#16').text(quesMovType16);
        $('p.h6#17').text(quesMovType17);
        $('p.h6#18').text(quesMovType18);
        //$('p.h6#19').text(quesMovType19);
    }

    var dataSimptomsCharge = function() {
        var dataUserCont = getStorage64('dataUserCont')
        var dataImcCont = getStorage64('dataImcCont')
        var dataDiseasesCont = getStorage64('dataDiseasesCont')

        var initialDate = dataUserCont.fecha_registro.split(' ')
        var sexUser = dataUserCont.sexo.toUpperCase()
        var IMC = calculateIMC(dataImcCont.peso, dataImcCont.estatura)
        var simptomsList = dataDiseasesCont.enfermedades

        $('.myClinicalCards .simptomsList li').remove()

        $('.myClinicalCards .dateProfile dd').text(returnFormatDateSub(initialDate[0]))
        if (sexUser === 'M') {
            sexUser = 'Masculino'
            $('.myClinicalCards .sexProfile dd').text('Masculino')
            $('.myClinicalCards .pregnatProfile').remove()

        } else if (sexUser === 'F') {
            $('.myClinicalCards .sexProfile dd').text('Femenino')
        }
        if (dataImcCont != 'null') {
            //$('.myClinicalCards .imcWeightProfile dd').text(dataImcCont.peso+' Kg')
            //$('.myClinicalCards .imcHeightProfile dd').text(dataImcCont.estatura+' cm')
            //$('.myClinicalCards .imcDiagnostic dd').text(IMC[1])
            $('.myClinicalCards .imcProfile dd').text(IMC[0])
        } else {
            $('.myClinicalCards .imcProfile dd span').remove()
            $('.myClinicalCards .imcProfile dd').append('<span class\=\"warningMessage\"> *Falta registro<\/span>')
        }

        if (dataDiseasesCont != 'null') {
            if (simptomsList.length != 0) {
                let i = 0
                while (i < simptomsList.length) {
                    $('.myClinicalCards .simptomsList').append('<li>' + simptomsList[i].nombre + '<\/li>')
                    i++
                }
            }
        } else { $('.myClinicalCards .simptomsList').append('<li>Ninguno<\/li>') }

        // console.log(dataUserCont)
        // console.log(dataImcCont)
        // console.log(dataDiseasesCont)
    }
    var preChargeIMCData = function() {
        var dataImcCont = getStorage64('dataImcCont')
        let peso
        if (dataImcCont.peso != undefined) {
            peso = Number(dataImcCont.peso).toFixed(2)
        } else {
            peso = ''
        }
        //console.log(dataImcCont.peso)
        $('[name="imcPesoReg"]').val(peso)
        $('[name="imcAlturaReg"]').val(dataImcCont.estatura)
    }
    var preChargeSimptompsData = function() {
        //debugger
        //axiosListDiseases()
        var dataUserCont = getStorage64('dataUserCont')
        var sexUser = dataUserCont.sexo.toUpperCase()
        var dataDiseasesCont = getStorage64('dataDiseasesCont')
        var simptomsList = dataDiseasesCont.enfermedades
            //console.log(dataDiseasesCont)

        if (dataDiseasesCont != 'null') {
            //debugger
            if (simptomsList.length === 1) {
                if (simptomsList[0].id != 10) {
                    $('[name="diseases_' + simptomsList[0].id + '"]').trigger('click')
                    if (sexUser === 'F') {
                        $('[name="pregnantReg"]:eq(1)').trigger('click')
                    }
                } else if (simptomsList[0].id === 10) {
                    $('[name="pregnantReg"]:eq(0)').trigger('click')
                    $('[name="ninguna"]').trigger('click')
                }
            } else if (simptomsList.length != 0) {
                let i = 0
                while (i < simptomsList.length) {
                    if (simptomsList[i].id != 10) {
                        $('[name="diseases_' + simptomsList[i].id + '"]').trigger('click')
                        $('[name="pregnantReg"]:eq(1)').trigger('click')
                    } else if (simptomsList[i].id === 10) {
                        $('[name="pregnantReg"]:eq(0)').trigger('click')
                    }
                    i++
                }
            }
        } else {
            if (sexUser === 'F') {
                $('[name="ninguna"]').trigger('click')
                $('[name="pregnantReg"]:eq(1)').trigger('click')
            } else if (sexUser === 'M') {
                $('[name="ninguna"]').trigger('click')
            }
        }
    }
    var updateIMC = function() {
        let valInputImcPesoReg = $('[name="imcPesoReg"]').val()
        let valInputImcAlturaReg = $('[name="imcAlturaReg"]').val()

        if (valInputImcPesoReg === '' || valInputImcPesoReg === undefined || valInputImcPesoReg === null) {
            errorInputNotify('imcPesoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateFoat(valInputImcPesoReg)) {
            errorInputNotify('imcPesoReg', warningMessages[8])
            toast(warningMessages[8])
        } else if (Number(valInputImcPesoReg) <= 0) {
            errorInputNotify('imcPesoReg', warningMessages[12])
            toast(warningMessages[12])
        } else if (Number(valInputImcPesoReg) >= 301) {
            errorInputNotify('imcPesoReg', warningMessages[13])
            toast(warningMessages[13])
        } else if (valInputImcAlturaReg === '' || valInputImcAlturaReg === undefined || valInputImcAlturaReg === null) {
            errorInputNotify('imcAlturaReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateNumber(valInputImcAlturaReg)) {
            errorInputNotify('imcAlturaReg', warningMessages[8])
            toast(warningMessages[8])
        } else if (Number(valInputImcAlturaReg) <= 0) {
            errorInputNotify('imcAlturaReg', warningMessages[15])
            toast(warningMessages[15])
        } else if (Number(valInputImcAlturaReg) >= 211) {
            errorInputNotify('imcAlturaReg', warningMessages[16])
            toast(warningMessages[16])
        } else {
            calculateIMC(Number(valInputImcPesoReg), Number(valInputImcAlturaReg))
            let dataRegistryIMC = {
                "height": Number(valInputImcAlturaReg),
                "weight": Number.parseFloat(valInputImcPesoReg).toFixed(2)
            }
            setStorage64('registryFormMiddleIMC', dataRegistryIMC)
            sendRegistryMiddleIMC(dataRegistryIMC)
        }
    }
    var updateCompany = function() {
        let valInputEmpresa = $('[name="selecEmpresaReg"]').val()
        let valInputArea = $('[name="selecAreaReg"]').val()

        if (valInputEmpresa === '' || valInputEmpresa === undefined || valInputEmpresa === null) {
            errorSelectNotify('selecEmpresaReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (valInputArea === '' || valInputArea === undefined || valInputArea === null) {
            $('[name="selecAreaReg"]').parent().addClass('error');
            $('[name="selecAreaReg"] ').parent().next().text('Campo vacio');
            upErrorMessage()
        } else {
            let dataUpdateCompany = {
                    "company": valInputEmpresa,
                    "department": valInputArea
                }
                //console.log(dataUpdateCompany)
            sendUpdateCompany(dataUpdateCompany)
        }
    }
    var updateSimptomps = function() {
        //debugger
        var dataUserCont = getStorage64('dataUserCont')
        let valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val()
        let valInputPregnantValidate = $('.pregnantType [name="pregnantReg"]:checked').length
        let valInputDiseases = $('.arrayDiseases [type="checkbox"]:checked').length

        var sexUser = dataUserCont.sexo.toUpperCase()
        let dataRegistryDiseases = getStorage64('arrayDiseases')

        if (sexUser === 'M') {
            //console.log('sex M')
            valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val('')

            if (valInputPregnant !== "no") {
                //debugger
                //console.log('valInputPregnant !== vacio')
                if (valInputDiseases === 0) {
                    errorRadioNotify('arrayDiseases', warningMessages[2])
                    toast(warningMessages[2])
                    dataRegistryDiseases = getStorage64('arrayDiseases')
                } else {
                    //console.log(dataRegistryDiseases)
                    setStorage64('registryFormMiddle', dataRegistryDiseases)
                    sendRegistryMiddle(dataRegistryDiseases)
                }
            }
        }

        if (sexUser === 'F') {
            //console.log('sexF')
            if (valInputPregnantValidate === 0) {
                //console.log('sexF y preg 0')
                errorRadioNotify('pregnantType', warningMessages[2])
                toast(warningMessages[2])
            } else if (valInputPregnant !== "no") {
                //debugger
                //console.log('valInputPregnant !== vacio')
                if ($('.pregnantType [name="pregnantReg"]:checked').val() !== undefined && $('.pregnantType [name="pregnantReg"]:checked').val() !== "") {
                    valInputPregnant = parseInt($('.pregnantType [name="pregnantReg"]:checked').val())
                    dataRegistryDiseases.push(valInputPregnant)
                    if (valInputDiseases === 0) {
                        //console.log('pregnantReg  Val YES')
                        errorRadioNotify('arrayDiseases', warningMessages[2])
                        toast(warningMessages[2])
                        dataRegistryDiseases = getStorage64('arrayDiseases')
                    } else {
                        //console.log('todo full YES')
                        //console.log(dataRegistryDiseases)
                        setStorage64('registryFormMiddle', dataRegistryDiseases)
                        sendRegistryMiddle(dataRegistryDiseases)
                    }
                }
            } else if (valInputDiseases === 0) {
                //console.log('pregnantReg  Val NO')
                errorRadioNotify('arrayDiseases', warningMessages[2])
                toast(warningMessages[2])
                dataRegistryDiseases = getStorage64('arrayDiseases')
            } else {
                //console.log('todo full NO')
                //console.log(dataRegistryDiseases)
                setStorage64('registryFormMiddle', dataRegistryDiseases)
                sendRegistryMiddle(dataRegistryDiseases)
            }
        }
    }
    var validateEmptySimptomps = function() {
        //debugger
        //console.log('valida sintomas al cargar')
        var dataUserCont = getStorage64('dataUserCont')
        try {
            var sexUser = dataUserCont.sexo.toUpperCase()
        } catch (err) { console.log(err) }
        if (sexUser === 'M') {
            valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val('')
        } else if (sexUser === 'F') {
            $('.pregnantHide').removeClass('hidden')
        }
        $('.card.clinicalProfile').addClass('incompleteProf')
    }
    var succesUpdateSimp = function() {
        //console.log('charge success')
        if (window.location.pathname.indexOf('/clinicalProfile') !== -1) {
            var dataDiseasesCont = getStorage64('dataDiseasesCont')
            var simptomsList = dataDiseasesCont.enfermedades

            $('.myClinicalCards .simptomsList li').remove()
            if (dataDiseasesCont != 'null') {
                if (simptomsList.length != 0) {
                    let i = 0
                    while (i < simptomsList.length) {
                        $('.myClinicalCards .simptomsList').append('<li>' + simptomsList[i].nombre + '<\/li>')
                        i++
                    }
                }
            } else { $('.myClinicalCards .simptomsList').append('<li>Ninguno<\/li>') }
        }
    }
    var succesUpdateImc = function() {
        console.log('charge success')
            //debugger
        if (window.location.pathname.indexOf('/clinicalProfile') !== -1) {
            var dataImcCont = getStorage64('dataImcCont')
            var IMC = calculateIMC(dataImcCont.peso, dataImcCont.estatura)

            if (dataImcCont != 'null') {
                //$('.myClinicalCards .imcWeightProfile dd').text(dataImcCont.peso+' Kg')
                //$('.myClinicalCards .imcHeightProfile dd').text(dataImcCont.estatura+' cm')
                //$('.myClinicalCards .imcDiagnostic dd').text(IMC[1])
                $('.myClinicalCards .imcProfile dd').text(IMC[0])
            } else {
                $('.myClinicalCards .imcProfile dd span').remove()
                $('.myClinicalCards .imcProfile dd').append('<span class\=\"warningMessage\"> *Falta registro<\/span>')
                $('.clinicalProfile').addClass('incompleteProf')
            }
        }
        if (window.location.pathname.indexOf('/userProfile') !== -1 || window.location.pathname.indexOf('/myAccount') !== -1) {
            var dataImcCont = getStorage64('dataImcCont')
            if (dataImcCont === 'null') {
                $('.clinicalProfile').addClass('incompleteProf')
            }
        }
    }
    var succesUpdateInfoGral = function() {
        if (window.location.pathname.indexOf('/userProfile') !== -1) {
            var dataUserCont = getStorage64('dataUserCont')

            var fullName = dataUserCont.nombre + ' ' + dataUserCont.paterno + ' ' + dataUserCont.materno
            var idUser = dataUserCont.id_usuario
            var emailUser = dataUserCont.email
            var birthdayUser = returnFormatDateSub(dataUserCont.nacimiento)
            var sexUser = dataUserCont.sexo
            var phoneUser = dataUserCont.telefono

            $('.countDataUser .userID').text('ID de Seguimiento: ' + idUser)
            if (idEmployee != null) {
                $('.employementID').text('No. de empleado: ' + idEmployee)
            } else {
                $('.employementID').parent().remove()
            }
            $('.personalData .dataEmail').text(emailUser)
            $('.personalData .dataBirthday span').text(birthdayUser)
            if (sexUser === 'm' || sexUser === 'M') {
                sexUser = 'Masculino'
                $('.personalData .dataSex span').text('Masculino')
            } else if (sexUser === 'f' || sexUser === 'F') {
                $('.personalData .dataSex span').text('Femenino')
            }
            $('.personalData .dataPhone span').text(phoneUser)
        }
        if (window.location.pathname.indexOf('/clinicalProfile') !== -1) {
            var dataUserCont = getStorage64('dataUserCont')
            var initialDate = dataUserCont.fecha_registro.split(' ')
            var sexUser = dataUserCont.sexo.toUpperCase()

            $('.myClinicalCards .dateProfile dd').text(returnFormatDateSub(initialDate[0]))
            if (sexUser === 'M') {
                sexUser = 'Masculino'
                $('.myClinicalCards .sexProfile dd').text('Masculino')
                $('.myClinicalCards .pregnatProfile').remove()

            } else if (sexUser === 'F') {
                $('.myClinicalCards .sexProfile dd').text('Femenino')
            }
        }
    }
    var succesUpdateCompany = function() {
        var dataCompanyCont = getStorage64('dataCompanyCont')
        setStorage64('entity_id', dataCompanyCont.id_usuario_empresa)

        if (window.location.pathname.indexOf('/userProfile') !== -1) {
            var dataCompanyCont = getStorage64('dataCompanyCont')
            if (dataCompanyCont != 'null') {
                $('.employData').removeClass('hidden')
                var areaUser = dataCompanyCont.departamento.nombre
                var employeeUser = dataCompanyCont.empresa.nombre
                var areaGroup = dataCompanyCont.grupo.nombre
                $('.employData .dataGroup span').text(areaGroup)
                $('.employData .dataArea span').text(areaUser)
                $('.employData .dataEmploye span').text(employeeUser)
            } else {
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
    var validatteDate = function(date) {
        var re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/ig;
        return re.test(date);
    }
    var stripCode = function(code) {
        var originalCode = code
        let codeStrip = originalCode.replace(/(<([^>]+)>)/ig, "")
        return codeStrip
    }
    var validateTypeDate = function(code) {
        var re = /^[0-9\/-]*$/;
        return re.test(code);
    }
    var returnFormatDate = function(dateValue) {
        var fecha = String(dateValue)
        let dateCount = fecha.length
        let dateNormal = fecha.indexOf('-') >= 1
        let dateSafari = fecha.indexOf('/') >= 1
        if (dateCount !== 10) {
            var fail = 'fail'
            return fail
        } else if (dateNormal >= 1) {
            let fechaArray = fecha.split('-')
            let fechaArreglada
            if (fechaArray[0].length == 4) {
                fechaArreglada = fechaArray[0] + '-' + fechaArray[1] + '-' + fechaArray[2]
                return fechaArreglada
            } else if (fechaArray[0].length == 2) {
                fechaArreglada = fechaArray[2] + '-' + fechaArray[1] + '-' + fechaArray[0]
                return fechaArreglada
            }
        } else if (dateSafari >= 1) {
            let fechaArray = fecha.split('/')
            let fechaArreglada
            if (fechaArray[0].length == 4) {
                fechaArreglada = fechaArray[0] + '-' + fechaArray[1] + '-' + fechaArray[2]
                return fechaArreglada
            } else if (fechaArray[0].length == 2) {
                fechaArreglada = fechaArray[2] + '-' + fechaArray[1] + '-' + fechaArray[0]
                return fechaArreglada
            }
        }
    }
    var returnFormatDateSub = function(dateValue) {
        var fecha = String(dateValue)
        let dateCount = fecha.length
        let dateNormal = fecha.indexOf('-') >= 1
        let dateSafari = fecha.indexOf('/') >= 1
        if (dateCount !== 10) {
            var fail = 'fail'
            return fail
        } else if (dateNormal >= 1) {
            let fechaArray = fecha.split('-')
            let fechaArreglada
            if (fechaArray[0].length == 4) {
                fechaArreglada = fechaArray[2] + '-' + fechaArray[1] + '-' + fechaArray[0]
                return fechaArreglada
            } else if (fechaArray[0].length == 2) {
                fechaArreglada = fechaArray[0] + '-' + fechaArray[1] + '-' + fechaArray[2]
                return fechaArreglada
            }
        } else if (dateSafari >= 1) {
            let fechaArray = fecha.split('/')
            let fechaArreglada
            if (fechaArray[0].length == 4) {
                fechaArreglada = fechaArray[2] + '-' + fechaArray[1] + '-' + fechaArray[0]
                return fechaArreglada
            } else if (fechaArray[0].length == 2) {
                fechaArreglada = fechaArray[0] + '-' + fechaArray[1] + '-' + fechaArray[2]
                return fechaArreglada
            }
        }
    }


    var addZero = function(num) {
        if (num < 10) {
            num = '0' + num;
        }
        return num;
    }
    var dateToday = function() {
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1;
        var yyyy = hoy.getFullYear();
        var dateToday = yyyy + '-' + addZero(mm) + '-' + addZero(dd)

        return dateToday
    }()
    var dateMinBirthady = function() {
        var hoy = new Date();
        var dd = hoy.getDate();
        //var mm = hoy.getMonth()+1;
        //var yyyy = hoy.getFullYear()-18;
        var mm = hoy.getMonth();
        var yyyy = hoy.getFullYear();
        var dateMinBirthady = yyyy + '-' + addZero(mm) + '-' + addZero(dd)

        return dateMinBirthady
    }()
    var calculateIMC = function(peso, altura) {
        let imc = peso / Math.pow(altura, 2)
        let valRound = imc * 10000
        imcTotal = []
        imcTotal.push(valRound.toFixed(2))
        if (imcTotal[0] < 18.5) { imcTotal.push('Peso insuficiente') }
        if (imcTotal[0] >= 18.6 && imcTotal[0] <= 24.9) { imcTotal.push('Peso normal') }
        if (imcTotal[0] >= 25 && imcTotal[0] <= 26.9) { imcTotal.push('Sobrepeso grado I') }
        if (imcTotal[0] >= 27 && imcTotal[0] <= 29.9) { imcTotal.push('Sobrepeso grado II (preobesidad)') }
        if (imcTotal[0] >= 30 && imcTotal[0] <= 34.9) { imcTotal.push('Obesidad de tipo I') }
        if (imcTotal[0] >= 35 && imcTotal[0] <= 39.9) { imcTotal.push('Obesidad de tipo II') }
        if (imcTotal[0] >= 40 && imcTotal[0] <= 49.9) { imcTotal.push('Obesidad de tipo III (mórbida)') }
        if (imcTotal[0] >= 50) { imcTotal.push('Obesidad de tipo IV (extrema)') }
        return imcTotal
    }


    /* agrega  loading secundario */
    var addModal = function(message) {
        $('main').prepend('<div class=\"modalView\"><div class=\"contentModal\"><span class=\"modalClose\">x</span><div class=\"message\">' + message + '<\/div><\/div><\/div>')
    }
    var addLoader = function(active) {
        var activo = String(active)
        if (activo === 'false') {
            $('.loaderCharge').hide()
            $('.loaderCharge').remove()
            return
        } else {
            $('body').prepend('<div class=\"loaderCharge\"><div class=\"contentLoading\"><span class=\"loadImage\"><\/span><\/div><\/div>')
            return
        }
    }

    /* remueve el loading principal */
    var removeLoader = function() {
        $('.loaderPrincipal').hide()
        $('.loaderPrincipal').remove()
    }

    var splashAndroid = function() {
        $('body').prepend('<div class=\"splashAndroid\"><span class="modalClose"></span><div class=\"contentLoading\"><div class="contAppAndroidS"><p class=\"h2\">Descarga el app<\/p><img src=\"img\/logo-monitor.png" class=\"logoMonitor\"/><p>y monitorea tu salud diariamente.<\/p><a href=\"https://play.google.com/store/apps/details?id=com.americamovil.monitor\"><img src=\"img\/android.png\" \/><\/a><\/div><\/div><\/div>')
    }


    var upTop = function(param) {
        $(document).scrollTop(0)
    }

    var upErrorMessage = function() {
        let topError = $('.error').offset().top - 30
        $(document).scrollTop(topError)
    }

    /* Funciones del storage */
    var setStorage64 = function(key, value) {
        var keyString = JSON.stringify(key)
        var valueString = JSON.stringify(value)
        localStorage.setItem(btoa(keyString), btoa(valueString))
        return
    }
    var getStorage64 = function(key) {
        var llave = JSON.stringify(key)
        var keyString = btoa(llave)
        var valueString = localStorage.getItem(keyString)
        var response = atob(valueString)
        try {
            llave = JSON.parse(response)
        } catch (error) {
            llave = response
        }
        return llave
    }
    var deleteStorage64 = function(key) {
        var llave = JSON.stringify(key)
        var keyString = btoa(llave)
        var valueString = localStorage.removeItem(keyString)
        return
    }

    var getParams = function() {
        var loc = document.location.href;
        var getString = loc.split('?')[1];
        var GET = getString.split('&');
        var get = {};
        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }


    var insertUser = function() {
        var user = getStorage64('userAppU')
        var name = getStorage64('userAppN')
        var loginIn = getStorage64('userLoginSession')
        $('.userID').text(' ID seguimiento:  ' + user)
        $('.userName').text(' ¡Hola ' + name + ' !')

        if (loginIn === "true") {
            $('.userID, .userName, .sessionInit').removeClass('hidden')
                // $('.headCard').addClass('hidden')
        }
    }()

    var sessionUserActive = function(destruct) {
        var end = String(destruct)
        var redis = getStorage64('userRedisT')
        var tok = getStorage64('userAppT')
        var user = getStorage64('userAppU')
        if (end === "true") {
            deleteStorage64('userAppT')
            deleteStorage64('userAppU')
            deleteStorage64('userLoginSession')
        } else {
            setStorage64('userLoginSession', 'true')
        }
    }


    /* Guarda en codigo de entrada pasandolo a base64  */
    var setCodeEnter = function(param) {
        localStorage.setItem('kodoNyuryoku', btoa(param))
        return
    }

    /* Extrae en codigo de entrada pasandolo a base64 */
    var getCodeEnter = function() {
        codeEnter = localStorage.getItem('kodoNyuryoku')
        return codeEnter
    }


    /* Genera acceso para usuario a las demas secciones*/
    var setSusumu = function() {
        localStorage.setItem('yokoso', btoa('wakatta'))
        return
    }

    /* Extrae acceso para usuario a las demas secciones*/
    var getSusumu = function() {
        susumu = localStorage.getItem('yokoso')
        return susumu
    }


    /* Guarda token redis a base64  */
    var setIdRedis = function(param) {
        localStorage.setItem('tokunRedis', btoa(param))
        return tokunRedis
    }

    var getIdRedis = function() {
        idRedis = localStorage.getItem('tokunRedis')
        return idRedis
    }



    /* Evalua la locacion para saber si tiene acceso  */
    var evaLocation = function() {
        getSusumu()
        if (URL_PathName === URL_Password) {
            return
        } else if (URL_Origin != URL_Location) {
            /*  console.log('estas en ' + URL_PathName) */
            if (susumu === null || susumu != btoa('wakatta')) {
                location.href = BASE_URL
                return
            }
            return
        } else {
            if (susumu != null) {
                location.href = 'home.html'
                return
            } else {
                return
            }
            /*   localStorage.removeItem('yokoso') */
        }
    }()



    /*  Validate Forms  */
    var validatePProtect = function() {
        getCodeEnter()
        let valInput = $('.passwordProtect input').val()
        if (valInput === '' || valInput === undefined || valInput === null) {
            $('.passwordProtect input').addClass('error')
            $('.passwordProtect .errorMessage').text('Campo vacio')
        } else {
            if (valInput == atob(codeEnter)) {
                setSusumu()
                returnToHome()
            } else {
                $('.passwordProtect input').addClass('error')
                $('.passwordProtect .errorMessage').text('Valor Incorrecto')
            }
        }
    }

    var validateLoginAPP = function(data) {
        if (data === undefined) {
            deleteStorage64('LoginAPP')
        } else {
            setStorage64('LoginAPP', data)
        }
    }

    var validateLogin = function() {
        let valInputEmail = $('[name="emailLogin"]').val()
        let valInputPass = $('[name="passwordLogin"]').val()


        let dataLogin = {
            "email": valInputEmail,
            "password": valInputPass
        }

        if (valInputEmail === '' || valInputEmail === undefined || valInputEmail === null) {
            $('[name="emailLogin"]').addClass('error')
            $('[name="emailLogin"] + .errorMessage').text('Campo vacio')
        } else if (!validateEmail(valInputEmail)) {
            $('[name="emailLogin"]').addClass('error');
            $('[name="emailLogin"] + .errorMessage').text('Formato de correo invalido');
        } else if (valInputPass === '' || valInputPass === undefined || valInputPass === null) {
            $('[name="passwordLogin"]').addClass('error')
            $('[name="passwordLogin"] + .errorMessage').text('Campo vacio')
        } else {
            addLoader()
            sendLogin(dataLogin)
        }
    }

    var showLogin = function() {
        $('.formLogin').removeClass('hidden')
        $('.formQuestion').addClass('hidden')
        $('.formRecord').addClass('hidden')
    }
    var showRegistry = function() {
        $('.formRecord').removeClass('hidden')
        $('.formLogin').addClass('hidden')
        $('.formQuestion').addClass('hidden')
    }

    var validateRecoveryPass = function() {
        let valInput = $('[name="recoveryPassword"]').val()

        let dataRecoveryPass = {
            "email": valInput
        }

        if (valInput === '' || valInput === undefined || valInput === null) {
            $('.passwordRecovery input').addClass('error')
            $('.passwordRecovery .errorMessage').text('Campo vacio')
        } else if (!validateEmail(valInput)) {
            $('.passwordRecovery input').addClass('error');
            $('.passwordRecovery .errorMessage').text('Formato de correo invalido');
        } else {
            sendRecoveryPass(dataRecoveryPass)
        }
    }

    var validateUpdatePass = function() {
        let valInputAnt = String($('[name="antPassword"]').val())
        let valInputUp = String($('[name="updatePassword"]').val())
        let valInputRec = String($('[name="confirmUpPass"]').val())
        let token = getStorage64('getTokenR')
        var dataUserCont = getStorage64('dataUserCont')
        var emailUser = dataUserCont.email
        let updatePass = {
            "password_old": valInputAnt,
            "password": valInputRec,
            // "token": token,
            "email": emailUser
        }

        if (valInputAnt === '' || valInputAnt === undefined || valInputAnt === null) {
            $('[name="antPassword"]').addClass('error')
            $('[name="antPassword"] + .errorMessage').text('Campo vacio')
            upErrorMessage()
        } else if (valInputUp === '' || valInputUp === undefined || valInputUp === null) {
            $('[name="updatePassword"]').addClass('error')
            $('[name="updatePassword"] + .errorMessage').text('Campo vacio')
            upErrorMessage()
        } else if (valInputUp.length <= 5) {
            $('[name="updatePassword"]').addClass('error')
            $('[name="updatePassword"] + .errorMessage').text('Contraseñas menor a 6 caracteres')
            upErrorMessage()
        } else if (valInputRec === '' || valInputRec === undefined || valInputRec === null) {
            $('[name="confirmUpPass"]').addClass('error')
            $('[name="confirmUpPass"] + .errorMessage').text('Campo vacio')
            upErrorMessage()
        } else if (valInputRec !== valInputUp) {
            $('[name="confirmUpPass"]').addClass('error');
            $('[name="confirmUpPass"] + .errorMessage').text('Las contraseñas no coinciden');
            upErrorMessage()
        } else {
            sendUpdatePass(updatePass)
        }
    }


    /* Cambio genero  */
    var validateGenere = function() {
        if ($('.registryModule, .registryFamilyModule').length === 1) {
            generoLS = getStorage64('registryGender')
                //console.log('LS: '+generoLS)
            if (generoLS === 'f') {
                //console.log('Female')
                $('.FormMiddle .pregnantHide').removeClass('hidden')
            } else {
                //console.log('Man')
                $('.FormMiddle .pregnantHide').addClass('hidden')
            }

            $('body').on('change', '.genereType', function() {
                var genero = $('.genereType [name="genderReg"]:checked').val()
                    //console.log('change: '+genero)

                if (genero === 'f') {
                    //console.log('Female')
                    $('.FormMiddle .pregnantHide').removeClass('hidden')
                    setStorage64('registryGender', 'f')
                } else {
                    //console.log('Man')
                    $('.FormMiddle .pregnantHide').addClass('hidden')
                    setStorage64('registryGender', 'm')
                }
            })
        }
    }()

    /* Listo datos Enfermedades  */
    var valideArrayDiseases = function() {
            if ($('.registryModule, .registryFamilyModule, .FormSimptomps').length === 1) {
                var source = []
                setStorage64('arrayDiseases', source)
                $('body').on('change', '.arrayDiseases input, .pregnantType input', function() {
                    //debugger
                    var $this = $(this)
                    let valueSel = $this.attr('value')
                    $('.arrayDiseases').removeClass('error')


                    if ($this.attr('name') === 'ninguna') {
                        $('.arrayDiseases [type="checkbox"]').not('[name="ninguna"]').prop('checked', false)
                        source = []
                        setStorage64('arrayDiseases', source)
                            // console.log( '------1------')
                            // console.log( getStorage64('arrayDiseases') )
                        return source
                    } else {
                        if ($this.parent().parent().hasClass('arrayDiseases')) {
                            //console.log('arrayDiseases')
                            $('.arrayDiseases [name="ninguna"]').prop('checked', false)
                            source = []
                            $('.arrayDiseases [type="checkbox"]:checked').each(function() {
                                var $this = $(this)
                                source.push(Number($this.attr('value')))
                            })
                            setStorage64('arrayDiseases', source)
                                // console.log( '------2------')
                                // console.log( getStorage64('arrayDiseases') )
                            return source
                        } else if ($this.parent().parent().hasClass('pregnantType')) {
                            //console.log('pregnantType')
                            source = []
                            $('.arrayDiseases [type="checkbox"]:checked').each(function() {
                                var $this = $(this)
                                source.push(Number($this.attr('value')))
                            })
                            if (source.indexOf(0) >= 0) {
                                source.sort(function(a, b) { return a - b })
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
    var valideArraySymptoms = function() {
        if ($('.monitoringModule').length === 1) {
            var source = []
            setStorage64('arraySymptoms', source)
            $('body').on('change', '.arraySymptoms input', function() {
                //debugger
                var $this = $(this)
                let valueSel = $this.attr('value')
                $('.arraySymptoms').removeClass('error')

                if ($this.attr('name') === 'sintomaNinguna') {
                    $('.arraySymptoms [type="checkbox"]').not('[name="sintomaNinguna"]').prop('checked', false)
                    source = []
                    setStorage64('arraySymptoms', source)
                    setStorage64('sintomaNinguna', 'true')
                        //console.log('asdT'+getStorage64('sintomaNinguna'))
                    validateDateSymptoms()
                    return source
                } else {
                    $('.arraySymptoms [name="sintomaNinguna"]').prop('checked', false)
                    source = []
                    $('.arraySymptoms [type="checkbox"]:checked').each(function() {
                        var $this = $(this)
                        source.push(Number($this.attr('value')))
                    })
                    setStorage64('arraySymptoms', source)
                    setStorage64('sintomaNinguna', 'false')
                        //console.log('asdasdF'+getStorage64('sintomaNinguna'))
                    validateDateSymptoms()
                    return source
                }
            })
        }
    }()

    var validateDateSymptoms = function() {
        var temp = $('[name=selecTemp]').val()
        var problem = $('.problemsBreathe [name="breatheProblem"]:checked').val()
        var sintom = $('.arraySymptoms [name=sintomaNinguna]').prop('checked')
        var probVac = $('.problemsBreathe [type=radio]:checked').length
        var sinVac = $('.arraySymptoms input[type="checkbox"]:checked').length

        if (Number(temp) <= 37.9 && (Number(problem) === 8 || Number(probVac) === 0) && (sintom === true || Number(sinVac) === 0)) {
            $('.firstDateSymptoms').addClass('hidden')
            $('[name="dateFirstSymptom"]').val('')
        } else {
            $('.firstDateSymptoms').removeClass('hidden')
        }
    }
    var executeDateSymptom = function() {
        setTimeout(function() {
            validateDateSymptoms()
        }, 700)
        $('.card.monitoring').on('change', function() {
            validateDateSymptoms()
        })
    }()
    var validateQuarantine = function() {
        $('.isolation .btn.secundario').on('click', function() {
            var $this = $(this)
            var typeButton = $this.html()

            $('.isolation .btn.secundario').removeClass('active')
            $this.addClass('active')


            if (typeButton === 'Si') {
                setStorage64('ifQuarantine', 'yes')
                $('.contMonitoringIsolation').removeClass('hidden')
            } else if (typeButton === 'No') {
                setStorage64('ifQuarantine', 'no')
                $('.contMonitoringIsolation').addClass('hidden')
                $('.contMonitoringIsolation select').prop('selectedIndex', 0)
                $('.contMonitoringIsolation input[type="radio"]').prop('checked', false)
                $('.contMonitoringIsolation input[type="date"]').val('')
            }
        })
    }()


    /* Data success Family */
    var sendFamilyData = function() {
            addLoader('false')
            upTop()
            redirectUrl('familyRegistry')
            request202()
        }
        /* Data success registro */
    var sendUserData = function() {
        addLoader('false')
        var Registry = getStorage64('registryFormFirst')
        console.log("registro token", Registry.tokenGroup)
        var tokenRegistry = Registry.tokenGroup
        axiosCatGroup(tokenRegistry)
        upTop()
        $('.registryModule .form.FormFirst').addClass('hidden')
        $('.registryModule .form.FormMiddle').removeClass('hidden')
        request202()
    }
    var sendUserFamilyData = function() {
        addLoader('false')
        upTop()
        $('.registryFamilyModule .form.FormFirst').addClass('hidden')
        $('.registryFamilyModule .form.FormMiddle').removeClass('hidden')

        request202()
    }
    var sendDiseasesData = function() {
        addLoader('false')
        upTop()
        $('.registryModule .form.FormMiddle').addClass('hidden')
        $('.registryModule .form.FormMiddleIMC').removeClass('hidden')
        $('.registryFamilyModule .form.FormMiddle').addClass('hidden')
        $('.registryFamilyModule .form.FormMiddle .headCard').removeClass('hidden')
        $('.registryFamilyModule .form.FormMiddleIMC').removeClass('hidden')
        request202()
    }
    var updateDiseasesData = function() {
        //console.log('click en diseases update')
        setTimeout(function() {
            upTop()
            addLoader('false')
            redirectUrl('clinicalProfile')
        }, 500)
    }
    var sendIMCData = function() {
        addLoader('false')
        upTop()
        $('.registryModule .form.FormMiddleIMC').addClass('hidden')
        $('.registryModule .form.FormLast').removeClass('hidden')
        $('.registryFamilyModule .form.FormMiddleIMC').addClass('hidden')
        $('.registryFamilyModule .form.FormLast').removeClass('hidden')
        request202()
    }
    var updateIMCData = function() {
        setTimeout(function() {
            upTop()
            addLoader('false')
            redirectUrl('clinicalProfile')
        }, 500)
    }
    var sendCompanyData = function() {
        addLoader('false')
        request202()
        location.href = 'monitoring.html'
    }
    var emaiInUse = function() {
        $('.registryModule .form.FormFirst').removeClass('hidden')
        $('.registryModule .form.FormLast').addClass('hidden')
        errorInputNotify('emailReg', warningMessages[9])
        toast(warningMessages[9])
        addLoader('false')
    }
    var sessionTimeOut = function() {
        toast(warningMessages[10])
            //toast('Tu sesión ha expirado.')
    }
    var sintomasSuccess = function() {
        addLoader('false')
        upupTop()
        request202()
            /* console.log('axiosSymptoms'); */
    }


    /*  Funcion de errores */
    var errorInputNotify = function(name, text) {
        $('[name="' + name + '"]').addClass('error')
        $('[name="' + name + '"] + .errorMessage').text(text)
        upErrorMessage()
    }
    var errorRadioNotify = function(name, text) {
        $('.' + name).addClass('error')
        $('.' + name + ' + .errorMessage').text(text)
        upErrorMessage()
    }
    var errorSelectNotify = function(name, text) {
        $('[name="' + name + '"]').parent().addClass('error')
        $('[name="' + name + '"]').parent().next().text(text)
        upErrorMessage()
    }


    var validateVivienda = function(e) {
        e.preventDefault()

        let valInputViviendaValidate = $('.viviendaType input:radio[name="vivienda"]:checked').length
        let valInputposiblesValidate = $('.posiblesType input:radio[name="posibles"]:checked').length
        let valInputprofesionValidate = $('.posiblesType input:radio[name="posibles"]:checked').val()
        let valInputprofesionReg = $('#profesionReg').val()
        let valInputsospechosoValidate = $('.sospechosoType input:radio[name="casoSospechoso"]:checked').length
        let valInputlavadoFrecValidate = $('.lavadoManos input:radio[name="lavadoManos"]:checked').length
        let valInputDesinfectarFrecValidate = $('.desinfectarFrec input:radio[name="desinfectarCasa"]:checked').length
        if (valInputViviendaValidate === 0) {
            errorRadioNotify('viviendaType', warningMessages[2])
            upErrorMessage()
                //$('.viviendaType').animate({scrollTop : 0},200)
            $('#1')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("no paso validacion vivienda")
        } else if (valInputposiblesValidate === 0) {

            errorRadioNotify('posiblesType', warningMessages[2])
            upErrorMessage()
            $('#2')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("no paso validacion personas")
        } else if (valInputprofesionValidate === "3" && valInputprofesionReg === '' || valInputprofesionReg === undefined || valInputprofesionReg === null) {
            errorInputNotify('profesionReg', warningMessages[0])
            upErrorMessage()
            $('#3')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                // errorRadioNotify('viviendaType', warningMessages[2])
                // toast(warningMessages[2])
                //alert("no paso validacion")
        } else if (valInputsospechosoValidate === 0) {

            errorRadioNotify('sospechosoType', warningMessages[2])
            upErrorMessage()
            $('#4')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("no paso validacion personas")
        } else if (valInputlavadoFrecValidate === 0) {
            errorRadioNotify('lavadoManos', warningMessages[2])
            upErrorMessage()
            $('#5')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("no paso validacion personas")
        } else if (valInputDesinfectarFrecValidate === 0) {
            errorRadioNotify('desinfectarFrec', warningMessages[2])
            upErrorMessage()
            $('#6')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
        } else {
            //alert("paso validacion")

            //setStorage64('liveInHouse', valInputFamilar)
            //sendEvalueFamily(dataValidateFamily, valInputId)
            changeViewVivienda()

        }
    }
    var validateTrabajo = function(e) {
        e.preventDefault()

        let valInputInstalacionesValidate = $('.actividadType input:radio[name="instalaciones"]:checked').val()
        let valInputInstalacionesValidateNum = $('.actividadType input:radio[name="instalaciones"]:checked').length
        let valInputInstalacionesInnerValidate = $('.propiasType input:radio[name="instalacionesInner"]:checked').length
        let valInputTemporalValidate = $('.temporalType  input:radio[name="temporalSite"]:checked').length
        let valInputinstaReg = $('#instaReg').val()
        let valInputCP = $('[name="codigoPostalReg"]').val()
        let valInputLaboralValidate = $('.actividadLaboralType  input:radio[name="actividadLaboral"]:checked').length
        let valInputClienteValidate = $('.propiasType  input:radio[name="instalacionesInner"]:checked').val()
        let valInputSupervisorValidate = $('.supervisorType  input:radio[name="supervisorRH"]:checked').val()
        let valInputSupervisorValidateNum = $('.supervisorType  input:radio[name="supervisorRH"]:checked').length
        let valInputSupervisorReg = $('#supervisorReg').val()
        let valInputClienteReg = $('#instalacionesClienteReg').val() //$('[name="supervisorReg"]').val()

        if (valInputInstalacionesValidateNum === 0) {
            errorRadioNotify('actividadType', warningMessages[2])
            upErrorMessage()
            $('#7')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                // errorRadioNotify('viviendaType', warningMessages[2])
                // toast(warningMessages[2])
                //alert("no paso validacion")
        } else if (valInputInstalacionesValidate === "12" && valInputInstalacionesInnerValidate === 0) {
            errorRadioNotify('propiaType', warningMessages[2])
            upErrorMessage()
            $('#7')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                // errorRadioNotify('viviendaType', warningMessages[2])
                // toast(warningMessages[2])
                //alert("no paso validacion")
        } else if (valInputInstalacionesValidate === "21" && valInputinstaReg === '' || valInputinstaReg === undefined || valInputinstaReg === null) {
            errorInputNotify('instaReg', warningMessages[0])
            upErrorMessage()
            $('#10')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                // errorRadioNotify('viviendaType', warningMessages[2])
                // toast(warningMessages[2])
                //alert("no paso validacion")
        } else if (valInputClienteValidate === "20" && valInputClienteReg === '' || valInputClienteReg === undefined || valInputClienteReg === null) {
            errorInputNotify('instalacionesClienteReg', warningMessages[0])
            upErrorMessage()
            $('#9')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("nopasolavalidacion")
        } else if (valInputTemporalValidate === 0) {
            errorRadioNotify('temporalType', warningMessages[2])
            upErrorMessage()
            $('#11')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')

        } else if (valInputCP === '' || valInputCP === undefined || valInputCP === null) {
            errorInputNotify('codigoPostalReg', warningMessages[0])
            upErrorMessage()
            $('.temporalType')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
        } else if (!validateNumber(valInputCP)) {
            errorInputNotify('codigoPostalReg', warningMessages[8])
            upErrorMessage()
            $('#12')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
        } else if (valInputCP.length !== 5) {
            errorInputNotify('codigoPostalReg', warningMessages[5])
            upErrorMessage()
            $('#12')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
        } else if (valInputLaboralValidate === 0) {
            errorRadioNotify('actividadLaboralType', warningMessages[2])
            upErrorMessage()
            $('#13')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
        } else if (valInputSupervisorValidateNum === 0) {
            errorRadioNotify('supervisorType', warningMessages[2])
            upErrorMessage()
            $('.supervisorType')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                // errorRadioNotify('viviendaType', warningMessages[2])
                // toast(warningMessages[2])
                //alert("no paso validacion")
        } else if (valInputSupervisorValidate === "32" && valInputSupervisorReg === '' || valInputSupervisorReg === undefined || valInputSupervisorReg === null) {
            errorInputNotify('supervisorReg', warningMessages[0])
            upErrorMessage()
            $('#14')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("nopasolavalidacion")

        } else {
            //alert("paso validacion")

            //setStorage64('liveInHouse', valInputFamilar)
            //sendEvalueFamily(dataValidateFamily, valInputId)
            changeViewTrabajo()

        }
    }

    var validateMovilidad = function(e) {
        e.preventDefault()

        let valInputVehiculoValidate = $('.vehType input:radio[name="transporte"]:checked').val()
        let valInputVehiculoValidateNum = $('.vehType input:radio[name="transporte"]:checked').length
        let valInputTiempoValidate = $('.tiempoType  input:radio[name="transporteTiempo"]:checked').length
        let valInputPublics = $('.pubType [type="checkbox"]:checked').length
        let valInputVehiculoReg = $('.partType  input:radio[name="vehiculoComp"]:checked').length

        if (valInputVehiculoValidateNum === 0) {
            errorRadioNotify('vehType', warningMessages[2])
            upErrorMessage()
            $('#16')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("no paso validacion")
                // errorRadioNotify('viviendaType', warningMessages[2])
                // toast(warningMessages[2])
        } else if (valInputVehiculoValidate === '33' && valInputVehiculoReg === 0) {
            errorRadioNotify('shareType ', warningMessages[2])
            upErrorMessage()
            $('#16')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("no paso validacion")

        } else if (valInputVehiculoValidate === '40' && valInputPublics == 0) {
            errorRadioNotify('pubType', warningMessages[2])
            upErrorMessage()
            $('#18')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("no paso validacion")
        } else if (valInputTiempoValidate === 0) {
            errorRadioNotify('tiempoType', warningMessages[2])
            upErrorMessage()
            $('#19')[0].scrollIntoView(true);
            $('.modalAlert').addClass('active')
                //alert("no paso validacion")			
                // else if(valInputVehiculoValidate === "valueShowTwice1" && valInputInstalacionesInnerValidate === 0){
                // 	errorRadioNotify('propiasType', warningMessages[2])
                // 	upErrorMessage()
                // 	$('.lavadoType')[0].scrollIntoView(true);
                // 	// errorRadioNotify('viviendaType', warningMessages[2])
                // 	// toast(warningMessages[2])
                // 	alert("no paso validacion")
                // }else if (valInputTemporalValidate === 0){
                // 	errorRadioNotify('temporalType', warningMessages[2])
                // 	upErrorMessage()
                // 	$('.temporalType')[0].scrollIntoView(true);
                // }	else if(valInputCP === '' || valInputCP === undefined  || valInputCP === null ){
                // 	errorInputNotify('codigoPostalReg', warningMessages[0])
                // 	upErrorMessage()
                // 	$('.temporalType')[0].scrollIntoView(true);
                // }
                // else if(!validateNumber(valInputCP)){
                // 	errorInputNotify('codigoPostalReg', warningMessages[8])
                // 	upErrorMessage()
                // 	$('.temporalType')[0].scrollIntoView(true);
                // }
                // else if(valInputCP.length !== 5){
                // 	errorInputNotify('codigoPostalReg', warningMessages[5])
                // 	upErrorMessage()
                // 	$('.temporalType')[0].scrollIntoView(true);
                // }else if (valInputLaboralValidate === 0){
                // 	errorRadioNotify('actividadLaboralType', warningMessages[2])
                // 	upErrorMessage()
                // 	$('.actividadLaboralType')[0].scrollIntoView(true);
                // }else if(valInputSupervisorValidateNum === 0){
                // 	errorRadioNotify('supervisorType', warningMessages[2])
                // 	upErrorMessage()
                // 	$('.supervisorType')[0].scrollIntoView(true);
                // errorRadioNotify('viviendaType', warningMessages[2])
                // toast(warningMessages[2])

            // }else if (valInputSupervisorValidate === "2" && valInputSupervisorReg === '' || valInputSupervisorReg === undefined  || valInputSupervisorReg === null){
            // 	errorRadioNotify('supervisorName', warningMessages[2])
            // 	upErrorMessage()
            // 	$('.supervisorName')[0].scrollIntoView(true);
            // 	alert("nopasolavalidacion")
            // }
        } else {
            //alert("paso validacion")

            //setStorage64('liveInHouse', valInputFamilar)
            //sendEvalueFamily(dataValidateFamily, valInputId)
            changeViewMovilidad()
            validateResponsePoll()

        }
    }

    var validateAccessFamily = function() {
        let valInputId = $('[name="idSeguimiento"]').val()
        let valInputEmail = $('[name="emailFamily"]').val()
        let valInputRelation = $('[name="familyRelationship"]').val()
        let valInputFamilar = $('.familiarType [name="familiarReg"]:checked').val()
        let valInputFamiliarValidate = $('.familiarType input:radio[name="familiarReg"]:checked').length


        var loginIn = getStorage64('userLoginSession')
        let dataValidateFamily = {
            "email": valInputEmail,
            "id": Number(valInputId),
            "type": loginIn == "true" ? 1 : Number(valInputFamilar),
            "relatives_id": Number(valInputRelation),
        }
        if (valInputId === '' || valInputId === undefined || valInputId === null) {
            errorInputNotify('idSeguimiento', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateNumber(valInputId)) {
            errorInputNotify('idSeguimiento', warningMessages[8])
            toast(warningMessages[8])
        } else if (valInputEmail === '' || valInputEmail === undefined || valInputEmail === null) {
            errorInputNotify('emailFamily', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateEmail(valInputEmail)) {
            errorInputNotify('emailFamily', warningMessages[3])
            toast(warningMessages[3])
        } else if (valInputRelation === '' || valInputRelation === undefined || valInputRelation === null) {
            if (valInputRelation === '' || valInputRelation === undefined || valInputRelation === null) {
                errorSelectNotify('familyRelationship', warningMessages[0])
                toast(warningMessages[0])
            }
        } else if (valInputFamiliarValidate === 0 || valInputFamilar === undefined) {

            errorRadioNotify('familiarType', warningMessages[2])
            toast(warningMessages[2])
        } else {
            setStorage64('liveInHouse', valInputFamilar)
            sendEvalueFamily(dataValidateFamily, valInputId)
        }
    }

    var validateResponsePoll = function() {
        let valInputvivienda = $('[name="vivienda"]:checked').val() //1
        let valInputPosible = $('[name="posibles"]:checked').val() //2
        let valInputprofesionReg = $('[name="profesionReg"]').val() //3
        let valInputSospechoso = $('[name="casoSospechoso"]:checked').val() //4
        let valInputLavado = $('[name="lavadoManos"]:checked').val() //5
        let valInputFamilarLavado = $('[name="desinfectarCasa"]:checked').val() //6

        let valInputInstalaciones = $('[name="instalaciones"]:checked').val() //7
        let valInputInstalacionesInner = $('[name="instalacionesInner"]:checked').val() //8
        let valInputInstalacionesCliente = $('[name="instalacionesClienteReg"]').val() //9
        let valInputInstaReg = $('[name="instaReg"]').val() //10
        let valInputTemporalSite = $('[name="temporalSite"]:checked').val() //11
        let valInputcodigoPostalReg = $('[name="codigoPostalReg"]').val() //12
        let valInputActividadLaboral = $('[name="actividadLaboral"]:checked').val() //13
        let valInputSupervisor = $('[name="supervisorRH"]:checked').val() //14
        let valInputSupervisoSrReg = $('[name="supervisorReg"]').val() //15

        let valInputTransporte = $('[name="transporte"]:checked').val() //16
        let valInputVehiculoComp = $('[name="vehiculoComp"]:checked').val() //17
        let valInputtransporteLista = $('[name="transporteLista"]:checked').val() //18
        let valInputtransporteListb = $('[name="transporteListb"]:checked').val() //18
        let valInputtransporteListc = $('[name="transporteListc"]:checked').val() //18
        let valInputtransporteListd = $('[name="transporteListd"]:checked').val() //18
        let valInputtransporteListe = $('[name="transporteListe"]:checked').val() //18
        let valInputTransporteTiempo = $('[name="transporteTiempo"]:checked').val() //19	


        // $('[name="vivienda"]:checked').val() //1
        // $('[name="posibles"]:checked').val() //2
        // $('[name="profesionReg"]').val() //3
        // $('[name="casoSospechoso"]:checked').val() //4
        // $('[name="lavadoManos"]:checked').val() //5
        // $('[name="desinfectarCasa"]:checked').val() //6

        // $('[name="instalaciones"]:checked').val() //7
        // // $('[name="instalacionesInner"]:checked').val() //8 
        // // $('[name="instalacionesClienteReg"]').val() //9
        // // $('[name="instaReg"]').val() //10
        // $('[name="temporalSite"]:checked').val() //11
        // $('[name="codigoPostalReg"]').val() //12
        // $('[name="actividadLaboral"]:checked').val() //13
        // $('[name="supervisorRH"]:checked').val() //14
        // // $('[name="supervisorReg"]').val() //15

        // $('[name="transporte"]:checked').val() //16
        // // $('[name="vehiculoComp"]:checked').val() //17
        // // $('[name="transporteLista"]:checked').val() //18
        // $('[name="transporteTiempo"]:checked').val() //19	
        if (valInputprofesionReg === undefined || valInputprofesionReg === null || valInputprofesionReg === '') {
            var valrequiredprofesion = false;
        } else {
            var valrequiredprofesion = true;
        }
        if (valInputInstalacionesInner === undefined || valInputInstalacionesInner === null || valInputInstalacionesInner === '') {
            var valrequiredinstalaciones = false;
        } else {
            var valrequiredinstalaciones = true;
        }
        if (valInputInstalacionesCliente === undefined || valInputInstalacionesCliente === null || valInputInstalacionesCliente === '') {
            var valrequiredinstalacionesC = false;
        } else {
            var valrequiredinstalacionesC = true;
        }
        if (valInputInstaReg === undefined || valInputInstaReg === null || valInputInstaReg === '') {
            var valrequiredinstareg = false;
        } else {
            var valrequiredinstareg = true;
        }
        if (valInputSupervisoSrReg === undefined || valInputSupervisoSrReg === null || valInputSupervisoSrReg === '') {
            var valrequiredsupervisor = false;
        } else {
            var valrequiredsupervisor = true;
        }

        if (valInputVehiculoComp === undefined || valInputVehiculoComp === null || valInputVehiculoComp === '') {
            var valrequiredvehiculo = false;
        } else {
            var valrequiredvehiculo = true;
        }

        if (valInputtransporteLista === undefined || valInputtransporteLista === null || valInputtransporteLista === '' &&
            valInputtransporteListb === undefined || valInputtransporteListb === null || valInputtransporteListb === '' &&
            valInputtransporteListc === undefined || valInputtransporteListc === null || valInputtransporteListc === '' &&
            valInputtransporteListd === undefined || valInputtransporteListd === null || valInputtransporteListd === '' &&
            valInputtransporteListe === undefined || valInputtransporteListe === null || valInputtransporteListe === '') {
            var valrequiredtransporteL = false;
        } else {
            var valrequiredtransporteL = true;
        }
        let dataAnswers =
            '[\n\
					{\n\
					  "question_id": 1,\n\
					  "answer": {\n\
						"type": "SELECT",\n\
						"answer": "' + valInputvivienda + '",\n\
						"required": "true"\n\
					  }\n\
					},\n\
					{\n\
					  "question_id": 2,\n\
					  "answer": {\n\
						"type": "SELECT",\n\
						"answer": "' + valInputPosible + '",\n\
						"required": "true"\n\
					  }\n\
					},\n\
					{\n\
						"question_id": 3,\n\
						"answer": {\n\
						  "type": "OPEN",\n\
						  "answer": "' + valInputprofesionReg + '",\n\
						  "required": "' + valrequiredprofesion + '"\n\
						}\n\
					  },\n\
					{\n\
					  "question_id": 4,\n\
					  "answer": {\n\
						"type": "SELECT",\n\
						"answer": "' + valInputSospechoso + '",\n\
						"required": "true"\n\
					  }\n\
					},\n\
					{\n\
					  "question_id": 5,\n\
					  "answer": {\n\
						"type": "SELECT",\n\
						"answer": "' + valInputLavado + '",\n\
						"required": "true"\n\
					  }\n\
					},\n\
					{\n\
						"question_id": 6,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputFamilarLavado + '",\n\
						  "required": "true"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 7,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputInstalaciones + '",\n\
						  "required": "true"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 8,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputInstalacionesInner + '",\n\
						  "required": "' + valrequiredinstalaciones + '"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 9,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputInstalacionesCliente + '",\n\
						  "required": "' + valrequiredinstalacionesC + '"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 10,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputInstaReg + '",\n\
						  "required": "' + valrequiredinstareg + '"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 11,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputTemporalSite + '",\n\
						  "required": "true"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 12,\n\
						"answer": {\n\
						  "type": "OPEN",\n\
						  "answer": "' + valInputcodigoPostalReg + '",\n\
						  "required": "true"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 13,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputActividadLaboral + '",\n\
						  "required": "true"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 14,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputSupervisor + '",\n\
						  "required": "true"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 15,\n\
						"answer": {\n\
						  "type": "OPEN",\n\
						  "answer": "' + valInputSupervisoSrReg + '",\n\
						  "required": "' + valrequiredsupervisor + '"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 16,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputTransporte + '",\n\
						  "required": "true"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 17,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputVehiculoComp + '",\n\
						  "required": "' + valrequiredvehiculo + '"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 18,\n\
						"answer": {\n\
						  "type": "MULTISELECT",\n\
						  "answer": "' + valInputtransporteLista + ',' + valInputtransporteListb + ',' + valInputtransporteListc + ',' + valInputtransporteListd + ',' + valInputtransporteListe + '",\n\
						  "required": "' + valrequiredtransporteL + '"\n\
						}\n\
					  },\n\
					  {\n\
						"question_id": 19,\n\
						"answer": {\n\
						  "type": "SELECT",\n\
						  "answer": "' + valInputTransporteTiempo + '",\n\
						  "required": "true"\n\
						}\n\
					  }\n\
				  ]';
        console.log("answers", dataAnswers)
        sendValuesPoll(dataAnswers)
    }


    /* listo datos registro */
    var validateRegistryFormFirstF = function() {
        let familiar_ID = getStorage64('userRedisParentT')
            //console.log('familiar token: '+familiar_ID)
        let valInputToken = $('[name="tokenReg"]').val()

        let valInputEmail = $('[name="emailReg"]').val()
        let valInputPass = $('[name="passwordReg"]').val()
        let valInputName = $('[name="nombreReg"]').val()
        let valInputPaternal = $('[name="apelldoPaternoReg"]').val()
        let valInputMaternal = $('[name="apellidoMaternoReg"]').val()
        let valInputCP = $('[name="codigoPostalReg"]').val()
        var valInputBirthday = $('[name="fechaNacimientoReg"]').val()
        if (valInputBirthday.length > 1) {
            valInputBirthday = returnFormatDateSub($('[name="fechaNacimientoReg"]').val())
        }
        let valInputGender = $('.genereType [name="genderReg"]:checked').val()
        let valInputGenderValidate = $('.genereType [name="genderReg"]:checked').length
        let valInputConditions = $('.contCheckRadio [name="aviso-privacidad"]:checked').length
        if (valInputEmail === '' || valInputEmail === undefined || valInputEmail === null) {
            errorInputNotify('emailReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateEmail(valInputEmail)) {
            errorInputNotify('emailReg', warningMessages[3])
            toast(warningMessages[3])
        } else if (valInputPass === '' || valInputPass === undefined || valInputPass === null) {
            errorInputNotify('passwordReg', warningMessages[0])
            toast(warningMessages[0])
            upErrorMessage()
        } else if (valInputPass.length <= 5) {
            errorInputNotify('passwordReg', warningMessages[4])
            toast(warningMessages[4])
        } else if (valInputName === '' || valInputName === undefined || valInputName === null) {
            errorInputNotify('nombreReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (valInputPaternal === '' || valInputPaternal === undefined || valInputPaternal === null) {
            errorInputNotify('apelldoPaternoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (valInputMaternal === '' || valInputMaternal === undefined || valInputMaternal === null) {
            errorInputNotify('apellidoMaternoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (valInputCP === '' || valInputCP === undefined || valInputCP === null) {
            errorInputNotify('codigoPostalReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateNumber(valInputCP)) {
            errorInputNotify('codigoPostalReg', warningMessages[8])
            toast(warningMessages[8])
        } else if (valInputCP.length !== 5) {
            errorInputNotify('codigoPostalReg', warningMessages[5])
            toast(warningMessages[5])
        } else if (valInputBirthday === '' || valInputBirthday === undefined || valInputBirthday === null) {
            errorInputNotify('fechaNacimientoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateTypeDate(valInputBirthday)) {
            errorInputNotify('fechaNacimientoReg', warningMessages[7])
            toast(warningMessages[7])
        } else if (valInputBirthday.length !== 10) {
            errorInputNotify('fechaNacimientoReg', warningMessages[7])
            toast(warningMessages[7])
        } else if (valInputGenderValidate === 0) {
            errorRadioNotify('genereType', warningMessages[2])
            toast(warningMessages[2])
        } else if (valInputConditions === 0) {
            errorRadioNotify('fieldDouble', warningMessages[20])
            toast(warningMessages[20])
        }
        // else if(valInputDiseases === 0){
        // 	errorRadioNotify('arrayDiseases', warningMessages[2])
        // 	toast(warningMessages[2])
        // }
        else {
            let valTypeFamiliar = getStorage64('liveInHouse')
            if (familiar_ID.length >= 10) {
                let dataRegistryUser = {
                    "name": valInputName,
                    "paternal": valInputPaternal,
                    "maternal": valInputMaternal,
                    "email": valInputEmail,
                    "cp": String(valInputCP),
                    "gender": valInputGender,
                    "birthdate": valInputBirthday,
                    "type": valTypeFamiliar,
                    "password": valInputPass,
                    "source": "3",
                    "tokenGroup": null
                }
                setStorage64('registryFormFirst', dataRegistryUser)
                setStorage64('registryGender', valInputGender)
                    //console.log('familiar')
                sendRegistryFamilyFirst(dataRegistryUser)
            } else {
                let dataRegistryUser = {
                    "name": valInputName,
                    "paternal": valInputPaternal,
                    "maternal": valInputMaternal,
                    "email": valInputEmail,
                    "cp": String(valInputCP),
                    "gender": valInputGender,
                    "birthdate": valInputBirthday,
                    "type": "1",
                    "employ_id": valInputEmp,
                    "password": valInputPass,
                    "source": "3",
                    "tokenGroup": null
                }
                setStorage64('registryFormFirst', dataRegistryUser)
                setStorage64('registryGender', valInputGender)
                    //console.log('normal')
                sendRegistryFirst(dataRegistryUser)
            }

        }
        //console.log(getStorage64('registryFormFirst') )
    }

    var validateRegistryFormFirst = function() {
        let familiar_ID = getStorage64('userRedisParentT')
            //console.log('familiar token: '+familiar_ID)
        let valInputToken = $('[name="tokenReg"]').val()
        let valInputEmp = $('[name="idEmpleadoReg"]').val()
        let valInputEmail = $('[name="emailReg"]').val()
        let valInputPass = $('[name="passwordReg"]').val()
        let valInputName = $('[name="nombreReg"]').val()
        let valInputPaternal = $('[name="apelldoPaternoReg"]').val()
        let valInputMaternal = $('[name="apellidoMaternoReg"]').val()
        let valInputCP = $('[name="codigoPostalReg"]').val()
        var valInputBirthday = $('[name="fechaNacimientoReg"]').val()
        if (valInputBirthday.length > 1) {
            valInputBirthday = returnFormatDateSub($('[name="fechaNacimientoReg"]').val())
        }
        let valInputGender = $('.genereType [name="genderReg"]:checked').val()
        let valInputGenderValidate = $('.genereType [name="genderReg"]:checked').length
        let valInputConditions = $('.contCheckRadio [name="aviso-privacidad"]:checked').length
        if (valInputToken === '' || valInputToken === undefined || valInputToken === null) {
            errorInputNotify('tokenReg', warningMessages[21])
            toast(warningMessages[21])
        } else if (valInputEmail === '' || valInputEmail === undefined || valInputEmail === null) {
            errorInputNotify('emailReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateEmail(valInputEmail)) {
            errorInputNotify('emailReg', warningMessages[3])
            toast(warningMessages[3])
        } else if (valInputEmp === '' || valInputEmp === undefined || valInputEmp === null) {
            errorInputNotify('idEmpleadoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (valInputPass === '' || valInputPass === undefined || valInputPass === null) {
            errorInputNotify('passwordReg', warningMessages[0])
            toast(warningMessages[0])
            upErrorMessage()
        } else if (valInputPass.length <= 5) {
            errorInputNotify('passwordReg', warningMessages[4])
            toast(warningMessages[4])
        } else if (valInputName === '' || valInputName === undefined || valInputName === null) {
            errorInputNotify('nombreReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (valInputPaternal === '' || valInputPaternal === undefined || valInputPaternal === null) {
            errorInputNotify('apelldoPaternoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (valInputMaternal === '' || valInputMaternal === undefined || valInputMaternal === null) {
            errorInputNotify('apellidoMaternoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (valInputCP === '' || valInputCP === undefined || valInputCP === null) {
            errorInputNotify('codigoPostalReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateNumber(valInputCP)) {
            errorInputNotify('codigoPostalReg', warningMessages[8])
            toast(warningMessages[8])
        } else if (valInputCP.length !== 5) {
            errorInputNotify('codigoPostalReg', warningMessages[5])
            toast(warningMessages[5])
        } else if (valInputBirthday === '' || valInputBirthday === undefined || valInputBirthday === null) {
            errorInputNotify('fechaNacimientoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateTypeDate(valInputBirthday)) {
            errorInputNotify('fechaNacimientoReg', warningMessages[7])
            toast(warningMessages[7])
        } else if (valInputBirthday.length !== 10) {
            errorInputNotify('fechaNacimientoReg', warningMessages[7])
            toast(warningMessages[7])
        } else if (valInputGenderValidate === 0) {
            errorRadioNotify('genereType', warningMessages[2])
            toast(warningMessages[2])
        } else if (valInputConditions === 0) {
            errorRadioNotify('fieldDouble', warningMessages[20])
            toast(warningMessages[20])
        }
        // else if(valInputDiseases === 0){
        // 	errorRadioNotify('arrayDiseases', warningMessages[2])
        // 	toast(warningMessages[2])
        // }
        else {
            let valTypeFamiliar = getStorage64('liveInHouse')
            if (familiar_ID.length >= 10) {
                let dataRegistryUser = {
                    "name": valInputName,
                    "paternal": valInputPaternal,
                    "maternal": valInputMaternal,
                    "email": valInputEmail,
                    "cp": String(valInputCP),
                    "gender": valInputGender,
                    "birthdate": valInputBirthday,
                    "type": valTypeFamiliar,
                    "password": valInputPass,
                    "source": "3",
                    "tokenGroup": null
                }
                setStorage64('registryFormFirst', dataRegistryUser)
                setStorage64('registryGender', valInputGender)
                    //console.log('familiar')
                sendRegistryFamilyFirst(dataRegistryUser)
            } else {
                let dataRegistryUser = {
                    "name": valInputName,
                    "paternal": valInputPaternal,
                    "maternal": valInputMaternal,
                    "email": valInputEmail,
                    "cp": String(valInputCP),
                    "gender": valInputGender,
                    "birthdate": valInputBirthday,
                    "type": "1",
                    "employ_id": valInputEmp,
                    "password": valInputPass,
                    "source": "3",
                    "tokenGroup": valInputToken
                }
                setStorage64('registryFormFirst', dataRegistryUser)
                setStorage64('registryGender', valInputGender)
                    //console.log('normal')
                sendRegistryFirst(dataRegistryUser)
            }

        }
        //console.log(getStorage64('registryFormFirst') )
    }
    var validateRegistryFormMiddle = function() {
        //debugger
        let valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val()
        let valInputPregnantValidate = $('.pregnantType [name="pregnantReg"]:checked').length
        let valInputDiseases = $('.arrayDiseases [type="checkbox"]:checked').length

        let genero = getStorage64('registryGender')
        let dataRegistryDiseases = getStorage64('arrayDiseases')

        if (genero === 'm') {
            //console.log('sex M')
            valInputPregnant = $('.pregnantType [name="pregnantReg"]:checked').val('')
            if (valInputPregnant !== "no") {
                //debugger
                //console.log('valInputPregnant !== vacio')
                if (valInputDiseases === 0) {
                    errorRadioNotify('arrayDiseases', warningMessages[2])
                    toast(warningMessages[2])
                    dataRegistryDiseases = getStorage64('arrayDiseases')
                } else {
                    //console.log(dataRegistryDiseases)
                    setStorage64('registryFormMiddle', dataRegistryDiseases)
                    sendRegistryMiddle(dataRegistryDiseases)
                }
            }
        }
        if (genero === 'f') {
            //console.log('sexF')
            if (valInputPregnantValidate === 0) {
                //console.log('sexF y preg 0')
                errorRadioNotify('pregnantType', warningMessages[2])
                toast(warningMessages[2])
            } else if (valInputPregnant !== "no") {
                if ($('.pregnantType [name="pregnantReg"]:checked').val() !== undefined && $('.pregnantType [name="pregnantReg"]:checked').val() !== "") {
                    valInputPregnant = parseInt($('.pregnantType [name="pregnantReg"]:checked').val())
                    dataRegistryDiseases.push(valInputPregnant)
                    if (valInputDiseases === 0) {
                        //console.log('pregnantReg  Val YES')
                        errorRadioNotify('arrayDiseases', warningMessages[2])
                        toast(warningMessages[2])
                        dataRegistryDiseases = getStorage64('arrayDiseases')
                    } else {
                        //console.log('todo full YES')
                        //console.log(dataRegistryDiseases)
                        setStorage64('registryFormMiddle', dataRegistryDiseases)
                        sendRegistryMiddle(dataRegistryDiseases)
                    }
                }
            } else if (valInputDiseases === 0) {
                //console.log('pregnantReg  Val NO')
                errorRadioNotify('arrayDiseases', warningMessages[2])
                toast(warningMessages[2])
                dataRegistryDiseases = getStorage64('arrayDiseases')
            } else {
                //console.log('todo full NO')
                //console.log(dataRegistryDiseases)
                setStorage64('registryFormMiddle', dataRegistryDiseases)
                sendRegistryMiddle(dataRegistryDiseases)
            }
        }
    }
    var validateRegistryFormMiddleIMC = function() {
        let valInputImcPesoReg = $('[name="imcPesoReg"]').val()
        let valInputImcAlturaReg = $('[name="imcAlturaReg"]').val()

        if (valInputImcPesoReg === '' || valInputImcPesoReg === undefined || valInputImcPesoReg === null) {
            errorInputNotify('imcPesoReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateFoat(valInputImcPesoReg)) {
            errorInputNotify('imcPesoReg', warningMessages[8])
            toast(warningMessages[8])
        }
        /*
        else if( Number(valInputImcPesoReg)  >= 0  && Number(valInputImcPesoReg)  <= 44 ){
        	errorInputNotify('imcPesoReg', warningMessages[12])
        	toast(warningMessages[12])
        }
        */
        else if (Number(valInputImcPesoReg) <= 0) {
            errorInputNotify('imcPesoReg', warningMessages[12])
            toast(warningMessages[12])
        } else if (Number(valInputImcPesoReg) >= 301) {
            errorInputNotify('imcPesoReg', warningMessages[13])
            toast(warningMessages[13])
        } else if (valInputImcAlturaReg === '' || valInputImcAlturaReg === undefined || valInputImcAlturaReg === null) {
            errorInputNotify('imcAlturaReg', warningMessages[0])
            toast(warningMessages[0])
        } else if (!validateNumber(valInputImcAlturaReg)) {
            errorInputNotify('imcAlturaReg', warningMessages[8])
            toast(warningMessages[8])
        }
        /*
        else if( Number(valInputImcAlturaReg)  >= 0  && Number(valInputImcAlturaReg)  <= 119){
        	errorInputNotify('imcAlturaReg', warningMessages[15])
        	toast(warningMessages[15])
        }
        */
        else if (Number(valInputImcAlturaReg) <= 0) {
            errorInputNotify('imcAlturaReg', warningMessages[15])
            toast(warningMessages[15])
        } else if (Number(valInputImcAlturaReg) >= 211) {
            errorInputNotify('imcAlturaReg', warningMessages[16])
            toast(warningMessages[16])
        } else {
            calculateIMC(Number(valInputImcPesoReg), Number(valInputImcAlturaReg))

            let dataRegistryIMC = {
                "height": Number(valInputImcAlturaReg),
                "weight": Number.parseFloat(valInputImcPesoReg).toFixed(2)
            }

            setStorage64('registryFormMiddleIMC', dataRegistryIMC)

            //console.log(dataRegistryIMC)
            sendRegistryMiddleIMC(dataRegistryIMC)
        }
    }
    var validateRegistryFormLast = function() {
        let familiar_ID = getStorage64('userRedisParentT')
        let valInputGrupo = $('[name="selecGrupoReg"]').attr('id')
        let valInputEmpresa = $('[name="selecEmpresaReg"]').val()
        let valInputArea = $('[name="selecAreaReg"]').val()
        let valInputTelCel = $('[name="telefonoCeluilarReg"]').val()
        let valInputFamiliar = $('[name="nombreFamiliarReg"]').val()
        let valInputTelEmerg = $('[name="telefonoEmergenciaReg"]').val()
        let valInputTelWork = ''

        if (familiar_ID.length >= 10) {

            if (valInputTelCel === '' || valInputTelCel === undefined || valInputTelCel === null) {
                $('[name="telefonoCeluilarReg"]').addClass('error')
                $('[name="telefonoCeluilarReg"] + .errorMessage').text('Campo vacio')
                upErrorMessage()
            } else if (valInputTelCel.length != 10) {
                $('[name="telefonoCeluilarReg"]').addClass('error');
                $('[name="telefonoCeluilarReg"] + .errorMessage').text('El teléfono debe de contar con 10 dígitos');
                upErrorMessage()
            } else if (!validateNumber(valInputTelCel)) {
                $('[name="telefonoCeluilarReg"]').addClass('error');
                $('[name="telefonoCeluilarReg"] + .errorMessage').text('Formato invalido');
                upErrorMessage()
            } else if (valInputFamiliar === '' || valInputFamiliar === undefined || valInputFamiliar === null) {
                $('[name="nombreFamiliarReg"]').addClass('error');
                $('[name="nombreFamiliarReg"] + .errorMessage').text('Campo vacio');
                upErrorMessage()
            } else if (valInputTelEmerg === '' || valInputTelEmerg === undefined || valInputTelEmerg === null) {
                $('[name="telefonoEmergenciaReg"]').addClass('error')
                $('[name="telefonoEmergenciaReg"] + .errorMessage').text('Campo vacio')
                upErrorMessage()
            } else if (!validateNumber(valInputTelEmerg)) {
                $('[name="telefonoEmergenciaReg"]').addClass('error');
                $('[name="telefonoEmergenciaReg"] + .errorMessage').text('Formato invalido');
                upErrorMessage()
            } else if (valInputTelEmerg.length != 10) {
                $('[name="telefonoEmergenciaReg"]').addClass('error');
                $('[name="telefonoEmergenciaReg"] + .errorMessage').text('El teléfono debe de contar con 10 dígitos');
                upErrorMessage()
            } else {
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

        } else {
            if (valInputGrupo === '' || valInputGrupo === undefined || valInputGrupo === null) {
                errorSelectNotify('selecGrupoReg', warningMessages[0])
                toast(warningMessages[0])
            } else if (valInputEmpresa === '' || valInputEmpresa === undefined || valInputEmpresa === null) {
                errorSelectNotify('selecEmpresaReg', warningMessages[0])
                toast(warningMessages[0])
            } else if (valInputArea === '' || valInputArea === undefined || valInputArea === null) {
                $('[name="selecAreaReg"]').parent().addClass('error');
                $('[name="selecAreaReg"] ').parent().next().text('Campo vacio');
                upErrorMessage()
            } else if (valInputTelCel === '' || valInputTelCel === undefined || valInputTelCel === null) {
                $('[name="telefonoCeluilarReg"]').addClass('error')
                $('[name="telefonoCeluilarReg"] + .errorMessage').text('Campo vacio')
                upErrorMessage()
            } else if (valInputTelCel.length != 10) {
                $('[name="telefonoCeluilarReg"]').addClass('error');
                $('[name="telefonoCeluilarReg"] + .errorMessage').text('El teléfono debe de contar con 10 dígitos');
                upErrorMessage()
            } else if (!validateNumber(valInputTelCel)) {
                $('[name="telefonoCeluilarReg"]').addClass('error');
                $('[name="telefonoCeluilarReg"] + .errorMessage').text('Formato invalido');
                upErrorMessage()
            } else if (valInputFamiliar === '' || valInputFamiliar === undefined || valInputFamiliar === null) {
                $('[name="nombreFamiliarReg"]').addClass('error');
                $('[name="nombreFamiliarReg"] + .errorMessage').text('Campo vacio');
                upErrorMessage()
            } else if (valInputTelEmerg === '' || valInputTelEmerg === undefined || valInputTelEmerg === null) {
                $('[name="telefonoEmergenciaReg"]').addClass('error')
                $('[name="telefonoEmergenciaReg"] + .errorMessage').text('Campo vacio')
                upErrorMessage()
            } else if (!validateNumber(valInputTelEmerg)) {
                $('[name="telefonoEmergenciaReg"]').addClass('error');
                $('[name="telefonoEmergenciaReg"] + .errorMessage').text('Formato invalido');
                upErrorMessage()
            } else if (valInputTelEmerg.length !== 10) {
                $('[name="telefonoEmergenciaReg"]').addClass('error');
                $('[name="telefonoEmergenciaReg"] + .errorMessage').text('El teléfono debe de contar con 10 dígitos');
                upErrorMessage()
            } else {
                let dataRegistryCompany = {
                    "group": valInputGrupo,
                    "company": valInputEmpresa,
                    "area": "1",
                    "department": valInputArea,
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
    var validateMonitoringFormFirst = function() {
            //debugger
            // $('.forTwo.isolation .btn.secundario:eq(1)').trigger('click')
            // $('.forTwo.isolation .btn.secundario:eq(0)').trigger('click')
            let valInputTemperatura = $('[name="selecTemp"]').val()
            let valInputOximetry = $('[name="idOximetry"]').val()
            let valInputBreatheProblem = $('[name="breatheProblem"]:checked').val()
            let dataRegistrySymptoms = $('.arraySymptoms [type="checkbox"]:checked').length
            var valInputDateFirstSymptom = $('[name="dateFirstSymptom"]').val()
            if (valInputDateFirstSymptom.length > 1) {
                valInputDateFirstSymptom = returnFormatDateSub($('[name="dateFirstSymptom"]').val())
            }
            var BreatheProblem = getStorage64('arraySymptoms')
            let dataMonitoringUser = {
                    "symptoms": BreatheProblem,
                    "temperature": valInputTemperatura,
                    "oximetry": valInputOximetry,
                    "start_date": valInputDateFirstSymptom,
                    "source": "3"
                }
                //debugger

            if (valInputTemperatura === '' || valInputTemperatura === undefined || valInputTemperatura === null) {
                $('[name="selecTemp"]').parent().addClass('error')
                $('[name="selecTemp"]').parent().next().text('Selecciona una opcion')
                upErrorMessage()
            } else if (valInputBreatheProblem === '' || valInputBreatheProblem === undefined || valInputBreatheProblem === null) {
                $('.problemsBreathe').addClass('error')
                $('.problemsBreathe + .errorMessage').text('No se ha seleccionado ninguna opción')
                upErrorMessage()
            } else if (dataRegistrySymptoms === 0) {
                $('.arraySymptoms').addClass('error')
                $('.arraySymptoms + .errorMessage').text('No se ha seleccionado ninguna opción')
                upErrorMessage()
            } else if ($('.firstDateSymptoms').hasClass('hidden') !== true && ($('[name=dateFirstSymptom]').hasClass('hidden') !== true && $('[name=dateFirstSymptom]').val() === '')) {
                if (valInputDateFirstSymptom === '' || valInputDateFirstSymptom === undefined || valInputDateFirstSymptom === null) {
                    $('[name="dateFirstSymptom"]').addClass('error')
                    $('[name="dateFirstSymptom"] + .errorMessage').text('Campo vacio')
                    upErrorMessage()
                } else if (!validateTypeDate(valInputDateFirstSymptom)) {
                    $('[name="dateFirstSymptom"]').addClass('error')
                    $('[name="dateFirstSymptom"] + .errorMessage').text('El formato debe ser DD-MM-AAAA')
                    upErrorMessage()
                } else if (valInputDateFirstSymptom.length !== 10) {
                    $('[name="dateFirstSymptom"]').addClass('error')
                    $('[name="dateFirstSymptom"] + .errorMessage').text('El formato debe ser DD-MM-AAAA')
                    upErrorMessage()
                }
            } else {


                if (valInputBreatheProblem === "7") {
                    var BreatheProblem = getStorage64('arraySymptoms')
                    console.log('BreatheProblem1 7')
                    console.log(BreatheProblem)
                    let positionA = BreatheProblem.indexOf(7)
                    if (positionA == -1) {
                        BreatheProblem.push(7)
                    }

                    console.log("BreatheProblem2 7 ", BreatheProblem)

                    dataMonitoringUser = {
                        "symptoms": BreatheProblem,
                        "temperature": valInputTemperatura,
                        "oximetry": valInputOximetry,
                        "start_date": valInputDateFirstSymptom,
                        "source": "3"
                    }
                } else if (valInputBreatheProblem === "8") {
                    var BreatheProblem = getStorage64('arraySymptoms')

                    //console.log('BreatheProblem1 8')
                    //console.log(BreatheProblem)

                    let positionA = BreatheProblem.indexOf(7)
                        // No borrar arreglo de síntomas
                    if (positionA !== -1) {
                        BreatheProblem.splice(positionA, 1)
                    }
                    dataMonitoringUser = {
                        "symptoms": BreatheProblem,
                        "temperature": valInputTemperatura,
                        "oximetry": valInputOximetry,
                        "start_date": valInputDateFirstSymptom,
                        "source": "3"
                    }
                }

                if (valInputOximetry != '') {
                    if (!validateNumber(valInputOximetry)) {
                        errorInputNotify('idOximetry', warningMessages[8])
                        toast(warningMessages[8])
                    } else if (Number(valInputOximetry) <= 59) {
                        errorInputNotify('idOximetry', warningMessages[17])
                        toast(warningMessages[17])
                    } else if (Number(valInputOximetry) >= 101) {
                        errorInputNotify('idOximetry', warningMessages[18])
                        toast(warningMessages[18])
                    } else {
                        console.log("first monitor", dataMonitoringUser)
                        setStorage64('monitoringFormFirst', dataMonitoringUser)
                        sendMonitoringFirst(dataMonitoringUser)

                    }

                } else {

                    console.log("monitor", dataMonitoringUser)
                    setStorage64('monitoringFormFirst', dataMonitoringUser)
                    sendMonitoringFirst(dataMonitoringUser)
                }


            }
        }
        // var fillSecondary = function(){
        // 	// var selected = $('#selecGrupoReg').val();
        // 	// axiosCatCompany2(selected)
        // 	var whereIsolation
        // 	var cuarentena = $('[name="whyIsolation"]').val();

    // 	switch(cuarentena) {
    // 	  case "Asisto a mi trabajo de forma habitual":
    // 		//alert("en casa")
    // 		whereIsolation = 1
    // 		break;
    // 	  case "Asisto a mi trabajo de forma intermitente":
    // 		//alert("en casa")
    // 		whereIsolation = 1
    // 		break;
    // 	  default:
    // 		//alert("en hospital")
    // 		whereIsolation = 2
    // 	}
    // 	validateMonitoringFormLast(cuarentena, whereIsolation)

    // }
    // $('#whyIsolation').click(function() {
    // $('#whyIsolation').change(fillSecondary);

    // fillSecondary();
    // });

    var validateMonitoringFormLast = function() {
        var whereIsolation
        var cuarentena = $('[name="whyIsolation"]').val();

        switch (cuarentena) {
            case "Asisto a mi trabajo de forma habitual":
                //alert("en casa")
                whereIsolation = 1
                break;
            case "Asisto a mi trabajo de forma intermitente":
                //alert("en casa")
                whereIsolation = 1
                break;
            default:
                //alert("en hospital")
                whereIsolation = 2
        }
        var btnIsolationActive = 1 //$('.forTwo.isolation .btn.secundario.active').length
        var hayCuarentena = "yes"
        let valInputIsolation = $('[name="isolation"]:checked').val()
        let valInputWhereIsolation = whereIsolation
        let valInputWhyIsolation = cuarentena
        var valInputDateFirstIsolation = $('[name="dateFirstIsolation"]').val()
        var userRegisterRelatives = getStorage64('userRegisterRelatives')
        if (valInputDateFirstIsolation.length > 1) {
            valInputDateFirstIsolation = returnFormatDateSub($('[name="dateFirstIsolation"]').val())
        }
        let dataMonitoringUser = {
            "type": Number(valInputWhereIsolation),
            "reason": valInputWhyIsolation,
            "start_date": valInputDateFirstIsolation,
            "source": "3"
        }

        if (btnIsolationActive >= 1) {
            if (hayCuarentena === 'yes') {
                if (valInputWhereIsolation === '' || valInputWhereIsolation === undefined || valInputWhereIsolation === null) {
                    $('.whereIsolation').addClass('error')
                    $('.whereIsolation + .errorMessage').text('No se ha seleccionado ninguna opción')
                    upErrorMessage()
                } else if (valInputWhyIsolation === '' || valInputWhyIsolation === undefined || valInputWhyIsolation === null) {
                    $('[name="whyIsolation"]').parent().addClass('error')
                    $('[name="whyIsolation"]').parent().next().text('Selecciona una opcion')
                    upErrorMessage()
                }
                // else if(valInputDateFirstIsolation === '' || valInputDateFirstIsolation === undefined  || valInputDateFirstIsolation === null ){
                // 	$('[name="dateFirstIsolation"]').addClass('error')
                // 	$('[name="dateFirstIsolation"] + .errorMessage').text('Campo vacio')
                // 	upErrorMessage()
                // }
                // else if(!validateTypeDate(valInputDateFirstIsolation)){
                // 	$('[name="dateFirstIsolation"]').addClass('error')
                // 	$('[name="dateFirstIsolation"] + .errorMessage').text('El formato debe ser DD-MM-AAAA')
                // 	upErrorMessage()
                // }
                // else if(valInputDateFirstIsolation.length !== 10){
                // 	$('[name="dateFirstIsolation"]').addClass('error')
                // 	$('[name="dateFirstIsolation"] + .errorMessage').text('El formato debe ser DD-MM-AAAA')
                // 	upErrorMessage()
                // }
                else {
                    setStorage64('monitoringFormFirst', dataMonitoringUser)
                    sendMonitoringLast(dataMonitoringUser)
                    $('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass('hidden')
                }
            } else if (hayCuarentena === 'no') {
                var appT = getStorage64('userAppT')
                getStorage64('sintomaNinguna')
                $('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').addClass('hidden')
                var enferm = getStorage64('monitoringFormFirst')

                if (enferm.temperature < 38 && enferm.symptoms.length === 0) {
                    $('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').addClass('hidden')
                } else {
                    $('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass('hidden')
                }
                if (appT.length <= 45 || userRegisterRelatives == "true") {
                    axiosActivate()
                } else {
                    //console.log('no hay cuarentena')
                    /* axiosQuarantineDel() */
                }

                setStorage64('monitoringFormFirst', dataMonitoringUser)
                $('.registryMonitoring .form.FormLast').addClass('hidden')
                setTimeout(function() {
                    redirectUrl('thankYouPage')
                }, 1000);
                // $('.registryMonitoring .card.thanksMonitoringCaseOne').removeClass('hidden')
            }
        } else {
            $('.forTwo.isolation').addClass('error')
            $('.forTwo.isolation + .errorMessage').text('No se ha seleccionado ninguna opción')
            toast('no hay botones seleccionado')
        }
    }



    /* Functiones Send data */
    var sendRecoveryPass = function(email) {
        addLoader()
        axiosPasswords(email)
    }
    var sendUpdatePass = function(tok) {
        addLoader()
        axiosPassUpdate(tok)
    }

    var sendLogin = function(data) {
        var dataActivate = getStorage64('userRedisT')
        var useReddisPending = getStorage64('validateRedisT')
        axiosLogin(data)
    }

    var sendLogout = function() {
        addLoader()
        axiosLogout()
    }
    var sendMyAccount = function() {
        /* console.log('as') */
        if ($('.inicioNavBar.active').length >= 1) {
            return
        } else {
            /* console.log('click My acount') */
            redirectUrl('myAccount')
        }
    }
    var sendInfo = function() {
        /* console.log('asd') */
        if ($('.infoNavBar.active').length >= 1) {
            return
        } else {
            /* console.log('click info') */
            redirectUrl('info')
        }
    }
    var sendUserProfile = function() {
        /* console.log('asd') */
        if ($('.userProfileNavBar.active').length >= 1) {
            return
        } else {
            /* console.log('click info') */
            redirectUrl('userProfile')
        }
    }

    var sendHistorial = function() {
        /* console.log('asd') */
        if ($('.historialNavBar.active').length >= 1) {
            return
        } else {
            /* console.log('click info') */
            redirectUrl('historyInfo')
        }
    }

    //- Links
    var sendActivitiesRegitrer = function() {
        redirectUrl('monitoring')
    }
    var sendClinicalProfile = function() {
        redirectUrl('clinicalProfile')
    }
    var sendRegisterFamily = function() {
        redirectUrl('registryFamilyData')
    }
    var sendNewNormal = function() {
        redirectUrl('newNormal')
    }
    var sendUpdatePassword = function() {
        redirectUrl('updatePassword')
    }

    var sendEvalueFamily = function(data, idUser) {
        addLoader()
        axiosParents(data, idUser)
    }
    var sendValuesPoll = function(data, idUser) {
        axiosPostPoll(data)
    }
    var sendRegistryFamilyFirst = function(data) {
        addLoader()
        axiosUsersFamily(data)
    }
    var sendRegistryFamilyLast = function(data) {
        addLoader()
        axiosContacts(data)
    }
    var sendRegistryFirst = function(data) {
        addLoader()
        axiosUsers(data)
    }
    var sendRegistryMiddle = function(data) {
        addLoader()
        var diseases = {
            "diseases": data
        }
        axiosDiseases(diseases)
    }
    var sendRegistryMiddleIMC = function(data) {
        addLoader()
        axiosIMC(data)
    }
    var sendRegistryLast = function(data) {
        addLoader()
        axiosCompany(data)
    }
    var sendMonitoringFirst = function(data) {
        console.log("sendMonitoring", data);
        axiosSymptoms(data)
        var flag = getStorage64('sintomaNinguna')
        var temperature = Number($('[name="selecTemp"]').val())
        var dificulty = Number($('[name="breatheProblem"]:checked').val())

        var appU = getStorage64('userAppU')
        if (isNaN(appU)) {
            calculateManually()
            console.log(calculateManually())
        }

        if (flag === 'true') {
            $('.monitoringModule .form.FormFirst').addClass('hidden')
            $('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').addClass('hidden')
            if (temperature >= 38) {
                $('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass('hidden')
            }
            if (dificulty === 7) {
                $('.monitoringModule .card.thanksMonitoringCaseOne .dataPhone').removeClass('hidden')
            }
            $('.monitoringModule .form.FormFirst').addClass('hidden')
            $('.monitoringModule .form.FormLast').removeClass('hidden')
            upTop()
        } else {
            $('.monitoringModule .form.FormFirst').addClass('hidden')
            $('.monitoringModule .form.FormLast').removeClass('hidden')
            upTop()
        }
    }
    var sendMonitoringLast = function(data) {
        axiosQuarantine(data)
        setTimeout(function() {
            redirectUrl('thankYouPage')
        }, 2000);
        // $('.monitoringModule .form.FormLast').addClass('hidden')
        // $('.monitoringModule .card.thanksMonitoringCaseOne').removeClass('hidden')
    }
    var sendUpdateCompany = function(data) {
        addLoader()
        axiosCompanyUpdate(data)
    }

    /* Get  data List*/
    var addGroup = function(value) {
        var groups = value
            // let i = 0
            // setStorage64('catalogGroup', groups)
            // while( i < groups.length) {
        $('[name="selecGrupoReg"]').prop('disabled', true);
        $('[name="selecGrupoReg"]').val(groups.name)
        $('[name="selecGrupoReg"]').attr("id", groups.group_id);
        // i++
        // }
    }


    var addCompany = function(value) {
        var company = value
        let i = 0
        setStorage64('catalogCompany', company)
        while (i < company.length) {
            $('[name="selecEmpresaReg"]').append('<option value="' + company[i].company_id + '">' + company[i].name + '</option>')
            i++
        }
    }
    var addCompany2 = function(value) {
        var company = value
        let i = 0
            // setStorage64('catalogCompany', company)
        $('option', '#selecEmpresaReg').remove();
        $("#selecEmpresaReg").append('<option value="">Selecciona una opción</option>');
        while (i < company.length) {
            $('[name="selecEmpresaReg"]').append('<option value="' + company[i].companyId + '">' + company[i].name + '</option>')
            i++
        }
    }
    var addDepartment = function(value) {
        var departments = value
        let i = 0
        setStorage64('catalogDepartment', departments)
        while (i < departments.length) {
            $('[name="selecAreaReg"]').append('<option value="' + departments[i].department_id + '">' + departments[i].name + '</option>')
            i++
        }
    }

    var addDiseases = function(value) {
        var diseases = value
        let i = 0
        setStorage64('catalogDiseases', diseases)
        while (i < diseases.length) {
            $('.forTwo.arrayDiseases').append('<div class=\"contCheckRadio checkbox\"><input type=\"checkbox\" name=\"diseases_' + diseases[i].id + '\" id=\"diseases_' + diseases[i].id + '\" value="' + diseases[i].id + '"><label for="diseases_' + diseases[i].id + '">' + diseases[i].name + '<\/label><\/div>')
            i++
        }
        $('.forTwo.arrayDiseases').append('<div class=\"contCheckRadio checkbox\"><input type=\"checkbox\" name=\"ninguna\" id=\"ninguna\" value=\"0\"><label for=\"ninguna\">Ninguna<\/label><\/div>')
    }

    $(".openModal").click(function() {
        var actionToRisk = getStorage64('actionToRisk')
        var dataCompanyCont = getStorage64('dataCompanyCont')
        var colorRisk = actionToRisk.color
        var idEmployee = dataCompanyCont.empresa.id
        axiosListActions(idEmployee, colorRisk)
    });

    var addactionsToTake = function(value) {
        var actionsToTakeList = value

        let i = 0
        console.log("acciones para riesgo ", actionsToTakeList.data)
        var actiontoJson = actionsToTakeList.data
            // Obteniendo todas las claves del JSON
        $('article.resultInfo > ul > li').remove()
        for (var clave in actiontoJson) {
            // Controlando que json realmente tenga esa propiedad
            if (actiontoJson.hasOwnProperty(clave)) {
                // Mostrando en pantalla la clave junto a su valor
                // console.log("La clave es " + clave + " y el valor es " + actiontoJson[clave]);
                if (clave == "accion_1" || clave == "accion_2" || clave == "accion_3" || clave == "accion_4" || clave == "accion_5") {
                    if (actiontoJson[clave] !== null)
                        $('ul.actions').append('<li>' + actiontoJson[clave] + '</li> ')
                }
                if (clave == "texto_telefono_1") {
                    if (actiontoJson[clave] !== null)
                        $('p.actionsPhone1').replaceWith('<p class="actionsPhone1">' + actiontoJson[clave] + '</p> ')
                }
                if (clave == "texto_telefono_2") {
                    if (actiontoJson[clave] !== null)
                        $('p.actionsPhone2').replaceWith('<p class="actionsPhone2">' + actiontoJson[clave] + '</p> ')
                }
                if (clave == "texto_correo_1") {
                    if (actiontoJson[clave] !== null)
                        $('p.actionsEmail1').replaceWith('<p class="actionsEmail1">' + actiontoJson[clave] + '</p> ')
                }
                if (clave == "texto_correo_2") {
                    if (actiontoJson[clave] !== null)
                        $('p.actionsEmail2').replaceWith('<p class="actionsEmail2">' + actiontoJson[clave] + '</p> ')
                }
            }
            //
        }
    }

    var addSymptoms = function(value) {
        var symptoms = value
        let i = 0
        setStorage64('catalogSymptoms', symptoms)

        //console.log("Catalogo de sintomas ? " , symptoms );

        while (i < symptoms.length) {
            $('.arraySymptoms').append('<div class=\"contCheckRadio checkbox\"><input type=\"checkbox\" name=\"diseases_' + symptoms[i].id + '\" id=\"symptoms_' + symptoms[i].id + '\" value="' + symptoms[i].id + '"><label for="symptoms_' + symptoms[i].id + '">' + symptoms[i].name + '<\/label><\/div>')
            i++
        }
        $('.arraySymptoms').append('<div class=\"contCheckRadio checkbox\"><input type=\"checkbox\" name=\"sintomaNinguna\" id=\"sintomaNinguna\" value=\"0\"><label for=\"sintomaNinguna\">Ninguna<\/label><\/div>')
    }
    var addQuestions = function(value) {
        // var questions = value
        // let i = 0
        // setStorage64('catalogQuestions', questions)
        // while( i < questions.length) {
        // 	$('[name="selecAreaReg"]').append('<option value="'+ questions[i].questions_id +'">'+ questions[i].name +'</option>')
        // 	i++
        // }
    }
    var addReasons = function(value) {
        var reasons = value
        let i = 0
        setStorage64('catalogReasons', reasons)
        while (i < reasons.length) {
            $('[name="whyIsolation"]').append('<option value="' + reasons[i].name + '">' + reasons[i].name + '</option>')
            i++
        }
        //$('[name="whyIsolation"]').append('<option value="Otra">Otra</option>')
    }
    var addFamilyRelationship = function(value) {
        var familyRelationship = value
        let i = 0
        setStorage64('catalogFamilyRelationship', familyRelationship)
        while (i < familyRelationship.length) {
            $('[name="familyRelationship"]').append('<option value="' + familyRelationship[i].id + '">' + familyRelationship[i].name + '</option>')
            i++
        }
    }

    /* Pre  llenado de campos */
    var preSelectedLastSyntoms = function(sym) {
        var symArray = sym
            //console.log(symArray)
        let fechaInicioSintomas = returnFormatDate(symArray.start_date)

        $('[name="selecTemp"] option[value="' + symArray.temperature + '"]').prop('selected', 'selected')
        $('[name="dateFirstSymptom"]').val(fechaInicioSintomas)
            //$('[name="idOximetry"]').val(symArray.oxymetry)
        i = 0


        if (symArray.symptoms.length === 0) {
            $('input[name="breatheProblem"][value="8"]').prop('checked', 'checked')
            $('[name=sintomaNinguna]').prop('checked', 'checked')
        } else if (symArray.symptoms.length >= 1) {
            let noSymptom = true
            while (i <= (symArray.symptoms.length - 1)) {
                if (symArray.symptoms[i] === 7) {
                    $('input[name="breatheProblem"][value="7"]').prop('checked', 'checked')
                    $('[name=sintomaNinguna]').prop('checked', 'checked')
                } else if (symArray.symptoms[i] !== 7) {
                    $('.arraySymptoms [value="' + symArray.symptoms[i] + '"]').prop('checked', 'checked')
                    $('input[name="breatheProblem"][value="8"]').prop('checked', 'checked')
                    noSymptom = false
                } else {
                    $('.forTwo.isolation .btn.secundario:eq(0)').addClass('active')
                    $('.contMonitoringIsolation').removeClass('hidden')
                }
                i++
            }
            var arr2 = [8]
            var difference = symArray.symptoms.filter(x => !arr2.includes(x))
            if (difference.length >= 1) {
                $('[name=sintomaNinguna]').prop('checked', '')
                $('.firstDateSymptoms').removeClass('hidden')
            }
            if (noSymptom) $('[name=sintomaNinguna]').prop('checked', 'checked')
        } else {
            $('.arraySymptoms [type=checkbox]').prop('checked', '')
            $('input[name="breatheProblem"][value="8"').prop('checked', 'checked')
            $('input[name="sintomaNinguna"]').prop('checked', 'checked')
        }
        $('.registryMonitoring .FormFirst').prepend('<div class=\"notificationAlert\"><span class=\"modalC\">X<\/span><p>Para tu comodidad tus datos del día anterior están precargados.<\/p><strong>¡Verifica que no han cambiado!<\/strong><\/div>')
        $('.registryMonitoring .FormLast').prepend('<div class=\"notificationAlert\"><span class=\"modalC\">X<\/span><p>Para tu comodidad tus datos del día anterior están precargados.<\/p><strong>¡No olvides registrar tu estatus!<\/strong><\/div>')
    }
    var preSelectedLastQuar = function(quar) {
        var quarArray = quar
        let reasonText = quarArray.reason
        let reasonDate = quarArray.start_date

        let fechaInicioCuarentena = returnFormatDate(reasonDate)

        // if(quarArray.type === 1 || quarArray.type === '1' ){
        // 	$('.forTwo.isolation .btn.secundario:eq(0)').trigger('click')
        // }
        // else if(quarArray.type === 2 || quarArray.type === '2' ){
        // 	$('.forTwo.isolation .btn.secundario:eq(1)').trigger('click')
        // }
        setTimeout(() => {
            $('input[name="whereIsolation"][value="' + quarArray.type + '"]').prop('checked', 'checked')
            $('[name="whyIsolation"] option[value="' + reasonText + '"]').prop('selected', 'selected')
            $('input[name="dateFirstIsolation"]').val(fechaInicioCuarentena)
        }, 1500);

    }
    var preSelectedCompany = function() {
        var dataCompanyCont = getStorage64('dataCompanyCont')
        console.log(dataCompanyCont)
        let departament = dataCompanyCont.departamento.id
        let company = dataCompanyCont.empresa.id

        setTimeout(() => {
            $('[name="selecEmpresaReg"] option[value="' + company + '"]').prop('selected', 'selected')
            $('[name="selecAreaReg"] option[value="' + departament + '"]').prop('selected', 'selected')
        }, 1500);

    }


    /*  Peticiones AXIOS  GET*/
    /* Add Data List */
    var axiosListActions = function(idEmployee, colorRisk) {
        console.log("coloooorr" , colorRisk)
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v2/actionsToTake/' + idEmployee + "/" + colorRisk,
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
            .then(function(res) {
                if (res.status === 200) {
                    var actionsToTake = (res.data)
                    console.log("acciones--> ", actionsToTake)

                    addactionsToTake(actionsToTake)

                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosListDiseases = function() {
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
            .then(function(res) {
                if (res.status === 200) {
                    var diseases = (res.data.diseases)
                    addDiseases(diseases)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosListSymptoms = function() {
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
            .then(function(res) {
                if (res.status === 200) {
                    var symptoms = (res.data.symptoms)
                    addSymptoms(symptoms)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosListQuestions = function() {
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
            .then(function(res) {
                if (res.status === 200) {
                    var questions = (res.data.questions)
                    addQuestions(questions)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosListReasons = function() {
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
            .then(function(res) {
                if (res.status === 200) {
                    var reasons = (res.data.reasons)
                    addReasons(reasons)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosListRelatives = function() {
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
            .then(function(res) {
                if (res.status === 200) {
                    var relatives = (res.data.relatives)
                    addFamilyRelationship(relatives)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }

    /* Add Data Profile User */
    var axiosDataUser = function() {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v2/users/' + appU,
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {

                    var userData = (res.data.data)
                    setStorage64('dataUserCont', userData)
                    succesUpdateInfoGral()
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    request401()
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    succesUpdateInfoGral()
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosListPollMask = function() {
        var appT = getStorage64('userAppT')
            // var appU = getStorage64('userAppU')
        var dataUserCont = getStorage64('dataUserCont')
        var idUser = dataUserCont.id_usuario
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v2/poll/uso-de-cubreboca/question/' + idUser,
            //url: 'http://127.0.0.1:5500/cuestionario.json',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    addLoader('false')
                    // var poll = res.data.poll
                    // var dataCompanyCont = getStorage64('dataCompanyCont')
                    // let companyId = dataCompanyCont.empresa.id
                    //     //console.log("id empresa", companyId)
                    // if (res.data.message !== undefined || res.data.message !== '' || res.data.message !== null ||
                    //     companyId !== 28 || companyId !== 57 || companyId !== 58 || companyId !== 59 || companyId !== 60 ||
                    //     companyId !== 61) {
                    //     //console.log("pruebas gerry con data" , res.data)
                    modalCuestionarioDin()
                    console.log("pollMask", res.data)
                    // }
                    $('p#titlePrime').text(res.data.poll.title)
                    $('p#pollDescription').text(res.data.poll.description)
                    for (var clave in res.data.sections){
                        // Controlando que json realmente tenga esa propiedad
                        if (res.data.sections.hasOwnProperty(clave)) {
                          // Mostrando en pantalla la clave junto a su valor
                            claveQuery =  parseInt(clave)+1;
                            // console.log("La clave es " + claveQuery + " y el valor es " + res.data.sections[clave].title);
                            $('div.stepFollow > p:nth-child('+ claveQuery +')').text(res.data.sections[clave].title)
                            for (var numQuestion in res.data.sections[clave].questions){
                                // if (res.data.sections.hasOwnProperty(numQuestion)) {
                                    questionQuery =  parseInt(numQuestion)+1;
                                    console.log("La clave es " + questionQuery + " y el valor es " + res.data.sections[clave].questions[numQuestion].question);
                                    $('p#'+ questionQuery +'.h6').text(res.data.sections[clave].questions[numQuestion].question)
                                // }
                            }    
                        
                        
                        }
                    }
                    var sections = res.data.sections
                    // var vivienda = res.data.sections[0].questions
                    // var trabajo = res.data.sections[1].questions
                    // var movilidad = res.data.sections[2].questions
                    // var lengthQuestions = res.data.sections[2].questions
                    // var movilidad = res.data.sections[2].questions
                    // var movilidad = res.data.sections[2].questions

                    // console.log("vivienda", vivienda)
                    // console.log("trabajo", trabajo)
                    // console.log("movilidad", movilidad)
                    // setStorage64('poll', poll)
                    // setStorage64('vivienda', vivienda)
                    // setStorage64('trabajo', trabajo)
                    // localStorage.setItem('movilidad', JSON.stringify(movilidad))
                    // getPollVariables()



                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    addLoader('false')
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    addLoader('false')
                    request500()
                } else {
                    addLoader('false')
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }

    var axiosListPoll = function() {
        var appT = getStorage64('userAppT')
            // var appU = getStorage64('userAppU')
        var dataUserCont = getStorage64('dataUserCont')
        var idUser = dataUserCont.id_usuario
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v2/poll/movilidad-y-trabajo/question/' + idUser,
            //url: 'http://127.0.0.1:5500/cuestionario.json',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    addLoader('false')
                    var poll = res.data.poll
                    var dataCompanyCont = getStorage64('dataCompanyCont')
                    let companyId = dataCompanyCont.empresa.id
                        //console.log("id empresa", companyId)
                    if (res.data.message !== undefined || res.data.message !== '' || res.data.message !== null ||
                        companyId !== 28 || companyId !== 57 || companyId !== 58 || companyId !== 59 || companyId !== 60 ||
                        companyId !== 61) {
                        //console.log("pruebas gerry con data" , res.data)
                        modalCuestionario()

                    }

                    // var sections = res.data.sections
                    var vivienda = res.data.sections[0].questions
                    var trabajo = res.data.sections[1].questions
                    var movilidad = res.data.sections[2].questions
                    var lengthQuestions = res.data.sections[2].questions
                    var movilidad = res.data.sections[2].questions
                    var movilidad = res.data.sections[2].questions

                    console.log("vivienda", vivienda)
                    console.log("trabajo", trabajo)
                    console.log("movilidad", movilidad)
                    setStorage64('poll', poll)
                    setStorage64('vivienda', vivienda)
                    setStorage64('trabajo', trabajo)
                    localStorage.setItem('movilidad', JSON.stringify(movilidad))
                    getPollVariables()



                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    addLoader('false')
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    addLoader('false')
                    request500()
                } else {
                    addLoader('false')
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }

    var axiosDataCompany = function() {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v1/users/' + appU + '/company',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    var companyData = (res.data.data)
                    setStorage64('dataCompanyCont', companyData)
                    succesUpdateCompany()
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    request401()
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    setStorage64('dataCompanyCont', 'null')
                    succesUpdateCompany()
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosDataIMC = function() {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v1/users/' + appU + '/bmi',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    var bmiData = (res.data.data)
                    setStorage64('dataImcCont', bmiData)
                    succesUpdateImc()
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    request401()
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    setStorage64('dataImcCont', 'null')
                    succesUpdateImc()
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosDataDiseases = function() {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v1/users/' + appU + '/diseases',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    var diseasesData = (res.data.data)
                    setStorage64('dataDiseasesCont', diseasesData)
                    succesUpdateSimp()
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    request401()
                } else if (error.response.status === 404) {
                    setStorage64('dataDiseasesCont', 'null')
                    succesUpdateSimp()
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }

    /* Add Data Group */
    var axiosCatGroup = function(tokenRegistry) {
        console.log("token bueno", tokenRegistry)
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v2/group/' + tokenRegistry,
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
            .then(function(res) {
                if (res.status === 200) {
                    console.log("resdata de token", res.data)
                    var group = (res.data.group)
                    addGroup(group)
                    fillSecondary(group.group_id)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }


    /* Add Data Catalogs */
    var axiosCatCompany2 = function(groups) {
            const config = {
                metodo: 'get',
                url: BASE_API + 'covid-19/v2/groupCompanys/' + groups,
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
                .then(function(res) {
                    if (res.status === 200) {
                        console.log("companies", res.data)
                        var company = (res.data.groupsByCompanys[groups][0])
                        addCompany2(company)
                    }
                })
                .catch(function(error) {
                    if (error.message == 'Network Error') {
                        //addLoader('false')
                        //toast('Error de conexión')
                    } else if (error.request) {
                        //addLoader('false')
                        //console.log(error.request.responseText)
                    }
                    if (error.response.status === 404) {
                        //console.error(error.response);
                        //request404()
                    } else if (error.response.status === 440) {
                        //request440()
                    } else if (error.response.status === 500) {
                        //request500()
                    } else {
                        //console.error(error.response.status);
                        //console.error(error.response);
                    }
                });
        }
        /* Add Data Catalogs */
    var axiosCatCompany = function() {
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
            .then(function(res) {
                if (res.status === 200) {
                    var company = (res.data.companies)
                    addCompany(company)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosCatDepartment = function() {
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
            .then(function(res) {
                if (res.status === 200) {
                    var department = res.data.departments
                    addDepartment(department)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }

    /* Precharge Data */
    var axiosPreChargeSyntoms = function() {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')

        var config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v1/users/' + appU + '/symptoms',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    //console.log(res.data.data)
                    var temp = res.data.data.temperatura
                    var fecha = res.data.data.fecha
                    var sintom = res.data.data.sintomas
                    var oxy = res.data.data.oximetria
                    if (oxy === null) {
                        oxy = ''
                    }

                    let symptoms = {
                        symptoms: sintom,
                        temperature: Number(temp).toFixed(2),
                        oxymetry: oxy,
                        start_date: fecha
                    }
                    setTimeout(() => {
                        preSelectedLastSyntoms(symptoms)
                        setStorage64('arraySymptoms', sintom)
                    }, 1000);
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 440) {
                    request440()
                }
            });
    }
    var axiosPreChargeQuarantine = function() {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')

        var config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v1/users/' + appU + '/quarantine',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    var aislamiemto = res.data.data.id_cat_tipo_aislamiento
                    var motivo = res.data.data.motivo
                    var fecha = res.data.data.fecha.split(' ')

                    let quarantine = {
                        type: aislamiemto,
                        reason: motivo,
                        start_date: fecha[0]
                    }
                    preSelectedLastQuar(quarantine)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                        //console.log(error.request.responseText)
                }
                if (error.response.status === 440) {
                    request440()
                }
            });
    }


    /* var axiosCatDivision = function(){} */
    var axiosCode = function() {
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
    var axiosVaidateReddis = function() {
        var dataActivate = getStorage64('userRedisT')
        const config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v1/queue/' + dataActivate,
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
            .then(function(res) {
                if (res.status === 200) {
                    var regSuccess = res.data.key
                    setStorage64('validateRedisT', regSuccess)
                    request202()
                        /*
                        console.log(regSuccess);
                        console.log(getStorage64('validateRedisT') );
                         */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    //addLoader('false')
                    /*console.log(error.request.responseText)*/
                }
                if (error.response.status === 401) {
                    setStorage64('validateRedisT', 'tokenEnd')
                    console.log('El token se ha perdido')
                    console.error(error.response);
                } else if (error.response.status === 404) {
                    setStorage64('validateRedisT', 'notFound')
                        /*  console.error(error.response);  */
                        //request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    //request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }


    /*  Peticiones AXIOS  PATCH*/
    var axiosCompanyUpdate = function(dataCompanyUpdate) {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        var entity_id = getStorage64('entity_id')

        const config = {
            metodo: 'patch',
            url: BASE_API + 'covid-19/v1/users/' + appU + '/company/' + entity_id,
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head,
                data: dataCompanyUpdate
            })
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('RegistryLast', 'true')

                    updateIMCData()
                        /*
                        console.log(res.data.id);
                        console.log('axiosCompany');
                        */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }


    /*  Peticiones AXIOS  POST*/
    var axiosPostPoll = function(dataAnswers) {
        var appT = getStorage64('userAppT')
            // var appU = getStorage64('userAppU')
        var dataUserCont = getStorage64('dataUserCont')
        var idUser = dataUserCont.id_usuario
        const config = {
            metodo: 'post',
            url: BASE_API + 'covid-19/v2/poll/movilidad-y-trabajo/answer/' + idUser,
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }

        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head,
                data: dataAnswers
            })
            .then(function(res) {
                if (res.status === 200) {
                    // var regSuccess = res.data.id
                    // setStorage64('userRedisParentT', regSuccess)
                    // sendFamilyData()
                    console.log("pruebas para gerry respuesta", res)
                    console.log('axiosParents');

                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 400) {
                    var errors = error.response.data.error
                    addLoader('false')
                    toast(errors[0].error.regexNotMatch)

                } else if (error.response.status === 401) {
                    toast(error.response.data.message)
                        //toast('Datos de usuario no válidos');
                    request404()
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 409) {
                    emaiInUse()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }

    var axiosParents = function(dataParents, userID) {
        let user_ID = userID
        const config = {
            metodo: 'post',
            url: BASE_API + 'covid-19/v1/users/' + user_ID + '/relatives',
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('userRedisParentT', regSuccess)
                    sendFamilyData()
                        /*
                        console.log(res.data.id);
                        console.log('axiosParents');
                        */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 400) {
                    var errors = error.response.data.error
                    addLoader('false')
                    toast(errors[0].error.regexNotMatch)

                } else if (error.response.status === 401) {
                    toast(error.response.data.message)
                        //toast('Datos de usuario no válidos');
                    request404()
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 409) {
                    emaiInUse()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosUsersFamily = function(dataUsers) {
        let familiar_ID = getStorage64('userRedisParentT')
        const config = {
            metodo: 'post',
            url: BASE_API + 'covid-19/v2/users/' + familiar_ID,
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('userRedisT', regSuccess)
                    setStorage64('RegistryFirst', 'true')
                    sendUserFamilyData()
                        //console.log(res.data.id);
                        //console.log('axiosUsers');
                        /*
                         */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 400) {
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

                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 409) {
                    emaiInUse()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosUsers = function(dataUsers) {
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('userRedisT', regSuccess)
                    setStorage64('RegistryFirst', 'true')
                    sendUserData()
                        /*
                        console.log(res.data.id);
                        console.log('axiosUsers');
                         */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                    if (error.request.responseText == '{"error":{"field":"tokenGroup","error":"Token grupo invalido."}}') {
                        errorInputNotify('tokenReg', warningMessages[21])
                        toast(warningMessages[21])
                    }
                }
                if (error.response.status === 400) {
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

                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 409) {
                    emaiInUse()
                } else if (error.response.status === 500) {
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosDiseases = function(dataDiseases) {
        var dataActivate = getStorage64('userRedisT')
        var userRegisterRelatives = getStorage64('userRegisterRelatives')
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        if (userRegisterRelatives == "true") {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/diseases',
                cred: false,
                head: {
                    'Content-Type': 'application/json'
                }
            }
        } else if (appT.length >= 40) {
            var config = {
                metodo: 'put',
                url: BASE_API + 'covid-19/v1/users/' + appU + '/diseases',
                cred: false,
                head: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + appT
                }
            }
        } else {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/diseases',
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('diseasesRedisT', regSuccess)
                    setStorage64('RegistryMiddle', 'true')
                    var userRegisterRelatives = getStorage64('userRegisterRelatives')
                    if (userRegisterRelatives == "true") {
                        sendDiseasesData()
                    } else if (appT.length >= 40) {
                        //-- aquiesta
                        //setStorage64('dataImcCont', getStorage64('enfermedadesArray') )
                        updateDiseasesData()
                    } else {
                        sendDiseasesData()
                    }
                    /*
                    console.log('axiosDiseases');
                    console.log(res);
                     */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosIMC = function(dataIMC) {
        var dataActivate = getStorage64('userRedisT')
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        var userRegisterRelatives = getStorage64('userRegisterRelatives')
        if (userRegisterRelatives == "true") {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/bmi',
                cred: false,
                head: {
                    'Content-Type': 'application/json'
                }
            }
        } else if (appT.length >= 40) {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + appU + '/bmi',
                cred: false,
                head: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + appT
                }
            }
        } else {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/bmi',
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('imcRedisT', regSuccess)
                    setStorage64('RegistryMiddleIMC', 'true')
                    var userRegisterRelatives = getStorage64('userRegisterRelatives')
                    if (userRegisterRelatives == "true") {
                        sendIMCData()
                    } else if (appT.length >= 40) {
                        let updateIMC = {
                            id_usuario: appU,
                            peso: dataIMC.weight,
                            estatura: dataIMC.height
                        }
                        setStorage64('dataImcCont', updateIMC)
                        updateIMCData()
                    } else {
                        sendIMCData()
                    }
                    /*
                    console.log('axiosIMC');
                    console.log(res);
                    imcSuccess()
                    */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    request401()
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosCompany = function(dataCompany) {
        var dataActivate = getStorage64('userRedisT')
        const config = {
            metodo: 'post',
            url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/company',
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('companyRedisT', regSuccess)
                    setStorage64('RegistryLast', 'true')

                    sendCompanyData()
                        /*
                        console.log(res.data.id);
                        console.log('axiosCompany');
                        */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosContacts = function(dataContacts) {
        var dataActivate = getStorage64('userRedisT')
        const config = {
            metodo: 'post',
            url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/contacts',
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('companyRedisT', regSuccess)
                    setStorage64('RegistryLast', 'true')

                    sendCompanyData()
                        /*
                        console.log(res.data.id);
                        console.log('axiosCompany');
                         */
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosSymptoms = function(dataSymptoms) {
        var dataActivate = getStorage64('userRedisT')
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        var userRegisterRelatives = getStorage64('userRegisterRelatives')
        if (userRegisterRelatives == "true") {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/symptoms',
                cred: false,
                head: {
                    'Content-Type': 'application/json'
                }
            }
        } else if (appT.length >= 40) {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + appU + '/symptoms',
                cred: false,
                head: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + appT
                }
            }
        } else {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/symptoms',
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('symptomsRedisT', regSuccess)
                    setStorage64('symResp', dataSymptoms)
                    sintomasSuccess()
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    request401()
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosQuarantine = function(dataQuarantine) {
        var dataActivate = getStorage64('userRedisT')
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        var userRegisterRelatives = getStorage64('userRegisterRelatives')
        if (userRegisterRelatives == "true") {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/quarantine',
                cred: false,
                head: {
                    'Content-Type': 'application/json'
                }
            }
        } else if (appT.length >= 40) {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + appU + '/quarantine',
                cred: false,
                head: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + appT
                }
            }
        } else {
            var config = {
                metodo: 'post',
                url: BASE_API + 'covid-19/v1/users/' + dataActivate + '/quarantine',
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
            .then(function(res) {
                if (res.status === 202) {
                    var regSuccess = res.data.id
                    setStorage64('quarantineRedisT', regSuccess)
                    getStorage64('quarResp', dataQuarantine)
                        //sessionUserActive('true')
                    request202()
                    if (appT.length <= 45 || userRegisterRelatives == "true") {
                        axiosActivate(regSuccess)
                        console.log('Cuenta Activada...')
                    }
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    request401()
                        //sessionUserActive('true')
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    //sessionUserActive('true')
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosQuarantineDel = function() {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        var config = {
            metodo: 'delete',
            url: BASE_API + 'covid-19/v1/users/' + appU + '/quarantine',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }
        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    setStorage64('quarantineRedisT', regSuccess)
                    deleteStorage64('quarResp')
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    request401()
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 405) {

                } else if (error.response.status === 440) {
                    request440()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    //sessionUserActive('true')
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosLogin = function(dataLogin) {
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
            .then(function(res) {
                if (res.status === 200) {
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
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 401) {
                    toast('Usuario y/o Contraseña no valido')
                } else if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosPasswords = function(dataPassword) {
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
            .then(function(res) {
                /*console.log(res.status)*/
                if (res.status === 200) {
                    $('.passRecovery .card.passwordRecovery').remove()
                    $('.passRecovery .textInfo').remove()
                    $('.passRecovery .card.thanksRecoveryPass').removeClass('hidden')
                    $('.thanksRecoveryPass .btn.primario').on('click', returnToHome)
                    addLoader('false')
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                console.log(error)
                addLoader('false')
                toast('Por favor intentalo de nuevo')
            });
    }
    var axiosPassUpdate = function(dataUpPass) {
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
            .then(function(res) {
                /*console.log(res.status)*/
                if (res.status === 200) {
                    $('.passUpdate .card.passwordUpdate').remove()
                    $('.passUpdate .textInfo').remove()
                    $('.passUpdate .card.thanksUpdatePass').removeClass('hidden')
                        // $('.thanksUpdatePass .btn.primario').on('click', returnToHome)
                    setTimeout(() => {
                        redirectUrl('userProfile')
                    }, 800);

                    addLoader('false')
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                console.log(error)
                addLoader('false')
                $('[name="antPassword"]').addClass('error')
                $('[name="antPassword"] + .errorMessage').text('La contraseña anterior no coincide')
                upErrorMessage()
                toast('Por favor intentalo de nuevo')
            });
    }


    var axiosActivate = function() {
        var dataActivate = getStorage64('userRedisT')
        const config = {
            metodo: 'post',
            url: BASE_API + 'covid-19/v1/queue/' + dataActivate + '/activate',
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
            .then(function(res) {
                if (res.status === 202) {
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
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }
    var axiosLogout = function() {
        var appT = getStorage64('userAppT')
        var appU = getStorage64('userAppU')
        var config = {
            metodo: 'get',
            url: BASE_API + 'covid-19/v1/users/' + appU + '/logout',
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }
        axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {

                if (res.status === 200) {
                    localStorage.clear()
                    setCodeEnter('carso123')
                    setSusumu()
                    setTimeout(function() {
                        redirectUrl('home')
                    }, 1000)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 405) {
                    console.error(error.response);
                    localStorage.clear()
                    setCodeEnter('carso123')
                    setSusumu()
                    setTimeout(function() {
                        redirectUrl('home')
                    }, 1000)
                } else if (error.response.status === 440) {
                    request404
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });
    }

    var getAxios = function(endpoint) {
        var appT = getStorage64('userAppT')
        const config = {
            metodo: 'get',
            url: endpoint,
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }
        return axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head
            })
            .then(function(res) {
                if (res.status === 200) {
                    return (res.data)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });

    }

    var postAxios = function(endpoint, dataa) {
        var appT = getStorage64('userAppT')
        const config = {
            metodo: 'post',
            url: endpoint,
            cred: false,
            head: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appT
            }
        }
        return axios({
                method: config.metodo,
                url: config.url,
                withCredentials: config.cred,
                headers: config.head,
                data: dataa

            })
            .then(function(res) {
                if (res.status === 200) {
                    return (res.data)
                }
            })
            .catch(function(error) {
                if (error.message == 'Network Error') {
                    addLoader('false')
                    toast('Error de conexión')
                } else if (error.request) {
                    addLoader('false')
                    console.log(error.request.responseText)
                }
                if (error.response.status === 404) {
                    console.error(error.response);
                    request404()
                } else if (error.response.status === 500) {
                    console.error(error.response);
                    request500()
                } else {
                    console.error(error.response.status);
                    console.error(error.response);
                }
            });

    }

    var thanYouResult = function() {
        var appU = getStorage64('userAppU')
            // var company = getStorage64('dataCompanyCont')
            // var telefonoContact = company.grupo.telefono
            // var correoContact = company.grupo.correo
            // console.log("compañia", correoContact)
        var user = {
            baseBasal: 0,
            symptoms: [],
            temperature: 36,
            oximetria: 0
        }
        if (isNaN(appU)) {
            if ($('.scoreIndicator').length) {
                //console.log("temprisk",getStorage64('tempRisk'))
                assignRiskGroupAllocation(getStorage64('tempRisk'))
            } else {
                $('.loaderResult').fadeOut()
            }
            return true;
        }
        getAxios(`${BASE_API}covid-19/v2/users/${appU}/basal-risk`)
            .then(function(data) {
                user.baseBasal = data.data.valor

                getAxios(`${BASE_API}covid-19/v1/users/${appU}/symptoms`)
                    .then(function(data) {
                        //console.log("data",data)
                        //console.log("userdata",user)
                        user.symptoms = data.data.sintomas
                        user.oximetria = data.data.oximetria
                        user.temperature = parseFloat(data.data.temperatura)
                        var sumRisk = calculateSumRisks(user)
                        assignRiskGroupAllocation(sumRisk)
                        addLoader('false')
                    })
            })
    }

    var calculateManually = function() {

        const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
        var arrayDiases = getStorage64('arrayDiseases')
        var user = getStorage64('registryFormFirst')
        console.log("calculatemanually", user)
        var tForm = getStorage64('monitoringFormFirst')
        console.log(tForm)
        var age = getAge(user.birthdate.split("-").reverse().join("-"))
        var groupBasal = 20
        var tUser = {
            baseBasal: 0,
            symptoms: [],
            temperature: 36
        }
        if (age < 55 && arrayDiases.length == 0) {
            groupBasal = 10
        } else if (age < 55 || arrayDiases.length == 0) {
            groupBasal = 20
        } else {
            if (age >= 55 && arrayDiases.length > 0) {
                groupBasal = 30
            }
        }
        tUser.baseBasal = groupBasal
        tUser.temperature = parseFloat(tForm.temperature)
        tUser.symptoms = tForm.symptoms
        console.log("sumatoria", tUser.baseBasal, tUser.symptoms, tUser.temperature, arrayDiases.length, age);
        setStorage64('tempRisk', calculateSumRisks(tUser))
    }

    /**
     * Asignación de grupo de riesgo
     * 
     * @param {*} risk 
     */
    var assignRiskGroupAllocation = function(risk) {
        var company = getStorage64('dataCompanyCont')
        var loginIn = getStorage64('userLoginSession')
        if (loginIn == "true") {
            var telefonoContact = company.grupo.telefono
            var correoContact = company.grupo.correo
            console.log("compañia", company)
        }

        var riskGroupAllocation = [
            { points: 10, text: 'Basal bajo sin síntomas', class: "resultCardOne", color: 'azul' }, // * Azul
            { points: 11, text: 'Basal bajo con riesgo leve', class: "resultCardTwo", color: 'verde' }, // - Verde
            { points: 12, text: 'Basal bajo con riesgo moderado', class: "resultCardThree", color: 'amarillo' }, // : Amarillo
            { points: 13, text: 'Basal bajo con riesgo grave', class: "resultCardFour", color: 'rojo' }, // + Rojo
            { points: 20, text: 'Basal medio sin síntomas', class: "resultCardTwo", color: 'verde' }, // - Verde
            { points: 21, text: 'Basal medio con riesgo leve', class: "resultCardThree", color: 'amarillo' }, // : Amarillo
            { points: 22, text: 'Basal medio con riesgo moderado', class: "resultCardThree", color: 'amarillo' }, // : Amarillo
            { points: 23, text: 'Basal medio con riesgo grave', class: "resultCardFour", color: 'rojo' }, // + Rojo
            { points: 30, text: 'Basal alto sin síntomas', class: "resultCardTwo", color: 'verde' }, // - Verde
            { points: 31, text: 'Basal alto con riesgo leve', class: "resultCardThree", color: 'amarillo' }, // : Amarillo
            { points: 32, text: 'Basal alto con riesgo moderado', class: "resultCardFour", color: 'rojo' }, // + Rojo
            { points: 33, text: 'Basal alto con riesgo grave', class: "resultCardFour", color: 'rojo' } // + Rojo	
        ]
        var element = riskGroupAllocation.find(function(g) {
            return g.points == risk
        })

        if (element) {
            var appU = getStorage64('userAppU')
            postAxios(`${BASE_API}covid-19/v2/users/${appU}/risk`, {
                    "color": element.color,
                    "score": element.points
                })
                .then(function(data) {
                    var dataAction = JSON.parse(JSON.stringify(data))
                    // console.log("setea riesgos", dataAction)
                    setStorage64('actionToRisk', dataAction.data)

                    console.log("actiontorisk-->", dataAction.data)
                    var dataCompanyCont = getStorage64('dataCompanyCont')
                    var idEmployee = dataCompanyCont.empresa.id
                    axiosListActions(idEmployee, dataAction.data.color)

                    
                })
        }

        $("*[data-bar='risk']").attr('data-risk', element.points);
        $(".label_basal").html(element.text);
        $(".label_basal").addClass("active");

        if (company !== "null") {
            $(".resultWrapp").addClass("hidden");
            $(".resultWrapp." + element.class).data('risk', element.points).attr('data-risk', element.points).removeClass("hidden");
            $(".numberPhone").text(empresaTelefono);
            $(".section.sectionFooter > a").text(empresaCorreo);
        } else {
            $(".resultWrapp").addClass("hidden");
            $(".resultWrapp." + element.class).data('risk', element.points).attr('data-risk', element.points).removeClass("hidden");
        }

        $('.loaderResult').fadeOut()
        $('.goHome').on('click', () => {
            setTimeout(function() {
                redirectUrl('myAccount')
            }, 10);
        });
        $('.goProfile').on('click', () => {
            setTimeout(function() {
                redirectUrl('userProfile')
            }, 10);
        });
    }

    /**
     * Se suma el riesgo basal y el riesgo por síntomas agrupado
     *  
     * @param {*} user	 
     */
    var calculateSumRisks = function(user) {
        //console.log("user suma", user)
        var pointsSymptoms = [
                { symptomsIds: [1, 4], points: 2, cumulative: true }, // Tos y  Dolor de cabeza
                { symptomsIds: [7], points: 7, cumulative: true }, // Dificultad respiratoria
                { symptomsIds: [5], points: 1, cumulative: true }, // Escalofrio
                { symptomsIds: [2, 6, 8, 9, 10], points: 1, cumulative: false }, // Cualquier otro
            ]
            //console.log("points", pointsSymptoms)
            //console.log("user oximetria", user.oximetria)
        var sum = 0
        var finalPoint = 0
        if (user.oximetria < 92) {
            var sum = 8
        }
        if (user.oximetria == null || user.oximetria == 'null' || user.oximetria == undefined || user.oximetria == '') {
            var sum = 0
        }

        var symptomsCumulativeFlag = false
        if (user.symptoms && user.symptoms.length) {
            // calculo de temperatura/fiebre
            if ((user.temperature >= 38) || (user.symptoms.indexOf(3) > -1) || ((user.temperature >= 38) && (user.symptoms.indexOf(3) > -1))) {
                sum = sum + 3
            }
            user.symptoms.forEach(function(s) {
                if (s === 3 || s === '3') {
                    return
                }
                var rank = pointsSymptoms.find(function(ps) {
                    return ps.symptomsIds.indexOf(s) > -1
                })
                if (!rank.cumulative) {
                    symptomsCumulativeFlag = true
                } else {
                    sum = sum + rank.points
                }
            })
            sum = symptomsCumulativeFlag ? sum + 1 : sum
        } else {
            if (user.temperature >= 38) {
                sum = sum + 3
            }
        }
        if (between(sum, 16, 60)) {
            finalPoint = 3
        } else if (between(sum, 8, 16)) {
            finalPoint = 3
        } else if (between(sum, 5, 7)) {
            finalPoint = 2
        } else if (between(sum, 1, 4)) {
            finalPoint = 1
        } else {
            finalPoint = 0
        }
        return user.baseBasal + finalPoint
    }

    /**
     *  Obtener si numero esta en rango
     * @param {*} x 
     * @param {*} min 
     * @param {*} max 
     */
    function between(x, min, max) {
        return x >= min && x <= max;
    }

    /**
     * Funciona para enviar la notificacion del correo de registro al familiar
     */
    var sendNotificationToRegisterFamily = () => {
            let tokenRedis = getStorage64('userRedisT');
            var appU = getStorage64('userAppU')
                //console.log(tokenRedis);
                //console.log(appU);
            postAxios(`${BASE_API}covid-19/v2/users/${appU}/relatives/notification`, {
                    "token": tokenRedis.replace('c0v19', 'addRelative')
                })
                .then(function(data) {
                    console.log(data)
                });
            deleteStorage64('userRegisterRelatives')
            $('.goHome').on('click', () => {
                setTimeout(function() {
                    redirectUrl('myAccount')
                }, 10);
            });
            $('.goProfile').on('click', () => {
                setTimeout(function() {
                    redirectUrl('userProfile')
                }, 10);
            });
        }
        /**
         * Logica para mostrar el historial
         */
    var dataHistoric = {
        dates: [],
        users: [],
        data: {},
        init: true,
        callService: true,
        stopPagination: false,
        page: 0,
        next: 1
            // historic_user: {},
            // historic_rela: {},
    };
    var historicPage = () => {

        getCallServiceHistoric()
        $(window).scrollTop()


    }
    var getCallServiceHistoric = () => {
        const SHOWN = 20;
        let appU = getStorage64('userAppU')
        let page = dataHistoric.next //parseInt($('.historyList > div.historyItem').length / SHOWN) + 1
        getAxios(`${BASE_API}covid-19/v2/users/${appU}/historic?page=${page}`)
            .then(function(data) {
                setDataHistoric(data.data, data.page)
            });
    }
    var setDataHistoric = (value, page) => {
        console.log('pagina actual: ', dataHistoric.page, ' pagina consultada: ', parseInt(page))
        if (parseInt(dataHistoric.page + 1) == parseInt(page)) {
            console.log('Cargando los datos del historico')
            dataHistoric.page = parseInt(page)
            dataHistoric.next = parseInt(page) + 1

            let dates = JSON.parse(JSON.stringify(dataHistoric.dates))
            let users = JSON.parse(JSON.stringify(dataHistoric.users))
            let useID = []
                // let historic_user = []
                // let historic_rela = []
            if (users.length == 0) {

                users.push({
                    user_id: value.user_id,
                    user_name: value.user_name,
                    user_type: value.user_type
                })
            }

            users.map(item => {
                if (useID.includes(item.user_id) == false) useID.push(item.user_id)
            })

            // historic_user = setHistoricFormat(value, dates);
            if (value.relatives !== undefined && value.relatives !== null) {
                value.relatives.map(item_user => {
                    if (useID.includes(item_user.user_id) == false) {
                        useID.push(item_user.user_id)
                        users.push({
                            user_id: item_user.user_id,
                            user_name: item_user.user_name,
                            user_type: item_user.user_type
                        })
                    }
                    // historic_rela = setHistoricFormat(value, dates);
                })
            }

            value.historic.map(item_historic => {
                if (dates.includes(item_historic.date) == false) dates.push(item_historic.date)
            })

            dataHistoric.dates = [...dates]
            dataHistoric.users = [...users]

            if (dataHistoric.init) {
                dataHistoric.data = value
            } else {
                var stopPagination = true
                if (value.historic.length) {
                    stopPagination = false
                    dataHistoric.data.historic = [...dataHistoric.data.historic, ...value.historic]
                }
                if (value.relatives !== undefined && value.relatives !== null) {
                    value.relatives.map((relative, index) => {
                        if (relative.historic.length > 0) {
                            stopPagination = false;
                            dataHistoric.data.relatives[index].historic = [...dataHistoric.data.relatives[index].historic, ...relative.historic]
                        }
                    });
                }
                if (stopPagination) {
                    console.log('Ya no existen registros')
                    dataHistoric.stopPagination = true
                }
            }
            paintFilterHistoric()

            setTimeout(() => {
                actionButtonFilters()
            }, 250)
        }
    }
    var paintFilterHistoric = () => {
        dataHistoric.dates.map((item, key) => {
            if ($('#selectDateHistory option[value="' + item + '"]').length == 0) {
                if (key == 0) $('[name="selectDateHistory"]').append('<option selected value="' + -1 + '">' + 'Todos' + '</option>')
                $('[name="selectDateHistory"]').append('<option value="' + item + '">' + item + '</option>')
            }
        })
        dataHistoric.users.map((item, key) => {
            if ($('#selectFilterHistory option[value="' + item.user_id + '"]').length == 0) {
                if (dataHistoric.data.user_type == 1) {
                    $('.filterHistory').addClass('hidden')
                    $('#selectFilterHistory').removeClass('hidden')
                    if (dataHistoric.init)
                        if (key == 0) $('[name="selectFilterHistory"]').append('<option selected value="' + -1 + '">' + 'Todos' + '</option>')
                    $('[name="selectFilterHistory"]').append('<option value="' + item.user_id + '">' + item.user_id + ' - ' + item.user_name + '</option>')
                } else {
                    $('#selectFilterHistory').addClass('hidden')
                    $('.filterHistory').removeClass('hidden')
                    $('[name="selectFilterHistory"]').append('<option selected value="' + item.user_id + '">' + item.user_name + '</option>')
                    $('.filterHistory').append(item.user_name)
                }
            }
        })
    }
    var actionButtonFilters = () => {
        let date_selected = $('#selectDateHistory').val()
        let name_selected = $('#selectFilterHistory').val()
        if (dataHistoric.init) {
            actionFilters(date_selected, name_selected, dataHistoric.init)
            dataHistoric.init = false
            $('#selectDateHistory').on('change', function() {
                let value = $(this).val()
                date_selected = value
                actionFilters(date_selected, name_selected)
            })
            $('#selectFilterHistory').on('change', function() {
                let value = $(this).val()
                name_selected = value
                actionFilters(date_selected, name_selected)
            })
            $(window).scroll(function() {
                // if ($('.historyList > div.historyItem').length % 20 == 0) {
                if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.9) {
                    if (dataHistoric.callService) {
                        dataHistoric.callService = false
                            //console.log('lanzar peticion historico')
                        getCallServiceHistoric()
                    }
                }
                // }
            });
        } else {
            if (dataHistoric.callService == false && dataHistoric.init == false) {
                page = $('.historyList > div.historyItem').length
                historic = []
                for (let index = page; index < dataHistoric.data.historic.length; index++) {
                    historic.push(dataHistoric.data.historic[index])
                }
                actionFilters(date_selected, name_selected)
            }
        }
    }
    var actionFilters = (date_selected, name_selected, removeData = true, historic = null, relatives = null) => {
        historic = historic ? historic : dataHistoric.data.historic
        relatives = relatives ? relatives : dataHistoric.data.relatives
        if (removeData) $('.historyList > div.historyItem').remove()
        if (date_selected < 0) {
            if (name_selected < 0) {
                paintHistoricBody(historic, dataHistoric.data)
                if (relatives !== undefined && relatives !== null) {
                    relatives.map(item => {
                        paintHistoricBody(item.historic, item)
                    })
                }
            } else if (name_selected == 0) {
                paintHistoricBody(historic, dataHistoric.users[name_selected])
            } else {
                let historicFilter = relatives[name_selected - 1].historic
                paintHistoricBody(historicFilter.historic, dataHistoric.users[name_selected])
            }
        } else {
            if (name_selected < 0) {
                let historicFilter = [{
                    user_name: "" + dataHistoric.data.user_name,
                    user_id: "" + dataHistoric.data.user_id,
                    user_type: "" + dataHistoric.data.user_type,
                    historic: JSON.parse(JSON.stringify(historic)),
                }]
                if (relatives !== undefined && relatives !== null) {
                    relatives.map(item => {
                        historicFilter.push(JSON.parse(JSON.stringify(item)))
                    })
                }
                paintHistoricBody(historicFilter, null, false)
            } else {
                let historicFilter
                if (dataHistoric.data.user_id == name_selected) {
                    historicFilter = historic
                } else {
                    let relative = relatives.filter(item => item.user_id == name_selected)
                    historicFilter = relative[0].historic
                }
                let user = dataHistoric.users.filter(item => item.user_id == name_selected)
                paintHistoricBody(historicFilter, user[0])
            }
        }
    }
    var paintHistoricBody = (historic, user, alone = true) => {
        console.log('pintando el historico: ', user)
        let template = $('.historyList > div.historyItems').html()
        let container = $('.historyList > div.historyItems')
        if (alone) {
            historic.map(item => {
                let data = template.supplant({
                    user_name: user.user_name,
                    temperature: item.temperature,
                    symptoms: parseFloat(item.temperature) >= 38 ? 'Con síntomas' : (item.symptoms ? 'Con síntomas' : 'Sin síntomas'),
                    quarantine: item.quarantine ? 'Sí' : 'No',
                    date: formatDate(item.date, true),
                    time: formatDate(item.date),
                    class: parseFloat(item.temperature) >= 38 ? true : (item.symptoms ? true : false),
                })
                container.before(data)
            })
            cleanLabel()
        } else {
            let historicTogether = []
            historic.map(item => {
                item.historic.map(irm => {
                    historicTogether.push({
                        user_name: item.user_name,
                        temperature: irm.temperature,
                        symptoms: irm.symptoms,
                        quarantine: irm.quarantine,
                        date: irm.date,
                        time: irm.date,
                        datetime: irm.date,
                        class: parseFloat(irm.temperature) >= 38 ? true : (irm.symptoms ? true : false),
                    })
                })
            })
            historicTogether.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
            historicTogether.map(item => {
                let data = template.supplant({
                    user_name: item.user_name,
                    temperature: item.temperature,
                    symptoms: parseFloat(item.temperature) >= 38 ? 'Con síntomas' : (item.symptoms ? 'Con síntomas' : 'Sin síntomas'),
                    quarantine: item.quarantine ? 'Sí' : 'No',
                    date: formatDate(item.date, true),
                    time: formatDate(item.date),
                    class: item.class,
                })
                container.before(data)
            })
            cleanLabel()
        }
        if (dataHistoric.init == false && dataHistoric.callService == false && dataHistoric.init == false) {
            dataHistoric.init == false
            if (dataHistoric.stopPagination) dataHistoric.callService = false
            else dataHistoric.callService = true
        }
    }
    var formatDate = (value, format = false) => {
        if (format) {
            let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            let date = value.split(' ')[0].split('-')
            return `${date[2]} de ${months[parseInt(date[1]) - 1]} de ${date[0]}`
        } else {
            // value.setHours(value.getHours() +6);
            // alert((value.getHours()<10)?"0":"")+value.getHours()
            let date = value.split(' ')[0]
            let time = value.split(' ')[1]
            year = date.split('-')[0]
            month = date.split('-')[1]
                // alert(month)
            day = date.split('-')[2]
            hour = time.split(':')[0]
            min = time.split(':')[1]
            sec = time.split(':')[2]
                // var reserv = new Date(year,month,day,hour,min,sec)
                // console.log(reserv)
                // hourUTC = reserv.getUTCHours()
                // hourUTC = ("0" + hourUTC).slice(-2);
                // minuteUTC = reserv.getUTCMinutes()
                // minuteUTC = ("0" + minuteUTC).slice(-2);
                // secondsUTC = reserv.getUTCSeconds()
                // secondsUTC = ("0" + secondsUTC).slice(-2);
            time = hour + ":" + min + ":" + sec


            return time;
        }
    }
    String.prototype.supplant = function(values) {
            return this.replace(/\{([^\{\}]*)\}/g, function(a, b) {
                var p = b.split('.'),
                    r = values;
                try {
                    for (var s in p) { r = r[p[s]] }
                } catch (e) {
                    r = a;
                }
                return (typeof r === 'string' || typeof r === 'number') ? r : a
            });
        }
        // Historial sintomas data-div
    var cleanLabel = function() {
        $.each($('.sintomsInfo'), function() {
            if ($(this).text() == 'Con síntomas') $(this).addClass('con-sintoma')
        });
    }


    // Remove alert
    var removeAlert = function() {
        $(this).parents(".modalAlert").removeClass("active")
    }
    $(".removeAlert").on("click", removeAlert)

    // Link _blank
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        // Mock device.platform property if not available
        if (!window.device) {
            window.device = { platform: 'Browser' };
        }

        handleExternalURLs();
    }

    function handleExternalURLs() {
        // Handle click events for all external URLs
        if (device.platform.toUpperCase() === 'ANDROID') {
            $(document).on('click', '.cardLink', function(e) {
                var url = $(this).attr('href');
                navigator.app.loadUrl(url, { openExternal: true });
                e.preventDefault();
            });
        } else if (device.platform.toUpperCase() === 'IOS') {
            $(document).on('click', '.cardLink', function(e) {
                var url = $(this).attr('href');
                window.open(url, '_system');
                e.preventDefault();
            });
        }
    }

    // View height
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Cintillo expire
    window.setInterval(function() {
        var expireDate = "Julio 31, 2021 00:00:00"
        var current = new Date();
        var expiry = new Date(expireDate)

        if (current.getTime() > expiry.getTime()) {
            $('.cintilloUpdate').hide()
            $('.myAccountCards').removeClass("active")
        } else if (current.getTime() < expiry.getTime()) {
            if (/Android/i.test(navigator.userAgent)) {
                $('.cintilloUpdate').show()
                $('.myAccountCards').addClass("active")
            }
        }
    }, 0);

    // Cintillo versión
    $.getJSON("/download/current_version.json", function(json) {
        var currentVersion = json.current_version
        $(".currentCintilloVersion").append(currentVersion)
    });

    // Cerrar por cookies	
    //Get current time
    var currentTime = new Date().getTime();
    //Add hours function
    Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }
        //Get time after 24 hours
    var after24 = new Date().addHours(8760).getTime();
    var cookieClose = function() {
        //Hide div
        $('.cintilloUpdate').addClass("hideCookies")
        $('.myAccountCards').addClass("activeCookies")
            //Set desired time till you want to hide that div
        localStorage.setItem('desiredTime', after24);
    }

    //Hide div click
    $('.downloadAndroid').on('click', cookieClose);

    var cerrarCintillo = function() {
        $('.cintilloUpdate').addClass("hideCookies")
        $('.myAccountCards').addClass("activeCookies")
    }

    // Cerrar cintillo
    $('.cerrarBtnLine').on('click', cerrarCintillo);

    //If desired time >= currentTime, based on that HIDE / SHOW
    if (localStorage.getItem('desiredTime') >= currentTime) {
        $('.cintilloUpdate').addClass("hideCookies")
        $('.myAccountCards').addClass("activeCookies")
    } else {
        $('.cintilloUpdate').removeClass("hideCookies")
        $('.myAccountCards').removeClass("activeCookies")
    }

    // Aviso privacidad checked
    $(".fieldsetChecked #aviso-privacidad").attr("checked", "checked")

    /*  Scripts Generales */
    $('.menuReturn').on('click', historyBack)

    $('.formQuestion .btn.primario, .returnLogin').on('click', showLogin)
    $('.formQuestion .btn.secundario, .downloadA').on('click', showRegistry)
    $('.formLogin .colorBlue').on('click', showRegistry)

    $('.formLogin .btn.primario').on('click', validateLogin)
    $('.passwordProtect .btn.primario').on('click', validatePProtect)
    $('.passwordRecovery .btn.primario').on('click', validateRecoveryPass)
    $('.passwordUpdate .btn.primario').on('click', validateUpdatePass)
    $('input[type="date"]').attr({ 'max': dateToday })
    $('input[name="fechaNacimientoReg"]').attr({ 'max': dateMinBirthady })

    $('.registryFamilyModule .familyAccess').on('click', validateAccessFamily)
    $('.registryFamilyModule .firstForm').on('click', validateRegistryFormFirstF)
    $('.registryFamilyModule .middleForm').on('click', validateRegistryFormMiddle)
    $('.registryFamilyModule .middleIMCForm').on('click', validateRegistryFormMiddleIMC)
    $('.registryFamilyModule .lastForm').on('click', validateRegistryFormLast)

    $('.FormIMC .middleIMCForm').on('click', updateIMC)
    $('.FormSimptomps .middleForm').on('click', updateSimptomps)


    $('.FormCompInfoCards .middleCompanyInfoCards').on('click', updateCompany)

    $('.registryModule .firstForm').on('click', validateRegistryFormFirst)
    $('.registryModule .middleForm').on('click', validateRegistryFormMiddle)
    $('.registryModule .middleIMCForm').on('click', validateRegistryFormMiddleIMC)
    $('.registryModule .lastForm').on('click', validateRegistryFormLast)

    $('.iniciarNextTest').on('click', changeViewTest)
    $('.iniciarNext').on('click', changeView)
    $('.trabajoNext').on('click', validateTrabajo)
    $('.movilidadNext').on('click', validateMovilidad)
    $('.viviendaNext').on('click', validateVivienda)
    $('div.stepFollow > p:nth-child(1)').addClass('active');
    $('.1Next').on('click', changeView1)
    $('.2Next').on('click', changeView2)
    $('.3Next').on('click', changeView3)
    $('.4Next').on('click', changeView4)
    $('.nextEnd').on('click', endView)

    $('.trabajoBack').on('click', prevViewTrabajo)
    $('.movilidadBack').on('click', prevViewMovilidad)

    $('.monitoringModule .firstForm').on('click', validateMonitoringFormFirst)
    $('.monitoringModule .lastForm').on('click', validateMonitoringFormLast)
    $('.problemsBreathe').on('click', function() { $(this).removeClass('error') })
    $('body').on('click', '.modalClose', closeModals)
    $('body').on('click', '.modalC', closeModalsC)

    $('body').on('click', '.tooltipOpenerIcon', tooltipOpen)
    $('body').on('click', '.openModal', openModalResult)
    $('body').on('click', '.modalClose', closeModalResult)

    $('.activarGeo').on('click', clickGeo)
    $('.card.thanksMonitoringCaseOne .btn.primario').on('click', function() {
        var loginIn = getStorage64('userLoginSession')
        if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            redirectUrl('myAccount')
        }
        //sessionUserActive('true')
    })
    $('.inicioNavBar').on('click', sendMyAccount)
    $('.infoNavBar').on('click', sendInfo)
    $('.userProfileNavBar').on('click', sendUserProfile)
    $('.logOutNavBar').on('click', sendLogout)
    $('.historialNavBar').on('click', sendHistorial)

    $('.activitiesRegitrer').on('click', sendActivitiesRegitrer)
    $('.clinicalProfile').on('click', sendClinicalProfile)
    $('.registerFamily').on('click', sendRegisterFamily)
    $('.updatePassword').on('click', sendUpdatePassword)
        // Nueva normalidad
    $('.newNormal').on('click', sendNewNormal)

    $('input:radio[name="posibles"]').change(
        function() {
            if ($(this).is(':checked') && $(this).val() == '3') {
                // append goes here
                $("#3").show()
                    //alert("checked")
            }
            if ($(this).is(':checked') && $(this).val() == '4') {
                // append goes here
                $("#3").hide()
                    //alert("checked no")
            }
        });

    $('#b20, #b19, #b18, #b17, #b16, #b15, #b14, #b13 ').change(
        function() {
            if ($('#b20').is(':checked')) {
                // append goes here
                $(".otrosType").show()
                    //alert("propias")
            }
            if ($('#b19').is(':checked')) {
                // append goes here
                $(".otrosType").hide()
                    //alert("propias")
            }
            if ($('#b18').is(':checked')) {
                // append goes here
                $(".otrosType").hide()
                    //alert("propias")
            }
            if ($('#b17').is(':checked')) {
                // append goes here
                $(".otrosType").hide()
                    //alert("propias")
            }
            if ($('#b16').is(':checked')) {
                // append goes here
                $(".otrosType").hide()
                    //alert("propias")
            }
            if ($('#b15').is(':checked')) {
                // append goes here
                $(".otrosType").hide()
                    //alert("propias")
            }
            if ($('#b13').is(':checked')) {
                // append goes here
                $(".otrosType").hide()
                    //alert("propias")
            }
            if ($('#b14').is(':checked')) {
                // append goes here
                $(".otrosType").hide()
                    //alert("propias")
            }
        });



    $('input:radio[name="instalaciones"]').change(
        function() {
            if ($(this).is(':checked') && $(this).val() == '12') {
                // append goes here
                $(".clienteType").hide()
                $(".propiasType").show()
                    //alert("propias")
            }
            if ($(this).is(':checked') && $(this).val() == '21') {
                // append goes here
                $(".propiasType").hide()
                $(".clienteType").show()
                    //alert("cliente")
            }

        });
    $('#instalacionesH').change(
        function() {
            if ($(this).is(':checked') && $(this).val() == '8') {

                $(".otrosType").show()

            }
        });

    $('input:radio[name="supervisorRH"]').change(
        function() {
            if ($(this).is(':checked') && $(this).val() == '31') {
                // append goes here
                $(".supervisorName").hide()
                    //alert("supervisor")
            }
            if ($(this).is(':checked') && $(this).val() == '32') {
                // append goes here
                $(".supervisorName").show()
                    //alert("supervisor")
            }
        });

    $('input:radio[name="transporte"]').change(
        function() {
            if ($(this).is(':checked') && $(this).val() == '33') {
                // append goes here
                $(".publicType").hide()
                $(".partType").show()
                    //alert("auto Particular")
            }
            if ($(this).is(':checked') && $(this).val() == '36') {
                $(".partType").hide()
                $(".publicType").hide()
            }
            if ($(this).is(':checked') && $(this).val() == '37') {
                $(".partType").hide()
                $(".publicType").hide()
            }
            if ($(this).is(':checked') && $(this).val() == '38') {
                $(".partType").hide()
                $(".publicType").hide()
            }
            if ($(this).is(':checked') && $(this).val() == '39') {
                $(".partType").hide()
                $(".publicType").hide()
            }
            if ($(this).is(':checked') && $(this).val() == '40') {
                // append goes here
                $(".partType").hide()
                $(".publicType").show()
                    //	alert("transporte publico")
            }

        });


    /* Locaciones */
    if (window.location.pathname.indexOf('/index') !== -1) {
        console.log('page: index')
    }
    if (window.location.pathname.indexOf('/home') !== -1) {
        //sessionUserActive(true)
        console.log('page: home')
        var loginIn = getStorage64('userLoginSession')
        if (loginIn !== "true") {
            //redirectUrl('home')
        } else {
            redirectUrl('myAccount')
        }
    } else if (window.location.pathname.indexOf('/registryFamilyData') !== -1) {
        deleteStorage64('userRedisParentT')
        deleteStorage64('liveInHouse')
        var loginIn = getStorage64('userLoginSession')
        axiosListRelatives()
        console.log(loginIn)
        if (loginIn == "true") {
            setStorage64('userRegisterRelatives', "true");
            user = getStorage64('dataUserCont');
            console.log("myuser", user)
            $('[name="idSeguimiento"]').val(user.id_usuario).parents('.fieldset').hide()
            $('[name="emailFamily"]').val(user.email).parents('.fieldset').hide()
        }
        // else{
        // 	//redirectUrl('myAccount')
        // }
    } else if (window.location.pathname.indexOf('/familyRegistry') !== -1) {

        var loginIn = getStorage64('userRedisParentT')
        if (loginIn.length >= 10) {
            axiosListDiseases()
        } else {
            redirectUrl('registryFamilyData')
        }
    } else if (window.location.pathname.indexOf('/registry') !== -1) {

        deleteStorage64('userRedisParentT')
        deleteStorage64('liveInHouse')
        var loginIn = getStorage64('userLoginSession')
        if (loginIn !== "true") {
            //sessionUserActive(true)
            // axiosCatGroup()


            // $('#selecGrupoReg').click(function() {
            // $('#selecGrupoReg').change(fillSecondary);
            // // $('#selecEmpresaReg').empty();

            // fillSecondary();
            // });

            axiosCatDepartment()
            axiosListDiseases()
        } else {
            redirectUrl('myAccount')
        }
    } else if (window.location.pathname.indexOf('/myAccount') !== -1) {
        var aaa = getStorage64('userAppResp')
        var a = getStorage64('userAppT')
        var b = getStorage64('userAppU')
        var c = getStorage64('userAppN')

        let familiar_ID = getStorage64('userRedisParentT')
        var name = getStorage64('userAppN').split(' ')
        var firstName = name[0]

        var loginIn = getStorage64('userLoginSession')
        deleteStorage64('userRegisterRelatives')
        if (loginIn !== "true") {
            redirectUrl('home')
                /* console.log('logout') */
        } else {
            /* console.log('logoin') */
            addLoader()
            axiosDataCompany()
            axiosDataUser()
            axiosDataIMC()
            axiosDataDiseases()
            $('.userProfileNavBar').text(firstName)
            setTimeout(function() {
                var dataUserCont = getStorage64('dataUserCont')
                if (Number(dataUserCont.tipo) === 1) $('.newNormal').removeClass('hidden')
            }, 350)
        }
        setTimeout(() => {
            var dataUserConttipo = getStorage64('dataUserCont')
            var company = getStorage64('dataCompanyCont')
            console.log("company", company)
            var empresa = company.empresa.nombre
            var tipo = dataUserConttipo.tipo
            if (tipo == 1) {
                $('.card.registerFamily').show();
                $('.card.newNormal').show();
                $('.card.employData').show();
                var empresaLoweCase = empresa.toLowerCase()
                $(document.body).addClass("skin--" + empresaLoweCase);
                //console.log("tipo", tipo)				
                //if (employeeUser !== 'CIE'){
                //- CIE - LS- MINISO   - ISHOP- CLARO COLOMBIA - HITSS COLOMBIA - ASPEL
                axiosListPollMask();
                // axiosListPoll()
            } else {
                $('.card.registerFamily').hide();
                $('.card.newNormal').hide();
                $('.card.employData').hide();
            }
            //console.log("mydata", tipo)
        }, 1700);



    } else if (window.location.pathname.indexOf('/userProfile') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
        var firstName = name[0]
        deleteStorage64('userRegisterRelatives')

        var dataUserConttipo = getStorage64('dataUserCont')
        var tipo = dataUserConttipo.tipo
            // $('.userName').text(' ¡Hola ' + name + ' !')

        if (tipo == 1) {
            $('.card.registerFamily').show();
            $('.card.newNormal').show();
            $('.card.employData').show();
        } else {
            $('.card.registerFamily').hide();
            $('.card.newNormal').hide();
            $('.card.employData').hide();
        }


        if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            axiosDataCompany()
            axiosDataUser()
            axiosDataIMC()
            axiosDataDiseases()
            $('.userProfileNavBar').text(firstName)
            setTimeout(function() {
                dataUserCharge()
            }, 350)
        }
    } else if (window.location.pathname.indexOf('/clinicalProfile') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
        var firstName = name[0]
        if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            axiosDataCompany()
            axiosDataUser()
            axiosDataIMC()
            axiosDataDiseases()
            $('.userProfileNavBar').text(firstName)
            setTimeout(function() {
                dataSimptomsCharge()
            }, 350)
        }
    } else if (window.location.pathname.indexOf('/simptompsUpdate') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
            // deleteStorage64('userRedisParentT')
            // deleteStorage64('liveInHouse')
        var firstName = name[0]
        if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            axiosListDiseases()
            validateEmptySimptomps()
            $('.userProfileNavBar').text(firstName)
            setTimeout(function() {
                preChargeSimptompsData()
            }, 1000)
        }
    } else if (window.location.pathname.indexOf('/thankYouPage') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var dataCompanyCont = getStorage64('dataCompanyCont')

        var appU = getStorage64('userAppU')
        var name = getStorage64('userAppN').split(' ')
        var firstName = name[0]
        var userRegisterRelatives = getStorage64('userRegisterRelatives')
        if (userRegisterRelatives == "true") {
            redirectUrl('thankYouRegisterFamily')
        } else if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            
            var actionToRisk = getStorage64('actionToRisk')
            var colorRisk = actionToRisk.color
            var company = getStorage64('dataCompanyCont')
            var idEmployee = dataCompanyCont.empresa.id
            // console.log("compañia", company)
            axiosListActions(idEmployee, colorRisk)


            if (company !== "null") {
                var dataCompanyCont = getStorage64('dataCompanyCont')
                var empresaTelefono = dataCompanyCont.empresa.telefono
                var empresaCorreo = dataCompanyCont.empresa.correo
                $(".numberPhone").text(empresaTelefono);
                $(".sectionFooter > a").text(empresaCorreo);
                $(".sectionFooter > a").attr("href", "mailto:" + empresaCorreo).text(empresaCorreo);
                $("#policies > a").text("Politicas de privacidad");
            
            }

            axiosListDiseases()
            validateEmptySimptomps()
            $('.userProfileNavBar').text(firstName)
            setTimeout(function() {
                preChargeSimptompsData()
            }, 1000)
        }
    } else if (window.location.pathname.indexOf('/bmiUpdate') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
            // deleteStorage64('userRedisParentT')
            // deleteStorage64('liveInHouse')
        var firstName = name[0]
        if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            $('.userProfileNavBar').text(firstName)
            preChargeIMCData()
        }
    } else if (window.location.pathname.indexOf('/companyInfo') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
        var dataCompanyCont = getStorage64('dataCompanyCont')
        var firstName = name[0]
        if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            $('.userProfileNavBar').text(firstName)
            axiosDataCompany()
                //axiosCatGroup()
            if (dataCompanyCont != 'null') {
                var areaGroup = dataCompanyCont.grupo.nombre
                $("#selecGrupoReg").prop('disabled', true);
                $('#selecGrupoReg').val(areaGroup)

            }


            axiosCatCompany2(dataCompanyCont.grupo.id)
            axiosCatDepartment()
            setTimeout(function() {
                preSelectedCompany()
            }, 1500)

        }
    } else if (window.location.pathname.indexOf('/monitoring') !== -1) {
        /* console.log('page: monitoring') */
        /* var  b = getStorage64('userAppU') */
        axiosListSymptoms()
        axiosListReasons()
        var loginIn = getStorage64('userLoginSession')
        var userRegisterRelatives = getStorage64('userRegisterRelatives')
        if (loginIn !== "true" || userRegisterRelatives == "true") {
            //redirectUrl('home')
        } else {
            axiosPreChargeQuarantine()
            axiosPreChargeSyntoms()
        }
    } else if (window.location.pathname.indexOf('/recoveryPassword') !== -1) {
        console.log('page: recoveryPassword')
    } else if (window.location.pathname.indexOf('/updatePassword') !== -1) {
        try {
            var keyToken = getParams()['key']
            setTokenR = setStorage64('getTokenR', keyToken)
            emailUpPass = getStorage64('getTokenR', keyToken)
        } catch (e) {
            console.log('no hay parametros GET');
        }
    } else if (window.location.pathname.indexOf('/info.') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
        var firstName = name[0]
        if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            $('.userProfileNavBar').text(firstName)
            addImagesFAQs()
        }
    } else if (window.location.pathname.indexOf('/infoMobile') !== -1) {
        addImagesFAQs()
    } else if (window.location.pathname.indexOf('/thankYouRegisterFamily') !== -1) {
        sendNotificationToRegisterFamily()
    } else if (window.location.pathname.indexOf('/historyInfo') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
        var firstName = name[0]
        if (loginIn !== "true") {
            redirectUrl('home')
        } else {
            $('.userProfileNavBar').text(firstName)
            historicPage()
        }
    } else if (window.location.pathname.indexOf('/newNormal') !== -1) {
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
        var firstName = name[0]
        $('.userProfileNavBar').text(firstName)
    } else if (window.location.pathname.indexOf('/userProfile') !== -1) { // Nueva linea
        var loginIn = getStorage64('userLoginSession')
        var name = getStorage64('userAppN').split(' ')
        var firstName = name[0]
        $('.userName').text(' ¡Hola ' + name + ' !')
    }



    $('[name="passProtect"]').on('keypress', function(e) {
        if (e.which === 13 || e.keyCode === 13) { $('.btn.primario').trigger('click') }
    })


    $('input, select').focus(function() {
        var $this = $(this)
        $this.removeClass('error')
        $this.parent().removeClass('error')
    });
    $('.forTwo, forThree').on('click', function() {
        var $this = $(this)
        $this.removeClass('error')
    })

    $('.cerrarBtn').on('click', function() {
        $('.downloadAPP').remove()
    })

    if ($('main + .navBar').length >= 1) {
        $('main').addClass('menuFooter')
    }

    if (/Android/i.test(navigator.userAgent)) {
        $('.downloadIos').remove()
        if (window.location.pathname.indexOf('/home') !== -1) {
            $('.downloadAPP').remove()
            splashAndroid()
        }
    }


    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        $('.downloadAndroid').remove()
        $('.downloadA').remove()
    }


    if ($('.card.passwordProtect').length === 1) {
        setTimeout(function() {
                $('.card.passwordProtect .btn.primario').trigger('click')
            }, 700)
            /* console.log('passwordProtect activate') */
    }

    axiosCode()

    setTimeout(removeLoader, 2000)

    /* Window on load */
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(window).on('load', function() {
            removeLoader()
        })
    } else {
        removeLoader()
        $('body').on('click', '.toast', closeModals)
        document.addEventListener("DOMContentLoaded", function() {
            removeLoader()
        });
    }

    var fillSecondary = function(value) {
        axiosCatCompany2(value)
    }
    /* Resultados */
    thanYouResult()
});