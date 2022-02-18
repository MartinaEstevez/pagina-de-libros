
class Persona {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}


//js FORM
const form = $("#form");
const username = $("#username");
const email = $("#email");
const password = $("#password");
const password2 = $("#password2");

// al clikear submit no se recarga la pagina, y si no hay errores se hace el registro del usuario
form.on("submit", e => {
    e.preventDefault();
	
    if(!checkErrors()){
        const persona1 = new Persona(username.val(), email.val());
        window.localStorage.setItem('user', JSON.stringify(persona1));
        $(".welcome-h2").html("Welcome " + username.val());
        $(".container-welcome").css("display" , "block");
        $(".welcome-h2").css("display" , "block");
        $(".animation").css("display" , "block");
        $(".loginForm").css("display" , "none");
    }
})

const checkErrors = () => {
    let isError = false
    const usernameValue = username.val();
    const emailValue = email.val();
    const passwordValue = password.val();
    const password2Value = password2.val();

	if(usernameValue === '') {
        isError = true;
		setErrorFor(username, 'Debe ingresar un nombre de usuario');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
        isError = true;
		setErrorFor(email, 'Debe ingresar un email');
	} else if (!isEmail(emailValue)) {
        isError = true;
		setErrorFor(email, 'El email no es valido');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
        isError = true;
		setErrorFor(password, 'Debe ingresar su contraseña');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
        isError = true;
		setErrorFor(password2, 'Debe ingresar la contraseña');
	} else if(passwordValue !== password2Value) {
        isError = true;
		setErrorFor(password2, 'La contraseña no coincide');
	} else{
		setSuccessFor(password2);
	}

    return isError
}

const setErrorFor = (input, message) =>{
    const formControl = input.parent();
	const small = formControl.find('small');
	formControl.attr("class", "form-control error");
    small.text(message);
}

const setSuccessFor = (input) => {
	const formControl = input.parent();
	formControl.attr("class", "form-control success");
}
	
const isEmail = (email) => {
	return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    )}


// para que al recargar la ventana se aplique lo asignado
$(window).on("load", ()=>{
    const loggedUser = window.localStorage.getItem("user")
    const user = JSON.parse(loggedUser)
    if (!user){
        $(".welcome-h2").css("display" , "none");
        $(".container-welcome").css("display" , "none");
        $(".loginForm").css("display" , "block");
    } else{
        $(".welcome-h2").html("Welcome " + user.name);
        $(".container-welcome").css("display" , "block");
        $(".animation").css("display" , "block");
    }
})

