var Game = new GameObject();


function DrawableObject(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y; 
  this.Update = function() {
    ctx = Game.Area.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.Click = function(event){
    if(this.type == "button"){
      if(Game.mana < Game.maxMana)
        Game.mana += 1;
    }
  }
}


function Area(game) {
  this.canvas = document.createElement("canvas");
  this.toDraw = [];
  this.parent = game;
  this.Start = function() {
    this.canvas.width = 512;
    this.canvas.height = 512;
    this.canvas.addEventListener("click",ClickEvent,false);
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(this.parent.Run, 20);
    this.toDraw.push(this.parent.status);
    this.toDraw.push(this.parent.button);
    this.parent.clickable.push(this.parent.button);
  };
  this.Clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
}
  
function GameObject() {
  
  this.mana = 0;
  this.maxMana = 20;
  this.status = new DrawableObject("30px", "Consolas", "black", 20, 20, "text");
  this.button = new DrawableObject(120, 30, "blue", 196, 480, "button");
  this.clickable = [];
  
  this.Area = new Area(this);
  
  this.StartGame = function() {
    console.log("start: ");
    console.log(this);
    this.Area.Start();
  };
  
  this.Run = function() {
    Game.Update();
    Game.Draw();
  };
  
  this.Draw = function() {
    this.Area.Clear();
    for(var i  = 0; i < this.Area.toDraw.length; i++){
      this.Area.toDraw[i].Update();
    }
  };
  
  this.Update = function(){
    this.status.text = Game.mana + "/" + Game.maxMana; 
  };
}
  
function ClickEvent(event) {
  var x = event.pageX - Game.Area.canvas.offsetLeft;
  var y = event.pageY - Game.Area.canvas.offsetTop;
  for(var i = 0; i < Game.clickable.length; i++){
     var element = Game.clickable[i];
     if (y > element.y && y < element.y + element.height && x > element.x && x < element.x + element.width) {
        element.Click(event);
     }
  }
}

