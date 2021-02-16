class Util {
    static loadAsyncImage(path) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = path;
        });
    }
    static createCanvas() {
        const canvas = document.createElement('canvas');
        // document.body.append(canvas);
        const container = document.querySelector('#canvas_container');
        container === null || container === void 0 ? void 0 : container.append(canvas);
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Can not get contex');
        }
        return [canvas, context];
    }
    static createGrid(lines, columns, value) {
        const grid = Array.from(Array(lines), () => new Array(columns).fill(value));
        return grid;
    }
    static copyGrid(grid) {
        const newGrid = Array.from(grid).map(line => Array.from(line));
        return newGrid;
    }
}
export default Util;
