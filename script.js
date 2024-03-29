document.addEventListener("DOMContentLoaded", function () {
	//Carga los valores guardados en cookies
	document.querySelectorAll(".paginasleidas").forEach(i => {
		adjudicaCookies(i);
	});

	//Generamos los valores de las barras y creamos el acordeon
	document.querySelectorAll(".accordeon").forEach(i => {
		i.firstElementChild.addEventListener("click", j => {
			if (i.lastElementChild.style.display != "grid") {
				i.lastElementChild.style.display = "grid";
				i.firstElementChild.firstElementChild.textContent = "expand_less";
				//Genera las barras de progreso de cada libro
				i.querySelectorAll(".paginasleidas").forEach(k => generabarralibro(k));
			} else {
				i.lastElementChild.style.display = "none";
				i.firstElementChild.firstElementChild.textContent = "expand_more";
			}
		});
		generabarrasaga(i.children[1]);
	});

	//Generamos la barra total
	generabarracosmere();

	let timer;

	function startTimer(elemento) {
		timer = setTimeout(() => {
			if (Number(elemento.value) > Number(elemento.parentElement.children[2].value)) {
				elemento.value = elemento.parentElement.children[2].value;
			}
			if (isNaN(Number(elemento.value))) {
				elemento.value = 0;
			}
			generabarralibro(elemento);
			generabarrasaga(elemento.parentElement.parentElement.parentElement);
			generabarracosmere();
			generacookie(
				elemento.parentElement.previousElementSibling.previousElementSibling,
				elemento,
				elemento.parentElement.children[2]
			);
		}, 500);
	}

	function resetTimer() {
		clearTimeout(timer);
	}

	function handleBlur(elemento) {
		let input = Number(elemento.value);

		let totalPages = Number(elemento.parentElement.children[2].value);

		if (input > totalPages) {
			input = totalPages;
			totalPages = input;
		}

		if (isNaN(input)) {
			input = 0;
		}


		console.log("paginas leidas " + input)
		console.log("paginas totales " +totalPages)

		generabarrasaga(elemento.parentElement.parentElement.parentElement);
		generabarralibro(elemento);
		generabarracosmere();
		generacookie(elemento.parentElement.previousElementSibling.previousElementSibling, elemento, elemento.parentElement.children[2]);
	}

	window.addEventListener("resize", i => {
		console.log("Hola")
		document.querySelectorAll(".paginasleidas").forEach(j => {
			generabarrasaga(j.parentElement.parentElement.parentElement);
			generabarralibro(j);
			generabarracosmere();
			generacookie(j.parentElement.previousElementSibling.previousElementSibling, j, j.parentElement.children[2]);
		})
	})

	//Funciones y event listeners para actualizar los datos de paginas leidas
	document.querySelectorAll(".paginasleidas").forEach(i => {
		i.addEventListener("keydown", function (event) {
			if (event.key !== " ") {
				if (!timer) {
					startTimer(i);
				} else {
					resetTimer();
					startTimer(i);
				}
			} else {
				resetTimer();
			}
			i.addEventListener("blur", handleBlur(i));
		});
	});

	document.querySelectorAll(".paginastotales").forEach(i => {
		i.addEventListener("keydown", function (event) {
			if (event.key !== " ") {
				if (!timer) {
					startTimer(i.parentElement.children[0]);
				} else {
					resetTimer();
					startTimer(i.parentElement.children[0]);
				}
			} else {
				resetTimer();
			}
			i.addEventListener("blur", handleBlur(i.parentElement.children[0]));
		});
	});

	//Funciones para generar barras
	function generabarralibro(elemento) {
		//Paginas leidas por libro
		let paginasleidaslibro = elemento.value;
		let paginastotaleslibro = elemento.parentElement.children[2].value;
		let barralibrointerior = elemento.parentElement.nextElementSibling.children[0];
		let barralibroexterior = elemento.parentElement.nextElementSibling;
		barralibrointerior.style.width = `${
			Math.max(paginasleidaslibro / paginastotaleslibro, 24 / barralibroexterior.offsetWidth) * 100
		}%`;
	}

	function generabarrasaga(elemento) {
		let paginastotalessaga = Array.from(elemento.querySelectorAll(".paginastotales")).reduce(
			(x, y) => x + Number(y.value),
			0
		);
		let paginasleidassaga = Array.from(elemento.querySelectorAll(".paginasleidas")).reduce(
			(x, y) => x + Number(y.value),
			0
		);

		let barrasagaexterior = elemento.parentElement.nextElementSibling;
		let barrasagainterior = document.createElement("div");
		barrasagainterior.classList = "progresosagadentro";

		let spansaga = document.createElement("span");
		spansaga.classList = "leidoytotal";
		spansaga.innerHTML = `${paginasleidassaga}/${paginastotalessaga}`;

		barrasagaexterior.innerHTML = "";
		barrasagaexterior.append(barrasagainterior);
		barrasagaexterior.append(spansaga);

		barrasagainterior.style.width = `${Math.min(
			barrasagaexterior.offsetWidth * (1 - paginasleidassaga / paginastotalessaga),
			barrasagaexterior.offsetWidth - 24
		)}px`;
	}

	function generabarracosmere() {
		let paginastotalescosmere = Array.from(document.querySelectorAll(".paginastotales")).reduce(
			(x, y) => x + Number(y.value),
			0
		);
		let paginasleidascosmere = Array.from(document.querySelectorAll(".paginasleidas")).reduce(
			(x, y) => x + Number(y.value),
			0
		);

		let barracosmereinterior = document.createElement("div");
		barracosmereinterior.id = "progresototaldentro";
		let barracosmereexterior = document.getElementById("progresototalfuera");

		let spancosmere = document.createElement("span");
		spancosmere.classList = "leidoytotal";
		spancosmere.innerHTML = `${paginasleidascosmere}/${paginastotalescosmere}`;

		barracosmereexterior.innerHTML = "";
		barracosmereexterior.append(barracosmereinterior);
		barracosmereexterior.append(spancosmere);

		document.getElementById("porcleido").innerHTML = `${
			Math.floor((1000 * paginasleidascosmere) / paginastotalescosmere) / 10
		}%`;
		barracosmereinterior.style.width = `${Math.min(
			barracosmereexterior.offsetWidth * (1 - paginasleidascosmere / paginastotalescosmere),
			barracosmereexterior.offsetWidth - 24
		)}px`;
	}

	//Funciones para generar y usar cookies
	function generacookie(nombreCookie, pagleidas, pagactuales) {
		let nombreInput = nombreCookie.textContent;
		let leido = pagleidas.value;
		let actual = pagactuales.value;
		document.cookie = nombreInput + "=" + leido + "/" + actual + "; expires=Thu, 31 Dec 2026 12:00:00 UTC; path=/";
	}

	function getCookie(nombre) {
		// Obtener todas las cookies del documento
		var cookies = document.cookie.split(";");

		// Iterar sobre las cookies para encontrar la que coincide con el nombre
		for (var j = 0; j < cookies.length; j++) {
			var cookie = cookies[j];
			// Eliminar espacios en blanco al principio y al final de la cookie
			while (cookie.charAt(0) === " ") {
				cookie = cookie.substring(1);
			}
			// Verificar si la cookie comienza con el nombre buscado
			if (cookie.indexOf(nombre + "=") === 0) {
				// Devolver el valor de la cookie
				return cookie.substring(nombre.length + 1, cookie.length);
			}
		}
		// Si no se encuentra la cookie, devolver null
		return "";
	}

	function adjudicaCookies(elemento) {
		let leidasbarratotal = getCookie(
			elemento.parentElement.previousElementSibling.previousElementSibling.textContent
		);
		elemento.value = leidasbarratotal === "" ? 0 : leidasbarratotal.split("/")[0];
		elemento.parentElement.children[2].value =
			leidasbarratotal === "" ? elemento.parentElement.children[2].value : leidasbarratotal.split("/")[1];
	}
});
