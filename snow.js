
let wind = 0;
let windOsc = .006;
let windStrength = 1;
let density = 500;
let speed = .4;
window.onload = snowGenerator;

async function snowGenerator() {
  let c = document.getElementById("can");
  let ctx = c.getContext("2d");
  c.width = 1080;
  c.height = 1644;
  c.style.width = 1080;
  c.style.height = 1644;
  pic = document.getElementById("pic")
  ctx.drawImage(pic,0,0);
  let windActual = 0;
  
  c.addEventListener("click", ()=> document.getElementById("controls").style.display = "block");
  
  controlDensity = document.getElementById("density")
  controlSpeed = document.getElementById("speed")
  controlWosc = document.getElementById("wosc")
  controlWstr = document.getElementById("wstr")
  outDensity = document.getElementById("densityOut")
  outSpeed = document.getElementById("speedOut")
  outWosc = document.getElementById("woscOut")
  outWstr = document.getElementById("wstrOut")
  controlDensity.addEventListener("change", ()=>{
    density = controlDensity.value;
    outDensity.innerHTML = density;
  })
  controlSpeed.addEventListener("change", ()=>{
    speed = controlSpeed.value;
    outSpeed.innerHTML = speed;
  })
  controlWosc.addEventListener("change", ()=>{
    windOsc = controlWosc.value;
    outWosc.innerHTML = windOsc;
  })
  controlWstr.addEventListener("change", ()=>{
    windStrength = controlWstr.value;
    outWstr.innerHTML = windStrength;
  })
  
  
  function Snowflake(id){
    this.x = -(c.width/2)+Math.random()*c.width*2;
    this.y = 0;
    this.id = id;
    this.dx = Math.random();
    this.dy = .5+(Math.random()*3);
    this.size = Math.random() > .9? 2:1;
    this.life = true;
    
    this.update = function(){
      this.x += speed*this.dx;
      this.y += speed*this.dy;
      this.x += speed*windActual;
      
      if(this.y >= c.height + 5 || this.x >= c.width+10){
        
        this.life = false;
      }
    }
    
    this.draw = function drawflake(ctx){
      ctx.fillStyle="#ffffff";
      ctx.fillRect(this.x, this.y,4,4);
      if(this.size == 2){
        ctx.fillRect(this.x+4, this.y+4,4,4);
        ctx.fillRect(this.x-4, this.y+4,4,4);
        ctx.fillRect(this.x, this.y+8,4,4);
      }
    }
    
  }
  
  flakeCount = 2;
  let flakes = [new Snowflake(0)];
  
  function killFlake(id){
    flakes.splice(id,1);
    flakeCount -= 1;
  }
  
  function doFrame(){
    wind += windOsc
    windActual = windStrength*Math.abs(Math.sin(wind))
    flakes.forEach( (e,i) => {
      e.update();
      if(!e.life){
        killFlake(i);
      }
    });
    
    ctx.drawImage(pic,0,0);
    flakes.forEach( e=> {
      e.draw(ctx);
    });
    if(flakeCount <= density){
      flakeCount+=3;
      flakes.push(new Snowflake(flakes.length));
      flakes.push(new Snowflake(flakes.length));
      flakes.push(new Snowflake(flakes.length));
    }
    requestAnimationFrame(doFrame );
  }
  
  requestAnimationFrame(doFrame );
}