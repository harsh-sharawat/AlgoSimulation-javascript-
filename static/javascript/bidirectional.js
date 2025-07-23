import { Queue } from "./queue.js";
import {isvalid ,  getcellid, getcoordinates , coordToKey, updateColor, backtrack } from "./utilities.js";
import { state } from "./main.js";



export async function biDirectional(startnode , endnode , grid){
    let n = grid.length;
    let m = grid[0].length;

    let vis = JSON.parse(JSON.stringify(grid));

    const map1 = new Map();
    const map2 = new Map();

    const delrow = [-1,0,1,0];
    const delcol = [0,1,0,-1];
    const q1 = new Queue();
    const q2 = new Queue();
    q1.push(startnode);
    q2.push(endnode);
    let flag = true;
    while(!(q1.empty() && q2.empty())){

        if(state!=='running'){
            console.log('algo intrrupted');
            break;
        }

        // from start node traversal
        if(!q1.empty()){
            let [r,c] = q1.pop();

            if(r === endnode[0] && c === endnode[1]){
                console.log("target reached");
                await backtrack(map1 , startnode , endnode);
                
                break;
            } 

            for(let k = 0 ; k<4 ; k++){
                let nr  =  r + delrow[k];
                let nc  = c + delcol[k];

                if(isvalid(nr , nc , n , m) && (vis[nr][nc] === 0 || vis[nr][nc] === 2 || vis[nr][nc] ===4 )){
                    if(vis[nr][nc] === 4 ){
                        // backtarck
                        map1.set(coordToKey(nr,nc), coordToKey(r,c)); 

                        console.log("target reached");
                        await backtrack(map1 , startnode , [nr, nc]);
                        await backtrack(map2 , endnode , [nr,nc]);

                        flag = false;
                        break;
                    }

                    q1.push([nr, nc]);
                    vis[nr][nc] = 3 ;
                    map1.set(coordToKey(nr,nc), coordToKey(r,c)); 
                    await updateColor(getcellid(nr, nc));

                }

               
            }
             if(!flag) break;
        }

        if(q2.empty()) continue;
        let [r,c] = q2.pop();

        for(let k = 0 ; k<4 ; k++){
            let nr  =  r + delrow[k];
            let nc  = c + delcol[k];

            if(isvalid(nr , nc , n , m) && (vis[nr][nc] === 0 || vis[nr][nc] === 1 || vis[nr][nc] ===3 )){
                if(vis[nr][nc] === 3 ){
                    // backtarck
                    console.log("target reached");
                    map2.set(coordToKey(nr,nc), coordToKey(r,c)); 

                    await backtrack(map1 , startnode , [nr, nc]);
                    await backtrack(map2 , endnode , [nr,nc]);


                    flag = false;

                    break;
                }

                q2.push([nr, nc]);
                vis[nr][nc] = 4 ; 
                map2.set(coordToKey(nr,nc), coordToKey(r,c)); 
                await updateColor(getcellid(nr ,nc) , undefined , 5 );
            }

        }
            if(!flag) break;







    }
}