  // 다음 버튼
  // 초기는 버튼 비활성, 라디오 선택하면 활성화
  let radios = document.querySelectorAll(".select");
  let btn = document.querySelector('.join_next_btn_wrap button');

  radios.forEach(function(radio, index){
    radio.addEventListener('change', function(){
      btn.style.background = "#356cff";
      btn.style.color = "white";
    });
  });






  // 🌀
  // 다음 버튼 클릭 시
  // let choiceCa = document.querySelector(".select");
  // choiceCa.forEach((choice)=>{
  // btn.addEventListener("click", (e)=>{
  //     // e.defaultPrevented;
  //     let choiceCa = document.querySelector(".select:checked").closest(".j_s_list");
  //     let choiceTitle = choiceCa.querySelector(".join_list_name_box > label").innerText;
  //     //console.log(choiceTitle); // good~
  //     joinTitle(choiceTitle);
  //   });
  // })

  //<a href="join2.html">

  //버튼 클릭 시 선택 title값을 주소로 보내기
  function movePage(){
    let choiceCa = document.querySelector(".select:checked").closest(".j_s_list");
    let choiceTitle = choiceCa.querySelector(".join_list_name_box > label").innerText;
    //console.log(choiceTitle); // good~
    // joinTitle(choiceTitle);
    location.href = `join2.html?value=${encodeURIComponent(choiceTitle)}`;
  }


  // 이건 안되고 밑에 getQueryValue() 부터
  // let join2Title = document.querySelector(".join2_title")
  // function joinTitle(titleTxt){
  //   join2Title.innerText = titleTxt;
  // };









  // 🌀
  // 핸드폰 본인확인 전체동의
  let phoneArrow = document.querySelector(".phone_arrowImg"); // btn
  let phoenCheckSub = document.querySelector(".sub_phoenCheck_ul");
  phoneArrow.addEventListener("click", (e)=>{
    e.defaultPrevented;
    phoneArrow.classList.toggle("view");

    if(phoneArrow.classList.contains("view")){
      phoenCheckSub.classList.add("view");
      phoenCheckSub.style.maxHeight = phoenCheckSub.scrollHeight+"px";
      document.querySelector(".phone_check_li").style.borderBottom = "solid 1px #ccc";
    }else{
      phoenCheckSub.classList.remove("view");
      phoenCheckSub.style.maxHeight = null;
      document.querySelector(".phone_check_li").style.borderBottom = "none";
    }
  });




  // 핸드폰 본인확인 sub li들 체크하면 

let PhoneLiAll = document.querySelectorAll(".sub_phoenCheck_ul > li input[type=checkbox]"); // 섭 체크박스들
let phoneAdmin = document.querySelector(".phone_checkBox"); // 전체동의 input 체크박스

PhoneLiAll.forEach((checkbox) => { // 섭 체크박스들을 돌려
  checkbox.addEventListener("change", () => { // 섭 체크박스가 값이 변경될때마다 실행
    let checkedCount = 0;  // 쳌카운드가 초기값 0

    PhoneLiAll.forEach((cb) => {  // 섭 체크박스들을 돌려
      if (cb.checked) checkedCount++; // 만약 각 섭 체크박스가 체크되어 있으면 쳌카운드 값을 ++해
    });

    // 5개 다 체크됐으면 메인 체크박스도 체크
    if (checkedCount === PhoneLiAll.length) { // 쳌카운드 값이 섭 체크박스 길이랑 같을 때
      phoneAdmin.checked = true; // 전체동의 첵박스 체크설정은 true
    } else {
      phoneAdmin.checked = false; // 그게 아니라면 첵박스 체크설정은 false
    }
  });
});

phoneAdmin.addEventListener("change", ()=>{
  if( phoneAdmin.checked === true ){
    PhoneLiAll.forEach((li)=>{
      li.checked = true;
    });
  }else{
    PhoneLiAll.forEach((li)=>{
      li.checked = false;
    });
  }
});




// 💙 회원가입
// 숫자가 아닐경우 return
let join_penum1 = document.querySelector(".join_penum1");
let join_penum2 = document.querySelector(".join_penum2");
 
