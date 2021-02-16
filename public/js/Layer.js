class Layer {
    constructor({ canvas, context, size }) {
        this.objectPooling = [];
        this.canvas = canvas;
        this.context = context;
        canvas.width = size.width;
        canvas.height = size.height;
    }
    includeDrawnableObject(object) {
        this.objectPooling.push(object);
    }
    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const object of this.objectPooling) {
            object.draw({
                canvas: this.canvas,
                context: this.context,
            });
        }
    }
    startRender(fps = 60) {
        this.stopRender();
        const interval = setInterval(this.render.bind(this), 1000 / fps);
        this.interval = interval;
    }
    stopRender() {
        clearInterval(this.interval);
    }
}
export default Layer;
