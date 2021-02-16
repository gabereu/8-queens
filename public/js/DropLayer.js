import Layer from "./Layer.js";
class DropLayer extends Layer {
    constructor({ canvas, context, size }, queen) {
        super({
            canvas,
            context,
            size: {
                width: size,
                height: size,
            }
        });
        this.queen = queen;
        queen.changeOrigin('center');
        this.includeDrawnableObject(queen);
        canvas.onmousemove = ({ offsetX, offsetY }) => {
            queen.moveTo(offsetX, offsetY);
        };
        canvas.onmouseleave = () => {
            queen.moveTo(0 - queen.size, 0);
        };
        canvas.style.cursor = 'none';
    }
    onMouseClick(fn) {
        this.canvas.onclick = fn;
    }
}
export default DropLayer;
