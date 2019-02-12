let frame = requestAnimationFrame;

let singleton = (function(){
    let instance;
    function crearSingleton(){
        //privado
        function update(){
            frame(update);
            //mueve el personaje en todas las direcciones.
            if (movimientoTeclado.arriba) {
                cat.y -= cat.vy;
            }
            if (movimientoTeclado.abajo) {
                cat.y += cat.vy;
            }
            if (movimientoTeclado.izquierda) {
                cat.x -= cat.vx;
            }
            if (movimientoTeclado.derecha) {
                cat.x += cat.vx;
            }
            // colisiona al personaje con los bordes del mundo.
            if (cat.x < mundoDeJuego.x) {
                cat.x = mundoDeJuego.x;
            }
            if (cat.y < mundoDeJuego.y) {
                cat.y = mundoDeJuego.y;
            }
            if (cat.x + cat.w > mundoDeJuego.w) {
                cat.x = mundoDeJuego.w - cat.w;
            }
            if (cat.y + cat.h > mundoDeJuego.h) {
                cat.y = mundoDeJuego.h - cat.h;
            }
            //centra la camara con respecto al personaje.
            camara.x = Math.floor(cat.x + (cat.w / 2) - (camara.w / 2));
            camara.y = Math.floor(cat.y + (cat.h / 2) - (camara.h / 2));

            //colisiones de la camara con respecto al mundo.
            if (camara.x < mundoDeJuego.x) {
                camara.x = mundoDeJuego.x;
            }
            if (camara.y < mundoDeJuego.y) {
                camara.y = mundoDeJuego.y;
            }
            if (camara.x + camara.w > mundoDeJuego.x + mundoDeJuego.w) {
                camara.x = mundoDeJuego.x + mundoDeJuego.w - camara.w;
            }
            if (camara.y + camara.h > mundoDeJuego.h) {
                camara.y = mundoDeJuego.h - camara.h;
            }
            
            render();
        }

        function render(){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();

            context.translate(-camara.x, -camara.y);
                        

            if (sprites.length !== 0) {
                for (let i = 0; i < sprites.length; i++) {
                    let sprite = sprites[i];
                       
                    context.drawImage(image,
                                    sprite.sourceX, sprite.sourceY,
                                    sprite.sourceWidth, sprite.sourceHeight,
                                    sprite.x, sprite.y,sprite.w,sprite.h);
                       
                } 
            }
            context.restore();
        }
        return {
            //publico
            loadHandler(){
                //imagenesCargadas se asegura de que todas las imagenes del juego sean cargadas
                //antes de que el juego comienze eliminando la posibilidad de que 
                //alguna imagen no sea cargada antes de que el codigo corra.
                imagenesCargadas += 1;
                if (imagenesCargadas === 1) {
                    update();
                }
            },
            keyDownHandler(e){
                e.preventDefault();
                console.log(e.keyCode)
                switch (e.keyCode) {
                    case keyCodeTeclado.arriba: movimientoTeclado.arriba = true; break;
                    case keyCodeTeclado.abajo: movimientoTeclado.abajo = true; break;
                    case keyCodeTeclado.izquierda: movimientoTeclado.izquierda = true; break;
                    case keyCodeTeclado.derecha: movimientoTeclado.derecha = true; break;
                }
            },
            keyUpHandler(e){
                e.preventDefault();
                switch (e.keyCode) {
                    case keyCodeTeclado.arriba: movimientoTeclado.arriba = false; break;
                    case keyCodeTeclado.abajo: movimientoTeclado.abajo = false; break;
                    case keyCodeTeclado.izquierda: movimientoTeclado.izquierda = false; break;
                    case keyCodeTeclado.derecha: movimientoTeclado.derecha = false; break;
                }
            }
        }
    }
    return{
        getInstance(){
            if (!instance) {
                instance = crearSingleton();
            }
            console.log(instance);
            return instance;
        }
    }
})();

class spritObject  {
    constructor(sourceX,sourceY,sourceWidth,sourceHeight,x,y,width,height){
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.vx = 4;
        this.vy = 4;
        // this.movX = undefined;
        // this.visible = true;
        // this.rotar = 0;
        // this.alpha = 1;
        // this.sombra = false;
    }
}

class mundoCamara {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

let movimientoTeclado = {
    arriba : false,
    abajo : false,
    izquierda : false,
    derecha : false
}

let keyCodeTeclado = {
    arriba : 38,
    abajo : 40,
    izquierda : 37,
    derecha : 39
}

let manejadorJuego = singleton.getInstance();

let imagenesCargadas = 0;
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let sprites = [];

let fondo = new spritObject(0,64,2561,1922,0,0,2561,1922);
sprites.push(fondo);

let mundoDeJuego = new mundoCamara(0,0,fondo.w,fondo.h);
let camara = new mundoCamara(0,0,canvas.width,canvas.height);
camara.x = Math.floor(mundoDeJuego.x + (mundoDeJuego.w / 2) - (camara.w / 2));
camara.y = Math.floor(mundoDeJuego.y + (mundoDeJuego.h / 2) - (camara.h / 2));

let cat = new spritObject(0,0,64,64,0,0,64,64);
cat.x = Math.floor(mundoDeJuego.x + (mundoDeJuego.w / 2) - (cat.w / 2));
cat.y = Math.floor(mundoDeJuego.y + (mundoDeJuego.h / 2) - (cat.h / 2));
sprites.push(cat);


let image = new Image();
image.src = 'img/phobosTileSheet.png';
image.addEventListener('load', manejadorJuego.loadHandler, false);

//evento al precionar teclas para mover el sprite.
window.addEventListener('keydown', manejadorJuego.keyDownHandler, false);
window.addEventListener('keyup', manejadorJuego.keyUpHandler, false);