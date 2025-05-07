// top 버튼 클릭 시
let topBtn = document.querySelector(".top_btn");

topBtn.addEventListener('click', function(){
    window.scrollTo({
        top:0,
        behavior : 'smooth'  //behavior : 행동
    });
});










// main : search box 카테고리 선택 시
let allLi = document.querySelectorAll(".search_cate_wrap > li ");
let searchInput = document.querySelector(".search_input");

allLi.forEach(li => {
  li.addEventListener("click", () => {
    let choiceCa = li.innerText.split("#")[1];
    searchInput.value = choiceCa;
  });
});





// value
// 자동 롤링 슬라이드
const swiperSlides = document.querySelectorAll('.m_v_img_wrap');

swiperSlides.forEach(function (element, index) {
  element.classList.add("swiper-" + index);
  let swiper = new Swiper(".swiper-" + index, {
    autoplay: {
      delay: 1,
      // 슬라이드가 자동으로 전환되기까지의 시간 간격
      disableOnInteraction: false,
      // arrow나 pagination이용 후 자동 재생을 비활성화 할지의 여부
    },
    speed: 5000,
    // 슬라이드가 자동으로 전환되는 속도를 설정 초기값 8e3으로 되어있었음
    loop: true,
    // 슬라이드가 무한 순환
    slidesPerView: "auto",
    // 슬라이드가 표시되는 갯수를 설정
    freemode: true,
    // 슬라이드가 자유롭게 스와이프 되도록 설정
    allowTouchMove: false,
    // 마우스/터치로 스와이프 금지
  });
});







// header menu 클릭 시 메가메뉴 내려오기
let mainLiAll = document.querySelectorAll(".menu_nav > ul > li");
let menuWrap = document.querySelector(".menu_wrap");
let megaMenuBG = document.querySelector(".gnp_inner_wrap"); // 검은 배경
let megaMenu = document.querySelector(".sub_gnb_inner"); // white bg max-height


// open
mainLiAll.forEach(li => {
  li.addEventListener("click", () => {
    megaMenuBG.style.opacity = "1";
    megaMenuBG.style.visibility = "visible";
    megaMenu.style.maxHeight = megaMenu.scrollHeight + "px";
  });
});


// 다른 곳 클릭 시 닫기(조건O)
// document.body.addEventListener("click", (e) => {
document.querySelector(".header").addEventListener("click", (e) => {
  if (!megaMenu.contains(e.target) && !menuWrap.contains(e.target)) {
    megaMenu.style.maxHeight = 0;
    setTimeout(() => {
      megaMenuBG.style.opacity = "0";
      megaMenuBG.style.visibility = "hidden";
    }, 600);
  }
});


// 문제점 : 처음에 열 때 깐족거림
// window.addEventListener("mousemove", (e)=>{
//   if(!megaMenu.contains(e.target) && !menuWrap.contains(e.target)){
//     setTimeout(()=>{
//       megaMenu.style.maxHeight = 0;
//       setTimeout(()=>{
//         megaMenuBG.style.opacity = "0";
//         megaMenuBG.style.visibility = "hidden";
//       }, 600);
//     }, 1000);
//   }
// });



menuWrap.addEventListener("mouseleave", () => {  // nav
  // 잠시 기다렸다가 마우스가 gnpInnerWrap에도 없을 때만 숨기도록
  setTimeout(() => {
    if (!megaMenu.matches(':hover') && !menuWrap.matches(':hover')) {
      hideGnb();
    }
  }, 1000);
});

megaMenu.addEventListener("mouseleave", () => {  // 검은배경
  setTimeout(() => { // 1초 동안 얘가 한 눈팔면
    if (!megaMenu.matches(':hover') && !menuWrap.matches(':hover')) { // 당장 특정 곳에 있지 않는거라면(조건)
      hideGnb(); // 실행
    }
  }, 1000);
});

function hideGnb() { // 중복 방지~!
  // 두 영역에서 모두 마우스가 떠났을 때 숨김
  megaMenu.style.maxHeight = 0;
  setTimeout(() => {
    megaMenuBG.style.opacity = "0";
    megaMenuBG.style.visibility = "hidden";
  }, 600);
}






// 전체 메뉴보기(햄버거 메뉴 클릭)
// open
let hamMenu = document.querySelector(".hamMenu");
let allMenu = document.querySelector(".modalPop_menu_container");

hamMenu.addEventListener("click", () => {
  allMenu.style.transform = "scale(1)";
  allMenu.style.opacity = "1";
  allMenu.style.visibility = "visible";
});

// close
let allMenuClose = document.querySelector(".close_btn_box");

allMenuClose.addEventListener("click", () => {
  allMenu.style.transform = "scale(0.5)";
  allMenu.style.opacity = "0";
  allMenu.style.visibility = "hidden";
});









