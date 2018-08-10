"use strict"

class Game{
  constructor(mgs){
    this.mainGameState=mgs;
    this.camera=new Camera(new Vector2d(0,0),gl.viewportWidth,gl.viewportHeight);
    this.world=new World(this,new Rectangle(-1500,-1500,3000,3000));
  }

  init(){
    this.camera.setZoom(new Vector2d(1,1));
    this.camera.setPos(new Vector2d(0,0));

    for(let i=0;i<10;i++){

      var p=new Polygon(0,-100);
      p.setVertices([
        new Vector2d(-100,-100),
        new Vector2d(100,-100),
        new Vector2d(100,100),
        new Vector2d(-100,100),
      ]);

      p.setColor(0,0,0,0.5);

      this.world.addBody(p.body);
    }

    var ground=new Polygon(0,400);
    ground.setVertices([
      new Vector2d(-1000,-50),
      new Vector2d(1000,-50),
      new Vector2d(1000,50),
      new Vector2d(-1000,50),
    ]);

    ground.setStatic();
    ground.setColor(0,0,0,0.5);
    ground.tag="ground";
    ground.body.rotateAngle=Math.PI*0.05;

    this.world.addBody(ground.body);

    ground=new Polygon(-1000,400);
    ground.setVertices([
      new Vector2d(-50,-1000),
      new Vector2d(50,-1000),
      new Vector2d(50,1000),
      new Vector2d(-50,1000),
    ]);
    ground.setStatic();
    ground.setColor(0,0,0,0.5);
    this.world.addBody(ground.body);

    ground=new Polygon(1000,400);
    ground.setVertices([
      new Vector2d(-50,-1000),
      new Vector2d(50,-1000),
      new Vector2d(50,1000),
      new Vector2d(-50,1000),
    ]);
    ground.setStatic();//setStatic은 항상 마지막에
    ground.setColor(0,0,0,0.5);
    this.world.addBody(ground.body);
  }

  //MainGameState 클래스와의 연결 메서드
  doAction(func,arg){
    if(arg==undefined){
      Reflect.apply(func,this,[]);
      return;
    }

    Reflect.apply(func,this,arg);
  }

  reset(){
    Entity.clear();
    this.world=null;
  }

  getWorldMousePos(){
    //화면의 중앙을 0,0으로 잡기위해 화면의 절반만큼 위치를 빼준다.
    let a=mousePos.sub(new Vector2d(display.getWidth()/2,display.getHeight()/2));
    //카메라 줌 스케일을 반영하기위해 나누어준다.
    a.x/=this.camera.zoomScale.x;
    a.y/=this.camera.zoomScale.y;
    //최종적으로 위의 결과에 카메라의 위치를 더해준다.
    return a.add(this.camera.pos);
  }

  update(){

    //마우스 처리
    for(let body of this.world.bodyList){
      let realMousePos=this.getWorldMousePos();
      if(isMousePressed(1)&&hitTestPoint_SAT(body,realMousePos)){
        body.owner.model.setColor(1.0,0.0,0.0,0.7);
        //아래 항목은 모두 임시로 동적으로 추가한 필드이다.
        body.isDragged=true;
        if(!body.checkedPos)
          body.checkedPos=new Vector2d();
        let temp=realMousePos.sub(body.pos);
        temp.rotate(-body.rotateAngle);
        body.checkedPos.set(temp);
      }
    }
    // 문제를 알아냇당
    // 문제는 checkedPos가 원래 body의 회전을 고려한 상대 좌표로 했어야했는데 그냥 클릭하면 절대좌표로 설정되기 때문에
    // 누르고 움직이면 날라가 버리는 것이었다.

    if(isMouseReleased(1)){
      for(let body of this.world.bodyList){
          if(body.isDragged){
            body.isDragged=false;
            body.owner.model.setColor(0.0,0.0,0.0,0.7);
          }
      }
    }
    //

    // this.camera.follow(this.player.body,0.05);

    if(!isKeyDown(32))
        this.world.update();

    Entity.updateAll();

    if(isMousePressed(1)){
      /* for(let i=0;i<1;i++){
        let c=new Circle(this.player.nose.body.pos.x,this.player.nose.body.pos.y,25);
        c.body.angularVelocity=1.1;
        c.body.setMass(1);
        console.log(this.getWorldMousePos());
        console.log(this.player.body.pos);
        let v=this.getWorldMousePos().sub(this.player.nose.body.pos).normalize().scale(20);
        c.body.applyForce(v);
        this.world.addBody(c.body);
      } */
    }

    if(isKeyDown(65)){
      this.camera.pos.x-=50;
    }

    if(isKeyDown(87)){
      this.camera.pos.y-=50;
    }

    if(isKeyDown(68)){
      this.camera.pos.x+=50;
    }

    if(isKeyDown(83)){
      this.camera.pos.y+=50;
    }

    //zoom
    if(isKeyPressed(90)){
      this.camera.setZoom(this.camera.zoomScale.add(new Vector2d(0.1,0.1)));
    }

    //unzoom
    if(isKeyPressed(88)){
      this.camera.setZoom(this.camera.zoomScale.add(new Vector2d(-0.1,-0.1)));
    }

  }

  render(){
    Entity.renderAll(this.camera);
    let line=new Shape();
    line.setColor(0,0,0,1);
    for(let body of this.world.bodyList){
      let realMousePos=this.getWorldMousePos();

      if(body.isDragged){
        let bodyPoint=body.pos.add(body.u.mul(body.checkedPos));
        let direction=Vector2d.ObjectPool.alloc(realMousePos.sub(bodyPoint));//이전 마우스 위치와의 변위를 임펄스로 한다.


        let rad=Math.atan2(direction.y,direction.x);
        let length=direction.length();
        this.camera.render(line,bodyPoint.x+Math.cos(rad)*length/2,bodyPoint.y+Math.sin(rad)*length/2,length,5,rad);

        Vector2d.ObjectPool.free(direction);
      }
    }

  }
}
