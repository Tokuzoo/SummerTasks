const $main = document.getElementById('main');
const $main_table = document.getElementById('main_table');
const $start = document.getElementById('start');
const $disp_page = document.getElementById('disp_page');
const $time = document.getElementById('time');

let start_time;
let stop_time = 0;

const model = [];
for(let i=0; i<64; i++){
    model.push(i+1);
}

$disp_page.classList.add('hidden');

const get_random = function(min, max){
    let random = Math.floor(Math.random() * (max + 1 - min)) + min;
  
    return random;
}

function init_table(){

    const list = document.querySelectorAll("#main_table td");

    let idx = 63;

    for(const td of list){
        td.classList.add('center');

        td.onclick = event => onclickTd(td, event);
        let rnd = get_random(0, idx);
        td.textContent = model[rnd];
        model.splice(rnd, 1);
        idx--;
    }
}

let cur_num = 1;

function onclickTd(td, event){
    if(Number(td.textContent) === cur_num){
        td.classList.add('pressed');
        console.log('o');
        cur_num++;
    }

    if(cur_num == 65){
        stop_time += (Date.now() - start_time);

        const currentTime = new Date(Date.now() - start_time + stop_time);
        const m = String(currentTime.getMinutes()).padStart(1, '0');
        const s = String(currentTime.getSeconds()).padStart(2, '0');
      
        $time.textContent = '時間:' + `${m}:${s}`;
    }
}

init_table();

$start.addEventListener('click',() => {
    $main.classList.toggle('hidden');
    $disp_page.classList.toggle('hidden');

    start_time = Date.now();
})