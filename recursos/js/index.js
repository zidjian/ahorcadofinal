let btnInicar = document.getElementById('iniciar_juego');
let modal = document.querySelector('.estado');
const mostrar_mensaje = document.getElementById("mensaje");
const ahorcado_img = document.getElementById("ahorcado_img");
const mostrar_cadena = document.getElementById("palabra");
let btn_teclado = document.querySelectorAll('.btn');
let intentos = 6;


let estadoJuego = true;
let cadenaElegida = [];
let cadenaFormateada= [];
let cadenaEstado = [];

let cadenas = [
    'Mi abuela cocinó fideos con estofado',
    'El sol saldrá manana',
    'Damián se cortó el pelo',
    'Mi tía fue al supermercado en el auto',
    'Me compré una bicicleta nueva',
    'Tengo turno con el dentista mañana',
    'Mañana nos vamos de campamento',
    'El intendente fue reelecto'
];

btnInicar.addEventListener( 'click', iniciar );

// btn_teclado.addEventListener( 'click', miLetra, false );
btn_teclado.forEach(btn => {
    let letra = btn.textContent;
    btn.addEventListener('click', function( event ) {
        btn.setAttribute("disabled", "");
        comprobarLetra( letra );
    } );
});

function comprobarLetra( letra ) {
    let correcto = false;
    cadenaElegida.map( function( valor, index ) {
        if( valor == letra ) {
            cadenaEstado[index] = letra;
            correcto = true;
        }
    } );
    if( correcto == true) {
        mostrar_mensaje.innerHTML = 'Letra correcta';
    } else {
        intentos--;
        if ( intentos == 0 ) {
            finJuego( 'game_over' );
        }
        mostrar_mensaje.innerHTML = 'Letra incorrecta. Intentos restantes: ' + intentos;
        ahorcado_img.setAttribute('src', 'recursos/img/ahorcado' + ( 7 - intentos ) + '.png');
    }
    console.log( intentos );
    mostrarCadena();
    comprobarGanador();
}

function iniciar() {
    intentos = 6;
    ahorcado_img.setAttribute('src', 'recursos/img/ahorcado' + ( 7 - intentos ) + '.png');
    if( estadoJuego == true ) {
        modal.style.display = 'none';
        estado = false;
        console.log('iniciado');
    }

    let valorAzar = Math.floor( Math.random() * cadenas.length );
    cadenaElegida = reemplazarAcentos(cadenas[valorAzar]);
    cadenaElegida = cadenaElegida.toUpperCase();
    cadenaFormateada = [cadenaElegida]
    cadenaElegida = cadenaElegida.split('');
    let cantidadPalabras = cadenaElegida.length;

    inicializarCadena( cadenaElegida );
    mostrarCadena();    
}

function inicializarCadena() {
    for( let i = 0; i < cadenaElegida.length; i++ ) {
        if( cadenaElegida[i] != ' ' ) {
            cadenaEstado[i] = '';
        } else {
            cadenaEstado[i] = '*';
        }
    }
}

function mostrarCadena() {
    let mensaje = '';
    for( let i = 0; i < cadenaElegida.length; i++ ) {
        if( cadenaElegida[i] != ' ' ) {
            mensaje += '<li class="con_palabra">' + cadenaEstado[i] + '</li>';
        } else {
            mensaje += '<li> </li>';
        }
    }
    mostrar_cadena.innerHTML = mensaje;
}

function reemplazarAcentos(cadena) { // Se inicializa la funcion par quitar los acentos
    let cambiar = {
        "á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",
        "à":"a", "è":"e", "ì":"i", "ò":"o", "ù":"u", "ñ":"n",
        "Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U",
        "À":"A", "È":"E", "Ì":"I", "Ò":"O", "Ù":"U", "Ñ":"N"}; // Se crea un diccionario con las palabra con trilde y sin tilde par remplazarlas
    let tildes = /[áàéèíìóòúùñ]/ig;  // La varaible que contiene las letras con tilde
    let cadena_normal=cadena.replace(tildes,function(e){return cambiar[e]}); // remplaza la palabra con la cadena
    return cadena_normal; // devuelve la cadena
}

function comprobarGanador() {
    let gano = true;
    let cadena_con_espacios = [];
    let cadena = '';
    cadenaElegida.map( function( valor, index ) {
        if( valor == ' ' && cadenaEstado[index] == '*' ) {
            cadena_con_espacios[index] = ' ';
        } else if( valor == cadenaEstado[index] ) {
            cadena_con_espacios[index] = valor;
        }
    } );
    cadena = cadena_con_espacios.join('');

    if( cadenaFormateada.indexOf( cadena ) == -1 ) {
        gano = false;
    } else {
        gano = true;
        finJuego( gano );
    }
}

function finJuego( estado ) {
    btn_teclado.forEach(btn => {
        btn.removeAttribute("disabled");
    });
    cadenaElegida = [];
    cadenaEstado = [];
    if( estado == true ) {
        modal.style.display = 'flex';
        modal.querySelector('h2').innerHTML = 'Ganaste el juego del ahorcado';
        modal.querySelector('button').innerHTML = 'Nuevo juego';
        estadoJuego = true;
    } else if( estado == 'game_over' ) {
        modal.style.display = 'flex';
        modal.querySelector('h2').innerHTML = 'Perdiste el juego del ahorcado';
        modal.querySelector('button').innerHTML = 'Reintentar juego';
        estadoJuego = true;
    }
}