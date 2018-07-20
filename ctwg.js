//Initializations_______________________________________
var textarea=document.getElementById('textarea');
textarea.innerHTML="Ola";
//document.addEventListener("keypress",Keypress);
var input=document.getElementById('input');
var select=document.getElementById('select');
//input.addEventListener("change",Select);
select.addEventListener("click",Select);
var keyInput;
var states={};
var op_selected='';
var states={};
//Functions___________________________________

function Keypress(event){
    console.log(event.key);
    keyInput=event.key;
}
function Select(){
    op_selected=input.value;
    input.value='';
}
/*---------------------------------
question: string witj question
options: array of strings with options
next_time: number in miliseconds to show message of the input
-------------------------------*/
function Menu(question,options){
    textarea.innerHTML=question+'\n';
    for(i=0;i<options.length;i++){
        op=options[i];
        textarea.innerHTML+=i.toString()+op+'\n';
    }
    textarea.innerHTML+="Choose option: \n";
    if(op_selected>=0 && op_selected<options.length){
        textarea.innerHTML+=op_selected+'\n';
        textarea.innerHTML+='Valid Input, Go to next menu...';
        return op_selected;
    }
    else{
        return -1;
    }
}
/*-----------------------------------------------
action: is a function that does an action and return a value, could be from an input or not.
next_state: is a function that evaluates the value return from action and returns the next state value.
------------------------------------------------*/
class State{
    Constructor(action,next_state){
        this.action=action;
        this.next=next_state;
    }
    Run(){
        this.next(this.action());
    }
}

function Game() {
    
    if(value!=null){
        textarea.innerHTML="";
        actual_state=states[value];
        value=actual_state.Run();
    }
    //console.log(op_selected);
    window.requestAnimationFrame(Game);
}
//Main____________________________________
//Create States
state_initial= new State(function(){Menu(
"Menu Initial\n Question is A real?",['yes','no','dont know']
);},function(value){
    switch(value){
        case 0: 
            return 'init yes answer';
            break;
        case 1:
            return 'init no answer';
            break;
        case 2: 
            return 'init dont know';
            break;
        default: 
            return "initial";
    }
});
state_init_yes_anwser= new State(Menu(
"Menu 1Yes\n Why A is real?",['because i believe','because is scientificly proven','dont know']
),function(value){
    switch(value){
        case 0: 
            return 'believe answer';
            break;
        case 1:
            return 'scientific';
            break;
        case 2: 
            return 'yes dk';
            break;
        default: 
            return "init yes answer";
    }
});
state_believe= new State(Menu(
"Ok you are a believer",[]
),function(value){
    return "Final";
});
state_final= new State(Menu(
"The End",[]
),function(value){
    return null;
});
//insert created states in dictionary
states['initial']=state_initial;
states['init yes answer']=state_init_yes_anwser;
states['believe answer']=state_believe;
states['Final']=state_final;
//start state machine
var actual_state=states['initial'];
var value=actual_state.Run();
/*class A{
    constructor(f1){
        this.f=f1;
    }
    run(value){
        this.f(value);
    }
}

bla=new A(function(value){alert("ola "+value);})
bla.run('tiago');*/
window.requestAnimationFrame(Game);