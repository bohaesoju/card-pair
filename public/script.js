var candidate = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink', 'mango', 'mango', 'apple', 'apple', 'melon', 'melon'];
var wrapper = document.querySelector('#wrapper');
var scoreUl = document.querySelector('.score');
var scoreLi = document.createElement('li');
var cardAll = [];
var colorCandidate = candidate.slice();
var colors = [];
var clickFlag = true;
var clickCard = [];
var successCard = [];
var startTime;
var timeList = [];
var successTime;
var keyArr = [];
var cardSetting = function (h) {
    clickFlag = false;
    var _loop_1 = function (i) {
        var card = document.createElement('div');
        var cardInner = document.createElement('div');
        var cardFront = document.createElement('div');
        var cardBack = document.createElement('div');
        card.className = 'card ' + colors[i];
        card.title = 'card' + i;
        cardInner.className = 'card-inner';
        cardFront.className = 'card-front';
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = colors[i];
        document.querySelector('#wrapper').appendChild(card);
        card.appendChild(cardInner);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardAll.push(card);
        card.addEventListener('click', function (e) {
            if (clickFlag && !successCard.includes(e.currentTarget)) {
                card.classList.toggle('flipped');
                clickCard.push(e.currentTarget);
                if (clickCard.length === 2) {
                    if ((clickCard[0].className === clickCard[1].className) && (clickCard[0].title !== clickCard[1].title)) {
                        successCard.push(clickCard[0]);
                        successCard.push(clickCard[1]);
                        clickCard[0].classList.add('animate');
                        clickCard[1].classList.add('animate');
                        clickCard = [];
                        if (successCard.length === candidate.length) {
                            success();
                        }
                    }
                    else { // 두 카드의 색깔이 다르면
                        clickFlag = false;
                        setTimeout(function () {
                            clickCard[0].classList.remove('flipped');
                            clickCard[1].classList.remove('flipped');
                            clickFlag = true;
                            clickCard = [];
                        }, 1000);
                    }
                }
            }
        });
    };
    for (var i = 0; i < h; i += 1) {
        _loop_1(i);
    }
    cardFlip();
    cardFlipRemove();
};
//카드 다 맞췄을시
function success() {
    var endTime = new Date();
    var finishTime = (endTime - startTime) / 1000;
    successTime = Math.ceil(finishTime);
    timeList.push(successTime);
    timeList.sort(function (a, b) {
        return a - b;
    });
    keyArr = [];
    finishAfter();
}
addEventListener('keydown', function (e) {
    keyArr.push(e.code);
    if (keyArr[0] === "ArrowUp" && keyArr[1] === "ArrowRight" && keyArr[2] === "ArrowDown" && keyArr[3] === "ArrowLeft" && keyArr[4] === "ArrowUp") {
        success();
    }
});
function finishAfter() {
    if (successTime <= scoreWrap[0].second) {
        wrapper.classList.add('bounce-in-top');
        save_data();
    }
    cardAll.forEach(function (e) {
        e.classList.add('rotate');
    });
    scoreUl.innerHTML = '';
    for (var i = 0; i < timeList.length; i += 1) {
        var html = "<li>" + (i + 1) + ". " + timeList[i] + "초" + "</li>";
        scoreUl.innerHTML += html;
    }
    setTimeout(function () {
        init();
    }, 5000);
}
//초기화
function init() {
    alert("\uCD95\uD558\uD569\uB2C8\uB2E4! " + successTime + " \uCD08 \uAC78\uB838\uC2B5\uB2C8\uB2E4!");
    document.querySelector('#wrapper').innerHTML = '';
    colorCandidate = candidate.slice();
    colors = [];
    successCard = [];
    cardAll = [];
    wrapper.classList.remove('bounce-in-top');
    startTime;
    makeColors();
    cardSetting(candidate.length);
}
//랜덤 컬러 생성
function makeColors() {
    for (var i = 0; colorCandidate.length > 0; i += 1) {
        colors = colors.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
}
//차례대로 카드 보여주기
function cardFlip() {
    document.querySelectorAll('.card').forEach(function (e, i) {
        setTimeout(function () {
            e.classList.add('flipped');
        }, 1000 + 100 * i);
    });
}
//카드 뒤집기
function cardFlipRemove() {
    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (e) {
            e.classList.remove('flipped');
        });
        clickFlag = true;
        startTime = new Date();
    }, 5000);
}
// 레이어
$('.rankingList').click(function () {
    var $href = $(this).attr('href');
    $('.rankingLi').remove();
    score_sort();
    layer_popup($href);
});
function layer_popup(el) {
    var $el = $(el); //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg'); //dimmed 레이어를 감지하기 위한 boolean 변수
    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();
    var $elWidth = ~~($el.outerWidth()), $elHeight = ~~($el.outerHeight()), docWidth = $(document).width(), docHeight = $(document).height();
    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight / 2,
            marginLeft: -$elWidth / 2
        });
    }
    else {
        $el.css({ top: 0, left: 0 });
    }
    $el.find('a.btn-layerClose').click(function () {
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });
    $('.layer .dimBg').click(function () {
        $('.dim-layer').fadeOut();
        return false;
    });
}
