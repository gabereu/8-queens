import Queen from "./Queen.js";
import Util from "./Util.js";
class QueensGrid {
    constructor({ canvasSize }) {
        const grid = Util.createGrid(8, 8, 'empty');
        this.grid = grid;
        this.squareSize = canvasSize / 8;
    }
    draw(tools) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const item = this.grid[y][x];
                if (item instanceof Queen) {
                    item.moveTo(x * this.squareSize, y * this.squareSize);
                    item.draw(tools);
                }
            }
        }
    }
}
export default QueensGrid;