join_penum1.addEventListener("input", (e)=>{
  if(join_penum1.value.length >= 7){
    join_penum1.value = e.target.value.slice(0, 6); // 6자까지만 입력되도록 수정
  }
});
join_penum2.addEventListener("input", (e)=>{
  if(join_penum2.value.length >= 2){
    join_penum2.value = e.target.value.slice(0, 1); // 1자까지만 입력되도록 수정
  }
});
// 😺 주민번호 앞자리가 년도기준 +2면 19세 경고는,,, 아직 안함


// 휴대폰 번호
let phoneCheck = document.querySelector(".join2_phone_checking");
let phoneCheckBtn1 = document.querySelector(".join2_phone_checkingBtn1");
phoneCheck.addEventListener("input", (e) => {
  let value = e.target.value;

  // '-' 막기
  // 친 값이 -면 공백으로 대체
  e.target.value = value.replace(/-/g, '');

  // 11자리 초과 입력 제한
  if (value.length > 11) {
    e.target.value = value.slice(0, 11);
  }

  // 버튼 on 클래스 토글
  if (e.target.value.length === 11) {
    phoneCheckBtn1.classList.add("on");
  } else {
    phoneCheckBtn1.classList.remove("on");
  }
});

let phoneCheck2 = document.querySelector(".join2_phone_checking2");
let phoneCheckBtn2 = document.querySelector(".join2_phone_checkingBtn2");
phoneCheck2.addEventListener("input", (e) => {
  let value = e.target.value;

  // '-' 막기
  // 친 값이 -면 공백으로 대체
  e.target.value = value.replace(/-/g, '');

  // 11자리 초과 입력 제한
  if (value.length > 6) {
    e.target.value = value.slice(0, 6);
  }

  // 버튼 on 클래스 토글
  if (e.target.value.length === 6) {
    phoneCheckBtn2.classList.add("on");
  } else {
    phoneCheckBtn2.classList.remove("on");
  }
});




// 알뜰폰 관련 
let moreChoiceMain = document.querySelector(".phone_moreChoice_wrap"); // 알뜰폰 sub li 선택
let moreChoiceList = document.querySelector(".moreChoice_ul"); // 알뜰폰 리스트
let moreChoiceLiAll = document.querySelectorAll(".moreChoice_ul > li"); // 알뜰폰 리스트 li
let moreChoiceVal = document.querySelector(".phone_wrap > p");
let moreChoice = document.querySelector(".phone_moreChoice"); // '알뜰폰' 버튼
const moreChoiceWrap = document.querySelector(".phone_wrap") //알뜰폰 랩
const moreMaxHeight = document.querySelector(".phone_maxHeight") // 알뜰폰 리스트 랩


// 핸드폰 통신사 선택 시 class
let join2_phone_com = document.querySelectorAll(".join2_phone_com > div > button");
join2_phone_com.forEach((btn)=>{
  btn.addEventListener("click", (e)=>{
    btn.defaultPrevented;

    join2_phone_com.forEach(remove => {
      remove.classList.remove("choice");
      moreChoiceList.classList.remove("view");
    });

    btn.classList.add("choice");
    if(btn == moreChoice){
      if(getComputedStyle(moreChoiceWrap).maxHeight !== "0px"){ // 알뜰폰 랩 maxHeight값이 0px이 아니면
        moreChoiceWrap.style.maxHeight = null // 알뜰폰 랩 maxHeight 0
        moreChoiceMain.classList.remove("view"); // 
        moreChoiceWrap.querySelector("img").style.transform = "rotate(0)";
      }else{
        moreChoiceWrap.style.maxHeight = "48px"
        moreChoiceMain.classList.add("view");
      }
    }else{
      moreChoiceWrap.style.maxHeight = null // 알뜰폰 랩 maxHeight 0
      moreMaxHeight.style.maxHeight = "0px"; // 알뜰폰 리스트 maxHeight 0
      moreChoiceMain.classList.remove("view");
      moreChoiceWrap.querySelector("img").style.transform = "rotate(0)";
    }
  });
});


