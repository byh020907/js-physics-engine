"use strict"

Import("scripts/Graphic/Shape.js");
Import("scripts/Graphic/Texture.js");
Import("scripts/Graphic/Sprite.js");
Import("scripts/Graphic/Text.js");

Import("scripts/Algorithm/QuadTree.js");
Import("scripts/Algorithm/Rectangle.js");

Import("scripts/TextureLoader.js");
Import("scripts/Input.js");
Import("scripts/Camera.js");

Import("scripts/GameObject/GameObject.js");

Import("scripts/GameObject/Component/Component.js");

Import("scripts/GameObject/Component/Body/Body.js");

Import("scripts/GameObject/Component/Model/Model.js");
Import("scripts/GameObject/Component/Model/ShapeModel.js");
Import("scripts/GameObject/Component/Model/TextureModel.js");
Import("scripts/GameObject/Component/Model/AnimationModel.js");
Import("scripts/GameObject/Component/Model/PolygonModel.js");

Import("scripts/GameObject/Component/Collision/Contact.js");
Import("scripts/GameObject/Component/Collision/Collision.js");
Import("scripts/GameObject/Component/Collision/UICollision.js");
Import("scripts/GameObject/Component/Collision/AABB.js");
Import("scripts/GameObject/Component/Collision/CircleCollision.js");
Import("scripts/GameObject/Component/Collision/PolygonCollision.js");

Import("scripts/GameObject/Physics/Joint.js");
Import("scripts/GameObject/Physics/Spring.js");

Import("scripts/GameObject/World.js");

Import("scripts/GameObject/Entity/Entity.js");
Import("scripts/GameObject/Entity/Circle.js");
Import("scripts/GameObject/Entity/Polygon.js");
Import("scripts/GameObject/Entity/Player.js");
Import("scripts/GameObject/Entity/PigNose.js");
Import("scripts/GameObject/Entity/Costume.js");
Import("scripts/GameObject/Entity/DoubleBall.js");
Import("scripts/GameObject/Entity/DoubleRect.js");
Import("scripts/GameObject/Entity/GameText.js");
Import("scripts/GameObject/Entity/Particle.js");

Import("scripts/GameObject/Component/Body/UIBody.js");

Import("scripts/UI/UIManager.js");
Import("scripts/UI/UI.js");

Import("scripts/Game.js");

Import("scripts/GameState/GameStateManager.js");
Import("scripts/GameState/TitleState.js");
Import("scripts/GameState/MainGameState.js");


var gsm;
var uiManager;
var networkManager;

function init(){
  //상수정의

  //투명색
  Sprite.VOID=new Sprite(new Texture(0,0,0,0),0,0,1,1);
  Sprite.HALF_VOID=new Sprite(new Texture(0,0,0,128),0,0,1,1);
  Sprite.WHITE=new Sprite(new Texture(255,255,255,255),0,0,1,1);

  Sprite.TEXT=new Sprite(new Text());

  Sprite.BLANK_IMAGE=new Sprite(TextureLoader.get("images/blankImage.png"));
  Sprite.CIRCLE=new Sprite(TextureLoader.get("images/circle.png"));

  Sprite.PAF_SHEET=new Sprite(TextureLoader.get("images/Pig1-Sheet.png"));

  Sprite.PAF_LOGO=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),0,0,556,335,true);
  Sprite.BROWN=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),0,335,87,422,true);
  Sprite.YELLOW=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),87,335,174,422,true);
  Sprite.SLIGHTLY_GRAY=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),174,335,261,422,true);
  Sprite.GREEN=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),261,335,348,422,true);
  Sprite.BEIGE=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),348,335,435,422,true);
  // Sprite.WHITE=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),435,335,522,422,true);
  Sprite.GRAY=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),522,335,609,422,true);
  Sprite.BROWN_ARROW=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),0,422,35,479,true);
  Sprite.INPUT_LINE=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),35,422,629,479,true);
  Sprite.CHECK=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),0,479,33,512,true);
  Sprite.OWNER=new Sprite(TextureLoader.get("images/P&F-Sprite.png"),35,512,88,493,true);

  uiManager=new UIManager();
  gsm=new GameStateManager();
  gsm.init();

  gameLoop();
}

function gameLoop(){
  //textCtx 초기화용
  display.update();
  update();
  render();
  requestAnimationFrame(gameLoop);
}

function render(){
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.GEQUAL);
  gl.clearDepth(0.0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  gsm.render(display);
}

function update(){
  gsm.update();
  inputLoop();
}
