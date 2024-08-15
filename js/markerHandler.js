AFRAME.registerComponent("markerhandler",{
    init: async function() {
        this.el.addEventListener("markerFound", () =>{
            console.log("Se encontro el marcador")
            this.handleMarkerFound();
        })
        this.el.addEventListener("markerLost", () =>{
            console.log("Se perdió el marcador");
            this.handleMarkerLost();
        })
    },
    handleMarkerFound: function(){
        //Cambiar la visibilidad del boton div
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";
        var ratingButton = document.getElementById("rating-button");
        var orderButton = document.getElementById("order-button");

        //usar los eventos de clic
        ratingButton.addEventListener("click", function(){
            swal({
                icon: "warning",
                title: "Calificar platillo",
                text: "Procesando calificación"
            })
        })

        orderButton.addEventListener("click", function(){
            swal({
                icon: "https://svgsilh.com/svg_v2/2730432.svg",
                title: "¡Gracias por su orden!",
                text: "¡Recibiras tu orden pronto!"
            })
        })
    },
    handleMarkerLost: function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";
    },
})