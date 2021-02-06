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
            return "adeus"
        }
    }),
    "game start":new State("game start",(characters)=>{
        displayCharacters(characters)
    },()=>{ 
        if(user_input.input()!=null){
            return "s"
        }else{
            return "wierd"
        }
    })
}