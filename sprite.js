
function Sprite() {
  this.x = 15
  this.y = 15
  this.altura = 15
  this.largura = 15
  this.vx = 0
  this.vy = 0
  this.ax = 0
  this.ay = 0
  this.cor = "blue"
  this.podeMover = true
  this.angle = 0
  this.vAng = 0
  this.am = 0
  this.cooldown = 0
}
/*
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
*/


Sprite.prototype.desenhar = function(ctx) {
  ctx.save()
  ctx.translate(this.x, this.y)
  ctx.rotate(this.angle*Math.PI/180)
  ctx.fillStyle = this.cor
  ctx.strokeStyle = "yellow"
  //ctx.fillRect(this.x,this.y,this.largura,this.altura)
  ctx.beginPath()
    ctx.moveTo(-this.largura/2, -this.altura/2)
    ctx.lineTo(-this.largura/2, this.altura/2)
    ctx.lineTo(this.largura/2, 0)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.strokeStyle = "black"
  //ctx.fillRect(-this.largura/2, -this.altura/2, this.largura, this.altura)

  ctx.strokeRect(-this.largura/2, -this.altura/2, this.largura, this.altura)
  ctx.restore()
  //ctx.strokeRect(this.x,this.y,this.largura,this.altura)
}

Sprite.prototype.desenharIMG = function(ctx, ship) {
  ctx.save()
  ctx.translate(this.x, this.y)
  ctx.rotate(90*Math.PI/180 + this.angle*Math.PI/180)
  ctx.drawImage(ship,-this.largura/2,-this.altura/2, this.largura,this.altura)
  ctx.strokeStyle = "black"
  ctx.restore()
}

Sprite.prototype.mover = function(dt) {
  if(this.podeMover) {
	this.vx = this.vx + this.ax*dt
	//this.vy = this.vy + (this.ay+50)*dt
  this.vy = this.vy + this.ay*dt
	this.x = this.x + this.vx*dt
	this.y = this.y + this.vy*dt
  this.angle = this.angle + this.vAng*dt

  if(this.cooldown > 0) {
    this.cooldown-=dt
  } else {
    this.cooldown = 0
  }
  }
}

Sprite.prototype.moverAng = function(dt) {
  if(this.podeMover) {
    this.angle = this.angle + this.vAng*dt
    this.ax = this.am*Math.cos(Math.PI*this.angle/180)
    this.ay = this.am*Math.sin(Math.PI*this.angle/180)

	  this.vx = this.vx + this.ax*dt
	  //this.vy = this.vy + (this.ay+50)*dt
    this.vy = this.vy + this.ay*dt
	  this.x = this.x + this.vx*dt
	  this.y = this.y + this.vy*dt
    if(this.cooldown > 0) {
      this.cooldown-=dt
    } else {
      this.cooldown = 0
    }

  }
}

Sprite.prototype.colidiuCom = function(alvo) {
  if(this.x+this.largura < alvo.x) return false
  if(this.x > alvo.x+this.largura) return false
  if(this.y+this.altura < alvo.y) return false
  if(this.y > alvo.y+this.altura) return false
  return true
}

Sprite.prototype.perseguir = function(alvo, dt) {
  this.ax = (alvo.x - this.x)*dt*5 - 0.05*this.vx
  this.ay = (alvo.y - this.y)*dt*5 - 0.05*this.vy
}

Sprite.prototype.perseguirAng = function(alvo, dt) {
  var dx = alvo.x - this.x
  var dy = alvo.y - this.y
  var distancia = Math.sqrt(dx*dx+dy*dy)
  var angulo = 180*Math.acos(dx/distancia)/Math.PI
  this.vAng = 300*(angulo - this.angle)*dt
}
