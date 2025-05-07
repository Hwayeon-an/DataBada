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

fetch('../js/news.json') // 이 경로로 불러와
  .then(res => { // 성공하면 res로 지정해
    if(!res.ok){ // 불러온 res가 응답하지 않아.
      throw new Error("JSON 불러오기 실패") // 강제로 에러를 띄워
                                          // throw = 에러를 일부로 터뜨린다.
    }
    return res.json(); // 응답한 res를 json(js 객체)로 변환 + 반환
  })
  .then(data =>{ // 진짜 데이터가 여기로 들어온다 -> data 이름 지정해
    allData = data; // data는 alldata변수에 저장해
                    // 나중에 계속 이걸 가지고 놀려고

    trendData = allData.filter(item => item.ca === "Trend Report"); // 전체 데이터에서 Trend만 필터링하기 

    allData.sort((a,b) => b.date - a.date); // b - a = 내림차순
                                            // sort는 배열을 정렬하는 함수야

    showNews(allData, 24, false); // showNews를 호출하는데 매개변수도 같이 보내
                                  // allData는 전체 데이터를 보내. 그냥 전체보기니까
                                  // 24개를 보여주려고
                                  // false는 "Trend 모드 아님"이라는 뜻
  })
  .catch(err=>{ // 만약 중간에 실패하면 .catch()가 실행돼.
    console.log('에러발생 : ', err); // 실패 이유를 여기에 적을거야
  })



  // 🍤
  // 체크박스 체크 유무 -> 리스트 보기
  let TrendBox = document.querySelector("#ns_trend"); // 체크박스 가져와
  TrendBox.addEventListener("change", ()=>{ // 체크박스가 변경(change)될 때 실행(체크/해제)
    
    showCount = 0; // 초기화
    document.querySelector(".NS_contents_wrap").innerHTML = ""; // 초기화
    document.querySelector(".news_more_btn").style.display = "block"; // 데이터셋이 새로 바뀌니까 버튼도 다시 살아나야 정상!

    if(TrendBox.checked == true){ // 체크박스가 체크되어있으면 true
      showNews(trendData, 24, true); // 필터링한 애들만, 24개씩, 필터링한 상태
                                     // isTrend(true) 설정 : 이따 더보기 버튼 처리 다르게 해야해서
    }else{ // 체크를 해제했을 경우
      showNews(allData, 24, false); // 전체 데이터, 24개씩, 필터해제
    }
  }); 
  



  // 🍤
  function showNews(dataList, count=24, isTrend = false){
                    // dataList : 보여줄 데이터배열 (Trend만 보기일수도~ 전체일수도~)
                    // count = 24 : 한 번에 몇개씩 보여줄지 (기본 24개)
                    // isTrend = false : Trend 모드인가 아닌가
    const list = document.querySelector(".NS_contents_wrap"); // 보여줄 공간의 부모
    const template = document.querySelector("#newsCard"); // 복제할 아이

    const itemToShow = dataList.slice(showCount, showCount+count);
                      // 받은 데이터 배열을 자를거임!
                      // slice : 배열을 잘라내는 함수
                      // showCount부터 showCount+count까지
                      // 예) 0~23 -> 처음 24개 보여주는 것
                      //    (0~23)24~47 -> 또 24개 추가 됨

    itemToShow.forEach((item)=>{ // 잘라낸 데이터 각각을 돌리기 / 개당 item으로 이름 지정
      const clone = template.content.cloneNode(true); // 템플릿을 복사(clone)해
                                                      // true는 안에 내용까지 전부 복사

      clone.querySelector(".NS_list .NS_listImg img").src = item.src;
      clone.querySelector(".NS_list .NS_listCon .NS_listCa").textContent = item.ca;
      clone.querySelector(".NS_list .NS_listCon .NS_listTitle").textContent = item.title;
      clone.querySelector(".NS_list .NS_listCon .NS_listDate").textContent = item.date;

      list.appendChild(clone); // 완성된 템플릿을 리스트에 추가!
    }); // END forEach

    showCount += count; // 보여준 개수 누적

    if(!isTrend){ // [전체보기]일 경우
      if( showCount >= allData.length ){ // 현재 보여준 개수가 allData의 길이보다 같거나 커지면
        document.querySelector(".news_more_btn").style.display = "none"; // none
      }
    }else{ // [Trend만 보기]일 경우
      if( showCount >= trendData.length ){
          // 현재 보여준 개수가 (>=) 전체 데이터에서 아이템 카테고리가 "Trend Report"인 것들만 필터링한 길이보다 같거나 커지면
        document.querySelector(".news_more_btn").style.display = "none"; // none
      }
    }
  }



  // 🍤
  document.querySelector(".news_more_btn").addEventListener("click", ()=>{ // 더보기 버튼을 누르면
    if( TrendBox.checked == true ){
      showNews(trendData, 24, true)
    }else{
      showNews(allData, 24, false); // 전체데이터 + 24개 + Trend아님
    }
  });



  /*
  
  ✨ 요약하면
  1. JSON에서 뉴스 가져온다(fetch)
  2. 가져온 데이터 정렬(sort)
  3. 기본은 전체 뉴스 보여주기(showNews)
  4. Trend 체크하면 Trend 뉴스만 필터(filter)해서 보여주기
  5. 더보기 버튼 누르면 24개씩 추가로 보여주기(slice)



  
  
  */