document.addEventListener("DOMContentLoaded", function() {
    console.log("hola")
    document.querySelectorAll('.accordeonhead').forEach(i => {
        console.log(i)
        i.firstElementChild.addEventListener("click", j => {
            if(i.lastElementChild.style.display!="grid"){
                i.lastElementChild.style.display = "grid";
            } else {
                i.lastElementChild.style.display = "none";
            }
        })
    })

});


