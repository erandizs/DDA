var canvas = document.getElementById('canvas');
var contexto = canvas.getContext('2d');
contexto.canvas.willReadFrequently = true;
var escribir,dibujandoCirculo,dibujandoLinea,dibujandoCuadrado,dibujandoElipse,dibujandoPoligono,dibujandoRectangulo,dibujarBtn,dibujandoTrapecio,dibujandoRombo=false;
// coordenadas del mouse
let anguloRotacion = 0;
var startX, startY, endX, endY;
var figuraSeleccionada=null;
var flag_borrador=false;
var size=5;
var indiceActual = 0;
var cantidadFiguras = 0;

var figurasDibujadas= [];
let  history_Stack=[];
let ladosPoligono=0;
let flag=0;
var isDrawing=false;
document.getElementById('rotarBtn').addEventListener('click', function() {
  
   escribir=false;
   anguloRotacion = 0;
   dibujandoRombo=false;
   dibujandoTrapecio=false;
   dibujarBtn=false;
   flag_borrador=false;
    dibujandoCirculo = false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
    seleccionarFigura();
    document.addEventListener('keydown', function(event) {
        // Verificar si una figura está seleccionada y si la tecla presionada es para rotar
        if (figuraSeleccionada && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            // Determinar la dirección de rotación según la tecla presionada
            const direccion = event.key === 'ArrowLeft' ? -1 : 1;
            // Actualizar el ángulo de rotación
            anguloRotacion += direccion * Math.PI / 18; // Cambia el ángulo según tu necesidad
           
            // Rotar la figura seleccionada
            figuraSeleccionada.anguloRotacion = anguloRotacion;
            
            // Limpiar el lienzo
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            // Redibujar todas las figuras con la nueva rotación
            dibujarFiguras(figurasDibujadas);
            
            // También puedes redibujar solo la figura seleccionada
            // dibujarFigura(figuraSeleccionada);
        }
    });
    
});

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const startX = event.clientX - rect.left;
    const startY = event.clientY - rect.top;
    seleccionarFigura(startX,startY);
});
function seleccionarFigura(x, y) {
    // Iterar sobre las figuras dibujadas
    for (let i = figurasDibujadas.length - 1; i >= 0; i--) {
        const figura = figurasDibujadas[i];
        // Verificar si el clic del usuario está dentro de la figura
        switch (figura.tipo) {
            case 'circulo':
                if (puntoDentroDeCirculo(x, y, figura.centerX, figura.centerY, figura.radius,figura.anguloRotacion)) {
                    figuraSeleccionada = figura;
                    return; // Salir del bucle una vez que se selecciona la figura
                }
                break;
            case 'linea':
                if (puntoEnLinea(x, y, figura.startX, figura.startY, figura.endX, figura.endY,figura.anguloRotacion)) {
                    figuraSeleccionada = figura;
                    return;
                }
                break;
            case 'cuadrado':
                if (puntoDentroDeCuadrado(x, y, figura.startX, figura.startY, figura.lado,figura.anguloRotacion)) {
                    figuraSeleccionada = figura;
                    return;
                }
                break;
            case 'elipse':
                if (puntoDentroDeElipse(x, y, figura.centerX, figura.centerY, figura.radiusX, figura.radiusY,figura.anguloRotacion)) {
                    figuraSeleccionada = figura;
                    return;
                }
                break;  
            case 'poligono':
                if (puntoDentroDePoligono(x, y, figura.radio, figura.startX, figura.startY, figura.lado_d, figura.angulo,figura.anguloRotacion)) {
                        figuraSeleccionada = figura;
                        return;
                    }
                break;   
                case 'rectangulo':
                    if (puntoDentroDeRectangulo(x, y, figura.startX, figura.startY, figura.width, figura.height,figura.anguloRotacion)) {
                            figuraSeleccionada = figura;
                            return;
                        }
                    break;  
                    case 'trapecio':
                        if (puntoDentroDeTrapecio(x, y, figura.startX, figura.startY, figura.endX, figura.endY,figura.anguloRotacion)) {
                                figuraSeleccionada = figura;
                                return;
                            }
                        break;  
                    case 'rombo':
                            if (puntoDentroDeRombo(x, y, figura.centerX, figura.centerY, figura.width, figura.height,figura.anguloRotacion)) {
                                    figuraSeleccionada = figura;
                                    return;
                                }
                        break;  
            
        }
    }
    // Si no se seleccionó ninguna figura, establecer la figura seleccionada como null
    figuraSeleccionada = null;
}
document.getElementById('guardarComoBtn').addEventListener('click', function() {
    guardarEnJSON();
    anguloRotacion = 0;
});
document.getElementById('inputArchivo').addEventListener('click', function() {
    cargarDesdeJSON();
    anguloRotacion = 0;
});
document.getElementById('exportarBtn').addEventListener('click', function() {
    anguloRotacion = 0;
    const opcion = prompt("¿Desea exportar como PNG o como PDF? (Ingrese 'png' o 'pdf')");

    if (opcion === 'png') {
        exportarCanvas('png');
    } else if (opcion === 'pdf') {
        exportarComoPDF();
    } else {
        console.error('Formato de exportación no válido');
    }
});
function exportarComoPDF() {
    const pdf = new jsPDF();
    const canvasDataURL = canvas.toDataURL('image/png');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(canvasDataURL, 'PNG', 0, 0, width, height);
    pdf.save('canvas_export.pdf');
}

