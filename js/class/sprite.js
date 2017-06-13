function Sprite (_img, _obj) {
	this.img = _img;
	this.pos = _obj.pos;
	this.size = _obj.size;
	this.currentFrame = 0;
	this.totalFrames = _obj.totalFrames;
	this.lastTime = 0;
	this.speed = _obj.speed;
	this.frameSpeed = _obj.frameSpeed;
	this.scale = _obj.scale;
	this.userData= _obj.userData;
}
Sprite.prototype.update = function(mod) {
	this.lastTime += mod;
	if(this.totalFrames > 1 && this.frameSpeed < this.lastTime) {
		this.currentFrame = this.currentFrame==this.totalFrames-1? 0: this.currentFrame+ 1;
		this.lastTime = (this.lastTime - this.frameSpeed)% this.frameSpeed;
	}
}
Sprite.prototype.drewSp = function(_ctx) {
	_ctx.drawImage(this.img, 
				this.currentFrame% 10* this.size[0], Math.floor(this.currentFrame/10)* this.size[1], 
				this.size[0], this.size[1], 
				this.pos[0], this.pos[1], 
				this.scale[0], this.scale[1]);
}