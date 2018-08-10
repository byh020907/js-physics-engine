"use strict"
// 오늘해결할것-> 1.text출력의 일원화
//               2.ui출력할때 정렬되는거 잘되게
//               3.해상도 조절 자유롭게 되게만들기
class TitleState extends GameState{
  constructor(){
    super();
  }

  init(){
    gsm.setState(GameState.MAINGAME_STATE);
  }

  reset(){
    uiManager.clear();
  }

  update(){
    uiManager.update();
  }

  render(display){
    uiManager.render(display);
  }
}
