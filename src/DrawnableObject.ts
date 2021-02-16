export interface drawProperties {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}
export default interface DrawnableObject {
    draw(properties: drawProperties): void
}