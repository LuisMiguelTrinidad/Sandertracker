document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.accordeon').forEach(i => {
        i.firstElementChild.addEventListener("click", j => {
            if(i.lastElementChild.style.display!="grid"){
                i.lastElementChild.style.display = "grid";
                i.firstElementChild.firstElementChild.textContent = "expand_less"
            } else {
                i.lastElementChild.style.display = "none";
                i.firstElementChild.firstElementChild.textContent = "expand_more"
            }
        })
    })

    document.querySelectorAll(".paginasleidas").forEach(i => {

		//Para no poder poner mas paginas de las que hay en total
		if(Number(i.value) > Number(i.parentElement.children[2].value)){
			i.value = i.parentElement.children[2].value;
		}		

		adjudicaCookies();
		generabarrasaga();
		generabarralibro();
		generabarracosmere();

		function generabarracosmere(){
			let paginastotalescosmere = Array.from(document.querySelectorAll(".paginastotales"))
            	.reduce((x, y) => x + Number(y.value), 0);
        	let paginasleidascosmere = Array.from(document.querySelectorAll(".paginasleidas"))
				.reduce((x, y) => x + Number(y.value), 0);

			let barracosmereinterior = document.createElement("div");
			barracosmereinterior.id="progresototaldentro";
			let barracosmereexterior = document.getElementById("progresototalfuera");

			let spancosmere = document.createElement("span");
			spancosmere.classList  = "leidoytotal"
			spancosmere.innerHTML = `${paginasleidascosmere}/${paginastotalescosmere}`;
			
			barracosmereexterior.innerHTML = "";			
			barracosmereexterior.append(barracosmereinterior)
			barracosmereexterior.append(spancosmere);			
			
			document.getElementById("porcleido").innerHTML=`${Math.floor(
				1000*paginasleidascosmere/paginastotalescosmere
			)/10}%`;
			barracosmereinterior.style.width=`${Math.min(
				barracosmereexterior.offsetWidth * (1 - paginasleidascosmere/paginastotalescosmere), 
				barracosmereexterior.offsetWidth - 24)
			}px`;
		}

		function generabarrasaga(){
			let paginastotalessaga = Array.from(i.parentElement.parentElement.parentElement
				.querySelectorAll(".paginastotales"))
				.reduce((x, y) => x + Number(y.value), 0);
			let paginasleidassaga = Array.from(i.parentElement.parentElement.parentElement
				.querySelectorAll(".paginasleidas"))
				.reduce((x, y) => x + Number(y.value), 0);

			let barrasagaexterior = i.parentElement.parentElement.parentElement.parentElement.nextElementSibling
			let barrasagainterior = document.createElement("div");
			barrasagainterior.classList="progresosagadentro";
			
			let spansaga = document.createElement("span");
			spansaga.classList  = "leidoytotal"
			spansaga.innerHTML = `${paginasleidassaga}/${paginastotalessaga}`;
			
			barrasagaexterior.innerHTML = "";
			barrasagaexterior.append(barrasagainterior)
			barrasagaexterior.append(spansaga);

			barrasagainterior.style.width=`${Math.min(
				barrasagaexterior.offsetWidth * (1 - paginasleidassaga/paginastotalessaga), 
				barrasagaexterior.offsetWidth - 24)
			}px`;
		}

		function generabarralibro(){
			//Paginas leidas por libro
			let paginasleidaslibro = i.value;
			let paginastotaleslibro = i.parentElement.children[2].value;
			let barralibrointerior =  i.parentElement.nextElementSibling.children[0]
			let barralibroexterior =  i.parentElement.nextElementSibling
			barralibrointerior.style.width=`${Math.max(
				barralibroexterior.offsetWidth * paginasleidaslibro/paginastotaleslibro - 6, 24
			)}px`;
		}

		function generacookie(){
			let nombreInput = i.parentElement.previousElementSibling.previousElementSibling.textContent
			let leido = i.value
			let actual = i.parentElement.children[2].value;
			document.cookie = nombreInput + "=" + leido + "/" + actual + "; expires=Thu, 31 Dec 2026 12:00:00 UTC; path=/";
		}

		function getCookie(nombre) {
			// Obtener todas las cookies del documento
			var cookies = document.cookie.split(';');
			
			// Iterar sobre las cookies para encontrar la que coincide con el nombre
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i];
				// Eliminar espacios en blanco al principio y al final de la cookie
				while (cookie.charAt(0) === ' ') {
					cookie = cookie.substring(1);
				}
				// Verificar si la cookie comienza con el nombre buscado
				if (cookie.indexOf(nombre + '=') === 0) {
					// Devolver el valor de la cookie
					return cookie.substring(nombre.length + 1, cookie.length);
				}
			}
			// Si no se encuentra la cookie, devolver null
			return "";
		}

		function adjudicaCookies(){
			let leidasbarratotal = getCookie(i.parentElement.previousElementSibling.previousElementSibling.textContent);
			i.value = leidasbarratotal===""?0:leidasbarratotal.split("/")[0];
			i.parentElement.children[2].value = leidasbarratotal===""?i.parentElement.children[2].value:leidasbarratotal.split("/")[1];
		}

		let timer;
            
		function startTimer() {
			timer = setTimeout(() => {
				if (Number(i.value) > Number(i.parentElement.children[2].value)) {
					i.value = i.parentElement.children[2].value;
				}
				if (isNaN(Number(i.value))) {
					i.value = 0;
				}
				generabarrasaga();
				generabarralibro();
				generabarracosmere();
				generacookie();
			}, 500);
		}
		function resetTimer() {
			clearTimeout(timer);
		}

		i.addEventListener("keydown", function(event) {
			if (event.key !== " ") {
				if (!timer) {
					startTimer();
				} else {
					resetTimer();
					startTimer(); 
				}
			} else {
				resetTimer(); 
			}
		});

		function handleBlur(event) {
			const input = event.target;
			const totalPages = Number(input.parentElement.children[2].value);
		
			if (Number(input.value) > totalPages) {
				input.value = totalPages;
			}
		
			if (isNaN(Number(input.value))) {
				input.value = 0;
			}
		
			generabarrasaga();
			generabarralibro();
			generabarracosmere();
			generacookie();
		}
		
		i.addEventListener("blur", handleBlur);
		i.parentElement.children[2].addEventListener("blur", handleBlur);		
    });
	document.querySelectorAll(".paginastotales").forEach(i => {
		let timer;
            
		function startTimer() {
			timer = setTimeout(() => {
				if (Number(i.parentElement.children[0].value) > Number(i.value)) {
					i.parentElement.children[0].value = i.value;
				}
				if (isNaN(Number(i.value))) {
					i.value = 0;
				}
				generabarrasaga();
				generabarralibro();
				generabarracosmere();
				generacookie();
			}, 500);
		}
		function resetTimer() {
			clearTimeout(timer);
		}

		i.addEventListener("keydown", function(event) {
			if (event.key !== " ") {
				if (!timer) {
					startTimer();
				} else {
					resetTimer();
					startTimer(); 
				}
			} else {
				resetTimer(); 
			}
		});
	});
});

