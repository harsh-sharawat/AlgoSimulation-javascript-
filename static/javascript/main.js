import { biDirectional } from './bidirectional.js';
import { colorTheme } from './colorTheme.js';
import {bfs} from './bfs.js';
import { aStar } from './a-star.js';
import {dfs} from './dfs.js';
import {colorWithoutDelay,getcellid , getcoordinates} from './utilities.js';
let grid = [];
export let state = 'start_node';
let start_node = null;  // grid val = 1; 
let end_node = null; // grid val = 2 ;

export let numberofcols = 0 ;
export let numberofrows = 0 ;
export let TimeDelay = 10 ;

let cell_Size = 20;





completeReset();




let isDrawing = false;
var isMouseDown = false;
let lastcell = null;
let mode = null;


const operationBtn = document.getElementById('curr-operation');

operationBtn.addEventListener('change', ()=>{
    isDrawing = (operationBtn.value === 'draw-obstacle');

  
});


document.querySelector('.canvas').addEventListener('mousedown' , (event)=>{
    if(!isDrawing) return;

    document.querySelector('.canvas').classList.add('drawing-mode');

    if (event.target.classList.contains('cell')) {
        const cellid = event.target.id;
        const Node = getcoordinates(cellid);
        lastcell = Node;  // also set lastcell here

        const [r, c] = Node;

        if (grid[r][c] === 0) {
            grid[r][c] = -1;
            colorWithoutDelay(cellid, colorTheme.obstacle);
            mode = "draw";
        } else if (grid[r][c] === -1) {
            grid[r][c] = 0;
            colorWithoutDelay(cellid, colorTheme.default);
            mode = "erase";
        }
    }


    isMouseDown = true;
    return;
});

document.querySelector('body').addEventListener('mouseup', ()=>{
    if(!isDrawing || !isMouseDown) return;
    document.querySelector('.canvas').classList.remove('drawing-mode');

    isMouseDown = false;
    lastcell = null;
    mode = null;
    return;
});






document.querySelector('.canvas').addEventListener('mousemove', (event)=>{
    if(!isDrawing || !isMouseDown) return;

    // setInitialGrid();
    if(event.target.classList.contains('cell')){
        var cellid =event.target.id;
        const Node = getcoordinates(cellid);
        

        if(lastcell){

            const lastid = getcellid(...lastcell);

            const points = getPoints(lastcell , Node);
            for(const [r ,c ] of points){

                const id = getcellid(r, c);
                if(id === lastid ) continue;
                if(grid[r][c] === 0 && mode === "draw"){
                    grid[r][c] = -1;
                    colorWithoutDelay(id, colorTheme.obstacle);
                    continue;
                }if(grid[r][c] === -1 && mode == "erase"){
                    grid[r][c] = 0 ;
                    colorWithoutDelay(id , colorTheme.default);
                } 
            }
        }

        lastcell = Node;



    }
}
);



function getPoints(start, end) {
  const [x0, y0] = start;
  const [x1, y1] = end;

  const points = [];

  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);

  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;

  let err = dx - dy;

  let x = x0, y = y0;

  while (true) {
    points.push([x, y]);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx)  { err += dx; y += sy; }
  }

  return points;
}



document.querySelector('.canvas').addEventListener('click', (event)=>{
    if(state === 'running' || isDrawing) return ;

    
    let cellid = null;
    if(event.target.classList.contains('cell')){
        cellid = event.target.id;
    }else return ;

    const currOperation = document.getElementById('curr-operation').value;

    let Node = getcoordinates(cellid);
    if(grid[Node[0]][Node[1]] === 1 || grid[Node[0]][Node[1]] === 2) return;
    setInitialGrid();
    if(currOperation === 'start-node'){
        let node = Node
        
            if(start_node){
                grid[start_node[0]][start_node[1]] = 0 ;
                colorWithoutDelay(getcellid(start_node[0], start_node[1]) , colorTheme.default);
                
            }
            grid[node[0]][node[1]] = 1; 
            start_node = node;
            colorWithoutDelay(cellid , colorTheme.start);
           
            set_state();
            console.log(state);
            
        
        return ;
    }

    if(currOperation === 'end-node'){
        let node  = Node;
            if(end_node){
                grid[end_node[0]][end_node[1]] = 0 ;
                colorWithoutDelay(getcellid(end_node[0] , end_node[1]) , colorTheme.default);

            }
            grid[node[0]][node[1]] = 2; 
            end_node = node;
            colorWithoutDelay(cellid , colorTheme.end);
            set_state();
            console.log(state);
        
        return ;

    }


    // if(currOperation === 'draw-obstacle'){
    //     let node = getcoordinates(cellid);
    //     setInitialGrid();
    //     document.addEventListener('mousedown', ()=>{



    //     });
    // }




});



