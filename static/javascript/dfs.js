import {Stack} from "./stack.js";
import { updateColor, getcellid, isvalid, coordToKey, backtrack } from "./utilities.js";
import { state } from "./main.js";

let delrow = [-1,0,1,0];
let delcol = [0,1,0,-1];

export async function dfs(startnode , endnode , grid){
    const n = grid.length;
    const m = grid[0].length;

    let vis = JSON.parse(JSON.stringify(grid));

    let st = new Stack();

    st.push(startnode);

    const map = new Map();

    while(!st.isEmpty()){

        if(state !== "running"){
            console.log("algo intrrupted");
            break;
        }


        let [r,c] = st.pop();

        if(r === endnode[0] && c === endnode[1]){
            console.log("target reached");
            await backtrack(map, startnode, endnode);
            break;
        }


        if(vis[r][c] == -1 ) continue;

        vis[r][c] = -1 ; 

        if(!(r === startnode[0] && c === startnode[1]))
        await updateColor(getcellid(r , c) );


        for(let k = 0 ;k<4 ; k ++){ 
            let nr = r + delrow[k];
            let nc = c + delcol[k];

            if(isvalid(nr , nc , n ,  m ) && (vis[nr][nc] == 0 || vis[nr][nc] == 2) ){
                st.push([nr, nc]);
                map.set(coordToKey(nr , nc) , coordToKey(r, c));
               
            }
        }

    }

   



}