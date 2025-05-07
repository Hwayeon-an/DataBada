let DPSearch = document.querySelector("#DP_search"); // search input
let DPSearchLabel = document.querySelector(".DP_search"); // search label (input을 감싼)
let DPResetBtn = document.querySelector(".DP_searchReset"); // reset btn

// input을 글 쳤을 때
DPSearch.addEventListener("input", () => {
  DPViewReset();
  DPOpacity1()
});

// x 눌렀을 때
DPResetBtn.addEventListener("click", () => {
  DPSearch.value = "";
  DPHiddenReset();
});

// 검색 입력하다 벗어났을 때

DPSearch.addEventListener("blur", () => {
  DPOpacity0();
  // + 호버
  // if(DPSearch.value === "") return; 흠,,
  DPSearch.addEventListener("mouseenter", DPOpacity1);
  DPResetBtn.addEventListener("mouseenter", DPOpacity1);
  DPSearch.addEventListener("mouseleave", DPOpacity0);
});


// input클릭했는데, 안에 값이 있을 때

DPSearch.addEventListener("focus", () => {
  DPSearchLabel.style.outline = "solid 1px #356cff";
  if(DPSearch.value === "") return;
  DPSearch.removeEventListener("mouseleave", DPOpacity0);
  DPOpacity1();
});




function DPViewReset() {
  DPResetBtn.style.right = "1%";
}

function DPHiddenReset() {
  DPResetBtn.style.right = "-3%";
}

function DPOpacity0() {
  DPResetBtn.style.opacity = "0";
}
function DPOpacity1() {
  DPResetBtn.style.opacity = "1";
}