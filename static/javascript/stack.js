

export class Stack{
    constructor(){
        this.arr = [];
    }


    push(val){
        this.arr.push(val);
    }


    pop(){
        if(this.isEmpty()){
            console.log("stack underflow");
            return;
        }
        return this.arr.pop();
    }


    isEmpty(){
        return this.arr.length == 0 ;
    }
}