function preguntarFormatoExportacion() {
    const opcion = prompt("¿Desea exportar como PNG o como PDF? (Ingrese 'png' o 'pdf')");

    if (opcion === 'png') {
        exportarCanvas('png');
    } else if (opcion === 'pdf') {
        exportarCanvas('pdf');
    } else {
        console.error('Formato de exportación no válido');
    }
}
// Obtener referencia a los elementos del menú desplegable
const opcionesBtn = document.getElementById('opcionesBtn');
const opcionesContent = document.getElementById('opcionesContent');
document.getElementById('escribirBtn').addEventListener('click', function() {
    escribir=true;
    anguloRotacion = 0;
    dibujandoRombo=true;
    dibujandoTrapecio=false;
    dibujarBtn=false;
    flag_borrador=false;
     dibujandoCirculo = false;
     dibujandoLinea = false; // no se dibuje una línea
     dibujandoCuadrado=false;
     dibujandoElipse=false;
     dibujandoPoligono=false;
     dibujandoRectangulo=false;
});
document.getElementById('atrasBtn').addEventListener('click', function() {
    deshacer();
    anguloRotacion = 0;
});
document.getElementById('adelanteBtn').addEventListener('click', function() {
    rehacer();
    anguloRotacion = 0;
 });
 
function deshacer(){//undo
    if (figurasDibujadas.length > 0) {
        history_Stack.push(figurasDibujadas.pop());
        console.log(history_Stack);
        dibujarFiguras(figurasDibujadas);
    }
}
function rehacer(){//redo

    if (history_Stack.length > 0) {
        figurasDibujadas.push(history_Stack.pop());
        console.log(history_Stack);
        dibujarFiguras(figurasDibujadas);
    }
}
// Función para abrir o cerrar el menú desplegable al hacer clic en el botón
function toggleOpciones() {
    opcionesContent.classList.toggle('show');
}

// Agregar evento de clic al botón de opciones para abrir o cerrar el menú
opcionesBtn.addEventListener('click', toggleOpciones);

// Cerrar el menú si el usuario hace clic fuera de él
window.addEventListener('click', function(event) {
    if (!event.target.matches('#opcionesBtn')) {
   
        if (opcionesContent.classList.contains('show')) {
            opcionesContent.classList.remove('show');
        }
    }
});
document.getElementById('dibujarRomboBtn').addEventListener('click', function() {
    dibujandoRombo=true;
    escribir=false;
    dibujandoTrapecio=false;
    dibujarBtn=false;
    flag_borrador=false;
     dibujandoCirculo = false;
     dibujandoLinea = false; // no se dibuje una línea
     dibujandoCuadrado=false;
     dibujandoElipse=false;
     dibujandoPoligono=false;
     dibujandoRectangulo=false;
     anguloRotacion = 0;
 });
 // Función para dibujar un rombo en el lienzo

 

 function dibujarRombo(centerX, centerY, width, height, color, size, anguloRotacion) {
    // Definir los puntos que conforman los vértices del rombo
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    // Calcular los vértices del rombo sin rotación
    const vertices = [
        [centerX, centerY - halfHeight], // Punto superior (A)
        [centerX + halfWidth, centerY], // Punto derecho (B)
        [centerX, centerY + halfHeight], // Punto inferior (C)
        [centerX - halfWidth, centerY]  // Punto izquierdo (D)
    ];

    // Aplicar la rotación a cada vértice
    const rotatedVertices = vertices.map(vertex => {
        // Calcular las coordenadas relativas al centro del rombo
        const deltaX = vertex[0] - centerX;
        const deltaY = vertex[1] - centerY;

        // Aplicar la rotación a las coordenadas
        const rotatedX = deltaX * Math.cos(anguloRotacion) - deltaY * Math.sin(anguloRotacion);
        const rotatedY = deltaX * Math.sin(anguloRotacion) + deltaY * Math.cos(anguloRotacion);

        // Calcular las coordenadas absolutas después de la rotación y devolverlas
        return [rotatedX + centerX, rotatedY + centerY];
    });

    // Dibujar los lados del rombo usando las coordenadas de los vértices rotados
    dibujarLineaDDA(rotatedVertices[0][0], rotatedVertices[0][1], rotatedVertices[1][0], rotatedVertices[1][1], color, size); // Lado superior
    dibujarLineaDDA(rotatedVertices[1][0], rotatedVertices[1][1], rotatedVertices[2][0], rotatedVertices[2][1], color, size); // Lado derecho
    dibujarLineaDDA(rotatedVertices[2][0], rotatedVertices[2][1], rotatedVertices[3][0], rotatedVertices[3][1], color, size); // Lado inferior
    dibujarLineaDDA(rotatedVertices[3][0], rotatedVertices[3][1], rotatedVertices[0][0], rotatedVertices[0][1], color, size); // Lado izquierdo
}



