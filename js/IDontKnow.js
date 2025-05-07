// 🍄 (1) 체크박스 유무에 따라 전체보기인지 아닌지 + JSON
let showCount = 0; // 현재 보여지는 수
let allData = []; // 전체 데이터를 담을거임! 객체로
let trendData = []; // allData에서 .filter로 필터링한 값 / 객체로
let TrendBox = document.querySelector("#ns_trend"); // 체크박스

fetch('../js/news.json')
  .then(res =>{
    if(!res.ok){ // 불러온 res가 응답하지 않아
      throw new Error("JSON 불러오기 실패") // 강제로 에러를 띄워
    }
    return res.json();
  })
  .then(data=>{
    allData = data;
    trendData = allData.filter(item => { item.ca === "Trend Report" });
    allData.sort((a, b) => b.date - a.date );

    showNews(allData, 24, false);
  })
  .catch(err=>{
    console.log('에러발생 : ', err);
  })



  //  체크박스 change
  TrendBox.addEventListener("change", ()=>{
    showCount = 0;
    document.querySelector(".NS_contents_wrap").innerHTML = "";
    document.querySelector(".news_more_btn").style.display = "block";

    if( TrendBox.checked == true ){
      showNews(trendData, 24, true);
    }else{
      showNews(allData, 24, false);
    }
  });


  
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


  TrendBox.addEventListener("change", ()=>{
    showCount = 0;
    document.querySelector(".NS_contents_wrap").innerHTML = "";
    document.querySelector(".news_more_btn").style.display = "block";

    if(TrendBox.checked == true){
      showNews(trenData, 24, true);
    }else{
      showNews(allData, 24, false);
    }
  })

