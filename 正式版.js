const buttons = document.getElementsByClassName("b");
const tt = document.getElementById("totalT");
const t = document.getElementById("times");
const lt = document.getElementById("LeftT");
const p = document.getElementById("pairs");
const startB = document.getElementById("start");
let clickCount = 0; // check how many buttons are clicked
let check1, check2; // check buttons' innerText
let loc1, loc2; // find the location of the array
let totalT = 0; // total amont of time used
let times = 0; // how many times you tried
let LeftT = 30; // left 15 seconds 
let pair = 20;
let rtry = 0; // remenered tries when end the game
let rtime; // remembered time used when end the game
let rtime2; // remember how many times you click the pairs
let i;
let j;

// create card orders
function setCards() {
    //reset all buttons and clickCounts
    startB.disabled = true;
    for (let i = 0; i < 40; i++) {
        buttons[i].innerText = "";
        buttons[i].disabled = true;
    }
    // set everything
    LeftT =30;
    lt.innerText = "你還有"+ LeftT+"秒可以準備"
    pair = 20;
    p.innerText = "還剩下" + pair + "對";
    times = 0;
    t.innerText = "已嘗試了" + times + "次";
    totalT = 0;
    tt.innerText = "已花了"+totalT+"秒";
    clickCount = 0;
    // start count and memorize
    let a1 = [0,"★","✦","✽","♫","☉","❤","✔","▲","│","θ","▉","➞","⬳","⟰","☾","★","✦",
    "✽","♫","☉","❤","✔","▲","│","θ","▉","➞","⬳","⟰","☾","✏","✏","¥","¥","《","《","♞",
    "♞","≠","≠"];
            for(let i = 0; i < 40; i++)
    {
        let rn = Math.floor(Math.random() *(a1.length - 1)) + 1;
        buttons[i].innerText = a1[rn];
        buttons[i].value = a1[rn];
        a1.splice(rn,1);
    }
    if (LeftT != 0) {
        i = setInterval(() => {
            LeftT --;
            lt.innerText = "你還有"+ LeftT+"秒可以準備"
            if (LeftT == 0) {
                clearInterval(i);
                //start the game
                for (let i = 0; i < 40; i++) {
                    buttons[i].innerText = "";
                    buttons[i].disabled = false;
                    }
                    j = setInterval(() => {
                        totalT ++;
                        tt.innerText = "已花了"+totalT+"秒";
                    }, 1000);
            }
        }, 1000);
        
    }
}

//click effect and count
for (let i = 0; i < 40; i ++) {
    buttons[i].addEventListener('click', ()=> {
        if (clickCount == 0 && buttons[i].disabled == false) {
        buttons[i].innerText = buttons[i].value;
        buttons[i].disabled = true;
        check1 = buttons[i].innerText;
        loc1 = i;
        clickCount ++;
        } else if (clickCount == 1 && buttons[i].disabled == false) {
            buttons[i].innerText = buttons[i].value;
            check2 = buttons[i].innerText;
            loc2 = i;
            checkEqual(check1,check2); // check two clicked buttons
        }
    })
}

function checkEqual(a,b) {
    if (a == b) {
        buttons[loc1].disabled = true;
        buttons[loc2].disabled = true;
        times += 1;
        t.innerText = "已嘗試了" + times + "次";
        clickCount = 0;
        pair -= 1;
        p.innerText = "還剩下" + pair + "對";
        if(pair == 0) {
            end();
        }
    } else {
        times += 1;
        t.innerText = "已嘗試了" + times + "次";
        for (let i = 0; i < 40; i++) {
            buttons[i].disabled = true;
        }
        setTimeout(() => {
            buttons[loc1].innerText = "";
            buttons[loc2].innerText = "";
            for (let i = 0; i < 40; i++) {
                if (buttons[i].innerText == "") {
                    buttons[i].disabled = false;
                }
            }
            clickCount = 0;
        },1000)
    }
}

// gameover
function end() {
    startB.disabled = false;
    clearInterval(j);
    
    for (let i = 0; i < 40; i++) {
        buttons[i].innerText = "";
        buttons[i].value = 0;
    }
    clickCount = 0;
    rtry ++;
    rtime = totalT;
    rtime2 = times;
    console.log("第" + rtry +"次" + "共花了" + rtime + "秒" +
    "共試了" + rtime2 + "次");
    alert("恭喜您完成了本次的遊戲!")
}

//reset scores when game's over
document.addEventListener('keypress', (event)=> {
    if (event.keyCode == 32 && pair == 0) {
        totalT = 0;
        tt.innerText = "已花了"+totalT+"秒";
        times = 0;
        t.innerText = "已嘗試了" + times + "次";
    }

})