function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.vm = 0;
  this.ax = 0;
  this.ay = 0;
  this.vang = 0;
  this.SIZE = 16;
  this.angle = 0;
  this.cd = 1;
  this.imgKey = "pc";
}

Sprite.prototype.desenhar = function (ctx) {
	this.desenharPlayer(ctx);
}

Sprite.prototype.desenharPlayer = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(180*Math.PI/360+this.angle*2*Math.PI/360);
  ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(0, 0, this.w/2, 0, 2*Math.PI);
	ctx.fill();
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fillRect(-2,2, 5, 10);
  ctx.restore();
}

Sprite.prototype.desenharTiro = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(180*Math.PI/360+this.angle*2*Math.PI/360);
  
  ctx.fillStyle = "blue";
  ctx.fillRect(-this.w/2,this.h/2, this.w, this.h);
  ctx.restore();
}


Sprite.prototype.mover = function (map, dt) {
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);
  if(this.cd > 0) this.cd-=dt;
  this.angle = this.angle + this.vang*dt;
  this.vx = this.vm*Math.cos(Math.PI*this.angle/180);
  this.vy = this.vm*Math.sin(Math.PI*this.angle/180);

  //this.vy += 80*dt;
  if(this.vx>0 && map.cells[this.gy][this.gx+1]==1){
    this.x += Math.min((this.gx+1)*map.SIZE - (this.x+this.SIZE/2),this.vx*dt);
  } else if(this.vx <0 && map.cells[this.gy][this.gx-1]==1){
      this.x += Math.max((this.gx)*map.SIZE - (this.x-this.SIZE/2),this.vx*dt);
    }
  else {
    this.x = this.x + this.vx*dt;
  }
  if(this.vy >0 && map.cells[this.gy+1][this.gx]==1){
    this.y += Math.min((this.gy+1)*map.SIZE - (this.y+this.SIZE/2),this.vy*dt);
  } else if( this.vy<0 && map.cells[this.gy-1][this.gx]==1){
      this.y += Math.max((this.gy)*map.SIZE - (this.y-this.SIZE/2),this.vy*dt);
    }
  else {
    this.y = this.y + this.vy*dt;
  }
};

Sprite.prototype.atirar = function(map,dt) {
	if(this.cd > 0) return
	var tiro = new Sprite();
	tiro.pid = this.id;
	tiro.x = this.x;
	tiro.y = this.y;
	tiro.angle = this.angle;
	tiro.am = -150;
	tiro.w = 4;
	tiro.h = 8;
	console.log(map);
	map.shots.push(tiro);
	this.cd = 1;
}

Sprite.prototype.moverAng = function (dt) {
  this.ax = this.am*Math.cos(Math.PI*this.angle/180);
  this.ay = this.am*Math.sin(Math.PI*this.angle/180);
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + this.ay*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
};

Sprite.prototype.colidiuCom = function (alvo) {
  if((this.x+this.w/2) < alvo.x-alvo.w/2) return false;
  if(this.x-this.w/2 > (alvo.x+alvo.w/2)) return false;
  if((this.y+this.h/2) < alvo.y-alvo.h/2) return false;
  if(this.y-this.h/2 > (alvo.y+alvo.h/2)) return false;
  return true;
};
