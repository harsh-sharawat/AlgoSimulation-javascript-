function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updateColor(cellid,color='yellow'){
    
    const cell = document.getElementById(`${cellid}`);
    cell.style.backgroundColor = color;
    await sleep(5); 
}

export function colorWithoutDelay(cellid , color){
    const cell = document.getElementById(`${cellid}`);
    cell.style.backgroundColor = color;

}