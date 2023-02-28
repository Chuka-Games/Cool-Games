import Tile from './Tile.js'
import Grid from './Grid.js'
////////////////////
///// Variables
///////////////////


const grid = document.querySelector(".grid")
const gameboard = new Grid(grid)
console.log(gameboard.randomEmptyBox())

gameboard.randomEmptyBox().tile = new Tile(grid)
gameboard.randomEmptyBox().tile = new Tile(grid)

////////////////////
///// Functions 
///////////////////

function setupInput(){
    window.addEventListener("keydown" , handleInput)
}

function Initial(){
    
}

function IsUp(){

}

function IsDown(){

}

function IsLeft(){

}   

function IsRight(){

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