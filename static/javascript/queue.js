export class Queue{
    // arr = [] ;
    constructor(){
        this.arr = [];
    }

    push(val){
        this.arr.push(val);
    }


    pop(){
        let val = this.arr[0];
        this.arr.shift();
        return val;
    }

    front(){
        return this.arr[0];
    }

    empty(){
        return this.arr.length == 0;
    }

    size(){
        return this.arr.length;
    }


}