// moreChoiceMain : ul감싼 div
// moreChoiceList : ul
// moreChoiceLiAll : ul안에 li들
// 핸드폰 통신사 알뜰폰 선택
// moreChoiceMain.addEventListener("click", ()=> {
//   if (moreChoiceList.classList.contains("view")) {
//     moreChoiceList.classList.remove("view");
//     moreChoiceList.style.maxHeight = null;
//   } else {
//     moreChoiceList.classList.add("view");
//     moreChoiceList.style.maxHeight = moreChoiceList.scrollHeight + "px";
//   }
// });
// 🍈 알뜰폰 랩을 클릭 시
//     알뜰폰 리스트 보여주기 혹은 닫기
moreChoiceWrap.addEventListener("click", ()=>{ // 알뜰폰 랩을 클릭하면 실행
  if( getComputedStyle(moreMaxHeight).maxHeight !== "0px" ){ // 
    moreMaxHeight.style.maxHeight = "0px";
    moreChoiceWrap.querySelector("img").style.transform = "rotate(0)";
  }else{
    moreMaxHeight.style.maxHeight = moreMaxHeight.scrollHeight+"px";
    moreChoiceWrap.querySelector("img").style.transform = "rotate(180deg)";
  }
  // if(!moreChoiceMain.classList.contains("view")){
  //   moreChoiceMain.classList.add("view");
  //   moreChoiceList.style.maxHeight = moreChoiceList.scrollHeight+"px";
  //   moreChoiceList.classList.add("view");

  //   // sub list li를 선택한다.
  //   moreChoiceLiAll.forEach((li)=>{
  //     li.addEventListener("click", ()=>{ // 클릭
  //       // 전체 choice 빼기
  //       moreChoiceLiAll.forEach((remove)=>{
  //         remove.classList.remove("choice");
  //      });
  //       // 클릭 시 choice 부여
  //       li.classList.add("choice"); 
  //       moreChoiceVal.innerText = li.innerText;
  //       // 이미 다 지우고 해당(선택한) li의 choice를 하고 한 다음이기 때문에
  //       // if문이나 그런게 필요없음
  //     });
  //   });
  // }else{
  //   moreChoiceMain.classList.remove("view");
  //   moreChoiceList.classList.remove("view");
  //   moreChoiceList.style.maxHeight = null;
  // }
});


// 🍈 알뜰폰 종류 중 li하나를 선택했을 때
// choice
moreChoiceLiAll.forEach((moreLi)=>{
  moreLi.addEventListener("click", ()=>{
    // 기존 choice 모두 삭제
    moreChoiceLiAll.forEach((remove)=>{
      remove.classList.remove("choice");
    });

    // 선택한거 choice 부여
    moreLi.classList.add("choice");
    moreChoiceVal.innerText = moreLi.innerText; // p태그 txt를 moreLi의 txt값으로 넣는다.
    moreMaxHeight.style.maxHeight = "0px"; // 알뜰폰 리스트 maxHeight 0
  });
});

// 🍈 에 이걸 위에서 한건가 
// moreChoiceWrap.addEventListener("click", ()=>{
//   const ht = parseInt(getComputedStyle(moreChoiceMain).maxHeight)
//   console.log(ht)
//   if( ht > 48  ){
//     moreChoiceMain.maxHeight = 48;
//   }else{
//     moreChoiceMain.maxHeight = moreChoiceMain.scrollHeight+"px";
//     // 여기

//   }
// });


// 알뜰폰 클릭 유무에 따라
// 알뜰폰 ul 클래스 부여
// moreChoice.addEventListener("click", ()=>{
//   if( moreChoice.classList.contains("view") ){
//     moreChoiceList.classList.add("view");
//   }else{
//     moreChoiceList.classList.remove("view");
//   }
// });




// 다음버튼 클릭 시
function movePage2() {
  const isPhoneComSelected = Array.from(join2_phone_com).some(btn => btn.classList.contains("choice"));

  if (
    phoneAdmin.checked &&
    join_name.value.trim() !== "" &&
    join_penum1.value.trim() !== "" &&
    join_penum2.value.trim() !== "" &&
    isPhoneComSelected &&
    phoneCheck.value.trim() !== "" &&
    phoneCheck2.value.trim() !== ""
  ) {
    alert("감사합니다");
  } else {
    alert("모두 입력해주셔야합니다.");
  }
}