// 클릭시 해당한 것만 + -

let faqListAll = document.querySelectorAll(".faq_list");
let BoxImgAll = document.querySelectorAll(".faq_list .FAQ_q img");
let faqAAll = document.querySelectorAll(".faq_list .FAQ_a");

// 아코디언메뉴 클릭 시
faqListAll.forEach((faqBox)=>{
  faqBox.addEventListener("click", ()=>{
    // 이미지 
    let BoxImg = faqBox.querySelector(".FAQ_q img");
    BoxImgAll.forEach(plusImg => plusImg.src = "../Images/plus.png");
    BoxImg.src = "../Images/minus.png";

    // A답변
    // 닫기
    let BoxA = faqBox.querySelector(".FAQ_a");
    faqAAll.forEach(faqAClose =>{
      faqAClose.style.maxHeight = null;
    });

    // 열기
    // maxHeight가 존재하는가
    // maxHeight를 갖고 있는가 contains
    // maxHeight가 0px이 아닌가    
    if( getComputedStyle(BoxA).maxHeight !== "0px"){
      BoxA.style.maxHeight = null;
      BoxImg.src = "../Images/plus.png";
    }else{
      BoxA.style.maxHeight = BoxA.scrollHeight+"px";
    }

    // if( BoxA.style.maxHeight && getComputedStyle(BoxA).maxHeight && BoxA.style.maxHeight !== "0px" ){
    // 왜 위에 코드가 틀렸는가~
    // 이유
    // BoxA.style.maxHeight = Js에서 직접 넣은 값만 불러옴
    // 게다가 style.maxHeight가 빈 값("")이라도,
    // getComputedStyle(BoxA).maxHeight는 항상 어떤 값이 나와.  ("none"이나 "0px", "100px" 이런 식)
    // getComputedStyle(BoA).maxHeight !== "0px" => 즉, *"지금 화면에 보여지는 높이"*가 0px이 아니면 → 열려있다고 보면 돼!
    //
    // getComputedStyle()는 항상 문자열을 줘 → null이나 undefined 안 나옴
    // 그냥 0px이냐, 아니냐. 이것만 보면 됨!
  });
});


// 아코디언메뉴 더보기
let accordions = document.querySelectorAll(".FAQ_search_container > .faq_list");
let moreBtn = document.querySelector(".faq_more_btn");
let showCount = 10; // 현재 화면에 보여진 메뉴 개수를 저장하는 변수 (초기값 : 10)

// 처음 10개 보여주기
accordions.forEach((acc, index)=>{
  if(index >= showCount){ // 0~9만 보여지고 10개~ >= 10개  숨김
    acc.classList.add("hidden"); // .hidden 부여
  }
});

// 더보기 클릭
moreBtn.addEventListener("click", ()=>{

    const nextCount = showCount + 10;
    // 현재 보여진개수 + 10 = nextCount
    // 왜 showCount += 10을 안했는가
    // 아직 다음(+10개)을 보여주기 전이라 계산만!
    // nexCount를 미리 계산해두면
    // 다음로직에서 '~여기까지 보여줘야겠다'판단 가능
    //
    // 만약 바로 showCount+10하면 아래에서 혼란이 생길 수 있음
    // **요약**
    // showCount는 아직 '현재 보여준 상태'를 뜻하니까 바로 건드리지 않고,
    // nextCount라는 '다음에 보여줄 목표'를 따로 만든 거야!

    
    accordions.forEach((acc, idx) => {
      if (idx < nextCount) { // 리스트 index가 nextCount값보다 적은 애들은 hidden을 지운다.
        acc.classList.remove('hidden');
        // 이미 초기값 10개로 위에서 보여줬기 때문에, 
        // 클릭 시 showCount(초기값) + 10 = nextCount(다음값)이 넘어가기 전까지 보여준다.
        // 여기서 다음값은 한 번 더 클릭 시의 값
        // 그렇게 되면 nextCount -> showCount가 됨
      }
    });
  
    showCount = nextCount; // 여기서 nextCount가 showCount가 됨
    // 화면에 실제로 더 보여준 뒤에 "이제 나는 몇 개 보여준 상태야"를 갱신하는 거야.
  
    // 다 보여줬으면 버튼 숨기기
    if (showCount >= accordions.length) {
      moreBtn.style.display = 'none';
    }




    // 자 그럼 내가 생각했던 방식인
    // nextCount없이 showCount + 10 이런식은 안되는가?
    // 된다!
    //
    // 하지만 타이밍만 잘 확인하고 쓰면 이상 무!
    // if(idx < showCount+10){}하고 
    // forEach가 끝나면 showCount += 10 : 실제로 값을 부여
    // 만 잘하면 이상 무!
    // 그럼 왜 굳이 따로 저장했는가?
    // 이유는
    // 나중에 코드 복잡해질수록 nextCount처럼 "미리 계산해놓고 진행" 하는 게 깔끔하긴 해서!
});