function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updateColor(cellid,color='yellow',time = 10){
    
    const cell = document.getElementById(`${cellid}`);
    cell.style.backgroundColor = color;
    await sleep(time); 
}

export function colorWithoutDelay(cellid , color){
    const cell = document.getElementById(`${cellid}`);
    cell.style.backgroundColor = color;

}