document.getElementById('dibujarTrapecioBtn').addEventListener('click', function() {
    dibujandoTrapecio=true;
    dibujandoRombo=false;
    dibujarBtn=false;
    flag_borrador=false;
     dibujandoCirculo = false;
     dibujandoLinea = false; // no se dibuje una línea
     dibujandoCuadrado=false;
     dibujandoElipse=false;
     dibujandoPoligono=false;
     dibujandoRectangulo=false;
     anguloRotacion = 0;
 });
 function dibujarTrapecio(startX, startY, endX, endY, color, size, anguloRotacion) {
    // Calcular el centro del trapecio
    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;

    // Calcular la longitud de la base mayor y la base menor del trapecio
    const baseMayor = Math.abs(endX - startX);
    const baseMenor = baseMayor * 0.4;

    // Calcular la altura del trapecio
    const altura = Math.abs(endY - startY);

    // Calcular los puntos de los vértices del trapecio
    const halfBaseMayor = baseMayor / 2;
    const halfBaseMenor = baseMenor / 2;

    const pointA = rotatePoint(startX, startY, centerX, centerY, anguloRotacion);
    const pointB = rotatePoint(endX, startY, centerX, centerY, anguloRotacion);
    const pointC = rotatePoint(centerX - halfBaseMenor, endY, centerX, centerY, anguloRotacion);
    const pointD = rotatePoint(centerX + halfBaseMenor, endY, centerX, centerY, anguloRotacion);

    // Dibujar los lados del trapecio usando la función dibujarLineaDDA
    dibujarLineaDDA(pointA[0], pointA[1], pointB[0], pointB[1], color, size);
    dibujarLineaDDA(pointB[0], pointB[1], pointD[0], pointD[1], color, size);
    dibujarLineaDDA(pointD[0], pointD[1], pointC[0], pointC[1], color, size);
    dibujarLineaDDA(pointC[0], pointC[1], pointA[0], pointA[1], color, size);
}

// Función para rotar un punto alrededor de otro punto de referencia
function rotatePoint(x, y, centerX, centerY, angle) {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    const translatedX = x - centerX;
    const translatedY = y - centerY;

    const rotatedX = translatedX * cosAngle - translatedY * sinAngle;
    const rotatedY = translatedX * sinAngle + translatedY * cosAngle;

    return [rotatedX + centerX, rotatedY + centerY];
}


document.getElementById('verdeBtn').addEventListener('click', function() {
   color=[0, 255, 0];
});
document.getElementById('rojoBtn').addEventListener('click', function() {
    color=[255, 0, 0];
 });
 document.getElementById('azulBtn').addEventListener('click', function() {
    color=[0, 0, 255];
 });
 document.getElementById('negroBtn').addEventListener('click', function() {
    color=[0, 0, 0];
 });

 document.getElementById('dibujarBtn').addEventListener('click', function() {
    dibujarBtn=true;
    escribir=false;
   flag_borrador=false;
    dibujandoCirculo = false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
    dibujandoTrapecio=false;
    dibujandoRombo=false;
    anguloRotacion = 0;
 });
