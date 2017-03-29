
function Sprite(cor,x,y) {
  this.x = x
  this.y = y
  this.comp = 15
  this.larg = 15
  this.vx = 0
  this.vy = 0
  this.ax = 0
  this.ay = 0
  this.cor = cor
  this.podeMover = true
}



Sprite.prototype.desenhar = function(ctx) {
  ctx.fillStyle = this.cor
  ctx.fillRect(this.x,this.y,this.comp,this.larg)
  ctx.strokeStyle = "black"
  ctx.strokeRect(this.x,this.y,this.comp,this.larg)
}

Sprite.prototype.mover = function(dt) {
  if(this.podeMover) {
	this.vx = this.vx + this.ax*dt
	this.vy = this.vy + (this.ay+50)*dt
	this.x = this.x + this.vx*dt
	this.y = this.y + this.vy*dt
  }
}
