export default class Tile{
    #tileElement
    #tileColors
    #x
    #y
    #value 

    constructor(tileContainer, value = Math.random() > .8 ? 4 : 2 ){
        this.#tileColors = {2: [238, 228, 218] , 4: [238, 225, 201] , 8: [243, 178, 122] , 16:[246, 150, 100] , 32:[247, 124, 95], 64:[237, 95, 59], 128:[237, 208, 115], 256:[237, 208, 115], 512:[237, 201, 80], 1024:[237, 197, 63], 2048:[235, 194, 46]}
        this.#tileElement = document.createElement("div")
        this.#tileElement.classList.add("tile")
        tileContainer.append(this.#tileElement)
        this.value = value
    }
    set value(v){
        this.#value = v
        this.#tileElement.textContent = v
        const rgbValues = this.#tileColors[v]
        if(v > 2048){
            this.#tileElement.style.setProperty("--bColor" , "rgb(61, 58, 51)")
        }else{
            this.#tileElement.style.setProperty("--bColor" , `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`)
        }
        
        if(v == 4 || v == 2){
            this.#tileElement.style.setProperty("--color" , "rgb(119, 110, 101)")
        }else{
            this.#tileElement.style.setProperty("--color" , "rgb(249, 246, 242)")
        }
    }
    
    set x(value){
        this.#x = value
        this.#tileElement.style.setProperty("--x", value)
    }
    set y(value){
        this.#y = value
        this.#tileElement.style.setProperty("--y", value)
    }

    get colors(){
        return this.#tileColors
    }

    get value(){
        return this.#value
    }

    remove(){
        this.#tileElement.remove()
    }

    playAnimation(animation = false){
        return new Promise(resolve => {
            this.#tileElement.addEventListener(animation ? "animationend" :  "transitionend" , resolve , 
            {once : true,})
        })
    }
}