//listener para el boton de circulo
document.getElementById('dibujarCirculoBtn').addEventListener('click', function() {
    dibujandoCirculo = true;
    escribir=false;
    dibujandoTrapecio=false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoRombo=false;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag_borrador=false;
    flag=0;
    anguloRotacion = 0;
});
//listener boton linea
document.getElementById('dibujarLineaBtn').addEventListener('click', function() {
    dibujandoLinea = true;
    escribir=false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    dibujandoRombo=false;
    dibujandoTrapecio=false;
    flag_borrador=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag=0;
    anguloRotacion = 0;
});
//listener boton cuadrado
document.getElementById('dibujarCuadradoBtn').addEventListener('click', function() {
    dibujandoLinea = false;
    escribir=false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=true;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    flag_borrador=false;
    dibujandoTrapecio=false;
    dibujandoRombo=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag=0;
    anguloRotacion = 0;
});
//listener boton elipse
document.getElementById('dibujarElipseBtn').addEventListener('click', function() {
    dibujandoLinea = false;
    escribir=false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=false;
    dibujandoElipse=true;
    dibujandoPoligono=false;
    dibujandoTrapecio=false;
    dibujandoRombo=false;
    flag_borrador=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag=0;
    anguloRotacion = 0;
});
document.getElementById('dibujarPoligonoBtn').addEventListener('click', function() {
    dibujandoCirculo = false;
    escribir=false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoTrapecio=false;
    dibujandoElipse=false;
    dibujandoRombo=false;
    flag_borrador=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag=1;
    anguloRotacion = 0;
 //   dibujandoPoligono=true;

});
document.getElementById('dibujarRectanguloBtn').addEventListener('click', function() {
    dibujandoCirculo = false;
    escribir=false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    flag_borrador=false;
    dibujandoRombo=false;
    dibujandoRectangulo=true;
    dibujandoTrapecio=false;
    dibujandoPoligono=false;
    dibujando=false;
    flag=1;
    anguloRotacion = 0;
 //   dibujandoPoligono=true;

});
// agarrar las coordenadas del mouse cuqando hace clic
canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    if(dibujandoCirculo || dibujandoLinea || dibujandoCuadrado || dibujandoElipse||dibujandoRectangulo||dibujandoTrapecio||dibujandoRombo){
        startX = event.offsetX; // x relativo al canvas
        startY = event.offsetY; // y relativo al canvas
    }
    if(dibujandoPoligono){
        startX = event.clientX - canvas.getBoundingClientRect().left; // x
        startY = event.clientY - canvas.getBoundingClientRect().top;  // y
      
       // ladosPoligono++;
    }

    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    // Si no hay ninguna figura seleccionada, intenta seleccionar una
    if (!figuraSeleccionada) {
       // seleccionarFigura(mouseX, mouseY);
    } else {
        // Si ya hay una figura seleccionada, limpia la selección
        figuraSeleccionada = null;
    }
});

canvas.addEventListener("mousemove", function(event) {
    if (!isDrawing) return;
    endX = event.offsetX; // x relativo al canvas
    endY = event.offsetY; // y relativo al canvas
    if(flag_borrador){
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        // Borrar el píxel en las coordenadas actuales
        contexto.clearRect(x, y, size, size);
    }
   
    if(dibujarBtn){
    
        drawPixel(endX,endY, color,size); 
        anguloRotacion = 0;
    }
});

