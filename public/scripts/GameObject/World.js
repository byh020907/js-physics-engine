"use strict"

class World {

    constructor(game,bound) {
        this.game = game;
        this.rootQuad = new QuadTree(0, bound);
        this.bodyList = [];
        this.iterations = 15;
    }

    update() {
        let contacts = [];

        this.rootQuad.clear();
        for (let body of this.bodyList) {
            this.rootQuad.insert(body);
        }

        var returnObjects = [];
        for (let body of this.bodyList) {
            returnObjects = [];
            this.rootQuad.retrieve(returnObjects, body);

            for (let x = 0; x < returnObjects.length; x++) {
                let r = returnObjects[x];
                if (body == r)
                    continue;
                //manifold 얻기
                let contact = Contact.ObjectPool.alloc();
                contact.init(body,r);
                contact.solve();
                //둘다 static 물체이면 NaN오류가 발생한다.
                if (contact.contactCount >= 1&&(body.inv_mass!==0||r.inv_mass!==0)) {
                    contacts.push(contact);
                    body.owner.hitProcess(r.owner);
                }else{
                    Contact.ObjectPool.free(contact);
                }
            }

        }

        for (let body of this.bodyList) {
            this.integrateForce(body);
        }

        for (let contact of contacts) {
            contact.initialize();
        }

        for (let i = 0; i < this.iterations; i++) {
            for (let contact of contacts) {
                contact.resolveCollision();
            }
        }


//마우스 조작 처리부분
        let realMousePos=this.game.getWorldMousePos();
        for (let body of this.bodyList) {
          if(body.isDragged){
            let bodyPoint=body.u.mul(body.checkedPos);
            let impulse=Vector2d.ObjectPool.alloc(realMousePos.sub(body.pos.add(bodyPoint)).scale(0.9));//이전 마우스 위치와의 변위를 임펄스로 한다.
            // if(impulse.length()>100)
              body.applyImpulse(impulse,bodyPoint);
            Vector2d.ObjectPool.free(impulse);
          }
        }
//


        for (let body of this.bodyList) {
            this.integrateVelocity(body);
        }
        for (let contact of contacts) {
            contact.positionalCorrection();
        }

        for (let body of this.bodyList) {
            body.force.set(0, 0);
            body.torque = 0;
        }

        //free
        for (let i=0;i<contacts.length;++i) {
            Contact.ObjectPool.free(contacts[i]);
        }
        // console.log(contacts.length);
    }

    //0.5만큼만 진행
    integrateForce(body) {

        if (body.inv_mass == 0)
            return;

        body.velocity.addLocal(body.force.scale(body.inv_mass * 0.5));
        body.velocity.addLocal(World.GRAVITY.scale(0.5));
        body.angularVelocity += body.torque * body.inv_inertia * 0.5;
    }

    integrateVelocity(body) {

        if (body.inv_mass == 0)
            return;

        body.pos.addLocal(body.velocity);
        body.rotateAngle += body.angularVelocity;

        //한번더 해서 1을 만든다.
        this.integrateForce(body);
    }

    addBody(body) {
        this.bodyList.push(body);
        body.world=this;
    }

    removeBody(bodyId) {
      for(let i=0;i<this.bodyList.length;i++){
        if(this.bodyList[i].id==bodyId){
          this.bodyList[i].world=null;//world 값 초기화
          this.bodyList.splice(i,1);
        }
      }
    }

    clear() {
        this.bodyList = [];
    }
}

World.GRAVITY = new Vector2d(0, 0.8);
