import { background, dino, setCanvasSizes, DINO_STANCES } from "./modules/canvas.js";

let keyState = {};

addEventListener("resize", () => {
    setCanvasSizes();
});

document.addEventListener('keydown', function(event) {
    keyState[event.code] = true;
});

document.addEventListener('keyup', function(event) {
    keyState[event.code] = false;
});

let raf;

setCanvasSizes();

background.draw();

function game() {
    if (keyState['Space'] === true && dino.maxHeightReached === false) {
        increaseJumpHeight();
    } else {
        stopJumpingAndReturnToGround();
    }


    dino.draw();
    raf = window.requestAnimationFrame(game);
}

function increaseJumpHeight() {
    dino.stance = DINO_STANCES.JUMP;
    if (dino.verticalPosition === 0) {
        dino.maxHeightReached = true;
        return;
    }
    dino.verticalPosition -= dino.jumpSpeed;
    if (dino.verticalPosition < 0) {
        dino.verticalPosition = 0;
    }
    if (dino.jumpSpeed > 1) {
        dino.jumpSpeed -= (dino.jumpSpeed * dino.ACCELARTION_FACTOR);
    }
}

function stopJumpingAndReturnToGround() {
    if (dino.maxHeightReached === false && dino.verticalPosition !== dino.INITIAL_POSITION) {
        increaseJumpHeight();
        return;
    }

    if (dino.verticalPosition === dino.INITIAL_POSITION) {
        if (dino.stance === DINO_STANCES.JUMP) {
            dino.stance = DINO_STANCES.STAND_BOTH;
        }
        dino.maxHeightReached = false;
        return;
    }
    dino.verticalPosition += dino.jumpSpeed;
    if (dino.verticalPosition > dino.INITIAL_POSITION) {
        dino.verticalPosition = dino.INITIAL_POSITION;
    }
    if (dino.jumpSpeed < dino.INITIAL_JUMP_SPEED) {
        dino.jumpSpeed += (dino.jumpSpeed * dino.ACCELARTION_FACTOR);
        if (dino.jumpSpeed > dino.INITIAL_JUMP_SPEED) {
            dino.jumpSpeed = dino.INITIAL_JUMP_SPEED;
        }
    }
}

raf = window.requestAnimationFrame(game);
setInterval(() => {
    if (dino.stance === DINO_STANCES.JUMP || dino.stance === DINO_STANCES.DUCK) {
        return;
    }

    if (dino.stance === DINO_STANCES.STAND_LEFT) {
        dino.stance = DINO_STANCES.STAND_RIGHT
    } else {
        dino.stance = DINO_STANCES.STAND_LEFT;
    }
}, 150);