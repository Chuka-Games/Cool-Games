let tileColors = {2: [238, 228, 218] , 4: [238, 225, 201] , 8: [243, 178, 122] , 16:[246, 150, 100] , 32:[247, 124, 95], 64:[237, 95, 59], 128:[237, 208, 115], 256:[237, 208, 115], 512:[237, 201, 80], 1024:[237, 197, 63], 2048:[235, 194, 46]}
//This was what I was talking about earlier -Chuka

export default class Tile{
    #tileElement
    #x
    #y
    #value 

    constructor(tileContainer, value = Math.random() > .8 ? 2 : 4 ){
        this.#tileElement = document.createElement("div")
        this.#tileElement.classList.add("tile")
        tileContainer.append(this.#tileElement)
        this.value = value
    }
    set value(v){
        this.#value = v
        this.#tileElement.textContent = v

        //const power = Math.log2(v)
    }
    
    set x(value){
        this.#x = value
        this.#tileElement.style.setProperty("--x", value)
    }
    set y(value){
        this.#y = value
        this.#tileElement.style.setProperty("--y", value)
    }
}