// cordenadas al soltar el mouse
canvas.addEventListener('mouseup', function(event) {
    if (!isDrawing) return;
    endX = event.clientX - canvas.getBoundingClientRect().left; // x
    endY = event.clientY - canvas.getBoundingClientRect().top;   // y

  
    if(dibujandoCirculo){
       
        //calcular centro del circulo
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        
    //  dibujarLinea(startX,startY,endX,endY);
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 2;
        dibujarCirculo(centerX,centerY,radius,color,size,anguloRotacion);
      //METER AL VECTOR
        let circulo = {
            tipo: 'circulo',
            centerX: centerX,
            centerY: centerY,
            radius: radius,
            color:color,
            color:color
        };
        figurasDibujadas.push(circulo);
 
      //  dibujarFiguras(figurasDibujadas);
     
    }else if(dibujandoLinea){
        dibujarLineaDDA(startX,startY,endX,endY,color,size,anguloRotacion);
        let linea = {
            tipo: 'linea',
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color:color,
            anguloRotacion:anguloRotacion
        };
        figurasDibujadas.push(linea);
      //  dibujarFiguras(figurasDibujadas);
    }else if(dibujandoCuadrado){
        lado = Math.sqrt(((endX - startX) ** 2) + ((endY - startY) ** 2));
        dibujarCuadrado(startX, startY, lado, color,size,anguloRotacion);
        let cuadrado = {
            tipo: 'cuadrado',
            startX: startX,
            startY: startY,
            lado: lado,
            color: color,
            anguloRotacion:anguloRotacion
        };
        figurasDibujadas.push(cuadrado);
      //  dibujarFiguras(figurasDibujadas);
}else if (dibujandoElipse) {
        //centro
        let centerX = (startX + endX) / 2;
        let centerY = (startY + endY) / 2;
        
        //radios
        let radiusX = Math.abs((endX - startX) / 2);
        let radiusY = Math.abs((endY - startY) / 2);
        
     
        dibujarElipse(centerX, centerY, radiusX, radiusY,color,size,anguloRotacion);
        let elipse = {
            tipo: 'elipse',
            centerX: centerX,
            centerY: centerY,
            radiusX: radiusX,
            radiusY: radiusY,
            color:color,
            anguloRotacion:anguloRotacion
        };
        figurasDibujadas.push(elipse);
      //  dibujarFiguras(figurasDibujadas);
    }else if(dibujandoPoligono){
        let angulo = Math.atan2(endX-startX,endY-startY);
        let radio = Math.sqrt(Math.pow(endX-startX,2)+Math.pow(endY-startY,2));
        console.log(ladosPoligono);
        dibujarPoligono2(radio,startX,startY,lado_d,angulo,color,size,anguloRotacion);
        let poligono = {
            tipo: 'poligono',
            radio: radio,
            startX: startX,
            startY: startY,
            lado_d: lado_d,
            angulo: angulo,
            color:color,
            anguloRotacion:anguloRotacion
        };
        figurasDibujadas.push(poligono);
       // dibujarFiguras(figurasDibujadas);
    } if(dibujandoRectangulo){
        // Calcular el ancho y alto del rectángulo
       var width = endX - startX;
       var height = endY - startY;
       dibujarRectangulo(startX, startY, width, height,color,size,anguloRotacion);
       let rectangulo = {
           tipo: 'rectangulo',
           startX: startX,
           startY: startY,
           width: width,
           height: height,
           color:color,
           anguloRotacion:anguloRotacion
       };
       figurasDibujadas.push(rectangulo);
      // dibujarFiguras(figurasDibujadas);
   }else if(dibujandoTrapecio){
      dibujarTrapecio(startX, startY, endX, endY,color,size,anguloRotacion);
      let trapecio = {
        tipo: 'trapecio',
        startX: startX,
        startY: startY,
        endX:endX,
        endY:endY,
        color:color,
        size:size,
        anguloRotacion:anguloRotacion
    };
    figurasDibujadas.push(trapecio);
   }if(dibujandoRombo){
     // Calcular el centro, ancho y alto del rombo
     
     let centerX = (startX + endX)/2 ;
     let centerY = (startY + endY)/2 ;
    // Calcular el ancho y la altura del rombo
    let width = Math.abs(endX - startX);
    let height = Math.abs(endY - startY);

     // Dibujar el rombo
     dibujarRombo(centerX, centerY, width, height, color,size,anguloRotacion);

     // Guardar la información del rombo en el arreglo de figuras dibujadas
     let rombo = {
         tipo: 'rombo',
         centerX: centerX,
         centerY: centerY,
         width: width,
         height: height,
         color: color,
         size:size,
         anguloRotacion:anguloRotacion
     };
     figurasDibujadas.push(rombo);
    
   }

     // Restablecer la bandera de dibujo
     isDrawing = false;
});
let lado_d=0;
function pedirLadosPoligono() {
   
 
        let ladosPoligono = prompt("Ingrese la cantidad de lados del polígono:");
        ladosPoligono = parseInt(ladosPoligono);
        if (ladosPoligono && ladosPoligono >= 3) {
            dibujandoPoligono = true;
            lado_d = ladosPoligono;
        } else {
            alert("Ingrese un valor válido para la cantidad de lados (mínimo 3).");
        }
 
}

function dibujarPoligono2(radio,centerX,centerY,ladosPoligono,angulo,color,size,anguloRotacion) {
        console.log(ladosPoligono);
        var angulo_inicial=(2*Math.PI)/ladosPoligono,lastX=0,lastY=0;
        for(let i=0;i<ladosPoligono;i++){
            let step=i*angulo_inicial+angulo;
            let point=grados(centerX,centerY,radio,step);
            if(i>0){
                dibujarLineaDDA(point.x,point.y,lastX,lastY,color,size,anguloRotacion);
            }
            lastX=point.x;
            lastY=point.y;
        }
        dibujarLineaDDA(lastX,lastY,Math.round(centerX+radio*Math.cos(angulo)),Math.round(centerY+radio*Math.sin(angulo)),color,size,anguloRotacion)
}
function grados(centerX,centerY,radio,step){
    let pointX=Math.round(centerX+radio*Math.cos(step));
    let pointY=Math.round(centerY+radio*Math.sin(step));
    return{x:pointX,y:pointY}
}