const algomap = {
    "bfs" : bfs, 
    "dfs" : dfs, 
    "bi-di" : biDirectional , 
    "a-star" :   aStar, 

}



document.querySelector(".runalgo").addEventListener('click' , async ()=>{
    if(state == 'ready') state = 'running';
    else {
        
        console.log('not ready to run algo');
        var message = `select ${state} first to run`;
        alert(message);
        return ;
    }
    setInitialGrid();
   
    document.querySelector(".pause-button").disabled = false;
    document.querySelector(".runalgo").disabled = true;
    // document.querySelector('.randomize-button').disabled = true;
    

    const algo = document.getElementById("curr-algo").value;
    console.log(algo);


    // function fun = algomap[algo];
    await algomap[algo](start_node, end_node, grid);
   
    stopalgo();
});


document.querySelector(".pause-button").addEventListener('click', ()=>{
    
    stopalgo();
 
});



// window.addEventListener('resize' ,  function(){
//     setValues();
//     resetGrid();
//     setInitialGrid();
// });


document.querySelector(".randomize-button").addEventListener('click',()=>{
    
    const val = 10 - document.getElementById('density').value;
    for(let i = 0 ;i<numberofrows ; i++){
        for(let j = 0 ; j<numberofcols ; j++){
            if(grid[i][j] !== 0 && grid[i][j]!=-1) continue;
            const rnd = Math.random();
            
            
            if(rnd < 1/val ){
                grid[i][j] = -1;
                colorWithoutDelay(getcellid(i , j) , colorTheme.obstacle);
            }else{
                grid[i][j] = 0 ;
                colorWithoutDelay(getcellid(i , j ), colorTheme.default);
            }
        }
    }
    set_state();
    
});

document.querySelector('.reset').addEventListener('click' , ()=>{
    completeReset();
})



document.getElementById('time-delay').addEventListener('change' , ()=>{
    TimeDelay = document.getElementById('time-delay').value;
})


document.getElementById('time-delay').addEventListener('input',function (){
    document.getElementById('timeValue').textContent = `${this.value} (ms)`;
})

document.getElementById('cell-size').addEventListener('change' , ()=>{
    cell_Size = document.getElementById('cell-size').value;
    completeReset();
})


document.getElementById('cell-size').addEventListener('input',function (){
    document.getElementById('cell-sizeValue').textContent = `${this.value} (ms)`;
})





// function definitions


function setValues(){
    const rect = document.querySelector(".canvas").getBoundingClientRect();
    
        
    let w = Math.floor(rect.width);
    let t = rect.top;
    
    

    const h = Math.floor(window.innerHeight - t);
    document.querySelector(".canvas").style.height = `${h}px`;

    numberofrows = Math.floor(h/cell_Size);
    numberofcols = Math.floor(w/cell_Size);
    console.log(numberofcols);
    console.log(numberofrows);
}

function resetGrid(){
    grid = [];
    for(let i = 0 ;i<numberofrows ; i++){
        let row = [];
        for(let j = 0 ;j<numberofcols ; j++){
            row.push(0);

        }
        grid.push(row);
    }
}


function setInitialGrid(){
    const canvas = document.querySelector(".canvas");
    canvas.innerHTML = '';

    
        
    canvas.style.gridTemplateColumns = `repeat(${numberofcols}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${numberofrows}, 1fr)`;
        

       

    for(let i =0 ;i<numberofcols*numberofrows ;i ++){

        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${i}`
        // cell.onclick = ()=>{
        //     const [a,b] = getcoordinates(i);
        //     console.log(grid[a][b]);

        // };
           
        const [a,b] = getcoordinates(i);
        if(grid[a][b] === -1) cell.style.backgroundColor = colorTheme.obstacle;
        else if(grid[a][b] === 1) cell.style.backgroundColor = colorTheme.start;
        else if(grid[a][b] === 2) cell.style.backgroundColor = colorTheme.end;   
        
        canvas.appendChild(cell);

    }
    

    

}



function stopalgo(){
    state = "ready";
    document.querySelector('.pause-button').disabled = true;
    document.querySelector(".runalgo").disabled = false;
    // document.querySelector(".randomize-button").disabled = false;

    
} 



function set_state(){
    if(!start_node){
        state = 'start_node';
        return ;
    }
    if(!end_node){
        state = 'end_node';
        return;
    }
    state = 'ready';
    return;
}


function completeReset(){
    setValues();
    resetGrid();
    start_node = null;
    end_node = null;
    set_state();
    setInitialGrid();
}






        










        