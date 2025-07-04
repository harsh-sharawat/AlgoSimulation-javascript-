
import {bfs} from './bfs.js';
import {colorWithoutDelay} from './utilities.js';
let grid = [];
export let state = 'start_node';
let start_node = null;  // grid val = 1; 
let end_node = null; // grid val = 2 ;

let numberofcols = 0 ;
let numberofrows = 0 ;
setValues();
resetGrid();
setInitialGrid();




let isDrawing = false;
var isMouseDown = false;
let lastcell = null;



const operationBtn = document.getElementById('curr-operation');

operationBtn.addEventListener('change', ()=>{
    isDrawing = (operationBtn.value === 'draw-obstacle');

  
});


document.querySelector('.canvas').addEventListener('mousedown' , ()=>{
    if(!isDrawing) return;

    document.querySelector('.canvas').classList.add('drawing-mode');

    isMouseDown = true;
    return;
});

document.querySelector('body').addEventListener('mouseup', ()=>{
    if(!isDrawing || !isMouseDown) return;
    document.querySelector('.canvas').classList.remove('drawing-mode');

    isMouseDown = false;
    lastcell = null;
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
                if(grid[r][c] === 0 ){
                    grid[r][c] = -1;
                    colorWithoutDelay(id, 'gray');
                }else if(grid[r][c] === -1){
                    grid[r][c] = 0 ;
                    colorWithoutDelay(id , 'rgb(165, 204, 248)');
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
                colorWithoutDelay(getcellid(start_node[0], start_node[1]) , 'rgb(165, 204, 248)');
                
            }
            grid[node[0]][node[1]] = 1; 
            start_node = node;
            colorWithoutDelay(cellid , 'green');
           
            set_state();
            console.log(state);
            
        
        return ;
    }

    if(currOperation === 'end-node'){
        let node  = Node;
            if(end_node){
                grid[end_node[0]][end_node[1]] = 0 ;
                colorWithoutDelay(getcellid(end_node[0] , end_node[1]) , 'rgb(165, 204, 248)');

            }
            grid[node[0]][node[1]] = 2; 
            end_node = node;
            colorWithoutDelay(cellid , 'red');
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




document.querySelector(".runalgo").addEventListener('click' , async ()=>{
    if(state == 'ready') state = 'running';
    else {
        // display_message(state);
        console.log('not ready to run algo');
        return ;
    }
    setInitialGrid();
   
    document.querySelector(".pause-button").disabled = false;
    document.querySelector(".runalgo").disabled = true;
    // document.querySelector('.randomize-button').disabled = true;
    
    await bfs(start_node , end_node , grid);
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
    

    for(let i = 0 ;i<numberofrows ; i++){
        for(let j = 0 ; j<numberofcols ; j++){
            if(grid[i][j] !== 0 ) continue;
            const rnd = Math.random();
            if(rnd<1/3){
                grid[i][j] = -1;
                colorWithoutDelay(getcellid(i , j) , 'gray');
            }else{
                grid[i][j] = 0 ;
                colorWithoutDelay(getcellid(i , j ), 'rgb(165, 204, 248)');
            }
        }
    }
    set_state();
    
});

document.querySelector('.reset').addEventListener('click' , ()=>{
    completeReset();
})







// function definitions


function setValues(){
    const rect = document.querySelector(".canvas").getBoundingClientRect();
    
        
    let w = Math.floor(rect.width);
    let t = rect.top;
        

    const h = Math.floor(window.screen.height - t);
    document.querySelector(".canvas").style.height = `${h}px`;

    numberofrows = Math.floor(h/20);
    numberofcols = Math.floor(w/20);
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
        if(grid[a][b] === -1) cell.style.backgroundColor = 'gray';
        else if(grid[a][b] === 1) cell.style.backgroundColor = 'green';
        else if(grid[a][b] === 2) cell.style.backgroundColor = 'red';   
        
        canvas.appendChild(cell);

    }
    

    

}



function stopalgo(){
    state = "ready";
    document.querySelector('.pause-button').disabled = true;
    document.querySelector(".runalgo").disabled = false;
    // document.querySelector(".randomize-button").disabled = false;

    
} 


function getcoordinates(cellid){
    let i = Math.floor(cellid / (numberofcols));
    let j = cellid%(numberofcols);


    
    
    return [i,j];
}

function getcellid(i,j){
    return i*numberofcols +j ;
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
    resetGrid();
    start_node = null;
    end_node = null;
    set_state();
    setInitialGrid();
}






        










        