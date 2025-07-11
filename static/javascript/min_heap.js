
export class Priority_queue{
    constructor(){
        this.arr = [];
    }

    parent(i){
        return Math.floor((i-1)/2);
    }

    left(i) {
        return 2*i+1;
    }
    right(i){
        return 2*i+2;


    }

    swap(i , j){
        [this.arr[i] , this.arr[j]] = [this.arr[j], this.arr[i]];
    }


    push(val){
        this.arr.push(val);

        this.heapifyUp(this.arr.length-1);
        return;
    }

    heapifyUp(i){
        while(i>0){
            let p = this.parent(i);
            if(this.arr[p][0] > this.arr[i][0] ){
                
                this.swap(p , i);
                i = p;
            }else break;
        }
    }


    pop(){
        if(this.arr.length === 0 ){
            console.log("heap underflow");
            return;
        }

        let top = this.arr[0];
        let last = this.arr.pop();

        if(this.arr.length === 0) return top;
        this.arr[0] = last;
        this.heapifyDown(0);
        return top;
    }


    heapifyDown(i){
        while(true){
            let smallest = i ;

            let l = this.left(i);
            let r = this.right(i);


            if(l<this.arr.length && this.arr[l][0] < this.arr[smallest][0]) smallest = l;
            if(r < this.arr.length &&  this.arr[r][0] < this.arr[smallest][0]) smallest = r;


            if(smallest !== i){
                this.swap(i , smallest);
                i = smallest;
            }else break;

        }
    }

    isEmpty(){
        return this.arr.length === 0 ;
    }
}


// const pq = new Priority_queue();
// console.log("create new pq");
// pq.push([10, 'A']);
// pq.push([2, 'B']);
// pq.push([4, 'C']);
// pq.push([1, 'D']);

// while (!pq.isEmpty()) {
//     console.log(pq.pop());
// }