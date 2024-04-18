const backgroundCanvas = document.getElementById("background");
const dinoCanvas = document.getElementById("dino");
const cloudsCanvas = document.getElementById("clouds");
const groundCanvas = document.getElementById("ground");
const obstaclesCanvas = document.getElementById("obstacles");

const backgroundCtx = backgroundCanvas.getContext("2d");
const dinoCtx = dinoCanvas.getContext("2d");
const cloudsCtx = cloudsCanvas.getContext("2d");
const groundCtx = groundCanvas.getContext("2d");
const obstaclesCtx = obstaclesCanvas.getContext("2d");

const PRIMARY_COLOR = "rgb(84, 84, 84)";

const drawRect = (ctx, x, y, w, h, verticalDrawDistanceIncrease, addVerticalFiller = false) => {
    ctx.fillRect(x, y, w, addVerticalFiller ? h + 1 : h);
    if (verticalDrawDistanceIncrease) {
        return verticalDrawDistanceIncrease;
    } else {
        return 0;
    }
};

const clouds = {
    color: "grey",
    array: [],
    drawCloud(cloud) {
        let verticalDrawDistance = cloud.y;
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 25, verticalDrawDistance, 4, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 20, verticalDrawDistance, 6, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 19, verticalDrawDistance, 2, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 30, verticalDrawDistance, 2, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 17, verticalDrawDistance, 3, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 31, verticalDrawDistance, 1, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 17, verticalDrawDistance, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 31, verticalDrawDistance, 4, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 17, verticalDrawDistance, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 31, verticalDrawDistance, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 34, verticalDrawDistance, 6, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 14, verticalDrawDistance, 4, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 30, verticalDrawDistance, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 39, verticalDrawDistance, 1, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 13, verticalDrawDistance, 2, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 6, verticalDrawDistance, 8, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 42, verticalDrawDistance, 1, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 5, verticalDrawDistance, 2, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 42, verticalDrawDistance, 3, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 5, verticalDrawDistance, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 44, verticalDrawDistance, 1, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 1, verticalDrawDistance, 2, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 4, verticalDrawDistance, 2, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 9, verticalDrawDistance, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 45, verticalDrawDistance, 1, 1, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x, verticalDrawDistance, 2, 1);
        verticalDrawDistance += drawRect(cloudsCtx, cloud.x + 10, verticalDrawDistance, 36, 1);
    },

    draw() {
        cloudsCtx.clearRect(0, 0, cloudsCanvas.width, cloudsCanvas.height);
        cloudsCtx.fillStyle = this.color;

        this.array.forEach(cloud => this.drawCloud(cloud));
    }
};

const cloudObject = {
    x: 0,
    y: 9,
    w: 16,
    h: 13,
    speedMultiplier: 1,
};

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

const GROUND_SECTION_TYPES = {
    FLAT: 1,
    LUMP: 2,
    DIP: 3
}

const groundSectionObject = {
    x: 1,
    y: 1,
    w: 14,
    h: 1,
    pathBitX: 0,
    pathBitY: 0,
    pathBitW: 0,
    type: GROUND_SECTION_TYPES.FLAT,
    FLAT_GROUND_Y: 4
}

