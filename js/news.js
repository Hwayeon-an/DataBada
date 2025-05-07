// // // news json 필요한 것들 변수 저장
// let allData = []; // 전체
// let filterData = []; // filteredData 필터된 데이터
// let showCount = 0;
// const count = 12; // 🍄 이것도 여기엔 필요없뜸 그리고 24개임 ㅋ
// let isTrendOnly = false; // "Trend"만 보기 상태 // 🍄 이건 여기에 필요없뜸


// // news json 불러오기
// fetch("../js/news.json")
//   .then(res => {
//     if(!res.ok){
//       throw new Error("JSON 불러오기 실패");
//     }
//     return res.json();
//   })
//   .then(data => {
//     🍄 allData = data;
//     allData = data.sort((a,b) => new Date(b.date) - new Date(a.date));
//     filterData = allData; // 🍄 이거말고
//     🍄 filterData = allData.filter(item => item.ca === "Trend Report");
//     showNews(true); // 최초 렌더링  🍄 이거말고
//     🍄 showNews(allDatam, 24, false); 
//   })
//   .catch(err => console.error(err));

// // 실행
// function showNews(data){ // 🍄
// 🍄 function showNews(dataList, count=24, isTrend = false) -> 데이터 종류, count는 기본값 24개 혹은 받기, isTrend 기본값 false 혹은 받기
//   // const list = document.querySelector(".NS_contents_wrap");
//   // const template = document.querySelector("#newsCard");

//   // if(reset){ //초기화 🍄 이거 여기에서 안 해도 됨
//   //   list.innerHTML = ""; 
//   //   showCount = 0;
//   // }
// }


/*
  전체 흐름
  뉴스 목록을 JSON에서 가져온다
  보여준다
  [더보기]를 누르면 추가로 보여준다
  [Trend만 보기]를 체크하면 필터링해서 보여준다

  **

  흐름) 데이터를 가져온다 -> 뿌린다 -> 관리한다
*/

// 🍤
// JSON 불러오기
// 일반 전체보기
let showCount = 0; // 현재까지 보여준 뉴스 개수
let allData = []; // 전체 뉴스 데이터 저장할 배열
let trendData = [];

fetch('../js/news.json') 
  .then(res => {
    if(!res.ok){ 
      throw new Error("JSON 불러오기 실패")                           
    }
    return res.json(); 
  })
  .then(data =>{ 
    allData = data; 
                    
    trendData = allData.filter(item => item.ca === "Trend Report"); 

    allData.sort((a,b) => b.date - a.date); 

    showNews(allData, 24, false); 
  })
  .catch(err=>{ 
    console.log('에러발생 : ', err); 
  })



  // 🍤
  // 체크박스 체크 유무 -> 리스트 보기
  let TrendBox = document.querySelector("#ns_trend"); 
  TrendBox.addEventListener("change", ()=>{ 
    showCount = 0; 
    document.querySelector(".NS_contents_wrap").innerHTML = ""; 
    document.querySelector(".news_more_btn").style.display = "block";

    if(TrendBox.checked == true){ 
      showNews(trendData, 24, true);                                      
    }else{ 
      showNews(allData, 24, false);
    }
  }); 
  



  // 🍤
  function showNews(dataList, count=24, isTrend = false){

    const list = document.querySelector(".NS_contents_wrap"); 
    const template = document.querySelector("#newsCard"); 

    const itemToShow = dataList.slice(showCount, showCount+count);


    itemToShow.forEach((item)=>{
      const clone = template.content.cloneNode(true); 

      clone.querySelector(".NS_list .NS_listImg img").src = item.src;
      clone.querySelector(".NS_list .NS_listCon .NS_listCa").textContent = item.ca;
      clone.querySelector(".NS_list .NS_listCon .NS_listTitle").textContent = item.title;
      clone.querySelector(".NS_list .NS_listCon .NS_listDate").textContent = item.date;

      list.appendChild(clone); 
    }); // END forEach

    showCount += count;

    if(!isTrend){ 
      if( showCount >= allData.length ){
        document.querySelector(".news_more_btn").style.display = "none"; // none
      }
    }else{
      if( showCount >= trendData.length ){
        document.querySelector(".news_more_btn").style.display = "none"; // none
      }
    }
  }



  // 🍤
  document.querySelector(".news_more_btn").addEventListener("click", ()=>{
    if( TrendBox.checked == true ){
      showNews(trendData, 24, true)
    }else{
      showNews(allData, 24, false); 
    }
  });