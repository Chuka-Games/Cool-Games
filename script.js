import Tile from './Tile.js'
import Grid from './Grid.js'
////////////////////
///// Variables
///////////////////


const grid = document.querySelector(".grid")
const gameboard = new Grid(grid)
gameboard.randomEmptyBox().tile = new Tile(grid)
gameboard.randomEmptyBox().tile = new Tile(grid)

//console.log(gameboard.randomEmptyBox())


////////////////////
///// Functions 
///////////////////


function setupInput(){
    window.addEventListener("keydown" , handleInput, {once: true})
}//This will make the event listener run once and stop to allow the animation to run 

setupInput()

function handleInput(event){
    switch(event.key){
        case "ArrowUp":
            IsUp()
            break
        case "ArrowDown":
            IsDown()
            break
        case "ArrowLeft":
            IsLeft()
            break
        case "ArrowRight":
            IsRight()
            break
        default:
            setupInput()
            return                  
    }

}

function slideBoxes(boxes){
    boxes.forEach(array => {
        for(let i = 1; i < array.length; i++){
            let box = array[i]
            if(box.tile == null){
                continue
            }
            let validTile
            for(let j = i - 1; j >= 0 ; j--){
                let moveToCell = array[j]
                if(!moveToCell.canAccept(box.tile)){
                    break
                }
                validTile = moveToCell
            }
            if(validTile != null){
                if(validTile.tile != null){
                    validTile.mergeTile = box.tile
                }else{
                    validTile.tile = box.tile
                }
                box.tile = null
            }
        }
    });
}

function IsUp(){
    return slideBoxes(gameboard.Columns)
}

function IsLeft(){
    return slideBoxes(gameboard.Rows)
}

function IsDown(){
    return slideBoxes(gameboard.Columns.map(x => [...x].reverse()))
}

function IsRight(){
    return slideBoxes(gameboard.Rows.map(x => [...x].reverse()))
}   





// twoByTwo.addEventListener("click" , function(){
//     // console.log(document.querySelector(".grid").innerHTML)
//     boardChange(2)
// })

// fourByFour.addEventListener("click" , function(){
//     boardChange(4)
// })

// eightByEight.addEventListener("click" , function(){
//     boardChange(8)
// })