function dibujarElipse(centerX, centerY, radiusX, radiusY,color,size) {
   
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        const x = Math.round(centerX + Math.cos(angle) * radiusX);
        const y = Math.round(centerY + Math.sin(angle) * radiusY);
        drawPixel(x, y, color,size);
    }
   
}

function dibujarLineaDDA(x0, y0, x1, y1,color,size,anguloRotacion) {
    // diferencias en x y y
    let dx = x1 - x0;
    let dy = y1 - y0;

    // longitud de la línea
    let steps = Math.max(Math.abs(dx), Math.abs(dy));

    // incrementos para cada paso
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    //valores iniciales
    let x = x0;
    let y = y0;

    // dibujar cada punto de la línea
    for (let i = 0; i <= steps; i++) {
        drawPixel(Math.round(x), Math.round(y), color,size); // dibujar el píxel más cercano
        x += xIncrement;
        y += yIncrement;
    }
}
function dibujarCuadrado(x, y, lado,color,size,anguloRotacion) {
    let x0 = x;
    let y0 = y;
    let x1 = x + lado;
    let y1 = y;
    let x2 = x + lado;
    let y2 = y + lado;
    let x3 = x;
    let y3 = y + lado;

    dibujarLineaDDA(x0, y0, x1, y1,color,size,anguloRotacion); // Lado superior
    dibujarLineaDDA(x1, y1, x2, y2,color,size,anguloRotacion); // Lado derecho
    dibujarLineaDDA(x2, y2, x3, y3,color,size,anguloRotacion); // Lado inferior
    dibujarLineaDDA(x3, y3, x0, y0,color,size,anguloRotacion); // Lado izquierdo


}



  function dibujarCirculo(x0, y0, radius,color,size) {
      let x = radius;
      let y = 0;
      let err = 0;

      while (x >= y) {
          drawPixel(x0 + x, y0 + y, color,size);
          drawPixel(x0 + y, y0 + x, color,size);
          drawPixel(x0 - y, y0 + x, color,size);
          drawPixel(x0 - x, y0 + y, color,size);
          drawPixel(x0 - x, y0 - y, color,size);
          drawPixel(x0 - y, y0 - x, color,size);
          drawPixel(x0 + y, y0 - x, color,size);
          drawPixel(x0 + x, y0 - y, color,size);

          if (err <= 0) {
              y += 1;
              err += 2 * y + 1;
          } else {
              x -= 1;
              err -= 2 * x + 1;
          }
      }
  }

  function dibujarFiguras(figurasDibujadas) {
    cantidadFiguras = figurasDibujadas.length;
    contexto.clearRect(0,0,canvas.width,canvas.height);
    // Iterar sobre las figuras dibujadas y dibujarlas en el canvas
    for (let i = 0; i < figurasDibujadas.length; i++) {
        const figura = figurasDibujadas[i];
        switch (figura.tipo) {
            case 'rectangulo':
                dibujarRectangulo(figura.startX, figura.startY, figura.width, figura.height,figura.color,figura.size,figura.anguloRotacion);
                break;
            case 'circulo':
                dibujarCirculo(figura.centerX, figura.centerY, figura.radius,figura.color,figura.size);
                break;
            case 'linea':
                dibujarLineaDDA(figura.startX, figura.startY, figura.endX, figura.endY,figura.color,figura.size,figura.anguloRotacion);
                break;
            case 'elipse':
                dibujarElipse(figura.centerX, figura.centerY, figura.radiusX, figura.radiusY,figura.color,figura.size,figura.anguloRotacion);
                break;
            case 'poligono':
                dibujarPoligono2(figura.radio, figura.startX, figura.startY, figura.lado_d, figura.angulo,figura.color,figura.size,figura.anguloRotacion);
                break;
            case 'cuadrado':
                dibujarCuadrado(figura.startX, figura.startY, figura.lado,figura.color,figura.size,figura.anguloRotacion);
                break;
            case 'pixel':
                drawPixel(figura.x,figura.y,figura.color,figura.size,figura.anguloRotacion);
                break;
            case 'rombo':
                
                dibujarRombo(figura.centerX, figura.centerY, figura.width, figura.height, figura.color, figura.size,figura.anguloRotacion);
                break;
            case 'trapecio':
                dibujarTrapecio(figura.startX, figura.startY, figura.endX, figura.endY,figura.color,figura.size,figura.anguloRotacion);
                break;
            
        }
    }
}


