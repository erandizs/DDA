var canvas = document.getElementById('canvas');
var contexto = canvas.getContext('2d');
contexto.canvas.willReadFrequently = true;
var dibujandoCirculo,dibujandoLinea,dibujandoCuadrado,dibujandoElipse,dibujandoPoligono,dibujandoRectangulo,dibujarBtn,dibujandoTrapecio=false;
// coordenadas del mouse

var startX, startY, endX, endY;

// Coordenadas de los cuatro puntos del trapecio
var punto1X, punto1Y, punto2X, punto2Y, punto3X, punto3Y, punto4X, punto4Y;

var indiceActual = 0;
var cantidadFiguras = 0;

var figurasDibujadas= [];
let ladosPoligono=0;
let flag=0;
var isDrawing=false;
//console.log(figuras)

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
   flag_borrador=false;
    dibujandoCirculo = false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
 });
//listener para el boton de circulo
document.getElementById('dibujarCirculoBtn').addEventListener('click', function() {
    dibujandoCirculo = true;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag_borrador=false;
    flag=0;
});
//listener boton linea
document.getElementById('dibujarLineaBtn').addEventListener('click', function() {
    dibujandoLinea = true;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    flag_borrador=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag=0;
});
//listener boton cuadrado
document.getElementById('dibujarCuadradoBtn').addEventListener('click', function() {
    dibujandoLinea = false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=true;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    flag_borrador=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag=0;
});
//listener boton elipse
document.getElementById('dibujarElipseBtn').addEventListener('click', function() {
    dibujandoLinea = false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=false;
    dibujandoElipse=true;
    dibujandoPoligono=false;
    flag_borrador=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag=0;
});
document.getElementById('dibujarPoligonoBtn').addEventListener('click', function() {
    dibujandoCirculo = false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    flag_borrador=false;
    dibujandoRectangulo=false;
    dibujando=false;
    flag=1;
 //   dibujandoPoligono=true;

});
document.getElementById('dibujarRectanguloBtn').addEventListener('click', function() {
    dibujandoCirculo = false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    flag_borrador=false;
    dibujandoRectangulo=true;
    dibujandoPoligono=false;
    dibujando=false;
    flag=1;
 //   dibujandoPoligono=true;

});
// agarrar las coordenadas del mouse cuqando hace clic
canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    if(dibujandoCirculo || dibujandoLinea || dibujandoCuadrado || dibujandoElipse||dibujandoRectangulo){
        startX = event.offsetX; // x relativo al canvas
        startY = event.offsetY; // y relativo al canvas
    }
    if(dibujandoPoligono){
        startX = event.clientX - canvas.getBoundingClientRect().left; // x
        startY = event.clientY - canvas.getBoundingClientRect().top;  // y
      
       // ladosPoligono++;
    }
});

