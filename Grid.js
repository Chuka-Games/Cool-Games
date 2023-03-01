
const score = document.querySelector(".bot_sc")





//let mode = 4
let gs, gp, bw, bh, fs

// function changeGameBoard(mode){
//     if (mode == 4){
//         gs = 4 , gp = 15 , bw = 107.5 , bh = 106.25, fs = 49
//     }else if(mode == 2){
//         gs = 2 , gp = 15 , bw = 229.99 , bh = 227.48, fs = 98
//     }else if(mode == 8){
//         gs = 8 , gp = 10 , bw = 51.9 , bh = 50, fs = 24.5
//     }
// }

// changeGameBoard(4)
// let gridSize = gs
// let gridGap = gp
// let boxWidth = bw
// let boxHeight = bh
// let fontSize = fs

//Values  will change depending on cerntain conditions 
//8x8  gridSize: 8      gridGap: 10     boxHeight: 50px        boxWidth: 51.9px
//4x4  gridSize: 4      gridGap: 15     boxHeight: 106.25px    boxWidth: 107.5px
//2x2  gridSize: 2      gridGap: 15     boxHeight: 225px       boxWidth: 227.5px

export default class Grid{
    #boxes
    
    constructor(grid , mode){
        if (mode == 2){
            grid.style.setProperty('--gridSize' , 2)
            grid.style.setProperty('--gridGap' , `${15}px`)      
            grid.style.setProperty('--boxWidth', `${227.25}px`)
            grid.style.setProperty('--boxHeight', `${225}px`)
            grid.style.setProperty('--letterSize', `${98}px`)
        }else if(mode == 4){
            grid.style.setProperty('--gridSize' , 4)
            grid.style.setProperty('--gridGap' , `${15}px`)      
            grid.style.setProperty('--boxWidth', `${107.5}px`)
            grid.style.setProperty('--boxHeight', `${106.25 }px`)
            grid.style.setProperty('--letterSize', `${49}px`)
        }else if(mode == 8){
            grid.style.setProperty('--gridSize' , 8)
            grid.style.setProperty('--gridGap' , `${10}px`)      
            grid.style.setProperty('--boxWidth', `${51.9}px`)
            grid.style.setProperty('--boxHeight', `${50}px`)
            grid.style.setProperty('--letterSize', `${24.5}px`)
        }
        
        // grid.style.setProperty('--gridSize' , gridSize)
        // grid.style.setProperty('--gridGap' , `${gridGap}px`)      
        // grid.style.setProperty('--boxWidth', `${boxWidth}px`)
        // grid.style.setProperty('--boxHeight', `${boxHeight}px`)
        // grid.style.setProperty('--letterSize', `${fontSize}px`)

        // this.#boxes = createBoxes(grid).map((element , index) => {
        //     return new Box(element , index % gridSize , Math.floor(index / gridSize)) 
        // })
        this.#boxes = createBoxes(grid , mode).map((element , index) => {
                return new Box(element , index % mode , Math.floor(index / mode)) 
        })
    }
    get Columns(){
        return this.#boxes.reduce((Grid, box) => {
            Grid[box.x] = Grid[box.x] || []
            Grid[box.x][box.y] = box
            return Grid 
        }, [])  
    }

    get Rows(){
        return this.#boxes.reduce((Grid, box) => {
            Grid[box.y] = Grid[box.y] || []
            Grid[box.y][box.x] = box
            return Grid 
        }, [])  
    }

    get #emptyBoxes(){
        return this.#boxes.filter(box => box.tile == null)
    }

    get boxes(){
        return this.#boxes
    }

    randomEmptyBox(){
        let randomIndex = Math.floor(Math.random()  * this.#emptyBoxes.length)
        return this.#emptyBoxes[randomIndex]
    }

}

class Box{
    #element
    #x
    #y
    #tile
    #mergeTile
    constructor(element, x, y){
        this.#element = element
        this.#x = x
        this.#y = y
    }

    get tile(){
        return this.#tile
    }

    set tile(value){
        this.#tile = value
        if(value == null){
            return
        }
        this.#tile.x = this.#x
        this.#tile.y = this.#y
    }

    get x(){
        return this.#x
    }

    get y(){
        return this.#y
    }

    set mergeTile(value){
        this.#mergeTile = value
        if(value == null){ return }
        this.#mergeTile.x = this.#x
        this.#mergeTile.y = this.#y 
    }
    get mergeTile(){
        return this.#mergeTile
    }

    canAccept(currTile){
        return (this.tile == null || (this.mergeTile == null && this.tile.value == currTile.value))
    }

    mergeTiles(){
        if(this.tile == null || this.mergeTile == null){ return }
        this.tile.value *= 2
        this.mergeTile.remove()
        this.mergeTile = null
        score.innerText = Number(score.textContent) +  this.tile.value 
    }

}

function createBoxes(grid, gridSize){
    const boxes = []
    for(let i = 0; i < gridSize * gridSize; i++){
        let box = document.createElement("div")
        box.classList.add("box")
        boxes.push(box)
        grid.append(box)
    }
    return boxes
}