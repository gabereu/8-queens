import DrawnableObject from "./DrawnableObject.js";

export interface LayerProperties {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    size: {
        width: number;
        height: number;
    }
}

class Layer {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;

    protected objectPooling: DrawnableObject[] = []

    protected interval?: number;

    constructor({
        canvas,
        context,
        size
    }: LayerProperties){
        this.canvas = canvas;
        this.context = context;

        canvas.width = size.width;
        canvas.height = size.height;
    }

    public includeDrawnableObject(object: DrawnableObject){
        this.objectPooling.push(object);
    }

    public render () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (const object of this.objectPooling) {
            object.draw({
                canvas: this.canvas,
                context: this.context,
            });
        }
    }

    public startRender(fps = 60): void {
        this.stopRender()
        const interval = setInterval(this.render.bind(this), 1000 / fps);

        this.interval = interval;
    }

    public stopRender(): void {
        clearInterval(this.interval);
    }

}

export default Layer;