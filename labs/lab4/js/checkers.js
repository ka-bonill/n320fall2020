//grabs id of first red piece. When clicked it will go to the movePiece function
let rpiece1 = document.getElementById("rpiece1");

rpiece1.addEventListener("click", movePiece);

//moves red piece down
function movePiece(event)
{
    let rpiece1y = Number(event.target.getAttribute("cy"));
    rpiece1y = rpiece1y - 10; 
    rpiece1.setAttribute("cy", rpiece1y);  
    
    let rpiece1x = Number(event.target.getAttribute("cx"));
    rpiece1x = rpiece1x - 4; 
    rpiece1.setAttribute("cx", rpiece1x);  
}

//grabs other red pieces by id
let rpiece2 = document.getElementById("rpiece2");
let rpiece3 = document.getElementById("rpiece3");
let rpiece4 = document.getElementById("rpiece4");
let rpiece5 = document.getElementById("rpiece5");
let rpiece6 = document.getElementById("rpiece6");
let rpiece7 = document.getElementById("rpiece7");
let rpiece8 = document.getElementById("rpiece8");
let rpiece9 = document.getElementById("rpiece9");
let rpiece10 = document.getElementById("rpiece10");
let rpiece11 = document.getElementById("rpiece11");
let rpiece12 = document.getElementById("rpiece12");

//grabs black pieces by id
let bpiece1 = document.getElementById("bpiece1");
let bpiece2 = document.getElementById("bpiece2");
let bpiece3 = document.getElementById("bpiece3");
let bpiece4 = document.getElementById("bpiece4");
let bpiece5 = document.getElementById("bpiece5");
let bpiece6 = document.getElementById("bpiece6");
let bpiece7 = document.getElementById("bpiece7");
let bpiece8 = document.getElementById("bpiece8");
let bpiece9 = document.getElementById("bpiece9");
let bpiece10 = document.getElementById("bpiece10");
let bpiece11 = document.getElementById("bpiece11");
let bpiece12 = document.getElementById("bpiece12");