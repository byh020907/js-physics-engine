"use strict"

function Import(src)
{
    //일단 중복 확인
    var scripts = document.getElementsByTagName("SCRIPT");

    for (let script of scripts) {
        //만약 검색해서 script의 경로가 src와 같으면 리턴
        // console.log(script.src);

        //앞의 필요없는 부분을 자르기 위해 split 사용
        let names = script.src.split('/');
        // console.log(names);//ex ["http:", "", "localhost:3000", "scripts", "util.js"];
        //앞의 요소 3개를 제거한다.
        names.splice(0, 3);
        //배열로 나뉘어진 요소들을 합친다.
        let scriptName = names.join('/');
        // console.log(scriptName,src);

        if (scriptName == src) {
            console.error("중복하여 Import하였습니다.");
            return;
        }
    }

    var paths = src.split('/');
    var fileName = paths[paths.length - 1];
    var temp = fileName.split('.');
    var extension = temp[temp.length - 1];
    switch (extension) {
        case 'js': {
            //임포트
            document.write("<script src=" + src + "></script>");
        }break;

        case 'css': {
            //임포트
            document.write("<link rel='stylesheet' type='text/css' href=" + src + "></>");
        }break;

        default:
            console.error("[Unknown Extension] please import wellknown file");
            return;
            break;
    }

    console.log("[Import Success]" + fileName, src);
}
// ver 1.0 아직 스크립트 이름이 같으면 안되는 오류가 있다.
// ver 1.1 스크립트 간 중복 체크 완료
// ver 1.2 여러종류의 파일 임포트 가능