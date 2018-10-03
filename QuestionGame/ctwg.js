//Initializations_______________________________________
var textarea=document.getElementById('textarea');
textarea.innerHTML="Ola";
document.addEventListener("keypress",Keypress);

var input=document.getElementById('input');
var select=document.getElementById('select');
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
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                 allText= rawFile.responseText;
                //alert(allText);

            }
        }
    }
    rawFile.send(null);
    return allText;
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
    constructor(action,next_state,question_json){
        this.action=action;
        this.next=next_state;
        this.question_json=question_json;
    }
    run(){
        return this.next(this.action.run(),this.question_json);
    }
}

function ChooseOption(value_,question_json){
    if(value_>0 && value_<question_json.next.length){
        op_selected=-1;
        return question_json.next[value_];
    }
    //if not avaiable option
    else{
        op_selected=-1;
        return question_json.state;
    }
    
}


//Main____________________________________
function CreateStates(){
    questions=JSON.parse(readTextFile("states.json"));
    questions.forEach(function(question_json){
        
        states[question_json.state]=new State(new ActionMenu(function(question,options){return Menu(question,options);},question_json.question,question_json.choices),
            function(value_,question_json){
                if(value_>=0 && value_<question_json.next.length){
                    op_selected=-1;
                    return question_json.next[value_];
                }
                //if not avaiable option
                else{
                    op_selected=-1;
                    return question_json.state;
                }
            },
            question_json);                                 
             
    });
}




//Create States------------------
/*state_question= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Menu Initial\n Question is A real?",['yes','no','dont know']
),function(value_){
    switch(value_){
        case 0: 
            op_selected=-1;
            return 'right';
            
            break;
        case 1:
            op_selected=-1;
            return 'wrong';            
            break;
        case 2: 
            op_selected=-1;
            return 'wrong';            
            break;
        default:
            op_selected=-1;
            return "question";
    }
});
state_right= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Selected the right choice",['press to continue...']
),function(value_){
    if(value_>=0){
        op_selected=-1;
        return 'question';
    }
    else{
        op_selected=-1;
        return 'right';
    }
});
state_wrong= new State(new ActionMenu(function(question,options){return Menu(question,options);},
"Selected the wrong choice",['press to continue...']
),function(value_){
    if(value_>=0){
        op_selected=-1;
        return 'question';
    }
    else{
        op_selected=-1;
        return 'wrong';
    }
});
states['question']=state_question;
states['right']=state_right;
states['wrong']=state_wrong;*/
CreateStates();
var actual_state=states['question'];
var state_value=actual_state.run();

window.requestAnimationFrame(Game);
function Game() {
    

    if(state_value!=null){
        console.log(state_value);
        textarea.innerHTML="";
        actual_state=states[state_value];
        state_value=actual_state.run();
    }
    //console.log(op_selected);
    window.requestAnimationFrame(Game);
}


//hi=JSON.parse(readTextFile("states.json"));
//console.log(hi[1].state);


