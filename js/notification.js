// (1)
// input event 시 리셋버튼 right 2%   /   -4%


// (2)
// input blur 시 리셋버튼 opacity 0
  // input 호버시 opacity 1
  // reset버튼 호버시 opacity 1
  // input mouseleave하면 opacity 0


// (3)
// reset 클릭 시 input.value = "";

// (4)
// input focus시
  // outline blue
  // 값이 있는 것들만 (아래) 
  // mouseleave이벤트 제거
  // opacity 1


let NcInput = document.querySelector("#NC_search");
let NcReset = document.querySelector(".NC_searchReset");
let NcWrap = document.querySelector(".NC_label_wrap");


NcInput.addEventListener("input", ()=>{
  NcReset.style.right = "2%";
  NcBtnOpa1();
});

NcInput.addEventListener("blur", ()=>{ // input을 id로 가져와야함
  NcBtnOpa0();
  NcWrap.style.border = "solid 1px #e5e5e5";

  NcInput.addEventListener("mouseenter", NcBtnOpa1);
  NcInput.addEventListener("mouseleave", NcBtnOpa0);
  NcReset.addEventListener("mouseenter", NcBtnOpa1);
});

NcInput.addEventListener("focus", ()=>{
  NcWrap.style.border = "solid 1px #356cff";
  
  if( NcInput.value === "" ) return;
  NcInput.removeEventListener("mouseleave", NcBtnOpa0);
  NcBtnOpa1();
});

NcReset.addEventListener("click", ()=>{
  NcInput.value = "";
  NcReset.style.right = "-4%";
  NcInput.removeEventListener("mouseleave", NcBtnOpa0);
});


function NcBtnOpa1(){
  NcReset.style.opacity = "1";
}
function NcBtnOpa0(){
  NcReset.style.opacity = "0";
}