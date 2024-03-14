


window.onload = snowGenerator;

  let wind = 0;
  let density = 1000;
  let speed = .5;
async function snowGenerator() {
  let c = document.getElementById("can");
  let ctx = c.getContext("2d");
  c.width = 1080;
  c.height = 1644;
  c.style.width = 1080;
  c.style.height = 1644;
  pic = document.getElementById("pic")
  ctx.drawImage(pic,0,0);
  
  let wind = 0;
  let density = 1000;
  let speed = .5;
  function Snowflake(id){
    this.x = -(c.width/2)+Math.random()*c.width*2;
    this.y = 0;
    this.id = id;
    this.dx = speed* Math.random()*2;
    this.dy = speed* 2;//Math.random()*3;
    this.size = Math.random() > .9? 2:1;
    this.life = true;
    this.update = function(){
      console.log(`I am at ${this.x},${this.y}`);
      this.x += this.dx;
      this.y += this.dy;
      this.x += wind;
      
      if(this.y >= c.height + 5 || this.x >= c.width+10){
        console.log( "dying:  "+this.y+ "  >  " + (c.height + 5));
        
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
    //console.log( id + ": Bye!");
    flakes.splice(id,1);
    flakeCount -= 1;
  }
  function doFrame(){
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
   // console.log(flakeCount+ " < " +density )
    if(flakeCount <= density){
      flakeCount++;
      flakes.push(new Snowflake(flakes.length));
    }
    
  requestAnimationFrame(doFrame );
  }
  
  requestAnimationFrame(doFrame );
}