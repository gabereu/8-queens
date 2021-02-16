class Squares {
    constructor({ square_size }) {
        this.square_size = square_size;
    }
    draw({ context }) {
        const light_color = 'rgb(150, 150, 150)';
        const dark_color = 'rgba(0, 0, 0, .5)';
        for (let line = 0; line < 8; line++) {
            for (let column = 0; column < 8; column++) {
                context.fillStyle = (line + column) % 2 === 0 ? light_color : dark_color;
                const x = column * this.square_size;
                const y = line * this.square_size;
                context.fillRect(x, y, this.square_size, this.square_size);
            }
        }
    }
}
export default Squares;
