<!-- VIDEO HIDDEN AND LOOP CONTROL -->
<script>
jQuery(document).ready(function() {
    if (jQuery('.lwp-video-autoplay .et_pb_video_box').length !== 0) {
        jQuery('.lwp-video-autoplay .et_pb_video_box').find('video').prop('muted', true);
        jQuery(".lwp-video-autoplay .et_pb_video_box").find('video').attr('loop', 'loop');
        jQuery(".lwp-video-autoplay .et_pb_video_box").find('video').attr('playsInline', '');
 
        jQuery(".lwp-video-autoplay .et_pb_video_box").each(function() {
            jQuery(this).find('video').get(0).play();
        });
        jQuery('.lwp-video-autoplay .et_pb_video_box').find('video').removeAttr('controls');
    }
});
</script></script>


<!-- Js to async place CUPOS - FECHAS - COOKIES -->

<script type="text/javascript">
setTimeout(init, 800);

function init(){
/********crear fecha *******/
     fecha();

/***** Cupo Members ******/
	var cookieBar = readCookie("viewStind") | 0;
	var cookieTimer = 7; //days

	var adsRT = getQueryVariable("rt"); //link ur ?rt query
	var cookieAdsRT = readCookie("viewStindRT") | 0;
	var cuposRT = 3;


	/*Elementor bar porcent Divi*/
	var BarIdenty = jQuery(document).find('#cupobar .et_pb_counter_amount');
	var dataBarIdenty = BarIdenty.data('width').split("%")[0]; //porcentaje de barra
	var dataBarIdentyText = BarIdenty.find('.et_pb_counter_amount_number_inner');


	var tCupos = jQuery(document).find('#lettering-cupos .lcupos');
	var cCupos = parseInt(tCupos[0].innerText.split(" ")[0]);//new cupos
	var titleBar = jQuery(document).find('#cupobar .et_pb_counter_title');
	//var titleBarNum = parseInt(titleBar[0].innerText.split(" ")[0]); // número cupos disponibles debe estar delante
	var tDisponible = jQuery(document).find('#lettering-cupos .ldisponible');
	var cDisponible = tDisponible[0].innerText;
	var numberGrow; //porciento de aumento
	var totalPlazas = totalCupos(cCupos, dataBarIdenty);
	//console.log("totlaPlazas: "+ totalPlazas);

	var letraCupo = "CUPOS";

	if(adsRT || cookieAdsRT){
		var conteo = Math.round(cuposRT - cookieAdsRT);
		
		if(conteo <= 1){
			conteo = 1;
			letraCupo = "CUPO";
			cDisponible ="DISPONIBLE";
		}else{
			letraCupo = "CUPOS";
		}
		tDisponible.text(cDisponible);
		tCupos.text(conteo +" "+letraCupo);
		titleBar.text("99" + "% VENDIDO");
		//console.log(newlessCupos()+" CUPOS DISPONIBLES | " + newGrow() + "% VENDIDO");
		setTimeout(function(){
			BarIdenty.css("width", "99%");
			dataBarIdentyText.text("99%");
		}, 1200);
		
		//console.log("suma :" + Math.round(adsRT+1));
		createCookie("viewStindRT", cookieAdsRT + 1 , cookieTimer);
	}
	else if(cookieBar){
		createCookie("viewStind", cookieBar + 1 , cookieTimer);
		/*To do*/
		if(cookieBar >= 1){
			var numberGrow = getRandomInt(3,5); //porciento de aumento 1 visita
		}if(cookieBar == 2){
			var numberGrow = getRandomInt(6,9); //porciento de aumento 2 visita
		}if(cookieBar == 3){
			var numberGrow = getRandomInt(10,12); //porciento de aumento 3 visita
		}if(cookieBar > 3){
			var numberGrow = 12; //porciento de aumento 4 visita
		}
		if(newlessCupos <= 1){
				letraCupo = "CUPO";
				cDisponible = "DISPONIBLE";
		}else{
			letraCupo = "CUPOS";
		}
		//console.log("numberGrown: " + numberGrow);
		tDisponible.text(cDisponible);
		tCupos.text(newlessCupos() +" "+letraCupo);
		titleBar.text(newGrow() + "% VENDIDO");
		//console.log(newlessCupos()+" CUPOS DISPONIBLES | " + newGrow() + "% VENDIDO");
		BarIdenty.css("width", newGrow()+"%");
		dataBarIdentyText.text(newGrow() + "%");		
	}else{
		createCookie("viewStind", cookieBar + 1, cookieTimer);
	}


	function totalCupos(cupos, porciento){
		var por = (100 - porciento)/100;
		return Math.round(cupos / por);
	}
	function newGrow(){
		var result = numberGrow + parseInt(dataBarIdenty);

		if(result >= 100){
			return 99;
		}else{
			return result;
		}
	}

	function newlessCupos(){
		var cVendidos = (numberGrow /100) * totalPlazas/*totalPlazas*/;
		//return parseInt(cVendidos);
		var result = parseInt(cCupos - cVendidos);
		if(result <= 0){
			return 1;
		}else{
			return result;
		}
	}

	/*** Function Random number ***/
	function getRandomInt(min, max) {
	   return Math.round(Math.random() * (max - min) + min);
	}

	/****** Cookie Value Create ****/
	function getQueryVariable(variable)
		{
	       var query = window.location.search.substring(1);
	       var vars = query.split("&");
	       for (var i=0;i<vars.length;i++) {
	               var pair = vars[i].split("=");
	               if(pair[0] == variable){return pair[1];}
	       }
		       return(false);
		}

	function createCookie(name,value,days,sameSites) {
			
			if(sameSites){
				var sites = ";SameSite" + sameSites;
			}else{
				var sites = ";SameSite=Strict";
			}

			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else {
				var expires = "";
			}
			document.cookie = name+"="+value+expires+"; path=/"+sites;
		}

	function readCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}

	function eraseCookie(name) {
			createCookie(name,"",-1);
		}

	function fecha() {
	  var d = new Date();
	  var month = new Array();
	    month[0] = "Enero";
	    month[1] = "Feberero";
	    month[2] = "Marzo";
	    month[3] = "Abril";
	    month[4] = "Mayo";
	    month[5] = "Junio";
	    month[6] = "Julio";
	    month[7] = "Agosto";
	    month[8] = "Septiembre";
	    month[9] = "Octubre";
	    month[10] = "Noviembre";
	    month[11] = "Deciembre";
	    var n = month[d.getMonth()];
	    var datefull = d.getDate() + " de " + n + " " + d.getFullYear();
	    var todaySale = document.getElementById("todaySale");
	     if(todaySale){
	        todaySale.innerHTML = datefull;
	        //console.log(d.getDate());
	      }
	   }     

    }
</script>
