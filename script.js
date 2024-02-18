document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.accordeon').forEach(i => {
        i.firstElementChild.addEventListener("click", j => {
            if(i.lastElementChild.style.display!="grid"){
                i.lastElementChild.style.display = "grid";
                i.firstElementChild.firstElementChild.textContent = "expand_less"
            } else {
                i.lastElementChild.style.display = "none";
                i.firstElementChild.firstElementChild.style.transition = "0.5s"
                i.firstElementChild.firstElementChild.style.transition = "0.5s"
                i.firstElementChild.firstElementChild.textContent = "expand_more"
            }
        })
    })

    document.querySelectorAll(".paginasleidas").forEach(i => {

        //Para no poder poner mas paginas de las que hay en total
        if(Number(i.value) > Number(i.parentElement.children[2].value)){
            i.value = i.parentElement.children[2].value;
        }
        let paginastotalescosmere = Array.from(document.querySelectorAll(".paginastotales"))
            .reduce((x, y) => x + Number(y.value), 0);
        let paginasleidascosmere = Array.from(document.querySelectorAll(".paginasleidas"))
            .reduce((x, y) => x + Number(y.value), 0);
        let barracosmereinterior = document.getElementById("progresototaldentro");
        let barracosmereexterior = document.getElementById("progresototalfuera");
        
        document.getElementById("porcleido").innerHTML=`${Math.floor(1000*paginasleidascosmere/paginastotalescosmere)/10}%`;
        barracosmereinterior.style.width=`${Math.max(barracosmereexterior.offsetWidth * paginasleidascosmere/paginastotalescosmere, 36)}px`;
        barracosmereinterior.innerHTML=`<span id="resultado">${paginasleidascosmere}/${paginastotalescosmere}</span>`;
        
        //Paginas leidas por saga
        let paginastotalessaga = Array.from(i.parentElement.parentElement.parentElement
            .querySelectorAll(".paginastotales"))
            .reduce((x, y) => x + Number(y.value), 0);
        let paginasleidassaga = Array.from(i.parentElement.parentElement.parentElement
            .querySelectorAll(".paginasleidas"))
            .reduce((x, y) => x + Number(y.value), 0);
        let barrasagainterior = i.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0];
        let barrasagaexterior = i.parentElement.parentElement.parentElement.parentElement.nextElementSibling
            
        barrasagainterior.style.width=`${Math.max(barrasagaexterior.offsetWidth * paginasleidassaga/paginastotalessaga, 36)}px`;
        barrasagainterior.innerHTML=`<span id="resultado">${paginasleidassaga}/${paginastotalessaga}</span>`;
                    
        //Paginas leidas por libro
        let paginasleidaslibro = i.value;
        let paginastotaleslibro = i.parentElement.children[2].value;
        let barralibrointerior =  i.parentElement.nextElementSibling.children[0]
        let barralibroexterior =  i.parentElement.nextElementSibling
        barralibrointerior.style.width=`${Math.max(barralibroexterior.offsetWidth * paginasleidaslibro/paginastotaleslibro, 24)}px`;


            
        i.addEventListener("blur", j => {
            //Para no poder poner mas paginas de las que hay en total
            if(Number(j.target.value) > Number(j.target.parentElement.children[2].value)){
                console.log("Hola")
                j.target.value = j.target.parentElement.children[2].value;
            }
            //Paginas leidas totales
            let paginastotalescosmere = Array.from(document.querySelectorAll(".paginastotales"))
                .reduce((x, y) => x + Number(y.value), 0);
            let paginasleidascosmere = Array.from(document.querySelectorAll(".paginasleidas"))
                .reduce((x, y) => x + Number(y.value), 0);
            let barracosmereinterior = document.getElementById("progresototaldentro");
            let barracosmereexterior = document.getElementById("progresototalfuera");
            
            document.getElementById("porcleido").innerHTML=`${Math.floor(1000*paginasleidascosmere/paginastotalescosmere)/10}%`;
            barracosmereinterior.style.width=`${Math.max(barracosmereexterior.offsetWidth * paginasleidascosmere/paginastotalescosmere, 36)}px`;
            barracosmereinterior.innerHTML=`<span id="resultado">${paginasleidascosmere}/${paginastotalescosmere}</span>`;

            //Paginas leidas por saga
            let paginastotalessaga = Array.from(j.target.parentElement.parentElement.parentElement
                .querySelectorAll(".paginastotales"))
                .reduce((x, y) => x + Number(y.value), 0);
            let paginasleidassaga = Array.from(j.target.parentElement.parentElement.parentElement
                .querySelectorAll(".paginasleidas"))
                .reduce((x, y) => x + Number(y.value), 0);
            let barrasagainterior = j.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0];
            let barrasagaexterior = j.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling
                
            barrasagainterior.style.width=`${Math.max(barrasagaexterior.offsetWidth * paginasleidassaga/paginastotalessaga, 36)}px`;
            barrasagainterior.innerHTML=`<span id="resultado">${paginasleidassaga}/${paginastotalessaga}</span>`;
            
            //Paginas leidas por libro
            let paginasleidaslibro =j.target.value;
            let paginastotaleslibro = j.target.parentElement.children[2].value;
            let barralibrointerior =  j.target.parentElement.nextElementSibling.children[0]
            let barralibroexterior =  j.target.parentElement.nextElementSibling
            barralibrointerior.style.width=`${Math.max(barralibroexterior.offsetWidth * paginasleidaslibro/paginastotaleslibro, 24)}px`;
        })
    })
});

