// DESARROLLO DE UNA PLATAFORMA DE ALQUILER DE MOTOS.

var clientsList = [];
var nombre1 = ""
var correo1 = ""
var weeksEntry = ""

function show(){
      
        // Capturamos los datos del cliente y la reserva
        var nombre1 = document.getElementById("nombre1").value;
        var correo1 = document.getElementById("correo1").value;
        var bikes = parseInt(document.getElementById("selectBike").value);
        var weeksEntry = parseInt(document.getElementById("rentTime").value);
        var geoLoc = ("Palma de Mallorca");
        var extraHelmet = document.getElementById("helmet").value;
        if (nombre1 != "" && correo1 != "" && weeksEntry != ""){
     class Moto {
       constructor (marca, modelo, cilindrada, precio){
    
      this.marca = marca;
      this.modelo = modelo;
      this.cilindrada = cilindrada;
      this.precio = precio;
      
      this.disponible = true;
      this.eliminar = () => {
         this.disponible = false;
        }
      }
    }
    // OBJETO YAMAHA
    const yamaha = new Moto ("Yamaha", "dMax", 300, 175);
    //OBJETO HONDA
    const honda = new Moto ("Honda", "PCX", 125, 140);
    //OBJETO APRILIA
    const aprilia = new Moto ("Aprilia", "Motard", 150, 155);
    //OBJETO KAWASAKI
    const kawasaki = new Moto ("Kawasaki", "Ninja", 650, 400);
    //OBJETO VESPA
    const vespa = new Moto ("Vespa", "Primavera", 125, 125);

    // Asignacion del objeto moto a la eleccion del cliente
    if (bikes === 1){
        var moto = yamaha;
    } else if (bikes === 2){
       moto = honda;
    } else if (bikes === 3){
       moto = aprilia;
    } else if (bikes === 4){
       moto = kawasaki;
    } else if (bikes === 5){
       moto = vespa;
    }
    class Cliente {
     constructor (nombre, correo){
         this.nombre = nombre;
         this.correo = correo;
         this.newMoto = null;

         this.addMoto = () => {
                if ( moto.disponible ) {
                    this.newMoto = moto;
                    moto.eliminar();
                } else {
                    console.log(`La moto no esta disponible`);
                }
            
         this.informeInterno = () => {
                 console.log(`INFORMACION ALQUILER\n\nDATOS CLIENTE\nNombre: ${nombre1} \nCorreo electronico: ${correo1}\n\nDATOS VEHICULO\nMarca: ${this.newMoto.marca}\nModelo: ${this.newMoto.modelo}\nCilindrada: ${this.newMoto.cilindrada}\nFecha de alquiler: ${fechaHoy}\nFecha devolucion: ${devolucion}`)
            }
        }
      }
    }
        const cliente1 = new Cliente(nombre1, correo1);

    // Asignamos valor a la variable "extraHelmet" usando un operador ternario
    extraHelmet === ("si") ? extraHelmet = 10 : extraHelmet = 0;

/*
Incorporé la libreria  Luxon  para manipulación de fechas. ya que anteriormente usaba el objeto Date de JS y era 
bastante extenso. Al usar Luxon logre el mismo resultado ahorrando cerca de 10 lineas de codigo.
*/
    DateTime = luxon.DateTime;
    var fechaHoy = DateTime.now()
    fechaHoy = (fechaHoy.toFormat('dd LLL yyyy'));
    var devolucion = (DateTime.now().plus({ days: (weeksEntry * 7) }));
    devolucion = (devolucion.toFormat('dd LLL yyyy'));
    devolucion = devolucion.toLocaleString();
   
    //-----------------------------------------------------
    cliente1.addMoto();
    cliente1.informeInterno();
    //-----------------------------------------------------
    // Mostramos el resumen de la reserva.
    var finalText = document.getElementById("returnFinalPrice");
    finalText.innerText = `¡Felicitaciones! 

     Has alquilado la moto ${cliente1.newMoto.marca} ${cliente1.newMoto.modelo} ${cliente1.newMoto.cilindrada}cc por ${weeksEntry} semana/s, en la ciudad de ${geoLoc}. El precio final es : $${((cliente1.newMoto.precio * weeksEntry) + extraHelmet)}`

    // Almacenamiento del objeto 'cliente' en localStorage.
 
    var alqCliente = {"nombre": cliente1.nombre, "correo": cliente1.correo, "motoMarca": cliente1.newMoto.marca, "motoCilindrada": cliente1.newMoto.cilindrada, "fecha": devolucion}
    console.log(alqCliente)
    var alqClienteJsonSt = JSON.stringify(alqCliente)
    localStorage.setItem("cliente1", alqClienteJsonSt);
    localStorage.setItem("listaClientes", alqClienteJsonSt);

    var listaRecu = localStorage.getItem("listaClientes");
    
    var alqClienteJsonPar = JSON.parse(listaRecu);
    
    // Agregamos los alquileres de localStorage a un array de informacion de alquiler

    clientsList.push(alqClienteJsonPar);
    console.log(clientsList)
    
    // Reemplazamos el texto del estado de la reserva
    var clienteStr = localStorage.getItem("cliente1");
    var clienteStr1 = JSON.parse(clienteStr);
    var estadoReserva = document.getElementById("estadoReserva");
    estadoReserva.innerText = (`Tu reserva es: 

    Nombre y Apellido: ${clienteStr1.nombre} 
    Correo:  ${clienteStr1.correo} 
    MOTO
    Marca: ${clienteStr1.motoMarca} 
    Cilindrada: ${ clienteStr1.motoCilindrada} 
    Fecha devolución: ${ clienteStr1.fecha}`);

/*    
Anteriormente tenia una notificacion de error con un 'alert'. por lo que elegi reemplazarla por Sweet Alert
y darle un aspecto mucho mas agradable.
*/
} else { 
        swal({
            title: "Error!",
            text: "Debes completar todos los campos para continuar.",
            icon: "error",
          });
    }
}
/*
Agregué una notifiacion con Toastify al hacer click en el boton 'Reservar' que invita al usuario a clickear el boton 'volver arriba' 
para poder visualizar un resumen de su reserva.
*/
const tostado = document.getElementById("boton");
tostado.addEventListener("click", () => {
   Toastify({
       text: "Clickeá en el boton 'Volver arriba' \n para ver el resumen de tu reserva",
       gravity: "bottom",
       duration: 3000,
       style: {
           background: "light-blue",
       }
   }).showToast();
})

// Evento de teclado. ejecutamos la funcion 'show' con la tecla 'enter'
document.addEventListener("keydown", function(event){
    const pressedEnter = event.key;
    if (pressedEnter == 'Enter'){
        show();
    }
  }
)
