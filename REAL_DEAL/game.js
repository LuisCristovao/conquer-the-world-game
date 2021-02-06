class characterState{
    constructor(health=1,attack=1,defence=1,speed=1,fire_resources=1,wind_resurces=1,water_resources=1,earth_resources=1,effects={}){
        this.health=health
        this.attack=attack
        this.defence=defence
        this.speed=speed
        this.fire_resources=fire_resources
        this.wind_resurces=wind_resurces
        this.water_resources=water_resources
        this.earth_resources=earth_resources
        this.effects=effects
    }
}
class character{
    constructor(name,actual_state,hero){
        this.name=name
        //if the character is hero or enemy
        this.hero=hero
        this.actual_state=actual_state
        this.next_state=actual_state
        this.turn_actions={}
    }
}

function selectCharacterActions(characters){
    for(character_name in characters){
        let character=characters[character_name]
        
    }
}