function dibujarRectangulo(x, y, width, height, color,size,anguloRotacion) {
    let x0 = x;
    let y0 = y;
    let x1 = x + width;
    let y1 = y;
    let x2 = x + width;
    let y2 = y + height;
    let x3 = x;
    let y3 = y + height;

    dibujarLineaDDA(x0, y0, x1, y1, color,size,anguloRotacion); // Lado superior
    dibujarLineaDDA(x1, y1, x2, y2, color,size,anguloRotacion); // Lado derecho
    dibujarLineaDDA(x2, y2, x3, y3, color,size,anguloRotacion); // Lado inferior
    dibujarLineaDDA(x3, y3, x0, y0, color,size,anguloRotacion); // Lado izquierdo
}


function drawPixel(x, y, color, size) {
    
    // Verificar si el píxel ya está ocupado por una figura dibujada previamente
    const pixelData = contexto.getImageData(x, y, 1, 1).data;
    if (pixelData[3] !== 0) { // Si la opacidad es diferente de cero, significa que ya hay una figura dibujada en este píxel
        return; // No cambie el color del píxel
    }

    // Dibujar el píxel con el tamaño especificado
    for (let i = x - size / 2; i < x + size / 2; i++) {
        for (let j = y - size / 2; j < y + size / 2; j++) {
            // Datos de píxeles del canvas
            var imageData = contexto.createImageData(1, 1);
            var data = imageData.data;

            // Color del píxel
            data[0] = color[0]; // Rojo
            data[1] = color[1]; // Verde
            data[2] = color[2]; // Azul
            data[3] = 255; // Opacidad

            // Dibujar el píxel
            contexto.putImageData(imageData, i, j);

            // Guardar la figura dibujada si está en modo de dibujo
            if (dibujarBtn) {
                const figura = {
                    tipo: 'pixel',
                    x: i,
                    y: j,
                    color: color.slice(), // Clonar el array de color para evitar cambios no deseados
                    size:size
                };
                figurasDibujadas.push(figura);
             
            }
        }
    }
}



document.getElementById('borraBtn').addEventListener('click', function() {
    // Establecer la bandera para el modo borrador
    anguloRotacion = 0;
    flag_borrador = true;
    dibujarBtn=false;
    // Desactivar el dibujo de todas las figuras
    dibujandoCirculo = false;
    dibujandoLinea = false;
    dibujandoCuadrado = false;
    dibujandoElipse = false;
    dibujandoPoligono = false;
    dibujandoRectangulo = false;
    dibujandoRombo=false;
    dibujandoTrapecio=false;
    flag = 0;
   
    // Agregar un evento de clic al lienzo para eliminar figuras
        canvas.addEventListener('click', function(event) {
            if(flag_borrador){
                if(flag_borrador){
                    // Obtener las coordenadas del clic
                    const x = event.offsetX;
                    const y = event.offsetY;
    
                    // Iterar sobre las figuras dibujadas
                    for (let i = 0; i < figurasDibujadas.length; i++) {
                        const figura = figurasDibujadas[i];
    
                        // Verificar si el clic está dentro de la figura
                        if (
                            (figura.tipo === 'circulo' && puntoDentroDeCirculo(x, y, figura.centerX, figura.centerY, figura.radius,figura.anguloRotacion)) ||
                            (figura.tipo === 'linea' && puntoEnLinea(x, y, figura.startX, figura.startY, figura.endX, figura.endY,figura.anguloRotacion)) ||
                            (figura.tipo === 'cuadrado' && puntoDentroDeCuadrado(x, y, figura.startX, figura.startY, figura.lado,figura.anguloRotacion)) ||
                            (figura.tipo === 'elipse' && puntoDentroDeElipse(x, y, figura.centerX, figura.centerY, figura.radiusX, figura.radiusY,figura.anguloRotacion)) ||
                            (figura.tipo === 'poligono' && puntoDentroDePoligono(x, y, figura.radio, figura.startX, figura.startY, figura.lado_d, figura.angulo,figura.anguloRotacion)) ||
                            (figura.tipo === 'rectangulo' && puntoDentroDeRectangulo(x, y, figura.startX, figura.startY, figura.width, figura.height,figura.anguloRotacion)) ||
                            (figura.tipo === 'trapecio' && puntoDentroDeTrapecio(x, y, figura.startX, figura.startY, figura.endX, figura.endY,figura.anguloRotacion)) ||
                            (figura.tipo === 'rombo' && puntoDentroDeRombo(x, y, figura.centerX, figura.centerY, figura.width, figura.height,figura.anguloRotacion))
                            ) {
                            // Eliminar la figura del arreglo de figuras dibujadas
                            figurasDibujadas.splice(i, 1);
    
                            // Volver a dibujar el canvas sin la figura eliminada
                            contexto.clearRect(0, 0, canvas.width, canvas.height);
                            dibujarFiguras(figurasDibujadas);
    
                            // Salir del bucle después de eliminar la primera figura encontrada
                            break;
                        }
                    }
                }
            }
        });
    
    
});



