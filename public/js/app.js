import Chessboard from "./Chessboard.js";
import DropLayer from "./DropLayer.js";
import Queen from "./Queen.js";
import QueensGrid from "./QueensGrid.js";
import Util from "./Util.js";
window.onload = async () => {
    const [chessboardCanvas, chessboardContext] = Util.createCanvas();
    const chessboard = new Chessboard({
        canvas: chessboardCanvas,
        context: chessboardContext,
        size: 600
    });
    chessboard.render();
    const queenImage = await Util.loadAsyncImage('/public/imagens/queen.png');
    const queenSize = 600 / 8;
    const queen = new Queen(queenImage, queenSize);
    const [dropLayerCanvas, dropLayerContext] = Util.createCanvas();
    const dropLayer = new DropLayer({
        canvas: dropLayerCanvas,
        context: dropLayerContext,
        size: 600,
    }, queen);
    // const queen2 = new Queen(queenImage, queenSize);
    const queenGenerator = Queen.generator(queenImage, queenSize);
    const queensGrid = new QueensGrid({ canvasSize: 600 }, queenGenerator);
    // queensGrid.positionQueenIn(0, 0, queen2);
    dropLayer.includeDrawnableObject(queensGrid);
    dropLayer.onMouseClick(({ offsetX, offsetY }) => {
        const x = Math.floor(offsetX / queenSize);
        const y = Math.floor(offsetY / queenSize);
        queensGrid.clickIn(x, y);
    });
    dropLayer.startRender();
    window.grid = queensGrid;
    const completeButton = document.querySelector('#complete_button');
    completeButton === null || completeButton === void 0 ? void 0 : completeButton.addEventListener('click', () => {
        const completed = queensGrid.tryToComplete();
        if (!completed) {
            alert('Vish... Não da não em');
        }
    });
};
