var canvas = document.getElementById('canvas');
var contexto = canvas.getContext('2d');
var dibujandoCirculo,dibujandoLinea,dibujandoCuadrado,dibujandoElipse,dibujandoPoligono,dibujandoRectangulo=false;
// coordenadas del mouse
var startX, startY, endX, endY;
let point=[];
var rectangles = [];
let ladosPoligono=0;
let flag=0;
var isDrawing=false;
//console.log(figuras)
//listener para el boton de circulo
document.getElementById('dibujarCirculoBtn').addEventListener('click', function() {
    dibujandoCirculo = true;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
    flag=0;
});
//listener boton linea
document.getElementById('dibujarLineaBtn').addEventListener('click', function() {
    dibujandoLinea = true;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
    flag=0;
});
//listener boton cuadrado
document.getElementById('dibujarCuadradoBtn').addEventListener('click', function() {
    dibujandoLinea = false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=true;
    dibujandoElipse=false;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
    flag=0;
});
//listener boton elipse
document.getElementById('dibujarElipseBtn').addEventListener('click', function() {
    dibujandoLinea = false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=false;
    dibujandoElipse=true;
    dibujandoPoligono=false;
    dibujandoRectangulo=false;
    flag=0;
});
document.getElementById('dibujarPoligonoBtn').addEventListener('click', function() {
    dibujandoCirculo = false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoRectangulo=false;
    flag=1;
 //   dibujandoPoligono=true;

});
document.getElementById('dibujarRectanguloBtn').addEventListener('click', function() {
    dibujandoCirculo = false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoRectangulo=true;
    dibujandoPoligono=false;
    flag=1;
 //   dibujandoPoligono=true;

});
// agarrar las coordenadas del mouse cuqando hace clic
canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    if(dibujandoCirculo || dibujandoLinea || dibujandoCuadrado || dibujandoElipse||dibujandoRectangulo){
        startX = event.clientX - canvas.getBoundingClientRect().left; // x
        startY = event.clientY - canvas.getBoundingClientRect().top;  // y
    }
    if(dibujandoPoligono){
        startX = event.clientX - canvas.getBoundingClientRect().left; // x
        startY = event.clientY - canvas.getBoundingClientRect().top;  // y
        point.push({ x: startX, y: startY }); // Guardar el vértice inicial
        console.log(point)
       // ladosPoligono++;
    }
});

