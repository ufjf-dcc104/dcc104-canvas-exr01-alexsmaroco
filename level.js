function level() {
  this.sprites = []
  this.inimigos = 3
  this.imageLib
  this.shots = []
}

level.prototype.iniciar = function() {
  for(var i=0;i<this.inimigos;i++) {
    var inimigo = new Sprite()
    inimigo.x = 50+i*20
    inimigo.y = 200
    inimigo.largura = 10+i*5
    inimigo.altura = 10+i*5
    inimigo.cor = "green"
    inimigo.podeMover = true
    inimigo.vAng = 60+30*i
    this.sprites.push(inimigo)
  }
}

level.prototype.mover = function(dt) {
  for(var i=0;i<this.sprites.length;i++) {
    this.sprites[i].mover(dt)
  }
  for(var j=0;j<this.shots.length;j++) {
    this.shots[j].mover(dt)
  }
}

level.prototype.moverAng = function(dt) {
  for(var i=0;i<this.sprites.length;i++) {
    this.sprites[i].moverAng(dt)
  }
  for(var j=0;j<this.shots.length;j++) {
    this.shots[j].moverAng(dt)
  }

  for(var j=this.shots.length-1;j>=0;j--) {
    if(this.shots[j].x > 500 || this.shots[j].y > 500 || this.shots[j].x < -500 || this.shots[j].y < -500) {
      this.shots.splice(j,1)
    }
  }

}

level.prototype.desenhar = function(ctx) {
  for(var i=0;i<this.sprites.length;i++) {
    this.sprites[i].desenhar(ctx)
  }
  for(var j=0;j<this.shots.length;j++) {
    this.shots[j].desenhar(ctx)
  }
}

level.prototype.desenharIMG = function(ctx) {
  for(var i=0;i<this.sprites.length;i++) {
    this.sprites[i].desenhar(ctx)
  }
  for(var j=0;j<this.shots.length;j++) {
    this.shots[j].desenhar(ctx)
  }
}



level.prototype.colidiuCom = function(alvo, resolveColisao) {
  for(var i=0; i < this.sprites.length; i++) {
    if(this.sprites[i].colidiuCom(alvo)) {
      resolveColisao(this.sprites[i], alvo)
    } else {
      //this.sprites[i].cor = "green"
    }
  }
}

level.prototype.colidiuComTiros = function() {
  for(var i = this.shots.length-1; i >= 0; i--) {
    this.colidiuCom(this.shots[i], function(that) {
      return function(alvo) {
        alvo.cor = "yellow"
        that.shots.splice(i,1)
        x = that.sprites.indexOf(alvo);
        that.sprites.splice(x, 1);
      }
    }(this))
  }
}

level.prototype.perseguir = function(alvo, dt) {
  for(i=0; i<this.sprites.length; i++) {
    this.sprites[i].perseguir(alvo,dt)
  }
}

level.prototype.perseguirAng = function(alvo, dt) {
  for(i=0; i<this.sprites.length; i++) {
    this.sprites[i].perseguirAng(alvo,dt)
  }
}

level.prototype.fire = function(alvo) {
  var tiro = new Sprite()
  tiro.x = alvo.x
  tiro.y = alvo.y
  tiro.angle = alvo.angle
  tiro.am = 50
  tiro.largura = 5
  tiro.altura = 5
  tiro.podeMover = true
  this.shots.push(tiro)
  alvo.cooldown = 1
}
