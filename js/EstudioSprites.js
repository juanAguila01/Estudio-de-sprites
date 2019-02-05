let frame = requestAnimationFrame;
class spritObject  {
    constructor(sourceX,sourceY,sourceWidth,sourceHeight,x,y,width,height){
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.movX = undefined;
        this.visible = true;
        this.rotar = 0;
        this.alpha = 1;
        this.sombra = false;
    }
}

let imagenesCargadas = 0;
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let sprites = [];

let escena = new spritObject(0,64,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
sprites.push(escena);

let cat = new spritObject(0,0,64,64,0,168,64,64);
sprites.push(cat);

let tiger = new spritObject(64,0,64,64,300,336,64,64);
sprites.push(tiger);

let image = new Image();
image.src = 'img/sprites.png';
image.addEventListener('load', loadHandler, false);

let botones = {
    izquierda : document.getElementById('izquierda'),
    derecha : document.getElementById('derecha'),
    arriba : document.getElementById('arriba'),
    abajo : document.getElementById('abajo'),
    agranda : document.getElementById('agranda'),
    achica : document.getElementById('achica'),
    invisible : document.getElementById('invisible'),
    visible : document.getElementById('visible'),
    rotarIzquierda : document.getElementById('rotarIzquierda'),
    rotarDerecha : document.getElementById('rotarDerecha'),
    masTransparente : document.getElementById('masTransparente'),
    menosTransparente : document.getElementById('menosTransparente'),
    sombraOn : document.getElementById('sombraOn'),
    sombraOff : document.getElementById('sombraOff')
}
botones.izquierda.addEventListener('click', izquierdaHandler, false);
botones.derecha.addEventListener('click', derechaHandler, false);
botones.arriba.addEventListener('click', arribaHandler, false);
botones.abajo.addEventListener('click', abajoHandler, false);
botones.agranda.addEventListener('click', agrandaHandler, false);
botones.achica.addEventListener('click', achicaHandler, false);
botones.invisible.addEventListener('click', invisibleHandler, false);
botones.visible.addEventListener('click', visibleHandler, false);
botones.rotarIzquierda.addEventListener('click', rotarIzquierdaHandler, false);
botones.rotarDerecha.addEventListener('click', rotarDerechaHandler, false);
botones.masTransparente.addEventListener('click', masTransparenteHandler, false);
botones.menosTransparente.addEventListener('click', menosTransparenteHandler, false);
botones.sombraOn.addEventListener('click', sombraOnHandler, false);
botones.sombraOff.addEventListener('click', sombraOffHandler, false);

function sombraOnHandler(){
    cat.sombra = true;
}

function sombraOffHandler(){
    cat.sombra = false;
}

function masTransparenteHandler(){
    if(cat.alpha > 0.1){
        cat.alpha -= 0.1;
    }
}

function menosTransparenteHandler(){
    if(cat.alpha < 1){
        cat.alpha += 0.1;
    }
}

function rotarIzquierdaHandler(){
    cat.rotar -= 10;
}

function rotarDerechaHandler(){
    cat.rotar += 10;
}

function izquierdaHandler(){
    cat.x -= 4;
}

function derechaHandler(){
    cat.x += 4;
}

function arribaHandler(){
    cat.y -= 4;
}

function abajoHandler(){
    cat.y += 4;
}

function agrandaHandler(){
    cat.width += 10;
    cat.height += 10;
    cat.x -= 5;
    cat.y -= 5;
}

function achicaHandler(){
    cat.width -= 10;
    cat.height -= 10;
    cat.x += 5;
    cat.y += 5;
}

function invisibleHandler(){
    cat.visible = false;
}
function visibleHandler(){
    cat.visible = true;
}

function loadHandler(){
    //imagenesCargadas se asegura de que todas las imagenes del juego sean cargadas
    //antes de que el juego comienze eliminando la posibilidad de que 
    //alguna imagen no sea cargada antes de que el codigo corra.
    imagenesCargadas += 1;
    if (imagenesCargadas === 1) {
        update();
    }
}

function update(){
    frame(update);
    render();
}

function render(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (sprites.length !== 0) {
        for (let i = 0; i < sprites.length; i++) {
            let sprite = sprites[i];
            if (sprite.visible) {
                context.save();
                context.translate(
                    Math.floor(sprite.x + (sprite.width/ 2)),
                    Math.floor(sprite.y + (sprite.height/ 2))
                )

                context.rotate(Math.PI / 180 * sprite.rotar);
                
                context.globalAlpha=sprite.alpha;

                if (sprite.sombra) {
                    context.shadowColor='rgba(100,100,100,0.5)';
                    context.shadowOffsetX= 3;
                    context.shadowOffsetY= 3;
                    context.shadowBlur= 3;
                }

                context.drawImage(image,
                            sprite.sourceX, sprite.sourceY,
                            sprite.sourceWidth, sprite.sourceHeight,
                            Math.floor(-sprite.width/2), Math.floor(-sprite.height/2),sprite.width,sprite.height);
                
                context.restore();
                
            }
        }
    }
}