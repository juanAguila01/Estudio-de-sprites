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

function loadHandler(){
    //imagenesCargadas se asegura de que todas las imagenes del juego sean cargadas
    //antes de que el juego comienze eliminando la posibilidad de que 
    //alguna imagen no sea cargada antes de que el codigo corra.
    imagenesCargadas += 1;
    if (imagenesCargadas === 1) {
        update();
    }
}

function moverAnimalX(animal){
    if (animal.x + animal.width >= canvas.width) {
        animal.movX  = -1
    }else if(animal.x <= 0){
        animal.movX = 1;
    }
    animal.x += animal.movX;
}
function moverAnimalY(animal){
    if (animal.y + animal.height >= canvas.height) {
        animal.movX  = -1
    }else if(animal.y <= 0){
        animal.movX = 1;
    }
    animal.y += animal.movX;
}

function update(){
    frame(update);
    moverAnimalX(cat);
    moverAnimalY(tiger);
    render();
}

function render(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (sprites.length !== 0) {
        for (let i = 0; i < sprites.length; i++) {
            let sprite = sprites[i];
            context.drawImage(image,
                            sprite.sourceX, sprite.sourceY,
                            sprite.sourceWidth, sprite.sourceHeight,
                            sprite.x, sprite.y,sprite.width,sprite.height);
            
        }
    }
}