const groundSections = {
    color: PRIMARY_COLOR,
    array: [],
    drawPathBit(section) {
        drawRect(groundCtx, section.pathBitX, section.pathBitY, section.pathBitW, section.h);
    },
    draw() {
        groundCtx.clearRect(0, 0, groundCanvas.width, groundCanvas.height);
        groundCtx.fillStyle = this.color;
        this.array.forEach(section => {
            if (section.type === GROUND_SECTION_TYPES.FLAT) {
                drawRect(groundCtx, section.x, section.FLAT_GROUND_Y, section.w, section.h);
            } else if (section.type === GROUND_SECTION_TYPES.LUMP) {
                let verticalDrawDistance = drawRect(groundCtx, section.x + 4, 0, 6, 1, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 3, verticalDrawDistance, 2, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 9, verticalDrawDistance, 2, 1, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 1, verticalDrawDistance, 3, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 10, verticalDrawDistance, 2, 1, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x, verticalDrawDistance, 2, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 12, verticalDrawDistance, 2, 1, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x, verticalDrawDistance, 1, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 13, verticalDrawDistance, 1);
            } else {
                let verticalDrawDistance = section.FLAT_GROUND_Y;
                verticalDrawDistance += drawRect(groundCtx, section.x, verticalDrawDistance, 1, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 13, verticalDrawDistance, 1, 1, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x, verticalDrawDistance, 2, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 12, verticalDrawDistance, 2, 1, 1);
                verticalDrawDistance += drawRect(groundCtx, section.x + 1, verticalDrawDistance, 11, 1);
            }
            this.drawPathBit(section);
        });
    },
};


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
    jumpSpeed: 20,
    ACCELARTION_FACTOR: 0.2,
    MAX_HEIGHT: 60,
    maxHeightReached: false,
    drifting: false,
    jumpCancelled: false,
    jumpStarted: false,
    SPEED: 7,
    draw() {
        const drawHead = (verticalDrawDistance) => {
            const drawEye = (verticalDrawDistance) => {
                dinoCtx.fillStyle = "red";
                drawRect(dinoCtx, this.dinoPadding + 37, verticalDrawDistance, 3, 3);
                dinoCtx.fillStyle = this.color;
                return 0;
            }

            dinoCtx.fillStyle = this.color;
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 34, verticalDrawDistance, 25, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 31, verticalDrawDistance, 6, 20, true);
            verticalDrawDistance += drawEye(verticalDrawDistance);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 40, verticalDrawDistance - 1, 22, 4, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 37, verticalDrawDistance, 26, 10, 10, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 37, verticalDrawDistance, 10, 6, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 47, verticalDrawDistance, 9, 4);
            return verticalDrawDistance;
        };

        const drawBody = (verticalDrawDistance) => {
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 28, verticalDrawDistance, 16, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 24, verticalDrawDistance, 20, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 19, verticalDrawDistance, 25, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 15, verticalDrawDistance, 29, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 12, verticalDrawDistance, 32, 7, 7, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 12, verticalDrawDistance, 27, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 12, verticalDrawDistance, 24, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 12, verticalDrawDistance, 21, 3, 3);
            return verticalDrawDistance;
        };

        const drawTail = (verticalDrawDistance) => {
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 0, verticalDrawDistance, 3, 6, 6, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 0, verticalDrawDistance, 6, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 0, verticalDrawDistance, 9, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 0, verticalDrawDistance, 13, 5, 5, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 3, verticalDrawDistance, 10, 3, 3, true);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 6, verticalDrawDistance, 7, 4, 4);
            return verticalDrawDistance;
        };

        const drawArms = (verticalDrawDistance) => {
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 44, verticalDrawDistance, 6, 3, 3);
            verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 47, verticalDrawDistance, 3, 3, 3);
            return verticalDrawDistance;
        };

        const drawLegs = (verticalDrawDistance, stance) => {
            const drawLeftLeg = (verticalDrawDistance, stance) => {
                if (stance === DINO_STANCES.STAND_BOTH || stance === DINO_STANCES.STAND_RIGHT || stance === DINO_STANCES.JUMP) {
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 15, verticalDrawDistance, 9, 3, 3);
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 15, verticalDrawDistance, 6, 3, 3);
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 15, verticalDrawDistance, 3, 3, 3);
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 15, verticalDrawDistance, 7, 3, 3);
                } else {
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 15, verticalDrawDistance, 3, 3, 3);
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 15, verticalDrawDistance, 7, 3, 3);
                }
            };

            const drawRightLeg = (verticalDrawDistance, stance) => {
                if (stance === DINO_STANCES.STAND_BOTH || stance === DINO_STANCES.STAND_LEFT || stance === DINO_STANCES.JUMP) {
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 28, verticalDrawDistance, 5, 3, 3);
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 30, verticalDrawDistance, 3, 6, 6);
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 30, verticalDrawDistance, 7, 3, 3);
                } else {
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 30, verticalDrawDistance, 3, 3, 3);
                    verticalDrawDistance += drawRect(dinoCtx, this.dinoPadding + 30, verticalDrawDistance, 7, 3, 3);
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

function setCanvasSizes() {
    setCanvasSize(backgroundCanvas, window.innerWidth, window.innerHeight, 0, 0);

    const dinoHalfHeight = 200 / 2;
    const dinoTop = Math.floor((window.innerHeight / 2) - (dinoHalfHeight));
    dino.canvasWidth = window.innerWidth;
    setCanvasSize(dinoCanvas, dino.canvasWidth, 200, 0, dinoTop);

    setCanvasSize(groundCanvas, window.innerWidth, 12, 0, dinoTop + 188);

    setCanvasSize(cloudsCanvas, window.innerWidth, window.innerHeight / 3, 0, 0);
}

function setCanvasSize(canvas, width, height, left, top) {
    canvas.width = width;
    canvas.height = height;
    canvas.style.top = `${top}px`
    canvas.style.left = `${left}px`;
}

export { background, dino, setCanvasSizes, DINO_STANCES, clouds, cloudObject, groundSections, groundSectionObject, GROUND_SECTION_TYPES };