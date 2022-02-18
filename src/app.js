// para cambiar la pagina de Dark Mode a Light Mode
const toggleModeBtn = $("#toggleModeBtn");
const background = $("#background");

const toggleMode = () => {
    const isDark = window.localStorage.getItem("isDark");
    if (isDark === "false") {
        background.css("background-color", "black");
        toggleModeBtn.css("background-color", "white"); 
        $(".cardText").css("color" , "white");
        toggleModeBtn.css("color", "black"); 
        toggleModeBtn.html("Light Mode");
    } else {
        background.css("background-color", "white");
        toggleModeBtn.css("background-color", "black"); 
        $(".cardText").css("color" , "black");
        toggleModeBtn.css("color", "white"); 
        toggleModeBtn.html("Dark Mode");
    }
    window.localStorage.setItem("isDark" , isDark === "true" ? "false" : "true");
}

if (toggleModeBtn){
    toggleModeBtn.on("click", toggleMode);
}


// A traves de un boton, se habre un modal con la lista de clientes
const URLGET = "https://jsonplaceholder.typicode.com/users"

$("#abrirModal").on("click", ()=> {
    $.ajax({
        method: "GET",
        url:  URLGET,
        success: function(respuesta){
                let users = respuesta;
                for (const user of users) {
                  $(".modal-body").prepend(`<div>
                                       <h6>${user.name}</h6>
                                       <p> ${user.email}</p>
                                      </div>`);
                }  
              
        }
    });
} ) 


//El titulo hace un fadeIn
$(".inicio-p").css("display", "none");
$(".inicio-p").fadeIn();


$(window).on("load", ()=>{
    const isDark = window.localStorage.getItem("isDark");
    if (isDark === "true") {
        background.css("background-color", "black");
        toggleModeBtn.css("background-color", "white"); 
        $(".cardText").css("color" , "white");
        toggleModeBtn.css("color", "black"); 
        toggleModeBtn.html("Light Mode");
    } else {
        background.css("background-color", "white");
        toggleModeBtn.css("background-color", "black"); 
        $(".cardText").css("color" , "black");
        toggleModeBtn.css("color", "white"); 
        toggleModeBtn.html("Dark Mode");
    }
})


// Get shoppingCart modal y comprar modal
const buyModal = $("#buyModal");
const closeShoppingCart = $("#closeShoppingCart");
const closeBuyModal = $("#closeBuyModal");
const btnCancelar = $("#btnCancelar");
const shoppingCartModal = $("#shoppingCartModal");

const mostrarCarrito = () => {
    shoppingCartModal.css("display", "block");
    let shoppingCartJSON = window.localStorage.getItem("shoppingCart");
    let shoppingCart = JSON.parse(shoppingCartJSON);
    if(shoppingCart){
        $(".libros").html("");
        for (const libro of shoppingCart.libros) {
        $(".libros").prepend(`<div>
                             <span>${libro.titulo}</span>
                             <soan>${libro.autor}</span>
                             <span>${libro.precio}</span>
                            </div>`);
      }
    }else{
        $(".libros").html("<div><p>Todavia no he comprado nada.</p></div>");
    }
}


//Cuando se clickea "comprar" se hable un modal
const comprar = (titulo , autor , precio) =>{
    buyModal.css("display", "block");
   $(".modal-title").html(titulo);
   $(".modal-autor").html(autor);
   $(".modal-precio").html(precio);
   $("#btnComprar").off("click").on("click", ()=>{
       let shoppingCartJSON = window.localStorage.getItem("shoppingCart");
       let shoppingCart = JSON.parse(shoppingCartJSON);
       if(shoppingCart){
           shoppingCart.libros.push({
               titulo,
               autor,
               precio,
           })
       }else{
           shoppingCart = {
               libros: [{
                titulo,
                autor,
                precio,
            }]
           }
       }
       window.localStorage.setItem("shoppingCart" , JSON.stringify(shoppingCart))
       buyModal.css("display", "none");
   })
}


// Cuando se clicklea "cancelar" se cierra el modal
if (btnCancelar){
    btnCancelar.on("click", () => {
        buyModal.css("display", "none");
    })
}

// Cuando se clicklea <spam> (X) se cierra el modal
if (closeShoppingCart){
    closeShoppingCart.on("click", () => {
        shoppingCartModal.css("display", "none");
    })
}

if (closeBuyModal){
    closeBuyModal.on("click", () => {
        buyModal.css("display", "none");
    })
}

// Cuando se clickea en cualquier lugar fuera del modal, este se cierra
buyModal.on("click", (event) =>{
    if (event.target.id === "buyModal") {
        buyModal.css("display", "none");
    } 
})

shoppingCartModal.on("click", (event) =>{
    if (event.target.id === "shoppingCartModal") {
        shoppingCartModal.css("display", "none");
    } 
})
