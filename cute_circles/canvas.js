const canvas = document.querySelector('canvas');

const winW = window.innerWidth;
const winH = window.innerHeight;

canvas.width = winW;
canvas.height = winH;

const mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove',(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize',(event)=>{
    canvas.width = winW;
    canvas.height = winH;
})

const c  = canvas.getContext('2d');


class Circle {
    constructor(x, y, dx, dy, radius, color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
    draw = () =>{
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.strokeStyle =  c.fillStyle = this.color;
        c.fill();
    }
    update = () =>{
        if(this.x>winW - this.radius || this.x<this.radius) this.dx = -this.dx;
        if(this.y>winH-this.radius || this.y<this.radius) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        if(this.isInside())this.radius= Math.min(30,this.radius*1.05);
        else this.radius=Math.max(10,this.radius*0.95);
        this.draw();
    }
    isInside = () => (this.x-mouse.x)*(this.x-mouse.x) + (this.y-mouse.y)*(this.y-mouse.y) < 10000;
    
}

let circles = [...Array(1000)].map(()=>{
    return new Circle(
    winW * Math.random(),
    winH * Math.random(),
    5 * Math.random(),
    5 * Math.random(),
    5,
    ["orange", "green", "pink", "blue"][Math.floor(Math.random()*4)]
)})



circles.map(circle =>{circle.draw()});

const animate = () =>{
    c.clearRect(0,0,winW,winH);
    circles.forEach(circle =>{circle.update()});
    c.stroke();
    requestAnimationFrame(animate);
    
}

animate();


