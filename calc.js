const $main = document.getElementById('main');
const $disp_page = document.getElementById("disp_page");
const $start = document.getElementById("start");
const $toggle_btn = document.getElementById("toggle_btn");
const $time = document.getElementById("time");

let start_time;
let stop_time = 0;

$disp_page.classList.add('hidden');

const problems_count = 10;

for(let i=0; i<problems_count; i++){
    let p = document.createElement("p");
    p.classList.add("problems_disp");
    $disp_page.appendChild(p);
}

for(let i=0; i<problems_count; i++){
    let p = document.createElement("p");
    p.classList.add("ans_disp");
    $disp_page.appendChild(p);
}

const $problems_disp = document.getElementsByClassName("problems_disp");
const $ans_disp = document.getElementsByClassName("ans_disp");

$start.addEventListener("click", function(){
    $main.classList.add('hidden');
    $disp_page.classList.remove("hidden");

    start_time = Date.now();
});

const get_random = function(min, max){
    let random = Math.floor(Math.random() * (max + 1 - min)) + min;
  
    return random;
}

let ans = new Array(10), problems = new Array(10);

const disp_handler = function(idx, statement){
    return '(' + (idx+1) + ')' + ' ' + statement;
}

const create_problem = function(level, type, idx){
    let a = get_random(100, 999), b = get_random(100, 999), c = get_random(10, 20), d = get_random(10, 20);

    if(type === 0){
        ans[idx] = a + b;
        problems[idx] = "\\(" + a + '+' + b + "\\)";
    }

    if(type === 1){
        ans[idx] = a - b;
        problems[idx] = "\\(" + a + '-' + b + "\\)";
    }

    if(type === 2){
        ans[idx] = c * d;
        problems[idx] = "\\(" + c + '・' + d + "\\)";
    }
}

for(let i=0; i<problems_count; i++){
    create_problem(null, get_random(0, 1), i);
    $problems_disp[i].textContent = disp_handler(i, problems[i]);
    $ans_disp[i].textContent = disp_handler(i, ans[i]);
    $ans_disp[i].classList.add("hidden");
}

is_ans_disped = false;
is_pressed_ans = false;

const toggle_disp = function(){
    for(let i=0; i<problems_count; i++){
        $problems_disp[i].classList.toggle("hidden");
        $ans_disp[i].classList.toggle("hidden");
    }

    is_ans_disped = !is_ans_disped;

    stop_time += (Date.now() - start_time);

    const currentTime = new Date(Date.now() - start_time + stop_time);
    const m = String(currentTime.getMinutes()).padStart(1, '0');
    const s = String(currentTime.getSeconds()).padStart(2, '0');
  
    if(!is_pressed_ans)$time.textContent = '時間:' + `${m}:${s}`;
    is_pressed_ans = true;
}

$toggle_btn.addEventListener("click", toggle_disp);