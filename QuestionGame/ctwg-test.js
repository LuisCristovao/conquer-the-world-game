/*
//Exemple
function Menu(question,options){
    this.question=question
    this.options=options
    
    this.Print= function(){
        alert(this.question+" "+this.options[0]);
        
    }
}
*/
function Keypress(event){
        //console.log(event.key);
        state_machine.keyInput=event.key;
        if(event.key.localeCompare("Enter")==0){
            Select();
        }
    }

function Select(){
        state_machine.op_selected=state_machine.input.value;
        state_machine.input.value='';
    }

//Classes
//---------------------------
class Action{
    
    constructor(func_){
        this.func=func_;
        
    }
    run(){
        return this.func();
    }
}
class State{
        constructor(action,next_state,question_json){
            this.action=action;
            this.next=next_state;
            
        }
        run(){
            return this.next(this.action.run());
        }
}

//State Machine class
/*class StateMachine{
    
    
    constructor(textarea_id,input_id, initial_state,jsonfile){
        this.textarea=document.getElementById(textarea_id);
        this.input=document.getElementById(input_id);
        this.keyInput;
        this.states={};
        this.op_selected=-1;
        
        
        
        //bind functions variables to this class
        this.Menu=this.Menu.bind(this);
        this.DetermineState=this.DetermineState.bind(this);
        this.ChooseOption=this.ChooseOption.bind(this);
        
        
        
        this.CreateStates(jsonfile);
        this.actual_state=this.states[initial_state];
        this.state_value=this.actual_state.run();
        
    }
    
    
    

    readTextFile(file)
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
    Menu(question,options)=function{
        this.op_selected=parseInt(this.op_selected);
        this.textarea.innerHTML=question+'\n';
        for(var i=0;i<options.length;i++){
            var op=options[i];
            this.textarea.innerHTML+=i.toString()+'. '+op+'\n';
        }
        this.textarea.innerHTML+="Choose option: \n";
        if(this.op_selected>=0 && this.op_selected<options.length ){
            this.textarea.innerHTML+=this.op_selected+'\n';
            this.textarea.innerHTML+='Valid Input, Go to next menu...';
            return this.op_selected;
        }
        else{
            //textarea.innerHTML+='Invalid Input\n';
            //setTimeout(function(){},1000);
            return -1;
        }
    }
    
    ChooseOption(value_,question_json){
        if(value_>=0 && value_<question_json.next.length){
            this.op_selected=-1;
            return question_json.next[value_];
        }
        //if not avaiable option
        else{
            this.op_selected=-1;
            return question_json.state;
        }
    
    }
    CreateStates(jsonfile){
        var questions=JSON.parse(this.readTextFile(jsonfile));
        
        for(var i=0;i < questions.length;i++){
            var question_json=questions[i];
            var menu=new this.Menu(question_json.question,question_json.choices);
            this.states[question_json.state]=new State(new ActionMenu(this.Menu,question_json.question,question_json.choices),this.ChooseOption,question_json);
            
        }
        
    }
    DetermineState(){
        if(this.state_value!=null){
            console.log(this.state_value);
            
            this.textarea.innerHTML="";
            this.actual_state=this.states[this.state_value];
            this.state_value=this.actual_state.run();
            
        }
        //console.log(op_selected);
        window.requestAnimationFrame(this.DetermineState);
    }
    
    RunMachine(initial_state,jsonfile){
        window.requestAnimationFrame(this.DetermineState);
    }

    Print(){
        this.textarea.innerHTML=this.op_selected;
    }

}
//-----------Main-------------------

document.getElementById("select").addEventListener("click",Select);
document.addEventListener("keypress",this.Keypress);

state_machine=new StateMachine('textarea','input','1','states2.json');
//state_machine.Print();
state_machine.RunMachine();*/

function Ola(greeeting,name){
    this.name=name;
    
    this.Run.bind(this);
    this.Run = function(){
        alert(this.greeting+" "+this.name);
    }
    
}
action=new Ola('Hi','Tiago');
action=new Action(action.Run);
state=new State(action,function(){return "End!";});
console.log(state.run());