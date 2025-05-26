
import {bfs} from './bfs.js';

let grid = [];

let numberofcols = 0 ;
let numberofrows = 0 ;
setValues();
resetGrid();


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
           
        // const [a,b] = getcoordinates(i);
        // if(grid[a][b] === -1) cell.style.backgroundColor = 'gray';   
        canvas.appendChild(cell);

    }
    

    resetGrid();

}

function getcoordinates(cellid){
    let i = Math.floor(cellid / (numberofcols));
    let j = cellid%(numberofcols);


    
    
    return [i,j];
}

function getcellid(i,j){
    return i*numberofcols +j ;
}


setInitialGrid();



        // console.log(inhtml);

       
async function runalgo()
{

    await bfs([20,30] , [30,40] , grid);
}


document.querySelector(".runalgo").addEventListener('click' , ()=>{
    runalgo();
});



// window.addEventListener('resize' ,  function(){
//     setValues();
//     resetGrid();
//     setInitialGrid();
// });



document.querySelector(".randomize-button").addEventListener('click',()=>{
    resetGrid();
    setInitialGrid();

    for(let i =0 ;i<numberofrows*numberofcols; i++){
        const rnd = Math.random();
        if(rnd < 1/3) {
            const [a,b] = getcoordinates(i);
            grid[a][b] = -1;
            document.getElementById(`${i}`).style.backgroundColor = 'gray';
        }
    }

    

    
});



        










        