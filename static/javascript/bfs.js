import {Queue} from './queue.js';
import {updateColor} from './gridcolorupdation.js';



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
    let vis = grid;
    const i = startnode[0];
    const j = startnode[1];

    vis[i][j]  = -1; 
    while(!q.empty()){

       
            let currnode = q.pop();

            let curri = currnode[0];
            let currj = currnode[1];

            if(curri == endnode[0] && currj == endnode[1]){
                console.log('target reached');
                break;
            }
            const cellid = curri*numberofcols + currj;
            await updateColor(cellid);

            for(let k = 0 ; k<4 ; k++){
                const ni = curri + delrow[k];
                const nj = currj + delcol[k];

                if(isvalid(ni , nj , numberofrows, numberofcols) &&  vis[ni][nj]!==-1){
                    vis[ni][nj] = -1;
                    q.push([ni, nj]); 
                }
            }
        
       
    }

}