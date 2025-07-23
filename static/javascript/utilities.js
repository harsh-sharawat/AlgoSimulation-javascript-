import {numberofcols, TimeDelay} from "./main.js";

import { colorTheme } from "./colorTheme.js";




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updateColor(cellid,color=colorTheme.traverse, time = TimeDelay){
    
    const cell = document.getElementById(`${cellid}`);
    cell.style.backgroundColor = color;
    await sleep(time); 
}

export function colorWithoutDelay(cellid , color){
    const cell = document.getElementById(`${cellid}`);
    cell.style.backgroundColor = color;

}


export function getcoordinates(cellid){
    let i = Math.floor(cellid / (numberofcols));
    let j = cellid%(numberofcols);


    
    
    return [i,j];
}

export function getcellid(i,j){
    return i*numberofcols +j ;
}


export function coordToKey(x, y) {
  return `${x},${y}`;
}

export function keyToCoord(key) {
  const [x, y] = key.split(',').map(Number);
  return [ x, y ];
}

const map = new Map();
map.set(coordToKey(12, 34), 'Home');

const value = map.get(coordToKey(12, 34)); // 'Home'
const coords = keyToCoord('12,34'); // { x: 12, y: 34 }



export async function backtrack( map , startnode, endnode){
    let [r,c] = startnode;
    let [curri , currj] = endnode;

    while(!(curri === r && currj === c)){
        // let [ni , nj ] = map.get([curri, currj]);

        const cellid = getcellid(curri ,currj);
        await updateColor(cellid , colorTheme.backtrack);

        [curri , currj] = keyToCoord(map.get(coordToKey(curri , currj )));
    }

    updateColor(getcellid(...endnode) , "red");
    return;
}


export function isvalid(i , j , n , m )
{
    return (i>=0 && i<n && j>=0 && j<m );
}
