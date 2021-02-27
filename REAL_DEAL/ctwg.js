//global functions
function getElement(id){
    return document.getElementById(id)
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
        this.input_el=getElement(input_id)
        this.button_el=getElement(button_id)
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


//Main
let textarea=new TextArea()
let user_input=new UserInput()

textarea.write("Ola Batatas\nOla Atum!")
let game=new StateMachine(state_machine,"start game")
game.start()