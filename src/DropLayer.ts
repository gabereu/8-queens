import Layer, { LayerProperties } from "./Layer.js";
import Queen from "./Queen.js";

interface DropLayerProperties {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    size: number;
}

class DropLayer extends Layer {

    constructor({canvas, context, size}: DropLayerProperties, private queen: Queen){
        super({
            canvas, 
            context,
            size: {
                width: size,
                height: size,
            }
        });

        queen.changeOrigin('center');

        this.includeDrawnableObject(queen);

        canvas.onmousemove = ({ offsetX, offsetY }) => {
            queen.moveTo(offsetX, offsetY);
        }

        canvas.onmouseleave = () => {
            queen.moveTo(0 - queen.size, 0);
        };

        canvas.style.cursor = 'none';
    }

    public onMouseClick(fn: GlobalEventHandlers['onclick']){
        this.canvas.onclick = fn;
    }
}

export default DropLayer;