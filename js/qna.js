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





// 시작~!
let showCount = 0; // 지금까지 보여준 아이템 수
let allData = []; // JSON으로 불러운 전체 리스트
//let currentData []; // 🍄 탭을 눌렀을 때의 더보기

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

    // 🍄
    // 탭 눌렀을 때의 더보기
    //currentData = allData;
    //renderQnaItems(currentData, 10, false); 
    renderQnaItems(allData, 10, false);
  })
  .catch(error=>{
    console.log('에러발생 : ', error);
  });




// 피자 목록을  화면에 보여줌

  // 버튼 클릭 시
  // 전체
  document.querySelector(".allTab").addEventListener("click", ()=>{
    showCount = 0; // 초기화! 이거 안 하면 더보기 눌렀을 때 이상함
    document.querySelector(".qna_more_btn").style.display = "block"; // 더보기 버튼도 다시 보여주기
    document.querySelector(".qna_list_wrap").innerHTML = "";

    // 🍄
    // 탭 눌렀을 때의 더보기
    //currentData = allData;
    //renderQnaItems(currentData, 10, false); 
    // 전체 데이터, 10, false
    renderQnaItems(allData, 10, false);
  }); 

  let qnaTabs = document.querySelectorAll(".search_tab_wrap > button:not(.allTab)");
  qnaTabs.forEach(tab =>{
    tab.addEventListener("click", ()=>{
      // 초기화
      showCount = 0; // 혹시 더보기 기능이 필터에서도 생길 수 있으니 초기화 습관!
      document.querySelector(".qna_list_wrap").innerHTML = "";

      // 해당 카테고리 가져오기
      const category = tab.getAttribute("data-ca");
      // 탭 누른거랑 전체 데이터에서 해당 탭(키테고리)과 같은 것들 filter
      const caFilter = allData.filter(item => item.ca === category);

      // 🍄
      // 탭 눌렀을 때의 더보기
      //currentData = caFilter;
      //renderQnaItems(currentData, 0, true); 
      // filter 카테고리, 0, true
      renderQnaItems(caFilter, 0, true);
    });
  });
  /*
    초기화를 왜 하냐면,
    탭을 눌렀다는 건 기존 리스트 말고 해당탭의 리스트를 다시 보여줘야하기 때문에 리셋!
  */
        
        
        


// 더보기 버튼 클릭 시
document.querySelector(".qna_more_btn").addEventListener("click", () => {
  // renderQnaItems(currentData, 10, false); 
  // 여기서는 "더보기 버튼"이니까 항상 추가 목적으로 부르기 때문에 false로 해도 괜찮음.
  renderQnaItems(allData, 10, false); 


  
  // 이건 그냥 내 예상으로만 해본거임!!
  // let moreTabs = document.querySelectorAll(".search_tab_wrap > button");
  // let whoTab = "";
  // moreTabs.forEach((tab)=>{ // 먼저 choice(선택)한 탭이 뭔지 찾고 변수에 값 넣기
  //   if(tab.classList.contains("choice")){
  //     whoTab = tab.getAttribute("data-ca");
  //   }
  // });

  // if(whoTab === "전체"){ // 그 값이 전체인가 아닌가 체크
  //   renderQnaItems(allData, 10, false); 
  // }else{
  //   renderQnaItems(caFilter, 0, true); 
  // }
});

function renderQnaItems(dataList, count = 10, isFilter = false) { 
  // count = 10, isFilter = false는 기본 값임!
  // 아무것도 보내지 않았을 때 name(allData, 10) 이렇게 되면 기본값인 false가 되고,
  // name(allData, 10, false)면 받은값 false로 대체 됨!
  // 즉 저거는 "혹시라도 값을 안 보냈을 때를 대비한 예비용"!

  // QnA 목록을 담을 부모 요소
  const list = document.querySelector(".qna_list_wrap"); 
  // 복제할 템플릿 요소
  const template = document.querySelector("#qnaTemplate");

  // 보여줄 항목들: 필터 상태면 전체 리스트, 아니면 일부만(slice)
  const itemsToShow = isFilter ? dataList : dataList.slice(showCount, showCount + count);
  // isFilter가 true면 dataList 전체를 보여주고 false면 일부만 보여줌(slice로 자름)

  // 항목 하나씩 화면에 추가
  itemsToShow.forEach(item => {
    const clone = template.content.cloneNode(true); // 템플릿 복제

    // 항목 내용 채우기
    clone.querySelector(".qna_list_txt1").textContent = item.ca; // 카테고리
    clone.querySelector(".qna_list_txt2 > span").textContent = item.title; // 제목
    clone.querySelector(".qna_list_txt3 > span:first-child").textContent = item.date.replace(/-/g, '.');  // 날짜
    clone.querySelector(".qna_list_txt3 > span:last-child").textContent = item.user; // 작성자
    clone.querySelector(".qna_list_right > div").textContent = item.now; // 상태 (답변대기 / 완료)

    // 상태에 따라 스타일 클래스 지정
    let adminNoYes = clone.querySelector(".qna_list_right > div");
    adminNoYes.className = (item.now === "답변대기") ? "qna_admin_no" : "qna_admin_yes";

    // 완성된 항목을 목록에 추가
    list.appendChild(clone);
  });

  // 필터가 아니면 더보기용 카운트 증가
  if (!isFilter) { 
    showCount += count; // forEach로 돌렸기 때문에, showCount(보여지는 수)는 count(보여질 수 10)로 +=

    // 모든 항목을 보여줬다면 "더보기" 버튼 숨기기
    if (showCount >= allData.length) {
      document.querySelector(".qna_more_btn").style.display = "none";
    }
  } else {
    // 필터 모드에서는 항상 "더보기" 숨김
    document.querySelector(".qna_more_btn").style.display = "none";
  }

  // 각 카테고리 탭의 숫자 업데이트
  document.querySelector(".allTab > span").textContent = allData.length;
  document.querySelector(".useTab > span").textContent = allData.filter(item => item.ca === "이용문의").length;
  document.querySelector(".coalTab > span").textContent = allData.filter(item => item.ca === "제휴문의").length;
  document.querySelector(".techTab > span").textContent = allData.filter(item => item.ca === "기술문의").length;
  document.querySelector(".dataTab > span").textContent = allData.filter(item => item.ca === "Data서비스").length;
  document.querySelector(".solTab > span").textContent = allData.filter(item => item.ca === "솔루션서비스").length;
  document.querySelector(".apiTab > span").textContent = allData.filter(item => item.ca === "API서비스").length;
  document.querySelector(".marTab > span").textContent = allData.filter(item => item.ca === "광고서비스").length;
}



/*
  만약 여기서
  특정 탭들도 10개가 넘어간다면?! 
  -
  값을 보낼때
  renderQnaItems(caFilter, 0, true); 를
  renderQnaItems(caFilter, 10, true); 변경
  -
  function 안에
  const itemsToShow = isFilter ? dataList : dataList.slice(showCount, showCount + count); 를
  const itemsToShow = dataList.slice(showCount, showCount+count); 변경
  - 
  하단 if문 중에
  if(!isFilter)가 있는데
  if(!isFilter){}를 지우고
  
  showCount += count;

  if(showCount >= dataList.length){
    document.querySelector(".qna_more_btn").style.display = "none";
  }
  변경~!
*/