canvas.addEventListener("mousemove", function(event) {
    if (!isDrawing) return; // Salir si no estamos dibujando
    
    var rect = canvas.getBoundingClientRect();
    var x = Math.round(event.clientX - rect.left);
    var y = Math.round(event.clientY - rect.top);

   if(dibujandoRectangulo){
    // Limpiar el lienzo
    contexto.clearRect(0, 0, canvas.width, canvas.height);
        // Dibujar todos los rectángulos almacenados
        rectangles.forEach(function(rectangle) {
            dibujarRectangulo(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        });

        // Dibujar el rectángulo actual mientras se arrastra el mouse
        dibujarRectangulo(startX, startY, x - startX, y - startY);
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
        dibujarCirculo(centerX,centerY,radius);
     
    }else if(dibujandoLinea){
        dibujarLineaDDA(startX,startY,endX,endY);
    }else if(dibujandoCuadrado){
        lado=Math.sqrt(((endX-startX)**2)+((endY-startY)**2))
        dibujarCuadrado(startX,startY, lado);
    }else if (dibujandoElipse) {
        //centro
        let centerX = (startX + endX) / 2;
        let centerY = (startY + endY) / 2;
        
        //radios
        let radiusX = Math.abs((endX - startX) / 2);
        let radiusY = Math.abs((endY - startY) / 2);
        
     
        dibujarElipse(centerX, centerY, radiusX, radiusY);
    }else if(dibujandoPoligono){
        let angulo = Math.atan2(endX-startX,endY-startY);
        let radio = Math.sqrt(Math.pow(endX-startX,2)+Math.pow(endY-startY,2));
        console.log(ladosPoligono);
        dibujarPoligono2(radio,startX,startY,lado_d,angulo);
    }else if(dibujandoRectangulo){
         // Calcular el ancho y alto del rectángulo
        var width = x - startX;
        var height = y - startY;

        // Almacenar el rectángulo dibujado actualmente
        rectangles.push({ x: startX, y: startY, width: width, height: height });
       
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

function dibujarPoligono2(radio,centerX,centerY,ladosPoligono,angulo) {
        console.log(ladosPoligono);
        var angulo_inicial=(2*Math.PI)/ladosPoligono,lastX=0,lastY=0;
        for(let i=0;i<ladosPoligono;i++){
            let step=i*angulo_inicial+angulo;
            let point=grados(centerX,centerY,radio,step);
            if(i>0){
                dibujarLineaDDA(point.x,point.y,lastX,lastY);
            }
            lastX=point.x;
            lastY=point.y;
        }
        dibujarLineaDDA(lastX,lastY,Math.round(centerX+radio*Math.cos(angulo)),Math.round(centerY+radio*Math.sin(angulo)))
}
function grados(centerX,centerY,radio,step){
    let pointX=Math.round(centerX+radio*Math.cos(step));
    let pointY=Math.round(centerY+radio*Math.sin(step));
    return{x:pointX,y:pointY}
}

function dibujarElipse(centerX, centerY, radiusX, radiusY) {
   
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        const x = Math.round(centerX + Math.cos(angle) * radiusX);
        const y = Math.round(centerY + Math.sin(angle) * radiusY);
        drawPixel(x, y, [0, 0, 0]);
    }
   
}


function dibujarLineaDDA(x0, y0, x1, y1) {
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
        drawPixel(Math.round(x), Math.round(y), [0, 0, 0]); // dibujar el píxel más cercano
        x += xIncrement;
        y += yIncrement;
    }
}
function dibujarCuadrado(x, y, lado) {
    let x0 = x;
    let y0 = y;
    let x1 = x + lado;
    let y1 = y;
    let x2 = x + lado;
    let y2 = y + lado;
    let x3 = x;
    let y3 = y + lado;

    dibujarLineaDDA(x0, y0, x1, y1); // Lado superior
    dibujarLineaDDA(x1, y1, x2, y2); // Lado derecho
    dibujarLineaDDA(x2, y2, x3, y3); // Lado inferior
    dibujarLineaDDA(x3, y3, x0, y0); // Lado izquierdo
}






  function dibujarCirculo(x0, y0, radius) {
      let x = radius;
      let y = 0;
      let err = 0;

      while (x >= y) {
          drawPixel(x0 + x, y0 + y, [0, 0, 0]);
          drawPixel(x0 + y, y0 + x, [0, 0, 0]);
          drawPixel(x0 - y, y0 + x, [0, 0, 0]);
          drawPixel(x0 - x, y0 + y, [0, 0, 0]);
          drawPixel(x0 - x, y0 - y, [0, 0, 0]);
          drawPixel(x0 - y, y0 - x, [0, 0, 0]);
          drawPixel(x0 + y, y0 - x, [0, 0, 0]);
          drawPixel(x0 + x, y0 - y, [0, 0, 0]);

          if (err <= 0) {
              y += 1;
              err += 2 * y + 1;
          } else {
              x -= 1;
              err -= 2 * x + 1;
          }
      }
  }

  function dibujarRectangulo(x, y, width, height) {

    dibujarLineaDDA(x, y, x + width, y);
    dibujarLineaDDA(x + width, y, x + width, y + height);
    dibujarLineaDDA(x + width, y + height, x, y + height);
    dibujarLineaDDA(x, y + height, x, y);
}


  function drawPixel(x, y, color) {
       //  datos de píxeles del canvas
      var imageData = contexto.createImageData(1, 1);
      var data = imageData.data;

      //color del píxel
      data[0] = color[0];   // rojo
      data[1] = color[1];   // verde
      data[2] = color[2];   // azul
      data[3] = 255;        // opacidad

      // dibuja pixel
      contexto.putImageData(imageData, x, y);
  }