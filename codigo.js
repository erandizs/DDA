var canvas = document.getElementById('canvas');
var contexto = canvas.getContext('2d');
contexto.canvas.willReadFrequently = true;
var trasladar,rotar,escribir,dibujandoCirculo,dibujandoLinea,dibujandoCuadrado,dibujandoElipse,dibujandoPoligono,dibujandoRectangulo,dibujarBtn,dibujandoTrapecio,dibujandoRombo=false;
// coordenadas del mouse
let anguloRotacion = 0;
var startX, startY, endX, endY;
var figuraSeleccionada=null;
var flag_borrador=false;
var size=5;
var indiceActual = 0;
var cantidadFiguras = 0;
const toPDF = document.getElementById('toPDF');
var figurasDibujadas= [];
let  history_Stack=[];
let ladosPoligono=0;
let flag=0;
var isDrawing=false;
var traslacionX=0;
var traslacionY=0;
// Variable para determinar si se está redimensionando
let resizing = false;
// Variables para almacenar la posición inicial del arrastre y el tamaño original del cuadrado
let resizeStartX, resizeStartY, originalWidth, originalHeight;

document.getElementById('resizeBtn').addEventListener('click', function() {
    rotar=false;
    resizing=true;
    trasladar=false;
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
  
     
 });
document.getElementById('rotarBtn').addEventListener('click', function() {
   rotar=true;
   trasladar=false;
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
 
    
});
document.addEventListener('keydown', function(event) {
    console.log(trasladar);
    // Verificar si una figura está seleccionada y si la tecla presionada es para rotar
    if (figuraSeleccionada && (event.key === 'ArrowLeft' || event.key === 'ArrowRight') && rotar) {
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
    //TRASLADAR
  
    if (figuraSeleccionada.tipo=='rombo' && trasladar) {
        // Si la tecla presionada es la flecha izquierda
        if (event.key === 'ArrowLeft') {
            figuraSeleccionada.centerX -= 5;
            traslacionX -= 5;
        }
        // Si la tecla presionada es la flecha derecha
        else if (event.key === 'ArrowRight') {
            figuraSeleccionada.centerX += 5;
            traslacionX += 5;
        }
        // Si la tecla presionada es la flecha arriba
        else if (event.key === 'ArrowUp') {
            figuraSeleccionada.centerY -= 5;
            traslacionY -= 5;
        }
        // Si la tecla presionada es la flecha abajo
        else if (event.key === 'ArrowDown') {
            figuraSeleccionada.centerY += 5;
            traslacionY += 5;
        }

        // Limpiar el lienzo
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        // Redibujar todas las figuras con la nueva traslación
        dibujarFiguras(figurasDibujadas);
    }else if (figuraSeleccionada.tipo == 'circulo' && trasladar) {
        // Si la tecla presionada es la flecha izquierda
        if (event.key === 'ArrowLeft') {
            figuraSeleccionada.centerX -= 5;
            traslacionX -= 5;
        }
        // Si la tecla presionada es la flecha derecha
        else if (event.key === 'ArrowRight') {
            figuraSeleccionada.centerX += 5;
            traslacionX += 5;
        }
        // Si la tecla presionada es la flecha arriba
        else if (event.key === 'ArrowUp') {
            figuraSeleccionada.centerY -= 5;
            traslacionY -= 5;
        }
        // Si la tecla presionada es la flecha abajo
        else if (event.key === 'ArrowDown') {
            figuraSeleccionada.centerY += 5;
            traslacionY += 5;
        }

        // Limpiar el lienzo
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        // Redibujar todas las figuras con la nueva traslación
        dibujarFiguras(figurasDibujadas);
    }else if(figuraSeleccionada.tipo == 'elipse' && trasladar){
 // Si la tecla presionada es la flecha izquierda
        if (event.key === 'ArrowLeft') {
            figuraSeleccionada.centerX -= 5;
            traslacionX -= 5;
        }
        // Si la tecla presionada es la flecha derecha
        else if (event.key === 'ArrowRight') {
            figuraSeleccionada.centerX += 5;
            traslacionX += 5;
        }
        // Si la tecla presionada es la flecha arriba
        else if (event.key === 'ArrowUp') {
            figuraSeleccionada.centerY -= 5;
            traslacionY -= 5;
        }
        // Si la tecla presionada es la flecha abajo
        else if (event.key === 'ArrowDown') {
            figuraSeleccionada.centerY += 5;
            traslacionY += 5;
        }

        // Limpiar el lienzo
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        // Redibujar todas las figuras con la nueva traslación
        dibujarFiguras(figurasDibujadas);
    }else{
        if (event.key === 'ArrowLeft' && trasladar) {
            if (figuraSeleccionada) {
                figuraSeleccionada.startX -= 1;
                figuraSeleccionada.endX -= 1;
                traslacionX-=5;
                contexto.clearRect(0, 0, canvas.width, canvas.height);
                // Redibujar todas las figuras con la nueva rotación
                dibujarFiguras(figurasDibujadas);
            }
        }
        // Si la tecla presionada es la flecha derecha
        else if (event.key === 'ArrowRight' && trasladar) {
            if (figuraSeleccionada) {
                figuraSeleccionada.startX += 1;
                figuraSeleccionada.endX += 1;
                traslacionX+=5;
                contexto.clearRect(0, 0, canvas.width, canvas.height);
                // Redibujar todas las figuras con la nueva rotación
                dibujarFiguras(figurasDibujadas);
            }
        }
        // Si la tecla presionada es la flecha arriba
        else if (event.key === 'ArrowUp' && trasladar) {
            if (figuraSeleccionada) {
                figuraSeleccionada.startY -= 1;
                figuraSeleccionada.endY -= 1;
                traslacionY-=5;
                contexto.clearRect(0, 0, canvas.width, canvas.height);
                // Redibujar todas las figuras con la nueva rotación
                dibujarFiguras(figurasDibujadas);
            }
        }
        // Si la tecla presionada es la flecha abajo
        else if (event.key === 'ArrowDown' && trasladar) {
            if (figuraSeleccionada) {
                figuraSeleccionada.startY += 1;
                figuraSeleccionada.endY += 1;
                traslacionY+=5;
                contexto.clearRect(0, 0, canvas.width, canvas.height);
                // Redibujar todas las figuras con la nueva rotación
                dibujarFiguras(figurasDibujadas);
            }
        }
    }
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
document.getElementById('trasladarBtn').addEventListener('click', function() {

    trasladar=true;
    rotar=false;
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
});
document.getElementById('guardarComoBtn').addEventListener('click', function() {
    guardarEnJSON();
    anguloRotacion = 0;
    rotar=false;
});
document.getElementById('inputArchivo').addEventListener('click', function() {
    cargarDesdeJSON();
    anguloRotacion = 0;
    rotar=false;
});
document.getElementById('exportarBtn').addEventListener('click', function() {
    anguloRotacion = 0;
    rotar=false;
    const opcion = prompt("¿Desea exportar como PNG o como PDF? (Ingrese 'png' o 'pdf')");

    if (opcion === 'png') {
        exportarCanvas('png');
    } else if (opcion === 'pdf') {
        genPDF();
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

function genPDF() {
    var doc = new jsPDF({
        orientation: "landscape",
        unit: 'mm',
        format: [canvas.clientWidth,canvas.clientHeight]
    });
    const dataURI= canvas.toDataURL({
        type:'png',
        quality:1
    });
    doc.addImage(dataURI,"PNG",0,0);
    doc.save("Midocumento.pdf")
}
function preguntarFormatoExportacion() {
    const opcion = prompt("¿Desea exportar como PNG o como PDF? (Ingrese 'png' o 'pdf')");

    if (opcion === 'png') {
        exportarCanvas('png');
    } else if (opcion === 'pdf') {
        genPDF();
    } else {
        console.error('Formato de exportación no válido');
    }
}
// Obtener referencia a los elementos del menú desplegable
const opcionesBtn = document.getElementById('opcionesBtn');
const opcionesContent = document.getElementById('opcionesContent');
document.getElementById('escribirBtn').addEventListener('click', function() {
    trasladar=false;
    rotar=false;
    escribir=true;
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
});
document.getElementById('atrasBtn').addEventListener('click', function() {
    deshacer();
    anguloRotacion = 0;
    rotar=false;
});
document.getElementById('adelanteBtn').addEventListener('click', function() {
    rehacer();
    anguloRotacion = 0;
    rotar=false;
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
    trasladar=false;
    rotar=false;
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

 function dibujarRombo(centerX, centerY, width, height, color, size, anguloRotacion, traslacionX, traslacionY) {
    // Definir los puntos que conforman los vértices del rombo
    const halfWidth = width / 2;
    const halfHeight = height / 2;
 
    // Aplicar la traslación al centro del rombo
    centerX += traslacionX;
    centerY += traslacionY;

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

        // Calcular las coordenadas absolutas después de la rotación y traslación y devolverlas
        return [rotatedX + centerX, rotatedY + centerY];
    });

    // Dibujar los lados del rombo usando las coordenadas de los vértices rotados
    dibujarLineaDDA(rotatedVertices[0][0], rotatedVertices[0][1], rotatedVertices[1][0], rotatedVertices[1][1], color, size); // Lado superior
    dibujarLineaDDA(rotatedVertices[1][0], rotatedVertices[1][1], rotatedVertices[2][0], rotatedVertices[2][1], color, size); // Lado derecho
    dibujarLineaDDA(rotatedVertices[2][0], rotatedVertices[2][1], rotatedVertices[3][0], rotatedVertices[3][1], color, size); // Lado inferior
    dibujarLineaDDA(rotatedVertices[3][0], rotatedVertices[3][1], rotatedVertices[0][0], rotatedVertices[0][1], color, size); // Lado izquierdo
}


document.getElementById('dibujarTrapecioBtn').addEventListener('click', function() {
    trasladar=false;

    dibujandoTrapecio=true;
    rotar=false;
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
 function dibujarTrapecio(startX, startY, endX, endY, color, size, anguloRotacion, traslacionX, traslacionY) {
    // Calcular el centro del trapecio con traslación
    const centerX = (startX + endX) / 2 + traslacionX;
    const centerY = (startY + endY) / 2 + traslacionY;

    // Calcular las dimensiones del trapecio
    const height = Math.abs(endY - startY);
    const topWidth = Math.abs(startX - endX) / 2;
    const bottomWidth = topWidth * 0.6;

    // Calcular las coordenadas de los vértices del trapecio en base al ángulo de rotación
    const halfHeight = height / 2;
    const halfTopWidth = topWidth / 2;
    const halfBottomWidth = bottomWidth / 2;

    const topLeftX = centerX - halfTopWidth;
    const topLeftY = centerY - halfHeight;
    const topRightX = centerX + halfTopWidth;
    const topRightY = centerY - halfHeight;
    const bottomRightX = centerX + halfBottomWidth;
    const bottomRightY = centerY + halfHeight;
    const bottomLeftX = centerX - halfBottomWidth;
    const bottomLeftY = centerY + halfHeight;

    // Rotar las coordenadas de los vértices
    const rotatedTopLeft = rotatePoint(topLeftX, topLeftY, centerX, centerY, anguloRotacion);
    const rotatedTopRight = rotatePoint(topRightX, topRightY, centerX, centerY, anguloRotacion);
    const rotatedBottomRight = rotatePoint(bottomRightX, bottomRightY, centerX, centerY, anguloRotacion);
    const rotatedBottomLeft = rotatePoint(bottomLeftX, bottomLeftY, centerX, centerY, anguloRotacion);

    // Dibujar los lados del trapecio usando las coordenadas de los vértices rotados
    dibujarLineaDDA(rotatedTopLeft.x, rotatedTopLeft.y, rotatedTopRight.x, rotatedTopRight.y, color, size);
    dibujarLineaDDA(rotatedTopRight.x, rotatedTopRight.y, rotatedBottomRight.x, rotatedBottomRight.y, color, size);
    dibujarLineaDDA(rotatedBottomRight.x, rotatedBottomRight.y, rotatedBottomLeft.x, rotatedBottomLeft.y, color, size);
    dibujarLineaDDA(rotatedBottomLeft.x, rotatedBottomLeft.y, rotatedTopLeft.x, rotatedTopLeft.y, color, size);
}


// Función para rotar un punto alrededor de otro punto de referencia
function rotatePoint(x, y, centerX, centerY, angle) {
    var newX = (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle) + centerX;
    var newY = (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle) + centerY;
    return { x: newX, y: newY };
   
}



document.getElementById('verdeBtn').addEventListener('click', function() {
   color=[0, 255, 0];
   rotar=false;
   trasladar=false;

});
document.getElementById('rojoBtn').addEventListener('click', function() {
    color=[255, 0, 0];
    rotar=false;
    trasladar=false;

 });
 document.getElementById('azulBtn').addEventListener('click', function() {
    color=[0, 0, 255];
    rotar=false;
    trasladar=false;
 
 });
 document.getElementById('negroBtn').addEventListener('click', function() {
    color=[0, 0, 0];
    trasladar=false;
    rotar=false;
 });

 document.getElementById('dibujarBtn').addEventListener('click', function() {
    dibujarBtn=true;
    escribir=false;
    trasladar=false;
    rotar=false;
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
    trasladar=false;
    rotar=false;
    resizing=false;
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
    trasladar=false;
    rotar=false;
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
    trasladar=false;
    rotar=false;
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
    trasladar=false;
    rotar=false;
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
    trasladar=false;
    rotar=false;
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
    trasladar=false;
    rotar=false;
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
    //RESIZE DE TODAS LAS FIGURAS
   
    
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
        rotar=false;
    }

   
});

// cordenadas al soltar el mouse
canvas.addEventListener('mouseup', function(event) {
    if (!isDrawing) return;
    endX = event.clientX - canvas.getBoundingClientRect().left; // x
    endY = event.clientY - canvas.getBoundingClientRect().top;   // y

    // Calcular el cambio en las dimensiones del círculo (en este caso, solo el radio)
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const newRadius = Math.sqrt(deltaX ** 2 + deltaY ** 2) / 2;

    if (figuraSeleccionada && figuraSeleccionada.tipo === 'circulo' && resizing) {
        // Actualizar el radio de la figura seleccionada con el nuevo radio calculado
        figuraSeleccionada.radius = newRadius;

        // Limpiar el lienzo
        contexto.clearRect(0, 0, canvas.width, canvas.height);

        // Redibujar todas las figuras con las nuevas dimensiones
        dibujarFiguras(figurasDibujadas);
    }

  
    if(dibujandoCirculo){
        // Calcular el centro del círculo con traslación
        const centerX = (startX + endX) / 2 + traslacionX;
        const centerY = (startY + endY) / 2 + traslacionY;
            
        // Calcular el radio del círculo
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) / 2;
            
        // Dibujar el círculo con traslación
        dibujarCirculo(centerX, centerY, radius, color, size, traslacionX, traslacionY);
        console.log("aiudaaaaaaaaaaaaaa");
        // Agregar información del círculo al vector de figuras dibujadas
        let circulo = {
            tipo: 'circulo',
            centerX: centerX,
            centerY: centerY,
            radius: radius,
            color: color,
            size: size,
            traslacionX: traslacionX,
            traslacionY: traslacionY
        };
        figurasDibujadas.push(circulo);
     
    }else if(dibujandoLinea){
        dibujarLineaDDARotar(startX,startY,endX,endY,color,size,anguloRotacion,traslacionX,traslacionY);
        let linea = {
            tipo: 'linea',
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color:color,
            size:size,
            anguloRotacion:anguloRotacion,
            traslacionX:traslacionX,
            traslacionY:traslacionY
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
            size:size,
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
        
     
        dibujarElipse(centerX, centerY, radiusX, radiusY,color,size,anguloRotacion,traslacionX,traslacionY);
        let elipse = {
            tipo: 'elipse',
            centerX: centerX,
            centerY: centerY,
            radiusX: radiusX,
            radiusY: radiusY,
            color:color,
            size:size,
            anguloRotacion:anguloRotacion,
            traslacionX:traslacionX,
            traslacionY:traslacionY
        };
        figurasDibujadas.push(elipse);
      //  dibujarFiguras(figurasDibujadas);
    }else if(dibujandoPoligono){
        let angulo = Math.atan2(endX-startX,endY-startY);
        let radio = Math.sqrt(Math.pow(endX-startX,2)+Math.pow(endY-startY,2));
        console.log(ladosPoligono);
        dibujarPoligono2(radio,startX,startY,lado_d,angulo,color,size,anguloRotacion,traslacionX,traslacionY);
        let poligono = {
            tipo: 'poligono',
            radio: radio,
            startX: startX,
            startY: startY,
            lado_d: lado_d,
            angulo: angulo,
            color:color,
            size:size,
            anguloRotacion:anguloRotacion,
            traslacionX:traslacionX,
            traslacionY:traslacionY
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
           size:size,
           anguloRotacion:anguloRotacion
       };
       figurasDibujadas.push(rectangulo);
      // dibujarFiguras(figurasDibujadas);
   }else if(dibujandoTrapecio){
      dibujarTrapecio(startX, startY, endX, endY,color,size,anguloRotacion,traslacionX,traslacionY);
      let trapecio = {
        tipo: 'trapecio',
        startX: startX,
        startY: startY,
        endX:endX,
        endY:endY,
        color:color,
        size:size,
        anguloRotacion:anguloRotacion,
        traslacionX:traslacionX,
        traslacionY:traslacionY
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
     dibujarRombo(centerX, centerY, width, height, color,size,anguloRotacion,traslacionX,traslacionY);

     // Guardar la información del rombo en el arreglo de figuras dibujadas
     let rombo = {
         tipo: 'rombo',
         centerX: centerX,
         centerY: centerY,
         width: width,
         height: height,
         color: color,
         size:size,
         anguloRotacion:anguloRotacion,
         traslacionX:traslacionX,
         traslacionY:traslacionY
     };
     figurasDibujadas.push(rombo);
    
   }

     // Restablecer la bandera de dibujo
     isDrawing = false;

     //RESIZE DE TODAS LAS FIGURAS
    
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

function dibujarPoligono2(radio, centerX, centerY, ladosPoligono, angulo, color, size, anguloRotacion, traslacionX, traslacionY) {
    const anguloInicial = (2 * Math.PI) / ladosPoligono;
    let lastX = 0;
    let lastY = 0;

    // Calcular el centro del polígono con traslación
    const centroX = centerX + traslacionX;
    const centroY = centerY + traslacionY;

    for (let i = 0; i < ladosPoligono; i++) {
        const step = i * anguloInicial + angulo;
        const point = grados(centroX, centroY, radio, step, anguloRotacion);
        if (i > 0) {
            dibujarLineaDDA(point.x, point.y, lastX, lastY, color, size, anguloRotacion);
        }
        lastX = point.x;
        lastY = point.y;
    }
  
    dibujarLineaDDA(lastX, lastY, Math.round(centroX + radio * Math.cos(angulo + anguloRotacion)), Math.round(centroY + radio * Math.sin(angulo + anguloRotacion)), color, size, anguloRotacion);
}

function grados(centerX, centerY, radio, step, anguloRotacion) {
    const puntoX = centerX + radio * Math.cos(step + anguloRotacion);
    const puntoY = centerY + radio * Math.sin(step + anguloRotacion);
    return { x: puntoX, y: puntoY };
}
function dibujarElipse(centerX, centerY, radiusX, radiusY, color, size, anguloRotacion, traslacionX, traslacionY) {
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        // Calcular las coordenadas sin traslación
        let x = Math.round(centerX + Math.cos(angle) * radiusX);
        let y = Math.round(centerY + Math.sin(angle) * radiusY);
        
        // Aplicar la traslación si es necesario
        if (traslacionX !== 0 || traslacionY !== 0) {
            x += traslacionX;
            y += traslacionY;
        }
        
        // Rotar las coordenadas si es necesario
        if (anguloRotacion !== 0) {
            const rotatedPoint = rotatePoint(x, y, centerX, centerY, anguloRotacion);
            x = rotatedPoint.x;
            y = rotatedPoint.y;
        }
       
        // Dibujar el píxel en la posición rotada
        drawPixel(x, y, color, size);
    }
}

function dibujarLineaDDA(x0, y0, x1, y1, color, size, anguloRotacion) {
   

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
        drawPixel(Math.round(x), Math.round(y), color, size); // dibujar el píxel más cercano
        x += xIncrement;
        y += yIncrement;
    }
    

}
function dibujarLineaDDARotar(x0, y0, x1, y1, color, size, anguloRotacion, traslacionX, traslacionY) {
    // Aplicar la traslación a los puntos inicial y final de la línea
    x0 += traslacionX;
    y0 += traslacionY;
    x1 += traslacionX;
    y1 += traslacionY;
    console.log("linea");
    const centerX = (x0 + x1) / 2;
    const centerY = (y0 + y1) / 2;
    
    // Rotar los puntos inicial y final de la línea
    const rotatedStart = rotatePoint(x0, y0, centerX, centerY, anguloRotacion);
    const rotatedEnd = rotatePoint(x1, y1, centerX, centerY, anguloRotacion);
    
    x0 = rotatedStart.x;
    y0 = rotatedStart.y;
    x1 = rotatedEnd.x;
    y1 = rotatedEnd.y;

    // Diferencias en x y y
    let dx = x1 - x0;
    let dy = y1 - y0;

    // Longitud de la línea
    let steps = Math.max(Math.abs(dx), Math.abs(dy));

    // Incrementos para cada paso
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    // Valores iniciales
    let x = x0;
    let y = y0;

    // Dibujar cada punto de la línea
    for (let i = 0; i <= steps; i++) {
        drawPixel(Math.round(x), Math.round(y), color, size); // Dibujar el píxel más cercano
        x += xIncrement;
        y += yIncrement;
    }
}

function dibujarCuadrado(centerX, centerY, sideLength, color, size, anguloRotacion, traslacionX, traslacionY) {
    const halfLength = sideLength / 2;

    // Calcular los vértices del cuadrado sin rotación
    const vertices = [
        [centerX - halfLength, centerY - halfLength], // Punto superior izquierdo (A)
        [centerX + halfLength, centerY - halfLength], // Punto superior derecho (B)
        [centerX + halfLength, centerY + halfLength], // Punto inferior derecho (C)
        [centerX - halfLength, centerY + halfLength]  // Punto inferior izquierdo (D)
    ];

    // Aplicar la rotación a cada vértice si no está en modo de traslación
    let rotatedVertices = vertices;
    if (!trasladar) {
        rotatedVertices = vertices.map(vertex => rotatePoint(vertex[0], vertex[1], centerX, centerY, anguloRotacion));
    } else {
        anguloRotacion = 0; // Establecer el ángulo de rotación a cero cuando se traslada
    }

    // Aplicar la traslación a cada vértice rotado si no está en modo de traslación
    if (!trasladar) {
        rotatedVertices = rotatedVertices.map(vertex => [vertex.x + traslacionX, vertex.y + traslacionY]);
    }

    // Dibujar los lados del cuadrado usando las coordenadas de los vértices trasladados
    dibujarLineaDDA(rotatedVertices[0][0], rotatedVertices[0][1], rotatedVertices[1][0], rotatedVertices[1][1], color, size); // Lado superior
    dibujarLineaDDA(rotatedVertices[1][0], rotatedVertices[1][1], rotatedVertices[2][0], rotatedVertices[2][1], color, size); // Lado derecho
    dibujarLineaDDA(rotatedVertices[2][0], rotatedVertices[2][1], rotatedVertices[3][0], rotatedVertices[3][1], color, size); // Lado inferior
    dibujarLineaDDA(rotatedVertices[3][0], rotatedVertices[3][1], rotatedVertices[0][0], rotatedVertices[0][1], color, size); // Lado izquierdo

    // Llamar a la función para seleccionar la figura
    seleccionarFigura(centerX, centerY);
}


function dibujarRectangulo(centerX, centerY, width, height, color, size, anguloRotacion) {
    // Calcular las coordenadas de los vértices del rectángulo sin rotación
    const x0 = centerX - width / 2;
    const y0 = centerY - height / 2;
    const x1 = centerX + width / 2;
    const y1 = centerY - height / 2;
    const x2 = centerX + width / 2;
    const y2 = centerY + height / 2;
    const x3 = centerX - width / 2;
    const y3 = centerY + height / 2;

    // Aplicar la rotación a cada vértice
    const rotatedX0Y0 = rotatePoint(x0, y0, centerX, centerY, anguloRotacion);
    const rotatedX1Y1 = rotatePoint(x1, y1, centerX, centerY, anguloRotacion);
    const rotatedX2Y2 = rotatePoint(x2, y2, centerX, centerY, anguloRotacion);
    const rotatedX3Y3 = rotatePoint(x3, y3, centerX, centerY, anguloRotacion);

    // Dibujar los lados del rectángulo usando las coordenadas de los vértices rotados
    dibujarLineaDDA(rotatedX0Y0.x, rotatedX0Y0.y, rotatedX1Y1.x, rotatedX1Y1.y, color, size); // Lado superior
    dibujarLineaDDA(rotatedX1Y1.x, rotatedX1Y1.y, rotatedX2Y2.x, rotatedX2Y2.y, color, size); // Lado derecho
    dibujarLineaDDA(rotatedX2Y2.x, rotatedX2Y2.y, rotatedX3Y3.x, rotatedX3Y3.y, color, size); // Lado inferior
    dibujarLineaDDA(rotatedX3Y3.x, rotatedX3Y3.y, rotatedX0Y0.x, rotatedX0Y0.y, color, size);
}

function dibujarCirculo(x0, y0, radius, color, size, traslacionX = 0, traslacionY = 0) {
    let x = radius;
    let y = 0;
    let err = 0;

    // Actualizar traslacionX y traslacionY para el círculo
    x0 += traslacionX;
    y0 += traslacionY;

    while (x >= y) {
        drawPixel(x0 + x, y0 + y, color, size);
        drawPixel(x0 + y, y0 + x, color, size);
        drawPixel(x0 - y, y0 + x, color, size);
        drawPixel(x0 - x, y0 + y, color, size);
        drawPixel(x0 - x, y0 - y, color, size);
        drawPixel(x0 - y, y0 - x, color, size);
        drawPixel(x0 + y, y0 - x, color, size);
        drawPixel(x0 + x, y0 - y, color, size);

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
                dibujarCirculo(figura.centerX, figura.centerY, figura.radius,figura.color,figura.size,figura.traslacionX,figura.traslacionY, figura.startX, figura.startY, figura.endX, figura.endY);
                break;
            case 'linea':
                dibujarLineaDDARotar(figura.startX, figura.startY, figura.endX, figura.endY,figura.color,figura.size,figura.anguloRotacion,figura.traslacionX,figura.traslacionY);
                break;
            case 'elipse':
                dibujarElipse(figura.centerX, figura.centerY, figura.radiusX, figura.radiusY,figura.color,figura.size,figura.anguloRotacion,figura.traslacionX,figura.traslacionY);
                break;
            case 'poligono':
                dibujarPoligono2(figura.radio, figura.startX, figura.startY, figura.lado_d, figura.angulo,figura.color,figura.size,figura.anguloRotacion,figura.traslacionX,figura.traslacionY);
                break;
            case 'cuadrado':
                dibujarCuadrado(figura.startX, figura.startY, figura.lado,figura.color,figura.size,figura.anguloRotacion);
                break;
            case 'pixel':
                drawPixel(figura.x,figura.y,figura.color,figura.size,figura.anguloRotacion);
                break;
            case 'rombo':
                
                dibujarRombo(figura.centerX, figura.centerY, figura.width, figura.height, figura.color, figura.size,figura.anguloRotacion,figura.traslacionX,figura.traslacionY);
                break;
            case 'trapecio':
                dibujarTrapecio(figura.startX, figura.startY, figura.endX, figura.endY,figura.color,figura.size,figura.anguloRotacion,figura.traslacionX,figura.traslacionY);
                break;
            
        }
    }
}
function dibujarCuadrado(centerX, centerY, sideLength, color, size, anguloRotacion) {
    // Calcular las coordenadas de los vértices del cuadrado sin rotación
    const halfLength = sideLength / 2;
    const x0 = centerX - halfLength;
    const y0 = centerY - halfLength;
    const x1 = centerX + halfLength;
    const y1 = centerY - halfLength;
    const x2 = centerX + halfLength;
    const y2 = centerY + halfLength;
    const x3 = centerX - halfLength;
    const y3 = centerY + halfLength;

    // Aplicar la rotación a cada vértice
    const rotatedX0Y0 = rotatePoint(x0, y0, centerX, centerY, anguloRotacion);
    const rotatedX1Y1 = rotatePoint(x1, y1, centerX, centerY, anguloRotacion);
    const rotatedX2Y2 = rotatePoint(x2, y2, centerX, centerY, anguloRotacion);
    const rotatedX3Y3 = rotatePoint(x3, y3, centerX, centerY, anguloRotacion);

    // Dibujar los lados del cuadrado usando las coordenadas de los vértices rotados
    dibujarLineaDDA(rotatedX0Y0.x, rotatedX0Y0.y, rotatedX1Y1.x, rotatedX1Y1.y, color, size); // Lado superior
    dibujarLineaDDA(rotatedX1Y1.x, rotatedX1Y1.y, rotatedX2Y2.x, rotatedX2Y2.y, color, size); // Lado derecho
    dibujarLineaDDA(rotatedX2Y2.x, rotatedX2Y2.y, rotatedX3Y3.x, rotatedX3Y3.y, color, size); // Lado inferior
    dibujarLineaDDA(rotatedX3Y3.x, rotatedX3Y3.y, rotatedX0Y0.x, rotatedX0Y0.y, color, size); // Lado izquierdo
}



function drawPixel(x, y, color, size) {
    x = Math.round(x);
    y = Math.round(y);

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
    rotar=false;
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




