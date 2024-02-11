var canvas = document.getElementById('canvas');
var contexto = canvas.getContext('2d');
var dibujandoCirculo,dibujandoLinea,dibujandoCuadrado,dibujandoElipse,dibujandoPoligono=false;
// coordenadas del mouse
var startX, startY, endX, endY;

//console.log(figuras)
//listener para el boton de circulo
document.getElementById('dibujarCirculoBtn').addEventListener('click', function() {
    dibujandoCirculo = true;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
});
//listener boton linea
document.getElementById('dibujarLineaBtn').addEventListener('click', function() {
    dibujandoLinea = true;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=false;
});
//listener boton cuadrado
document.getElementById('dibujarCuadradoBtn').addEventListener('click', function() {
    dibujandoLinea = false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=true;
    dibujandoElipse=false;
    dibujandoPoligono=false;
});
//listener boton elipse
document.getElementById('dibujarElipseBtn').addEventListener('click', function() {
    dibujandoLinea = false;
    dibujandoCirculo = false; //  no se dibuje un círculo
    dibujandoCuadrado=false;
    dibujandoElipse=true;
    dibujandoPoligono=false;
});
document.getElementById('dibujarPoligonoBtn').addEventListener('click', function() {
    dibujandoCirculo = false;
    dibujandoLinea = false; // no se dibuje una línea
    dibujandoCuadrado=false;
    dibujandoElipse=false;
    dibujandoPoligono=true;

});
// agarrar las coordenadas del mouse cuqando hace clic
canvas.addEventListener('mousedown', function(event) {
    if(dibujandoCirculo || dibujandoLinea || dibujandoCuadrado || dibujandoElipse||dibujandoPoligono){
        startX = event.clientX - canvas.getBoundingClientRect().left; // x
        startY = event.clientY - canvas.getBoundingClientRect().top;  // y
    }
});

// cordenadas al soltar el mouse
canvas.addEventListener('mouseup', function(event) {
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
   
        dibujarPoligono();
    }

    
});
  
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


    function dibujarPoligono(event) {
      
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