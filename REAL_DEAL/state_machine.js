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
let state_machine={
    "start game":new State("start game",()=>{
            textarea.write("Hi welcome to gladiator game!\nPress enter to start!")
        },()=>{
            if(user_input.input()!=null){
                user_input.input=null
                return "tell story"
            }
            else{
                return "start game"
            }
        }),
    "tell story":new State("tell story",()=>{
        textarea.write("This is the story of 3 gladiators who freed them selfs with the help of God from the evil emperor.\n Fight your way to your freedom and the freedom of the people ruled by the evil emperor!\nPress Enter to continue!")
    },
    ()=>{ 
        if(user_input.input()!=null){
            user_input.input=null
            return "game start"
        }else{
            return "tell story"
        }
    }),
    "game start":new State("game start",(characters)=>{
        displayCharacters(characters)
    },()=>{ 
        if(user_input.input()!=null){
            user_input.input=null
            return "select action"
        }else{
            return "game start"
        }
    }),
    "select action":new State("select action",(characters)=>{
        selectAction(characters)
    },()=>{ 
        if(user_input.input()!=null){
            return "select action"
        }else{
            return "game start"
        }
    })
}