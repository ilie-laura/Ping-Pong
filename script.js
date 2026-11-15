const canvas=document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");

let lastTimestamp = null;
class Ball{
    asset;
    ctx;
    pos = { x: 50, y: 50 };
  vel = { x: 150, y: 150 };
    size={w:undefined, h:undefined};
    constructor(url,ctx){
        this.asset=new Image();
        this.asset.src=url;
        this.ctx=ctx;
    }

    async preload(){
        await this.asset.decode();
         if (this.size.w === undefined) {
   const scale=0.15;
this.size.w = this.asset.width * scale;
this.size.h = this.asset.height * scale;
    }
}
onCollide({ x, y }) {
    if (x) {
      this.vel.x = -this.vel.x;
    }
    if (y) {
      this.vel.y = -this.vel.y;
    }
  }
  get hitbox() {
    return {
      left: this.pos.x - this.size.w / 2,
      right: this.pos.x + this.size.w / 2,
      top: this.pos.y - this.size.h / 2,
      bottom: this.pos.y + this.size.h / 2,
    };
  }
 move(dt) {
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
  }
draw() {
    this.ctx.drawImage(
      this.asset,
      this.pos.x - this.size.w / 2,
      this.pos.y - this.size.h / 2,
        this.size.w,
    this.size.h,
    );
  }
}

const ball = new Ball("assets/ball.png", ctx);


ball.preload().then(() => requestAnimationFrame(update));



function update(timestamp){
    const dt = lastTimestamp === null ? 0 : (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
    const hittingLeftBoundary = ball.pos.x - ball.size.w / 2 <= 0 && ball.vel.x < 0;
const hittingRightBoundary = ball.pos.x + ball.size.w / 2 >= canvas.width && ball.vel.x > 0;
const hittingTopBoundary = ball.pos.y - ball.size.h / 2 <= 0 && ball.vel.y < 0;
const hittingBottomBoundary = ball.pos.y + ball.size.h / 2 >= canvas.height && ball.vel.y > 0;

    const x = hittingLeftBoundary || hittingRightBoundary;
const y = hittingTopBoundary || hittingBottomBoundary;
if (x || y) {
  ball.onCollide({ x, y });
}
    ball.move(dt);
    handleWallCollisions(ball, canvas.width, canvas.height);
  ctx.fillStyle = "#eeeeee";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ball.draw();
  requestAnimationFrame(update);
}


function handleWallCollisions(object, width, height) {
  const hitbox = object.hitbox;
  const hittingLeftBoundary = hitbox.left <= 0 && object.vel.x < 0;
  const hittingRightBoundary = hitbox.right >= width && object.vel.x > 0;
  const hittingTopBoundary = hitbox.top <= 0 && object.vel.y < 0;
  const hittingBottomBoundary = hitbox.bottom >= height && object.vel.y > 0;

  const x = hittingLeftBoundary || hittingRightBoundary;
  const y = hittingTopBoundary || hittingBottomBoundary;
  if (x || y) {
    object.onCollide({ x, y });
  }
}