// 🍟 qna
// search박스 누르면 searchReset 버튼 보여지기 or 벗어나기
const searchBox = document.querySelector(".search_box"); // search input처럼 만들어 놓은 하얀 박스
const qnaSearch = document.querySelector("#qna_search"); // search input Box
const qnaReset = document.querySelector(".searchReset"); // search reset btn
let isQna = false; // 자꾸 깜빡거리는 리셋버튼 갈

// (1) 검색창 안에 값을 넣었을 때
// 리셋버튼 보여주기
qnaSearch.addEventListener("input", ()=>{
  qnaView();
});

// (2) 검색창을 치다가 밖으로 벗어났을 때
// 리셋버튼 다시 돌려놓기
qnaSearch.addEventListener("blur", ()=>{
  if(qnaSearch.value !== ''){
    qnaHidden();
    isQna = true;
  }


  // (3) 검색 값이 있는 상태에서
  // 다시 호버했을 때
  qnaSearch.addEventListener("mouseenter", ()=>{
    if(qnaSearch.value !== ''){
      qnaView();
    }
  });
  // (4) 검색 값이 있는 상태에서
  // 마우스가 다시 벗어났을 때
  qnaSearch.addEventListener("mouseleave", ()=>{
    if(qnaSearch.value !== ''){
      qnaReset.style.right = "10%";
      // qnaReset.style.opacity = "0"; // ?
      // qnaReset.style.visibility = "hidden";
      // isQna가 false일때 고정시키고,
      // true일 때 hover할 수 있게 하고 싶음
      // false = 포커스하면...?
      // 블러하면 true 
      // opacity문제인듯
    }
  });
});

// (5) 리셋버튼 눌렀을 때
qnaReset.addEventListener("click", ()=>{
  qnaSearch.value = "";
});

// (6) 검색 리셋 재활용
function qnaView(){
  qnaReset.style.right = "10%";
  // qnaReset.style.opacity = "1";
  // qnaReset.style.visibility = "visible";
}
function qnaHidden(){
  qnaReset.style.right = "5%";
  // qnaReset.style.opacity = "0";
  // qnaReset.style.visibility = "hidden";
}

// (6)
qnaSearch.addEventListener("focus", ()=>{
  searchBox.style.border = "1px solid #356cff";
  // searchBox.style.outline = "1px solid #356cff";
});








// 카테고리 탭 클릭 시 해당 탭은 .choice 부여
let tabs = document.querySelectorAll(".search_tab_wrap > .search_tab");
tabs.forEach((tab)=>{
  tab.addEventListener("click", ()=>{
    tabs.forEach((remove)=>{
      remove.classList.remove("choice");
    });

    tab.classList.add("choice");
  });
});







// 자세한 설명은 피자스톰에서~!
// 카테고리 JSON으로 불러오기~!
// (1) JSON data 불러오기
fetch('../js/qna.json')
  .then(response =>{
    if(!response.ok){
      throw new Error("JSON 불러오기 실패");
    }
    return response.json();
  })
  .then(data =>{
    allData = data;
    // 날짜 내림차순으로 정렬
    allData.sort((a,b) => parseDate(b.date) - parseDate(a.date)); // b - a = 내림차순

    function parseDate(dateStr) { 
      return new Date(dateStr.replace(' ', 'T')); //크롬, 사파리, 엣지는 꼭 해야 함
      // new Date("2025-04-22 15:48") -> 일부 브라우저는 잘 못 읽음
      // new Date("2025-04-22T15:48") -> 잘 읽음
      // 공백에 T가 들어가야(위) new Date()는 표준 ISO 8601 형식으로 잘 읽힘
    }

    showQna(10);
  })
  .catch(error=>{
    console.log('에러발생 : ', error);
  });


// (2)
// 각 탭에 따라 리스트 보여주기
// document.querySelectorAll(".search_tab:not(.allTab)").forEach(tab=>{
//   tab.addEventListener("click", ()=>{
//     document.querySelector(".qna_list_wrap").innerHTML = ""; // 초기화
//     const category = tab.innerText;
//     const caFilter = allData.filter(item => item.ca === category);
//     showFilterQna(caFilter); // .filter를 거쳐서 조건에 맞는 데이터들을 보냄
//   });
// });
// // all
// document.querySelector(".allTab").addEventListener("click", ()=>{
//   document.querySelector(".qna_list_wrap").innerHTML = ""; // 초기화
//   showCount = 0;
//   showQna(10);
// });
//(3) ALL : html 복제 + 보여주기~


  // 버튼 클릭 시
  // 전체
  document.querySelector(".allTab").addEventListener("click", ()=>{
    showCount = 0; // 초기화! 이거 안 하면 더보기 눌렀을 때 이상함
    document.querySelector(".qna_more_btn").style.display = "block"; // 더보기 버튼도 다시 보여주기
    document.querySelector(".qna_list_wrap").innerHTML = "";
    showQna(10);
  }); 

  let qnaTabs = document.querySelectorAll(".search_tab_wrap > button:not(.allTab)");
  qnaTabs.forEach(tab =>{
    tab.addEventListener("click", ()=>{
      showCount = 0; // 혹시 더보기 기능이 필터에서도 생길 수 있으니 초기화 습관!
      document.querySelector(".qna_list_wrap").innerHTML = "";
      const category = tab.getAttribute("data-ca");
      // console.log(category);
      const caFilter = allData.filter(item => item.ca === category);
      showFilterQna(caFilter);
    });
  });
        
        
        
  let showCount = 0; // 지금까지 보여준 아이템 수
  let allData = []; // JSON으로 불러운 전체 리스트
