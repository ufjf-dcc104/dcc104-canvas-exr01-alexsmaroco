function level() {
  this.sprites = []
  this.inimigos = 3
}

level.prototype.iniciar = function() {
  for(i=0;i<this.inimigos;i++) {
    var inimigo = new Sprite()
    inimigo.x = 50+i*20
    inimigo.y = 200
    inimigo.largura = 10+i*5
    inimigo.altura = 10+i*5
    inimigo.cor = "green"
    inimigo.podeMover = false
    inimigo.vAng = 30+30*i
    this.sprites.push(inimigo)
  }
}

level.prototype.mover = function(dt) {
  for(i=0;i<this.sprites.length;i++) {
    this.sprites[i].mover(dt)
  }
}

level.prototype.desenhar = function(ctx) {
  for(i=0;i<this.sprites.length;i++) {
    this.sprites[i].desenhar(ctx)
  }
}

level.prototype.colidiuCom = function(alvo, resolveColisao) {
  for(i=0; i < this.sprites.length; i++) {
    if(this.sprites[i].colidiuCom(alvo)) {
      resolveColisao(this.sprites[i], alvo)
    } else {
      this.sprites[i].cor = "green"
    }
  }
}

level.prototype.perseguir = function(alvo, dt) {
  for(i=0; i<this.sprites.length; i++) {
    this.sprites[i].perseguir(alvo,dt)
  }
}
