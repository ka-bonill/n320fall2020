class VendingMachine {
    constructor(firstCandy, secondCandy, firstChips)
    {
        this.firstCandy = firstCandy; 
        this.secondCandy = secondCandy; 
        this.firstChips = firstChips; 
        this.fCandyStock = 10; 
        this.sCandyStock = 15; 
        this.chipStock = 8; 
    }

    render()
    {
        return `
            <div>
                <h3> Current Vending Machine Stock </h3>
                <p> Candy 1: ${this.firstCandy} </p>
                <p> Candy 1 Stock: ${this.fCandyStock} </p> 
                <p> Candy 2: ${this.secondCandy} </p>
                <p> Candy 2 Stock: ${this.sCandyStock} </p> 
                <p> Chips: ${this.firstChips} </p>
                <p> Chips Stock: ${this.chipStock} </p> 
            </div>
        `;
    }

    buyCandy1()
    {
        if(this.fCandyStock == 0)   
        {
            mainDiv.innerHTML = "This item is out of stock.";
        }
        else
        {
            this.fCandyStock--;
        }
    }

    buyCandy2()
    {
        if(this.sCandyStock == 0)
        {
            mainDiv.innerHTML = "This item is out of stock.";
        }
        else
        {
            this.sCandyStock --; 
        }
    }

    buyChips()
    {
        if(this.chipStock == 0)
        {
            mainDiv.innerHTML = "This item is out of stock. ";
        }
        else
        {
            this.chipStock--;
        }
    }
}
let vmachine = new VendingMachine("Hersheys Chocolate", "Skittles", "Cool Ranch Doritos");

let mainDiv = document.getElementById("main");
mainDiv.innerHTML = vmachine.render();


function buy()
{
    let choco = document.getElementById("chocolate"); 
    let skittles = document.getElementById("skittles"); 
    let doritos = document.getElementById("doritos"); 

    if(choco.clicked == true)
    {  
        vmachine.buyCandy1(); 
        vmachine.render(); 
    }
    else if(skittles.clicked == true )
    {
        vmachine.buyCandy2(); 
        vmachine.render(); 
    }
    else if(doritos.clicked == true)
    {
        vmachine.buyChips(); 
        vmachine.render(); 
    }

}