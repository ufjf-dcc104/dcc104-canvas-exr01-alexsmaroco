function Level (){
  this.sprites = [];
  this.paredeCooldown = 4;
}

Level.prototype.init = function (w,h) {
  this.width = w
  this.height = h
  this.spawnY = 0
  this.distMinima = 64
};

Level.prototype.mover = function (dt) {
    for (var i = this.sprites.length-1;i>=0; i--) {
      this.sprites[i].mover(dt);
      if(
        this.sprites[i].x >  3000 ||
        this.sprites[i].x < -3000 ||
        this.sprites[i].y >  3000 ||
        this.sprites[i].y < -3000
      ){
        this.sprites.splice(i, 1);
      }
    }
};


Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenhar(ctx);
    }
};
/*
Level.prototype.desenharImg = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenharImg(ctx, this.imageLib.images[this.sprites[i].imgkey]);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenharImg(ctx, this.imageLib.images[this.shots[i].imgkey]);
    }
};
*/

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiuCom(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};


Level.prototype.boost = function (alvo){
  if(alvo.cooldown>0) return;
  alvo.vy -= 100
  alvo.cooldown = 0.5;
}

Level.prototype.spawnParedes = function() {
	if(this.paredesCooldown > 0) {
		this.paredesCooldown -= dt
		return
	}
	/*
	var parede = new Sprite()
	if(Math.random() <= 0.5) {
		this.spawnY = this.height-50
	}
	else {
		this.spawnY = 50
	}
	parede.x = this.width + 30
	parede.y = this.spawnY
	parede.width = 10+15*Math.random()
	parede.height = 100+150*Math.random()
	parede.vx = -60
	this.sprites.push(parede)
	*/
	var paredeCima = new Sprite()
	paredeCima.x = this.width + 30
	paredeCima.y = 50 + 150*Math.random()
	paredeCima.width = 10+10*Math.random()
	paredeCima.height = 100+200*Math.random()
	paredeCima.vx = -60
	
	var paredeBaixo = new Sprite()
	paredeBaixo.x = this.width + 30
	paredeBaixo.y = (paredeCima.y + paredeCima.height + this.distMinima)
	paredeBaixo.width = 10+10*Math.random()
	paredeBaixo.height = 100+150*Math.random()
	paredeBaixo.vx = -60
	
	this.sprites.push(paredeCima)
	this.sprites.push(paredeBaixo)
	this.paredesCooldown = 2
}
/*
Level.prototype.colidiuComTiros = function(al, key){
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],
      (
        function(that)
        {
          return function(alvo){
            al.play(key, 0.7)
            alvo.color = "green";
            that.shots.splice(i,1);
            x = that.sprites.indexOf(alvo);
            that.sprites.splice(x, 1);
          }
        }
      )(this));
  }
}
*/

//
