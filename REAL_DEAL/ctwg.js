//global functions
function getElement(id){
    return document.getElementById(id)
}
//State class
class State{
    
    
    constructor(state_id,action,next_state){
        this.state_id=state_id
        this.action=action
        this.next_state=next_state;
        
    }

    id=()=>{
        return this.state_id
    }
    play=()=>{
        this.action()
    }
    next=()=>{
        return this.next_state()
    }
}
class TextArea{
    constructor(text_area_id="textarea"){
        this.text_element=getElement(text_area_id)
    }
    clean=()=>{
        this.text_element.innerHTML=""
    }
    write=(text)=>{
        this.text_element.innerHTML=text
    }
    append=(text)=>{
        this.text_element.innerHTML+=text
    }
}
class UserInput{
    constructor(input_id="input",button_id="select"){
        this.input_el=getElement("input")
        this.button_el=getElement("select")
        this.user_input=null
        
        //events
        document.addEventListener("keypress",this.keypress);
        this.button_el.addEventListener("click",this.select)

        //binds
    }
    keypress=(event)=>{
        if(event.key.localeCompare("Enter")==0){
            this.select();
        }
    }
    select=()=>{
        this.user_input=this.input_el.value
    }
    input=()=>{
        return this.user_input
    }
}
//State Machine Class
class StateMachine{
    constructor(state_machine,initial_state){
        this.state=initial_state
        this.state_machine=state_machine
    }
    execute=(state)=>{
        state_machine[state].play()
        this.state=state_machine[state].next()
    }
    start=()=>{
        requestAnimationFrame(this.run)
    }
    run=()=>{
        this.execute(this.state)
        requestAnimationFrame(this.run)
    }
}


//Main
let textarea=new TextArea()
let user_input=new UserInput()
let state_machine={
    "ola":new State("ola",()=>{
            textarea.write("Ola Mundo\n1. d - adeus\n2. w - wierd")
        },()=>{
            if(user_input.input()=="d"){
                return "adeus"
            }
            if(user_input.input()=="w"){
                return "wierd"
            }else{
                return "ola"
            }
        }),
    "adeus":new State("adeus",()=>{textarea.write("Adeus Mundo")},()=>{ 
        if(user_input.input()=="e"){
            return "ola"
        }else{
            return "adeus"
        }
    }),
    "wierd":new State("wierd",()=>{textarea.write("/&%$###$%&")},()=>{ 
        if(user_input.input()=="o"){
            return "ola"
        }else{
            return "wierd"
        }
    })
}
textarea.write("Ola Batatas\nOla Atum!")
let game=new StateMachine(state_machine,"ola")
game.start()