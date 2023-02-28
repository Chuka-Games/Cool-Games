const twoByTwo = document.getElementById("2-2")
const fourByFour = document.getElementById("4-4")
const eightByEight = document.getElementById("8-8")

let mode = 4

let gs, gp, bw, bh, fs
if (mode == 4){
    gs = 4 , gp = 15 , bw = 107.5 , bh = 106.25, fs = 49
}else if(mode == 2){
    gs = 2 , gp = 15 , bw = 227.5 , bh = 225, fs = 98
}else if(mode == 8){
    gs = 8 , gp = 10 , bw = 51.9 , bh = 50, fs = 24.5
}

let gridSize = gs
let gridGap = gp
let boxWidth = bw
let boxHeight = bh
let fontSize = fs

//Values  will change depending on cerntain conditions 
//8x8  gridSize: 8      gridGap: 10     boxHeight: 50px        boxWidth: 51.9px
//4x4  gridSize: 4      gridGap: 15     boxHeight: 106.25px    boxWidth: 107.5px
//2x2  gridSize: 2      gridGap: 15     boxHeight: 225px       boxWidth: 227.5px

export default class Grid{
    #boxes
    constructor(grid){
        grid.style.setProperty('--gridSize' , gridSize)
        grid.style.setProperty('--gridGap' , `${gridGap}px`)      
        grid.style.setProperty('--boxWidth', `${boxWidth}px`)
        grid.style.setProperty('--boxHeight', `${boxHeight}px`)
        grid.style.setProperty('--letterSize', `${fontSize}px`)
        this.#boxes = createBoxes(grid).map((element , index) => {
            return new Box(element , index % gridSize , Math.floor(index / gridSize)) 
        })
        //console.log(this.#boxes)
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

    randomEmptyBox(){
        let randomIndex = Math.floor(Math.random()  * this.#emptyBoxes.length)
        return this.#emptyBoxes[randomIndex]
    }

}
//test check
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
}

function createBoxes(grid){
    const boxes = []
    for(let i = 0; i < gridSize * gridSize; i++){
        let box = document.createElement("div")
        box.classList.add("box")
        boxes.push(box)
        grid.append(box)
    }
    return boxes
}