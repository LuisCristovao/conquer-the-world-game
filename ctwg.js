//Initializations_______________________________________
var textarea=document.getElementById('textarea');
textarea.innerHTML="Ola";
document.addEventListener("keypress",Keypress);
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
    if(event.key.localeCompare("Enter")==0){
        Select();
    }
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
        textarea.innerHTML+=i.toString()+'. '+op+'\n';
    }
    textarea.innerHTML+="Choose option: \n";
    if(op_selected>=0 && op_selected<options.length && op_selected!=''){
        textarea.innerHTML+=op_selected+'\n';
        textarea.innerHTML+='Valid Input, Go to next menu...';
        return op_selected;
    }
    else{
        //textarea.innerHTML+='Invalid Input\n';
        //setTimeout(function(){},1000);
        return -1;
    }
}
/*------------------------------------------------
func: is the function you want class action to do
params: is an array with parameters for the function
--------------------------------------------------*/
class ActionMenu{
    
    constructor(func,question,options){
        this.func=func;
        this.question=question;
        this.options=options
    }
    run(){
        return parseInt(this.func(this.question,this.options));
    }
}
/*-----------------------------------------------
action: is a function that does an action and return a value, could be from an input or not.
next_state: is a function that evaluates the value return from action and returns the next state value.
------------------------------------------------*/
class State{
    constructor(action,next_state){
        this.action=action;
        this.next=next_state;
    }
    run(){
        return this.next(this.action.run());
    }
}

function Game() {
    
    if(value!=null){
        console.log(value);
        textarea.innerHTML="";
        actual_state=states[value];
        value=actual_state.run();
    }
    //console.log(op_selected);
    window.requestAnimationFrame(Game);
}
//Main____________________________________
//Create States
state_initial= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Menu Initial\n Question is A real?",['yes','no','dont know']
),function(value){
    switch(value){
        case 0: 
            op_selected=-1;
            return 'init yes answer';
            
            break;
        case 1:
            op_selected=-1;
            return 'init no answer';            
            break;
        case 2: 
            op_selected=-1;
            return 'dk answer';            
            break;
        default:
            op_selected=-1;
            return "initial";
    }
});
state_init_yes_anwser= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Menu 1Yes\n Why A is real?",['because i believe','because is scientificly proven','dont know']
),function(value){
    switch(value){
        case 0: 
            op_selected=-1;
            return 'believe answer';
            break;
        case 1:
            op_selected=-1;
            return 'science answer';
            break;
        case 2:
            op_selected=-1;
            return 'dk answer';
            break;
        default: 
            op_selected=-1;
            return "init yes answer";
    }
});
state_init_no_anwser= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Menu 1No\n Why is A not real?",['because i believe','because is scientificly proven','dont know']
),function(value){
    switch(value){
        case 0: 
            op_selected=-1;
            return 'believe answer';
            break;
        case 1:
            op_selected=-1;
            return 'science answer';
            break;
        case 2:
            op_selected=-1;
            return 'dk answer';
            break;
        default: 
            op_selected=-1;
            return "init no answer";
    }
});
state_believe= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Ok you are a believer",['Press this option to continue...']
),function(value){
    if(value>=0){
        
        op_selected=-1;
        return "Final";
    }
    else{
        return "believe answer";
    }
});
state_science= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Ok you are a science guy",['Press this option to continue...']
),function(value){
    if(value>=0){
        
        op_selected=-1;
        return "Final";
    }
    else{
        return "science answer";
    }
});
state_dk= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Ok...",['Press this option to continue...']
),function(value){
    if(value>=0){
        
        op_selected=-1;
        return "Final";
    }
    else{
        return "dk answer";
    }
});
state_final= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"The End",['Press this option to continue...']),function(value){
    if(value>=0){
        
        op_selected=-1;
        return "initial";
    }
    else{
        return "Final";
    }
});
//insert created states in dictionary
states['initial']=state_initial;
states['init yes answer']=state_init_yes_anwser;
states['init no answer']=state_init_no_anwser;
states['believe answer']=state_believe;
states['Final']=state_final;
states['science answer']=state_science;
states['dk answer']=state_dk;
//start state machine
var actual_state=states['initial'];
var value=actual_state.run();
/*class A{
    constructor(f1,param){
        this.f=f1;
        this.param=param;
    }
    run(){
        this.f(this.param);
    }
}

bla=new A(function(value){alert("ola "+value);},'tiago');
bla.run();*/
window.requestAnimationFrame(Game);