canvas.addEventListener("mousemove", function(event) {
    if (!isDrawing) return;
    endX = event.offsetX; // x relativo al canvas
    endY = event.offsetY; // y relativo al canvas
    if(dibujarBtn){
        drawPixel(endX,endY, color); 
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
        dibujarCirculo(centerX,centerY,radius,color);
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
        dibujarFiguras(figurasDibujadas);
     
    }else if(dibujandoLinea){
        dibujarLineaDDA(startX,startY,endX,endY,color);
        let linea = {
            tipo: 'linea',
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            color:color
        };
        figurasDibujadas.push(linea);
        dibujarFiguras(figurasDibujadas);
    }else if(dibujandoCuadrado){
        lado = Math.sqrt(((endX - startX) ** 2) + ((endY - startY) ** 2));
        dibujarCuadrado(startX, startY, lado, color);
        let cuadrado = {
            tipo: 'cuadrado',
            startX: startX,
            startY: startY,
            lado: lado,
            color: color
        };
        figurasDibujadas.push(cuadrado);
        dibujarFiguras(figurasDibujadas);
}else if (dibujandoElipse) {
        //centro
        let centerX = (startX + endX) / 2;
        let centerY = (startY + endY) / 2;
        
        //radios
        let radiusX = Math.abs((endX - startX) / 2);
        let radiusY = Math.abs((endY - startY) / 2);
        
     
        dibujarElipse(centerX, centerY, radiusX, radiusY,color);
        let elipse = {
            tipo: 'elipse',
            centerX: centerX,
            centerY: centerY,
            radiusX: radiusX,
            radiusY: radiusY,
            color:color
        };
        figurasDibujadas.push(elipse);
        dibujarFiguras(figurasDibujadas);
    }else if(dibujandoPoligono){
        let angulo = Math.atan2(endX-startX,endY-startY);
        let radio = Math.sqrt(Math.pow(endX-startX,2)+Math.pow(endY-startY,2));
        console.log(ladosPoligono);
        dibujarPoligono2(radio,startX,startY,lado_d,angulo,color);
        let poligono = {
            tipo: 'poligono',
            radio: radio,
            startX: startX,
            startY: startY,
            lado_d: lado_d,
            angulo: angulo,
            color:color
        };
        figurasDibujadas.push(poligono);
        dibujarFiguras(figurasDibujadas);
    } if(dibujandoRectangulo){
        // Calcular el ancho y alto del rectángulo
       var width = endX - startX;
       var height = endY - startY;
       dibujarRectangulo(startX, startY, width, height,color);
       let rectangulo = {
           tipo: 'rectangulo',
           startX: startX,
           startY: startY,
           width: width,
           height: height,
           color:color
       };
       figurasDibujadas.push(rectangulo);
       dibujarFiguras(figurasDibujadas);
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

function dibujarPoligono2(radio,centerX,centerY,ladosPoligono,angulo,color) {
        console.log(ladosPoligono);
        var angulo_inicial=(2*Math.PI)/ladosPoligono,lastX=0,lastY=0;
        for(let i=0;i<ladosPoligono;i++){
            let step=i*angulo_inicial+angulo;
            let point=grados(centerX,centerY,radio,step);
            if(i>0){
                dibujarLineaDDA(point.x,point.y,lastX,lastY,color);
            }
            lastX=point.x;
            lastY=point.y;
        }
        dibujarLineaDDA(lastX,lastY,Math.round(centerX+radio*Math.cos(angulo)),Math.round(centerY+radio*Math.sin(angulo)),color)
}
function grados(centerX,centerY,radio,step){
    let pointX=Math.round(centerX+radio*Math.cos(step));
    let pointY=Math.round(centerY+radio*Math.sin(step));
    return{x:pointX,y:pointY}
}

function dibujarElipse(centerX, centerY, radiusX, radiusY,color) {
   
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        const x = Math.round(centerX + Math.cos(angle) * radiusX);
        const y = Math.round(centerY + Math.sin(angle) * radiusY);
        drawPixel(x, y, color);
    }
   
}


function dibujarLineaDDA(x0, y0, x1, y1,color) {
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
        drawPixel(Math.round(x), Math.round(y), color); // dibujar el píxel más cercano
        x += xIncrement;
        y += yIncrement;
    }
}
function dibujarCuadrado(x, y, lado,color) {
    let x0 = x;
    let y0 = y;
    let x1 = x + lado;
    let y1 = y;
    let x2 = x + lado;
    let y2 = y + lado;
    let x3 = x;
    let y3 = y + lado;

    dibujarLineaDDA(x0, y0, x1, y1,color); // Lado superior
    dibujarLineaDDA(x1, y1, x2, y2,color); // Lado derecho
    dibujarLineaDDA(x2, y2, x3, y3,color); // Lado inferior
    dibujarLineaDDA(x3, y3, x0, y0,color); // Lado izquierdo

  
}






  function dibujarCirculo(x0, y0, radius,color) {
      let x = radius;
      let y = 0;
      let err = 0;

      while (x >= y) {
          drawPixel(x0 + x, y0 + y, color);
          drawPixel(x0 + y, y0 + x, color);
          drawPixel(x0 - y, y0 + x, color);
          drawPixel(x0 - x, y0 + y, color);
          drawPixel(x0 - x, y0 - y, color);
          drawPixel(x0 - y, y0 - x, color);
          drawPixel(x0 + y, y0 - x, color);
          drawPixel(x0 + x, y0 - y, color);

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
    // Iterar sobre las figuras dibujadas y dibujarlas en el canvas
    for (let i = 0; i < figurasDibujadas.length; i++) {
        const figura = figurasDibujadas[i];
        switch (figura.tipo) {
            case 'rectangulo':
                dibujarRectangulo(figura.startX, figura.startY, figura.width, figura.height,figura.color);
                break;
            case 'circulo':
                dibujarCirculo(figura.centerX, figura.centerY, figura.radius,figura.color);
                break;
            case 'linea':
                dibujarLineaDDA(figura.startX, figura.startY, figura.endX, figura.endY,figura.color);
                break;
            case 'elipse':
                dibujarElipse(figura.centerX, figura.centerY, figura.radiusX, figura.radiusY,figura.color);
                break;
            case 'poligono':
                dibujarPoligono2(figura.radio, figura.startX, figura.startY, figura.lado_d, figura.angulo,figura.color);
                break;
            case 'cuadrado':
                dibujarCuadrado(figura.startX, figura.startY, figura.lado,figura.color);
                break;
        }
    }
}


function dibujarRectangulo(x, y, width, height, color) {
    let x0 = x;
    let y0 = y;
    let x1 = x + width;
    let y1 = y;
    let x2 = x + width;
    let y2 = y + height;
    let x3 = x;
    let y3 = y + height;

    dibujarLineaDDA(x0, y0, x1, y1, color); // Lado superior
    dibujarLineaDDA(x1, y1, x2, y2, color); // Lado derecho
    dibujarLineaDDA(x2, y2, x3, y3, color); // Lado inferior
    dibujarLineaDDA(x3, y3, x0, y0, color); // Lado izquierdo
}


function drawPixel(x, y, color) {
    // Verificar si el píxel ya está ocupado por una figura dibujada previamente
    const pixelData = contexto.getImageData(x, y, 1, 1).data;
    if (pixelData[3] !== 0) { // Si la opacidad es diferente de cero, significa que ya hay una figura dibujada en este píxel
        return; // No cambie el color del píxel
    }

    // Datos de píxeles del canvas
    var imageData = contexto.createImageData(1, 1);
    var data = imageData.data;

    // Color del píxel
    data[0] = color[0]; // Rojo
    data[1] = color[1]; // Verde
    data[2] = color[2]; // Azul
    data[3] = 255; // Opacidad

    // Dibujar el píxel
    contexto.putImageData(imageData, x, y);
}
// Función para exportar la imagen del canvas en el formato especificado
function exportarImagenCanvas(formato) {
    const imagenData = canvas.toDataURL('image/' + formato);
    const enlaceImagen = document.createElement('a');
    enlaceImagen.href = imagenData;
    enlaceImagen.download = 'canvas_image.' + formato.toLowerCase();
    enlaceImagen.click();
}
function obtenerColorFondo() {
    const estilo = getComputedStyle(canvas);
    return estilo.backgroundColor;
}
  document.getElementById('guardarComoBtn').addEventListener('click', function() {
    const opciones = ['PNG', 'PDF', 'JPG'];
    const eleccion = prompt('Seleccione el formato para exportar (PNG, PDF, JPG):', 'PNG');

    if (eleccion && opciones.includes(eleccion.toUpperCase())) {
        const formato = eleccion.toUpperCase();

        // Obtener el color de fondo del canvas
        const colorFondo = obtenerColorFondo();

        // Crear un objeto que contenga la información del fondo, color de cada figura y la imagen del canvas
        const dataExportacion = {
            fondo: colorFondo,
            figuras: figurasDibujadas
        };

        // Convertir el objeto en formato JSON
        const jsonData = JSON.stringify(dataExportacion);

        // Crear un enlace <a> para descargar el archivo JSON
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);

        // Establecer el nombre del archivo
        enlaceDescarga.download = 'canvas_data.json';

        // Simular un clic en el enlace para iniciar la descarga
        document.body.appendChild(enlaceDescarga);
        enlaceDescarga.click();

        // Limpiar el enlace y liberar recursos
        document.body.removeChild(enlaceDescarga);

        // Exportar la imagen del canvas en el formato especificado
        exportarImagenCanvas(formato);
    } else {
        alert('Formato no válido. Por favor, seleccione entre PNG, PDF o JPG.');
    }
});


// Función para cargar las figuras desde un archivo JSON
function cargarFigurasDesdeArchivo(event) {
    const archivo = event.target.files[0];

    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = function(event) {
        const data = event.target.result;
        const figurasGuardadas = JSON.parse(data);

        // Dibujar las figuras recuperadas en el canvas
        dibujarFiguras(figurasGuardadas);
    };

    lector.readAsText(archivo);
}

// Asociar la función cargarFigurasDesdeArchivo al cambio del input de tipo file
document.getElementById('inputArchivo').addEventListener('change', cargarFigurasDesdeArchivo);



//BORRAR


document.getElementById('borraBtn').addEventListener('click', function() {
    // Establecer la bandera para el modo borrador
    flag_borrador = true;
    dibujarBtn=false;
    // Desactivar el dibujo de todas las figuras
    dibujandoCirculo = false;
    dibujandoLinea = false;
    dibujandoCuadrado = false;
    dibujandoElipse = false;
    dibujandoPoligono = false;
    dibujandoRectangulo = false;
    flag = 0;
   
    // Agregar un evento de clic al lienzo para eliminar figuras
        canvas.addEventListener('click', function(event) {
            if(flag_borrador){
                // Obtener las coordenadas del clic
                const x = event.offsetX;
                const y = event.offsetY;

                // Iterar sobre las figuras dibujadas
                for (let i = 0; i < figurasDibujadas.length; i++) {
                    const figura = figurasDibujadas[i];

                    // Verificar si el clic está dentro de la figura
                    if (
                        (figura.tipo === 'circulo' && puntoDentroDeCirculo(x, y, figura.centerX, figura.centerY, figura.radius)) ||
                        (figura.tipo === 'linea' && puntoEnLinea(x, y, figura.startX, figura.startY, figura.endX, figura.endY)) ||
                        (figura.tipo === 'cuadrado' && puntoDentroDeCuadrado(x, y, figura.startX, figura.startY, figura.lado)) ||
                        (figura.tipo === 'elipse' && puntoDentroDeElipse(x, y, figura.centerX, figura.centerY, figura.radiusX, figura.radiusY)) ||
                        (figura.tipo === 'poligono' && puntoDentroDePoligono(x, y, figura.radio, figura.startX, figura.startY, figura.lado_d, figura.angulo)) ||
                        (figura.tipo === 'rectangulo' && puntoDentroDeRectangulo(x, y, figura.startX, figura.startY, figura.width, figura.height))
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
            if(dibujandoTrapecio){
             
                
            }
        });
    
    
});
function dibujarTrapecio(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    // Dibujar las cuatro líneas que forman el trapecio
    dibujarLineaDDA(x1, y1, x2, y2, color);
    dibujarLineaDDA(x2, y2, x3, y3, color);
    dibujarLineaDDA(x3, y3, x4, y4, color);
    dibujarLineaDDA(x4, y4, x1, y1, color);
}
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
function puntoDentroDeCuadrado(x, y, startX, startY, lado) {
    return x >= startX && x <= startX + lado && y >= startY && y <= startY + lado;
}

// Función para verificar si un punto está dentro de una elipse
function puntoDentroDeElipse(x, y, centerX, centerY, radiusX, radiusY) {
    const distancia = ((x - centerX) ** 2) / (radiusX ** 2) + ((y - centerY) ** 2) / (radiusY ** 2);
    return distancia <= 1;
}

// Función para verificar si un punto está dentro de un polígono
function puntoDentroDePoligono(x, y, radio, centerX, centerY, ladosPoligono, angulo) {
    const puntoTransformadoX = (x - centerX) * Math.cos(-angulo) - (y - centerY) * Math.sin(-angulo);
    const puntoTransformadoY = (x - centerX) * Math.sin(-angulo) + (y - centerY) * Math.cos(-angulo);

    const distanciaAlCentro = Math.sqrt(puntoTransformadoX ** 2 + puntoTransformadoY ** 2);

    return distanciaAlCentro <= radio;
}

// Función para verificar si un punto está dentro de un rectángulo
function puntoDentroDeRectangulo(x, y, startX, startY, width, height) {
    return x >= startX && x <= startX + width && y >= startY && y <= startY + height;
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