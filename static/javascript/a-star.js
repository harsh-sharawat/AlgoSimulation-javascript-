import { Priority_queue } from "./min_heap.js";
import { updateColor,isvalid, getcellid, backtrack , coordToKey  } from "./utilities.js";
import { state } from "./main.js";



function distance(node1 , node2){
    return Math.pow(node1[0] - node2[0], 2) + Math.pow(node1[1] - node2[1],2);
}


let delrow = [-1 , 0 ,1 ,0];
let delcol = [0 , 1, 0, -1];

export async function aStar(startnode, endnode, grid){
    let vis= JSON.parse(JSON.stringify(grid));
    let n = vis.length;
    let m = vis[0].length;

    const map = new Map();


    let pq = new Priority_queue();

    pq.push([distance(startnode, endnode) ,0 , startnode]);

    while(!pq.isEmpty()){
        if(state !== 'running'){
            console.log("algo intrrupted");
            break;
        }

        let [fn ,gn, [r,c]] = pq.pop();

        if(r === endnode[0] && c === endnode[1]){
            console.log("target reached");
            await backtrack(map , startnode, endnode);
            break;
        }

       


        for(let k = 0 ; k<4  ; k++){
            let nr = r + delrow[k];
            let nc = c + delcol[k];

            if(isvalid(nr , nc , n , m ) && (vis[nr][nc] === 0 || vis[nr][nc] === 2)){

                let hn = distance([nr,nc] , endnode);
                
                vis[nr][nc] =-1;
                pq.push([hn+gn+1 , gn + 1 , [nr,nc]]  );
                map.set(coordToKey(nr , nc) , coordToKey(r, c));
                
                if(!(nr === endnode[0] && nc === endnode[1]))
                 await updateColor(getcellid(nr,nc));
            }
        }




        
    }

    


}