// 피자 목록을  화면에 보여줌
function showQna(count){ // 1번 실행
  const list = document.querySelector(".qna_list_wrap"); // 피자 목록 넣을 부모 요소
  const template = document.querySelector("#qnaTemplate"); // 복제할 것
  // template.style.display = "none"
  // list.innerHTML = ""; // 기존 목록 지우기

  // 보여줄 아이템 잘라서 가져옴 (0~10번째~)
  const itemsToShow = allData.slice(showCount, showCount+count);

  // 아이템 하나씩 복제해서 화면에 넣기
  itemsToShow.forEach(item => { // 최대 10번 실행
    const clone = template.content.cloneNode(true);

    // 복제 템플릿에 데이터 넣기
    clone.querySelector(".qna_list_txt1").textContent = item.ca;
    clone.querySelector(".qna_list_txt2 > span").textContent = item.title;
    clone.querySelector(".qna_list_txt3 > span:first-child").textContent = item.date.replace(/-/g, '.');
    clone.querySelector(".qna_list_txt3 > span:last-child").textContent = item.user;
    clone.querySelector(".qna_list_right > div").textContent = item.now;

    // style
    let adminNoYes = clone.querySelector(".qna_list_right > div");
    if(item.now === "답변대기"){
      adminNoYes.className = "qna_admin_no";
    }else{
      adminNoYes.className = "qna_admin_yes";
    }

    list.appendChild(clone);
  });

  showCount += count; // 보여준 개수 누적

  if( showCount >= allData.length ){
    document.querySelector(".qna_more_btn").style.display = "none";
  }

  // tab () 총 몇 개 있는 length 가져오기
  document.querySelector(".allTab > span").textContent = allData.length;
  document.querySelector(".useTab > span").textContent = allData.filter(item => item.ca === "이용문의").length;
  document.querySelector(".coalTab > span").textContent = allData.filter(item => item.ca === "제휴문의").length;
  document.querySelector(".techTab > span").textContent = allData.filter(item => item.ca === "기술문의").length;
  document.querySelector(".dataTab > span").textContent = allData.filter(item => item.ca === "Data서비스").length;
  document.querySelector(".solTab > span").textContent = allData.filter(item => item.ca === "솔루션서비스").length;
  document.querySelector(".apiTab > span").textContent = allData.filter(item => item.ca === "API서비스").length;
  document.querySelector(".marTab > span").textContent = allData.filter(item => item.ca === "광고서비스").length;
}

// 더보기 버튼 클릭 시
document.querySelector(".qna_more_btn").addEventListener("click", ()=>{
  showQna(10); //10개씩 더 보여줌
});


// showFilterQna
// 각 필터
function showFilterQna(data){ // .filter를 거쳐서 조건에 맞는 데이터들을 가져옴
  const list = document.querySelector(".qna_list_wrap"); // 리스트 담은 부모요소
  const template = document.querySelector("#qnaTemplate"); // 복제본
  // list.innerHTML = ""; // 기존 목록 지우기

  const itemsToShow = data;
  // console.log(itemsToShow)
  itemsToShow.forEach(item =>{
    const clone = template.content.cloneNode(true); // 복제

    clone.querySelector(".qna_list_txt1").textContent = item.ca;
    clone.querySelector(".qna_list_txt2 > span").textContent = item.title;
    clone.querySelector(".qna_list_txt3 > span:first-child").textContent = item.date.replace(/-/g, '.');
    clone.querySelector(".qna_list_txt3 > span:last-child").textContent = item.user;
    clone.querySelector(".qna_list_right > div").textContent = item.now;


    // 답변 대기 or 완료
    let adminNoYes = clone.querySelector(".qna_list_right > div");
    if(item.now === "답변대기"){
      adminNoYes.className = "qna_admin_no"
    }else{
      adminNoYes.className = "qna_admin_yes"
    }

    list.appendChild(clone);
  });
  showCount += data;

  if(showCount >= allData.length){
    document.querySelector(".qna_more_btn").style.display = "none";
  }  
}