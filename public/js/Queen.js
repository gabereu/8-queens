class Queen {
    constructor(image, size) {
        this.image = image;
        this.size = size;
        this.position_x = 0;
        this.position_y = 0;
        this.origin = 'top-left';
    }
    draw({ context }) {
        let x = this.position_x;
        let y = this.position_y;
        if (this.origin === 'center') {
            x -= this.size / 2;
            y -= this.size / 2;
        }
        context.drawImage(this.image, x, y, this.size, this.size);
    }
    moveTo(x, y) {
        this.position_x = x;
        this.position_y = y;
    }
    changeOrigin(origin) {
        this.origin = origin;
    }
    static calcDomination(x, y, x_size = 8, y_size = 8) {
        const dominated = [];
        let dx = x;
        let dy = y;
        for (dx = 0; dx < x_size; dx++) {
            if (dx != x) {
                dominated.push([dx, y]);
            }
        }
        for (dy = 0; dy < y_size; dy++) {
            if (dy != y) {
                dominated.push([x, dy]);
            }
        }
        const min_left = Math.min(x, y);
        let left_x = x - min_left;
        let left_y = y - min_left;
        while (left_x < x_size && left_y < x_size) {
            if (left_x !== x && left_y !== y) {
                dominated.push([left_x, left_y]);
            }
            left_x++;
            left_y++;
        }
        let min_right = Math.min(x_size - x, y);
        let right_x = x + min_right;
        let right_y = y - min_right;
        while (right_x >= 0 && right_y < y_size) {
            if (right_x !== x && right_y !== y) {
                dominated.push([right_x, right_y]);
            }
            right_x--;
            right_y++;
        }
        return dominated;
    }
    static generator(image, size) {
        return () => new Queen(image, size);
    }
}
export default Queen;
