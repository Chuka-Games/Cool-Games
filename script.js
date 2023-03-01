import Tile from './Tile.js'
import Grid from './Grid.js'
////////////////////
///// Variables
///////////////////

let mode = 4

const grid = document.querySelector(".grid")
let gameboard = new Grid(grid , mode)
gameboard.randomEmptyBox().tile = new Tile(grid)
gameboard.randomEmptyBox().tile = new Tile(grid)

const twoByTwo = document.getElementById("2-2")
const fourByFour = document.getElementById("4-4")
const eightByEight = document.getElementById("8-8")
const score = document.querySelector(".bot_sc")

////////////////////
///// Functions 
///////////////////

window.addEventListener("keydown" , function(event){
    if(event.keyCode == 32){
        grid.innerHTML = ""
        score.innerText = "0"
        gameboard = new Grid(grid , mode)
        gameboard.randomEmptyBox().tile = new Tile(grid)
        gameboard.randomEmptyBox().tile = new Tile(grid)
    }
    
})

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


twoByTwo.addEventListener("click", function(){
    grid.innerHTML = ""
    score.innerText = "0"
    mode = 2
    gameboard = new Grid(grid , mode)
    gameboard.randomEmptyBox().tile = new Tile(grid)
    gameboard.randomEmptyBox().tile = new Tile(grid)
    
})
fourByFour.addEventListener("click", function(){
    grid.innerHTML = ""
    score.innerText = "0"
    mode = 4
    gameboard = new Grid(grid , mode)
    gameboard.randomEmptyBox().tile = new Tile(grid)
    gameboard.randomEmptyBox().tile = new Tile(grid)
})
eightByEight.addEventListener("click", function(){
    grid.innerHTML = ""
    score.innerText = "0"
    mode = 8
    gameboard = new Grid(grid , mode)
    gameboard.randomEmptyBox().tile = new Tile(grid)
    gameboard.randomEmptyBox().tile = new Tile(grid)
})

function setupInput(){
    window.addEventListener("keydown" , handleInput, {once: true})
}//This will make the event listener run once and stop to allow the animation to run 
//Note: {once: true} is malfunctioning, test it a little

setupInput()

async function handleInput(event){
    //console.log(event.key)
    switch(event.key){
        case "ArrowUp":
            if(!canMoveUp()){
                setupInput()
                return
            }
            await IsUp()
            break
        case "ArrowDown":
            if(!canMoveDown()){
                setupInput()
                return
            }
            await IsDown()
            break
        case "ArrowLeft":
            if(!canMoveLeft()){
                setupInput()
                return
            }
            await IsLeft()
            break
        case "ArrowRight":
            if(!canMoveRight()){
                setupInput()
                return
            }
            await IsRight()
            break
        default:
            setupInput()
            return                  
    }

    gameboard.boxes.forEach(x => x.mergeTiles())
    const newBox = new Tile(grid)
    gameboard.randomEmptyBox().tile = newBox

    if(!canMoveLeft() && !canMoveDown() && !canMoveRight() && !canMoveUp()){
        newBox.playAnimation(true).then(() =>{
            alert("You lose") 
        })
        return 
    }

    setupInput()
}

function slideBoxes(boxes){
    return Promise.all(
    boxes.flatMap(array => {
        const promises = []
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
                promises.push(box.tile.playAnimation())
                if(validTile.tile != null){
                    validTile.mergeTile = box.tile
                }else{
                    validTile.tile = box.tile
                }
                box.tile = null
            }
        }
        return promises 
    }))

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

function canMove(boxes){
    return boxes.some(group => {
        return group.some((box, index) => {
            if(index === 0){ return false }
            if (box.tile == null){return false}
            let moveTo = group[index - 1]
            return moveTo.canAccept(box.tile)
        })
    }) 
}

function canMoveUp(){
    return canMove(gameboard.Columns)
}

function canMoveDown(){
    return canMove(gameboard.Columns.map(x => [...x].reverse()))
}

function canMoveLeft(){
    return canMove(gameboard.Rows)
}

function canMoveRight(){
    return canMove(gameboard.Rows.map(x => [...x].reverse()))
}