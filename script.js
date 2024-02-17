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
            console.log("Hola")
            i.value = i.parentElement.children[2].value;
        }
        //Paginas leidas totales
        let paginastotalescosmere = Array.from(document.querySelectorAll(".paginastotales"))
            .reduce((x, y) => x + Number(y.value), 0);
        let paginasleidascosmere = Array.from(document.querySelectorAll(".paginasleidas"))
            .reduce((x, y) => x + Number(y.value), 0);
        document.getElementById("progresototaldentro").innerHTML=`<span id="resultado">${paginasleidascosmere}/${paginastotalescosmere}</span>`
        document.getElementById("porcleido").innerHTML=`${Math.floor(1000*paginasleidascosmere/paginastotalescosmere)/10}%`;
        document.getElementById("progresototaldentro").style.width=`${Math.floor(1000*paginasleidascosmere/paginastotalescosmere)/10}%`
        
        //Paginas leidas por saga
        let paginastotalessaga = Array.from(i.parentElement.parentElement.parentElement
            .querySelectorAll(".paginastotales"))
            .reduce((x, y) => x + Number(y.value), 0);
        let paginasleidassaga = Array.from(i.parentElement.parentElement.parentElement
            .querySelectorAll(".paginasleidas"))
            .reduce((x, y) => x + Number(y.value), 0);
        i.parentElement.parentElement.parentElement.parentElement.nextElementSibling
            .querySelector(".progresosagadentro")
            .style.width=`${Math.floor(1000*paginasleidassaga/paginastotalessaga)/10}%`;
        i.parentElement.parentElement.parentElement.parentElement.nextElementSibling
            .querySelector(".progresosagadentro")
            .innerHTML=`<span id="resultado">${paginasleidassaga}/${paginastotalessaga}</span>`;
                    
        //Paginas leidas por libro
        let paginasleidaslibro =i.value;
        let paginastotaleslibro = i.parentElement.children[2].value;
        console.log(paginastotaleslibro, paginasleidaslibro)
        i.parentElement.nextElementSibling.children[0]
            .style.width=`${Math.floor(1000*paginasleidaslibro/paginastotaleslibro)/10}%`;

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
            document.getElementById("progresototaldentro").innerHTML=`<span id="resultado">${paginasleidascosmere}/${paginastotalescosmere}</span>`
            document.getElementById("porcleido").innerHTML=`${Math.floor(1000*paginasleidascosmere/paginastotalescosmere)/10}%`;
            document.getElementById("progresototaldentro").style.width=`${Math.floor(1000*paginasleidascosmere/paginastotalescosmere)/10}%`

            //Paginas leidas por saga
            let paginastotalessaga = Array.from(j.target.parentElement.parentElement.parentElement
                .querySelectorAll(".paginastotales"))
                .reduce((x, y) => x + Number(y.value), 0);
            let paginasleidassaga = Array.from(j.target.parentElement.parentElement.parentElement
                .querySelectorAll(".paginasleidas"))
                .reduce((x, y) => x + Number(y.value), 0);
            j.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling
                .querySelector(".progresosagadentro")
                .style.width=`${Math.floor(1000*paginasleidassaga/paginastotalessaga)/10}%`;
            j.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling
                .querySelector(".progresosagadentro")
                .innerHTML=`<span id="resultado">${paginasleidassaga}/${paginastotalessaga}</span>`;
            
            //Paginas leidas por libro
            let paginasleidaslibro =j.target.value;
            let paginastotaleslibro = j.target.parentElement.children[2].value;
            console.log(paginastotaleslibro, paginasleidaslibro)
            j.target.parentElement.nextElementSibling.children[0]
                .style.width=`${Math.floor(1000*paginasleidaslibro/paginastotaleslibro)/10}%`;
        })
    })
});
