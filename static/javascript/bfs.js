import {Queue} from './queue.js';
import {updateColor , backtrack,coordToKey} from './utilities.js';
import {state} from './main.js';


function isvalid(i , j , n , m )
{
    return (i>=0 && i<n && j>=0 && j<m );
}


export async function bfs(startnode, endnode , grid){
    const numberofrows = grid.length;
    const numberofcols = grid[0].length;
    const delrow = [-1,0,1,0];
    const delcol = [0,1,0,-1];
    let q = new Queue();
    q.push(startnode);
    let vis = JSON.parse(JSON.stringify(grid));
    const i = startnode[0];
    const j = startnode[1];

    const map = new Map();

    

    vis[i][j]  = -1; 
    while(!q.empty()){



            

            if(state!='running'){
                console.log('ranalgo intrrupted');
                return;
            }

       
            let currnode = q.pop();

            let curri = currnode[0];
            let currj = currnode[1];

            if(curri === endnode[0] && currj === endnode[1]){
                console.log('target reached');
                await backtrack(map , startnode, endnode);
                break;
            }
            const cellid = curri*numberofcols + currj;

            if(!(curri === startnode[0] && currj === startnode[1]) && !(curri === endnode[0] && currj === endnode[1])) 
                await updateColor(cellid);

            for(let k = 0 ; k<4 ; k++){
                const ni = curri + delrow[k];
                const nj = currj + delcol[k];

                if(isvalid(ni , nj , numberofrows, numberofcols) &&  vis[ni][nj]!==-1){
                    vis[ni][nj] = -1;
                    q.push([ni, nj]); 
                    map.set(coordToKey(ni , nj) , coordToKey(curri , currj));
                }
            }
        
       
    }
    

}