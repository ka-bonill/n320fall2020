//grabs title, little bar, and the column ids.
let title = document.getElementById("title"); 
let bar = document.getElementById("bar"); 
let cols = document.getElementsByClassName("col"); 

//used to make the title and bar appear when the page first starts. 
TweenMax.to(title, { duration: 5, opacity: 1}); 
TweenMax.to(bar, { duration: 5, opacity: 1});

//raises opacity of grid gallery when the page first starts. 
for(let i = 0; i < cols.length; i++)
{
    TweenLite.to(cols[i], { duration: 5, opacity: 1}); 
}

//gets ids for each individual box within gallery and changes border when hovered over. 
function changeLook(x)
{
    let box = document.getElementById(x); 
    TweenMax.to(box, 2, {border: 10, borderColor: "#0a1a3b"});
}

//exit animations makes all elements fade out if a gallery box is clicked. 
function fadeOut()
{
    TweenMax.to(title, { duration: 2, opacity: 0}); 
    TweenMax.to(bar, { duration: 2, opacity: 0});
    
    for(let i = 0; i < cols.length; i++)
    {
        TweenLite.to(cols[i], { duration: 5, opacity: 0}); 
    }

}