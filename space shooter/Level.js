function Level (){
  this.sprites = [];
  this.shots = [];
  this.inimigos = 3;
  this.enemyshots = []
  this.cooldownSpawn = 4
  this.placar = 0
  this.energia = 100
}

Level.prototype.init = function () {
  for (var i = 0; i < this.inimigos; i++) {
    var inimigo = new Sprite();
    inimigo.x = 120+50*i;
    inimigo.y = -40;
    inimigo.width = 32;
    inimigo.height = 32;
    inimigo.angle = 90
	inimigo.vx = 75-10*Math.random()
	inimigo.vy = 15
    inimigo.imgkey = "enemy";
	inimigo.cooldown = 3
    this.sprites.push(inimigo);
  }
};

Level.prototype.mover = function (dt,w,h) {

    for (var i = this.sprites.length-1; i >=0 ; i--) {
      this.sprites[i].mover(dt);
  		if(this.sprites[i].x+this.sprites[i].width/2 > w) {
  			this.sprites[i].vx = -this.sprites[i].vx;
  			this.sprites[i].x = w-this.sprites[i].width/2;
  			//descer
  		} else if(this.sprites[i].x-this.sprites[i].width/2 < 0) {
        this.sprites[i].vx = -this.sprites[i].vx;
        this.sprites[i].x = this.sprites[i].width/2;
      }
      if(this.sprites[i].y > h) {
  			//perdeu vida
        this.sprites.splice(i, 1);
        this.inimigos--
  		}
    }
    for (var i = this.shots.length-1;i>=0; i--) {
      this.shots[i].mover(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }

	for (var i = this.enemyshots.length-1;i>=0; i--) {
      this.enemyshots[i].mover(dt);
      if(
        this.enemyshots[i].x >  3000 ||
        this.enemyshots[i].x < -3000 ||
        this.enemyshots[i].y >  3000 ||
        this.enemyshots[i].y < -3000
      ){
        this.enemyshots.splice(i, 1);
      }
    }
};

Level.prototype.moverAng = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].moverAng(dt);
    }
    for (var i = this.shots.length-1; i >= 0; i--) {
      this.shots[i].moverAng(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }
};


Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenhar(ctx);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenhar(ctx);
    }
};
Level.prototype.desenharImg = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenharImg(ctx, this.imageLib.images[this.sprites[i].imgkey]);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenharImg(ctx, this.imageLib.images[this.shots[i].imgkey]);
    }
};

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiuCom(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};

Level.prototype.perseguir = function (alvo, dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].perseguir(alvo,dt);
  }
};
Level.prototype.perseguirAng = function (alvo, dt) {
  for (var i = 0; i < this.sprites.length; i++) {
    this.sprites[i].perseguirAng(alvo,dt);
  }
};

Level.prototype.fireInimigo = function() {
	var inimigo = Math.floor(Math.random() * inimigos.length)
	console.log(inimigo)
	if(this.sprites[inimigo].cooldown > 0) return
	var tiro = new Sprite();
	tiro.x = inimigo.x;
	tiro.y = inimigo.y;
	tiro.angle = alvo.angle;
	tiro.am = 100;
	tiro.ay = 50
	tiro.width = 8;
	tiro.height = 16;
	tiro.imgkey = "shot";
	this.enemyshots.push(tiro);
	inimigo.cooldown = 3;
}

Level.prototype.fire = function (alvo, al, key, vol){
  if(alvo.cooldown>0) return;
  var tiro = new Sprite();
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.angle = alvo.angle;
  tiro.am = 100;
  tiro.ay = -50
  tiro.width = 8;
  tiro.height = 16;
  tiro.imgkey = "shot";
  this.shots.push(tiro);
  alvo.cooldown = 1;
  if(al && key) {
    al.play(key, vol)
  }
}

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
            that.placar += 1
          }
        }
      )(this));
  }
}

Level.prototype.spawnInimigos = function(dt) {
  if(this.cooldownSpawn > 0 || this.sprites.length > 8) {
    this.cooldownSpawn -= dt
    return
  }
  //for (var i = 0; i < 3; i++) {
    var inimigo = new Sprite();
    inimigo.x = 32+300*Math.random();
    inimigo.y = -40;
    inimigo.width = 32;
    inimigo.height = 32;
    inimigo.angle = 90
    inimigo.vx = 75-25*Math.random()
    inimigo.vy = 25-15*Math.random();
    inimigo.imgkey = "enemy";
    inimigo.cooldown = 3;
    this.sprites.push(inimigo);
	if(this.sprites.length < 8) { // nao reseta o spawn se estiver com poucos inimigos, so evita que nasçam 2 juntos
		this.cooldownSpawn += 1
	}
    else this.cooldownSpawn = 4;
  //}
  //this.inimigos++
}

Level.prototype.desenharInfo = function(ctx) {
	ctx.fillText("Energia: ", 250,10)
	if(this.vida < 30) {
		ctx.fillStyle = "red"
	} else ctx.fillStyle = "blue"
    ctx.fillRect(290,1,this.energia+2,10)
}

