import Queen from "./Queen.js";
import Util from "./Util.js";
class QueensGrid {
    constructor({ canvasSize }, createQueen) {
        this.createQueen = createQueen;
        this.queenCount = 0;
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
                else if (item === 'blocked') {
                    tools.context.fillStyle = 'rgba(255, 0, 0, .2)';
                    tools.context.fillRect(x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);
                }
            }
        }
    }
    clickIn(x, y) {
        if (this.grid[y][x] === 'empty') {
            this.queenCount++;
            const queen = this.createQueen();
            this.grid[y][x] = queen;
            const dominated = Queen.calcDomination(x, y, 8, 8);
            for (const [dx, dy] of dominated) {
                this.grid[dy][dx] = 'blocked';
            }
        }
        else if (this.grid[y][x] instanceof Queen) {
            this.queenCount--;
            this.grid[y][x] = 'blocked';
            this.clearBlocked();
            this.fillBlocked();
        }
    }
    clearBlocked() {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.grid[y][x] === 'blocked') {
                    this.grid[y][x] = 'empty';
                }
            }
        }
    }
    fillBlocked() {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.grid[y][x] instanceof Queen) {
                    const dominated = Queen.calcDomination(x, y, 8, 8);
                    for (const [dx, dy] of dominated) {
                        this.grid[dy][dx] = 'blocked';
                    }
                }
            }
        }
    }
    tryToComplete() {
        const queensQuantity = this.queenCount;
        if (queensQuantity === 8) {
            alert('Já tá completo!');
            return true;
        }
        const virtualGrid = this.getVirtualGrid();
        const complete = this.tryPositionNewQueen(queensQuantity, virtualGrid);
        if (complete) {
            for (const [line_number, line] of complete.entries()) {
                for (const [column_number, item] of line.entries()) {
                    if (item === 'queen') {
                        this.grid[line_number][column_number] = this.createQueen();
                    }
                    else {
                        this.grid[line_number][column_number] = item;
                    }
                }
            }
            this.queenCount = 8;
            return true;
        }
        return false;
    }
    tryPositionNewQueen(queensQuantity, virtualGrid) {
        let grid = Util.copyGrid(virtualGrid);
        for (const [line_number, line] of grid.entries()) {
            for (const [column_number, item] of line.entries()) {
                if (grid[line_number][column_number] === 'empty') {
                    const copyGrid = Util.copyGrid(grid);
                    grid[line_number][column_number] = 'queen';
                    const domination = Queen.calcDomination(column_number, line_number);
                    for (const [x, y] of domination) {
                        grid[y][x] = 'blocked';
                    }
                    if (queensQuantity + 1 === 8) {
                        return grid;
                    }
                    const completeGrid = this.tryPositionNewQueen(queensQuantity + 1, grid);
                    if (completeGrid)
                        return completeGrid;
                    grid = copyGrid;
                }
            }
        }
        return null;
    }
    getVirtualGrid() {
        const grid = this.grid;
        const virtualgrid = Util.createGrid(8, 8, 'empty');
        for (const [line_number, line] of grid.entries()) {
            for (const [column_number, item] of line.entries()) {
                virtualgrid[line_number][column_number] = item instanceof Queen ? 'queen' : item;
            }
        }
        return virtualgrid;
    }
    clear() {
        for (const [line_number, line] of this.grid.entries()) {
            for (const column of line.keys()) {
                this.grid[line_number][column] = 'empty';
            }
        }
        this.queenCount = 0;
    }
}
export default QueensGrid;
