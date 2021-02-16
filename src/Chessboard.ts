import Layer from "./Layer.js";
import Squares from "./Squares.js";

interface ChessboardProperties {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    size: number;
}

class Chessboard extends Layer {

    private size: number;
    
    constructor({canvas, context, size}: ChessboardProperties){
        super({
            canvas, 
            context,
            size: {
                width: size,
                height: size,
            }
        });

        this.size = size;

        const squares = new Squares({
            square_size: size / 8,
        });

        this.includeDrawnableObject(squares);
    }
}

export default Chessboard;