const canvas = document.querySelector('canvas');
const winW = window.innerWidth;
const winH = window.innerHeight;
canvas.width = winW;
canvas.height = winH;
const mouse = {
    prex:undefined,
    prey:undefined,
    x:undefined,
    y:undefined,
    isDrawing:false
}

const c  = canvas.getContext('2d');

window.addEventListener('mousemove',(event)=>{
    mouse.prex=mouse.x;
    mouse.prey=mouse.y;
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('mousedown',()=>{
    mouse.isDrawing = true;
    console.log('down');
})
window.addEventListener('mouseup',()=>{
    mouse.isDrawing = false;
    console.log('up');
})

c.beginPath();
const animate = () =>{
    c.strokeStyle = 'pink';
    if(mouse.isDrawing){
        c.moveTo(mouse.prex,mouse.prey);
        c.lineTo(mouse.x,mouse.y);
    }
    c.stroke();
    console.log()
    requestAnimationFrame(animate);
}

animate();


