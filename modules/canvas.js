const backgroundCanvas = document.getElementById("background");
const dinoCanvas = document.getElementById("dino");
const background = {
    x: 0,
    y: 0,
    w: backgroundCanvas.width,
    h: backgroundCanvas.height,
    color: "white",
    draw() {
        backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        backgroundCtx.fillStyle = this.color;
        backgroundCtx.fillRect(this.x, this.y, this.w, this.h);
    }
};

const DINO_STANCES = {
    STAND_BOTH: 1,
    STAND_LEFT: 2,
    STAND_RIGHT: 3,
    JUMP: 4,
    DUCK: 5
};

const PRIMARY_COLOR = "rgb(84, 84, 84)";

const dino = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    color: PRIMARY_COLOR,
    canvasWidth: dinoCanvas.width,
    dinoPadding: 100,
    stance: DINO_STANCES.STAND_BOTH,
    verticalPosition: 140,
    INITIAL_POSITION: 140,
    INITIAL_JUMP_SPEED: 15,
    jumpSpeed: 15,
    ACCELARTION_FACTOR: 0.05,
    maxHeightReached: false, 
    draw() {
        const drawRect = (x, y, w, h, verticalDrawDistanceIncrease) => {
            dinoCtx.fillRect(this.dinoPadding + x, y, w, h);
            if (verticalDrawDistanceIncrease) {
                return verticalDrawDistanceIncrease;
            } else {
                return 0;
            }
        };

        const drawHead = (verticalDrawDistance) => {
            const drawEye = (verticalDrawDistance) => {
                dinoCtx.fillStyle = "red";
                drawRect(37, verticalDrawDistance, 3, 3);
                dinoCtx.fillStyle = this.color;
                return 0;
            }

            dinoCtx.fillStyle = this.color;
            verticalDrawDistance += drawRect(34, verticalDrawDistance, 25, 3, 3);
            verticalDrawDistance += drawRect(31, verticalDrawDistance, 6, 20);
            verticalDrawDistance += drawEye(verticalDrawDistance);
            verticalDrawDistance += drawRect(40, verticalDrawDistance, 22, 3, 3);
            verticalDrawDistance += drawRect(37, verticalDrawDistance, 26, 10, 10);
            verticalDrawDistance += drawRect(37, verticalDrawDistance, 10, 6, 3);
            verticalDrawDistance += drawRect(47, verticalDrawDistance, 9, 3);
            return verticalDrawDistance;
        };

        const drawBody = (verticalDrawDistance) => {
            verticalDrawDistance += drawRect(28, verticalDrawDistance, 16, 3, 3);
            verticalDrawDistance += drawRect(24, verticalDrawDistance, 20, 3, 3);
            verticalDrawDistance += drawRect(19, verticalDrawDistance, 25, 3, 3);
            verticalDrawDistance += drawRect(15, verticalDrawDistance, 29, 3, 3);
            verticalDrawDistance += drawRect(12, verticalDrawDistance, 32, 7, 7);
            verticalDrawDistance += drawRect(12, verticalDrawDistance, 27, 3, 3);
            verticalDrawDistance += drawRect(12, verticalDrawDistance, 24, 3, 3);
            verticalDrawDistance += drawRect(12, verticalDrawDistance, 21, 3, 3);
            return verticalDrawDistance;
        };

        const drawTail = (verticalDrawDistance) => {
            verticalDrawDistance += drawRect(0, verticalDrawDistance, 3, 6, 6);
            verticalDrawDistance += drawRect(0, verticalDrawDistance, 6, 3, 3);
            verticalDrawDistance += drawRect(0, verticalDrawDistance, 9, 3, 3);
            verticalDrawDistance += drawRect(0, verticalDrawDistance, 13, 5, 5);
            verticalDrawDistance += drawRect(3, verticalDrawDistance, 10, 3, 3);
            verticalDrawDistance += drawRect(6, verticalDrawDistance, 7, 4, 4);
            return verticalDrawDistance;
        };

        const drawArms = (verticalDrawDistance) => {
            verticalDrawDistance += drawRect(44, verticalDrawDistance, 6, 3, 3);
            verticalDrawDistance += drawRect(47, verticalDrawDistance, 3, 3, 3);
            return verticalDrawDistance;
        };

        const drawLegs = (verticalDrawDistance, stance) => {
            const drawLeftLeg = (verticalDrawDistance, stance) => {
                if (stance === DINO_STANCES.STAND_BOTH || stance === DINO_STANCES.STAND_RIGHT || stance === DINO_STANCES.JUMP) {
                    verticalDrawDistance += drawRect(15, verticalDrawDistance, 9, 3, 3);
                    verticalDrawDistance += drawRect(15, verticalDrawDistance, 6, 3, 3);
                    verticalDrawDistance += drawRect(15, verticalDrawDistance, 3, 3, 3);
                    verticalDrawDistance += drawRect(15, verticalDrawDistance, 7, 3, 3);
                } else {
                    verticalDrawDistance += drawRect(15, verticalDrawDistance, 3, 3, 3);
                    verticalDrawDistance += drawRect(15, verticalDrawDistance, 7, 3, 3);
                }
            };

            const drawRightLeg = (verticalDrawDistance, stance) => {
                if (stance === DINO_STANCES.STAND_BOTH || stance === DINO_STANCES.STAND_LEFT || stance === DINO_STANCES.JUMP) {
                    verticalDrawDistance += drawRect(28, verticalDrawDistance, 5, 3, 3);
                    verticalDrawDistance += drawRect(30, verticalDrawDistance, 3, 6, 6);
                    verticalDrawDistance += drawRect(30, verticalDrawDistance, 7, 3, 3);
                } else {
                    verticalDrawDistance += drawRect(30, verticalDrawDistance, 3, 3, 3);
                    verticalDrawDistance += drawRect(30, verticalDrawDistance, 7, 3, 3);
                }
            };

            drawLeftLeg(verticalDrawDistance, stance);
            drawRightLeg(verticalDrawDistance, stance);

            return verticalDrawDistance;
        };

        dinoCtx.clearRect(0, 0, dinoCanvas.width, dinoCanvas.height);
        let verticalDrawDistance = dino.verticalPosition;
        if (dino.stance === DINO_STANCES.DUCK) {
            // draw ducking
        }
        verticalDrawDistance = drawHead(verticalDrawDistance);
        const verticalDrawDistanceAfterBody = drawBody(verticalDrawDistance);
        drawTail(verticalDrawDistance);
        drawArms(verticalDrawDistance + 7);

        verticalDrawDistance = verticalDrawDistanceAfterBody;
        drawLegs(verticalDrawDistance, dino.stance);
    }
};

const backgroundCtx = backgroundCanvas.getContext("2d");
const dinoCtx = dinoCanvas.getContext("2d");

function setCanvasSizes() {
    setCanvasSize(backgroundCanvas, window.innerWidth, window.innerHeight, 0, 0);
    const dinoHalfHeight = 200 / 2;
    const dinoTop = Math.floor((window.innerHeight / 2) - (dinoHalfHeight));
    dino.canvasWidth = window.innerWidth;
    setCanvasSize(dinoCanvas, dino.canvasWidth, 200, 0, dinoTop);
}

function setCanvasSize(canvas, width, height, left, top) {
    canvas.width = width;
    canvas.height = height;
    canvas.style.top = `${top}px`
    canvas.style.left = `${left}px`;
}

export { background, dino, setCanvasSizes, DINO_STANCES };