let auth;
let scoreWrap = [];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA1AE_AGrknuE0rU3Wh3yMrQi7rN7bEY1I",
    authDomain: "card-pair.firebaseapp.com",
    databaseURL: "https://card-pair.firebaseio.com",
    projectId: "card-pair",
    storageBucket: "card-pair.appspot.com",
    messagingSenderId: "41465821191"
};

firebase.initializeApp(config);

auth = firebase.auth();
database = firebase.database();
var authProvider = new firebase.auth.GoogleAuthProvider();

auth.onAuthStateChanged(function(user){
    if(user){
      //인증성공후
      userInfo = user;
      displayName = userInfo.displayName;
      photoURL = userInfo.photoURL;
      gameStart();
    } else {
      auth.signInWithPopup(authProvider);
    }
  });

function get_memo_list(){
    const memoRef = database.ref('scores/');
    memoRef.on('child_added' , on_child_added);
    memoRef.on('child_changed' , (data) => {
    });
}  

function on_child_added(data){
    let second = data.val();
    scoreWrap.push(second);
    //현재 객체 배열을 정렬
    scoreWrap.sort(function (a, b) { 
        return a.second < b.second ? -1 : a.second > b.second ? 1 : 0;  
    });
    document.querySelector('.maximumRanking span').textContent = '';
    document.querySelector('.maximumRanking span').textContent = scoreWrap[0].second + '초';
}

function save_data(){
    var memoRef = database.ref('scores/');
    memoRef.push({
        key : displayName,
        second : successTime,
        photoURL : photoURL
    })
} 

function score_sort(){
    for(let i = 0; i < scoreWrap.length; i += 1){
        var html =
            "<li class=\"rankingLi\">" +
                "<p class=\"title0\">" + [i + 1] + "위</p>" +
                "<img class=\"pic\" src=" + scoreWrap[i].photoURL + ">" +
                "<p class=\"title1\">" + scoreWrap[i].key + "</p>" +
                "<p class=\"title2\">" + scoreWrap[i].second + "초</p>" +
            "</li>";
        document.querySelector('.rankingUl').innerHTML += html
    }
}

function gameStart(){
    makeColors();
    cardSetting(candidate.length);
    document.querySelector('.user-name').textContent = displayName;
    document.querySelector('.displayPic').src = photoURL;
    get_memo_list();
}  