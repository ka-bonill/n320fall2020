let dropTracker = []; 

class rainDrop 
{
    constructor(rx, ry, rd)
    {
        this.x = rx; 
        this.y = ry;
        this.d = rd;  
        this.r = Math.random() * 255; 
        this.g = Math.random() * 255;
        this.b = Math.random() * 255; 
        this.speed = Math.random() * 1.5 + 0.8; 
    }

    move()
    {
        this.y = this.y + this.speed;  
        fill(this.r, this.g, this.b); 
        circle(this.x, this.y, this.d); 
    }

    checkY()
    {
        if (this.y > 480)
        {
            fill(0); 
            circle(this.x, this.y, this.d);
        }
        else
        {
            this.move(); 
        }
    }
}

let end = Math.random() * 500; 

for (let i = 0; i < end; i++)
{
    rainName = "rain" + String(i); 
    rainName = new rainDrop(Math.random() * 1000, 0, 3); 
    dropTracker.push(rainName); 
}
console.log(dropTracker);
class Ground
{
    constructor(gx, gy, gw, gh, gr, gg, gb)
    {
        this.x = gx; 
        this.y = gy; 
        this.w = gw; 
        this.h = gh;
        this.r = gr; 
        this.g = gg; 
        this.b = gb;   
    }

    adjustColor()
    {
        let rainCount = 0; 
        for (let i = 0; i < dropTracker.length; i++)
        {
            let rainY = dropTracker.map(i => i.y)
            
            if(rainY >= 480)
            {
                rainCount += 1; 
                let numLoop = rainCount % 10; 

                if(numLoop == 0)
                {
                    this.r = this.r + 80; 
                    this.b = this.b + 80; 
                }
                else
                {
                    console.log("no changes."); 
                }
            }

        }
    } 
    display()
    {
        fill(this.r, this.g, this.b); 
        rect(this.x, this.y, this.w, this.h); 
    } 
}


var ground = new Ground(0, 480, 1550, 20, 128, 149, 255); 

function setup()
{
    createCanvas(1000, 500); 
}

function draw()
{
    background(0); 

    for(let i = 0; i < dropTracker.length; i++)
    {
        dropTracker[i].checkY();
    }

    ground.adjustColor();
    ground.display();

}

