document.addEventListener("DOMContentLoaded", function() {
    let titulos = [...document.getElementsByClassName('titulo')];
    titulos.forEach(k => console.log(k.innerHTML));
});