
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










document.querySelector('.canvas').addEventListener('click', (event)=>{
    if(state === 'running') return ;
    let cellid = null;
    if(event.target.classList.contains('cell')){
        cellid = event.target.id;
    }else return ;

    const currOperation = document.getElementById('curr-operation').value;

    if(currOperation === 'start-node'){
        let node = getcoordinates(cellid);
        if(grid[node[0]][node[1]] === 0 ){
            if(start_node){
                grid[start_node[0]][start_node[1]] = 0 ;
                colorWithoutDelay(getcellid(start_node[0], start_node[1]) , 'rgb(165, 204, 248)');
                
            }
            grid[node[0]][node[1]] = 1; 
            start_node = node;
            colorWithoutDelay(cellid , 'green');
           
            set_state();
            console.log(state);
            
        }
        return ;
    }

    if(currOperation === 'end-node'){
        let node  = getcoordinates(cellid);
        if(grid[node[0]][node[1]] === 0 ){
            if(end_node){
                grid[end_node[0]][end_node[1]] = 0 ;
                colorWithoutDelay(getcellid(end_node[0] , end_node[1]) , 'rgb(165, 204, 248)');

            }
            grid[node[0]][node[1]] = 2; 
            end_node = node;
            colorWithoutDelay(cellid , 'red');
            set_state();
            console.log(state);
        }
        
        return ;

    }




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
            if(grid[i][j] === 1 || grid[i][j] === 2 ) continue;
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






        










        