// Función para verificar si un punto está dentro de un círculo
function puntoDentroDeCirculo(x, y, centerX, centerY, radius) {
    return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) <= radius;
}

// Función para verificar si un punto está en una línea (con un pequeño margen de error)
function puntoEnLinea(x, y, startX, startY, endX, endY) {
    const distancia = Math.abs((endX - startX) * (startY - y) - (startX - x) * (endY - startY)) /
                      Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    return distancia <= 3; // Margen de error de 3 píxeles
}

// Función para verificar si un punto está dentro de un cuadrado
function puntoDentroDeCuadrado(x, y, startX, startY, lado,anguloRotacion) {
    return x >= startX && x <= startX + lado && y >= startY && y <= startY + lado;
}

// Función para verificar si un punto está dentro de una elipse
function puntoDentroDeElipse(x, y, centerX, centerY, radiusX, radiusY,anguloRotacion) {
    const distancia = ((x - centerX) ** 2) / (radiusX ** 2) + ((y - centerY) ** 2) / (radiusY ** 2);
    return distancia <= 1;
}

// Función para verificar si un punto está dentro de un polígono
function puntoDentroDePoligono(x, y, radio, centerX, centerY, ladosPoligono, angulo,anguloRotacion) {
    const puntoTransformadoX = (x - centerX) * Math.cos(-angulo) - (y - centerY) * Math.sin(-angulo);
    const puntoTransformadoY = (x - centerX) * Math.sin(-angulo) + (y - centerY) * Math.cos(-angulo);

    const distanciaAlCentro = Math.sqrt(puntoTransformadoX ** 2 + puntoTransformadoY ** 2);

    return distanciaAlCentro <= radio;
}

// Función para verificar si un punto está dentro de un rectángulo
function puntoDentroDeRectangulo(x, y, startX, startY, width, height,anguloRotacion) {
    return x >= startX && x <= startX + width && y >= startY && y <= startY + height;
}


function puntoDentroDeTrapecio(x, y, startX, startY, endX, endY,anguloRotacion) {
    const topY = startY;
    const bottomY = endY;
    const leftX = startX + (endX - startX) * 0.4;
    const rightX = endX - (endX - startX) * 0.4;

    // Verificar si el punto está dentro del trapecio (usando la fórmula del rectángulo)
    return x >= leftX && x <= rightX && y >= topY && y <= bottomY;
}

function puntoDentroDeRombo(x, y, centerX, centerY, width, height,anguloRotacion) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const top = centerY - halfHeight;
    const bottom = centerY + halfHeight;
    const left = centerX - halfWidth;
    const right = centerX + halfWidth;

    // Verificar si el punto está dentro del rombo (usando la fórmula del rectángulo)
    return x >= left && x <= right && y >= top && y <= bottom;
}

function exportarCanvas(formato) {
    // Obtener el contenido del canvas como una URL de datos
    const dataURL = canvas.toDataURL('image/' + formato);

    // Crear un elemento <a> para descargar la imagen
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = dataURL;

    // Establecer el nombre del archivo
    enlaceDescarga.download = 'canvas_image.' + formato;

    // Simular un clic en el enlace para iniciar la descarga
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();

    // Limpiar el enlace y liberar recursos
    document.body.removeChild(enlaceDescarga);
}
function limpiar(){
    contexto.clearRect(0,0,canvas.width,canvas.height);
    figurasDibujadas.splice(0, figurasDibujadas.length); 
}
function updateVolume(val) {
    size=val;
}

function guardarEnJSON() {
    const jsonFiguras = JSON.stringify(figurasDibujadas);
    localStorage.setItem('figurasJSON', jsonFiguras);

    // Crear un enlace de descarga
    const blob = new Blob([jsonFiguras], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'figuras.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


// Cargar desde JSON
function cargarDesdeJSON() {
    // Crear un input de tipo archivo en el DOM
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    // Escuchar el evento change del input
    input.addEventListener('change', function(event) {
        const archivo = event.target.files[0];
        const lector = new FileReader();

        lector.onload = function(event) {
            const contenido = event.target.result;
            const figurasJSON = JSON.parse(contenido);

            // Limpiar el canvas
            contexto.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar las figuras cargadas desde el JSON
            dibujarFiguras(figurasJSON);

            // Opcional: Actualizar el vector figurasDibujadas si es necesario
            figurasDibujadas = figurasJSON;
        };

        // Leer el contenido del archivo como texto
        lector.readAsText(archivo);
    });

    // Hacer clic en el input para abrir el gestor de archivos
    input.click();
}




