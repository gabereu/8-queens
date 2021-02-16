import Layer from "./Layer.js";
import Squares from "./Squares.js";
class Chessboard extends Layer {
    constructor({ canvas, context, size }) {
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
