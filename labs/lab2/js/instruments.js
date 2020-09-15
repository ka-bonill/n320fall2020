class Instrument{
    constructor(family, playV, loudness)
    {
        this.family = family;
        this.playV = playV;
        this.loudness = loudness;
    }

    play()
    {
        console.log(this.family + " " + this.playV + " at " + this.loudness); 
    }

}

class Woodwind extends Instrument{
    constructor(loudness)
    {
        super("Clarinet", "hoots", loudness); 
    }
}

class Percussion extends Instrument{
    constructor(loudness)
    {
        super("Chimes","jingle", loudness); 
    }
}

class Strings extends Instrument{
    constructor(loudness)
    {
        super("Violin", "screeches", loudness); 
    }
}

let instruments = []; 
instruments[0] = new Woodwind(400);
instruments[1] = new Percussion(300); 
instruments[2] = new Strings(410); 

instruments.forEach((instrum) => {
    instrum.play(); 
})