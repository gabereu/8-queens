import Queen from "./Queen.js";

class Util {
    public static loadAsyncImage (path: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            
            image.onload = () => resolve(image);
            image.onerror = reject
            image.src = path;
        });
    }

    public static createCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
        const canvas = document.createElement('canvas');
        // document.body.append(canvas);

        const container = document.querySelector('#canvas_container')

        container?.append(canvas)

        const context = canvas.getContext('2d');

        if(!context) {
            throw new Error('Can not get contex')
        }

        return [ canvas, context ]
    }

    public static createGrid<T>(lines: number, columns: number, value: T): T[][] {
        const grid = Array.from(Array(lines), () => new Array(columns).fill(value))
        return grid;
    }

    public static copyGrid<T>(grid: T[][]): T[][]{
        const newGrid = Array.from(grid).map(line => Array.from(line));
        return newGrid;
    }

}

export default Util;