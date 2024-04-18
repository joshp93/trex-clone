import { background, dino, setCanvasSizes, DINO_STANCES, clouds, cloudObject, groundSections, groundSectionObject, GROUND_SECTION_TYPES } from "./modules/canvas.js";

let keyState = {};

addEventListener("resize", () => {
    setCanvasSizes();
});

document.addEventListener('keydown', function (event) {
    keyState[event.code] = true;
});

document.addEventListener('keyup', function (event) {
    keyState[event.code] = false;
});

let raf;

setCanvasSizes();

background.draw();

function game() {
    if (keyState['Space'] === true && dino.jumpCancelled === false) {
        jump();
    } else {
        stopJumpingAndReturnToGround();
    }
    updateGround();
    updateClouds();

    dino.draw();
    groundSections.draw();
    clouds.draw();
    raf = window.requestAnimationFrame(game);
}

function jump() {
    dino.stance = DINO_STANCES.JUMP;
    dino.jumpStarted = true;
    if (dino.maxHeightReached === true) {
        stopJumpingAndReturnToGround();
        return;
    }
    if (dino.verticalPosition <= dino.MAX_HEIGHT) {
        dino.maxHeightReached = true;
        stopJumpingAndReturnToGround();
        return;
    }
    increaseHeight();
}

function increaseHeight() {
    dino.verticalPosition -= dino.jumpSpeed;
    if (dino.verticalPosition < 0) {
        dino.verticalPosition = 0;
    }
}

function slowDownJump() {
    if (dino.jumpSpeed > 1) {
        dino.jumpSpeed -= (dino.jumpSpeed * dino.ACCELARTION_FACTOR);
        increaseHeight();
    } else {
        dino.drifting = false;
    }
}

function stopJumpingAndReturnToGround() {
    if ((keyState['Space'] === true && dino.maxHeightReached === true && dino.jumpCancelled === false) || (dino.drifting === true && dino.jumpCancelled === true)) {
        slowDownJump();
        if (dino.verticalPosition === 0) {
            dino.jumpCancelled = true;
        }
        return;
    }

    if (keyState['Space'] === false && dino.maxHeightReached === false && dino.jumpCancelled === false && dino.jumpStarted === true) {
        dino.drifting = true;
        dino.jumpCancelled = true;
        return;
    }

    if (dino.verticalPosition === dino.INITIAL_POSITION) {
        if (dino.stance === DINO_STANCES.JUMP) {
            dino.stance = DINO_STANCES.STAND_BOTH;
            dino.jumpSpeed = dino.INITIAL_JUMP_SPEED;
            dino.jumpCancelled = false;
            dino.jumpStarted = false;
        }
        return;
    }
    decreaseHeight();
    speedUpFall();
}

function decreaseHeight() {
    dino.verticalPosition += dino.jumpSpeed;
    if (dino.verticalPosition > dino.INITIAL_POSITION) {
        dino.verticalPosition = dino.INITIAL_POSITION;
    }
    dino.maxHeightReached = false;
}

function speedUpFall() {
    if (dino.jumpSpeed < dino.INITIAL_JUMP_SPEED) {
        dino.jumpSpeed += (dino.jumpSpeed * dino.ACCELARTION_FACTOR);
    }
}

function buildCloud() {
    const cloud = JSON.parse(JSON.stringify(cloudObject));
    cloud.x = window.innerWidth;
    cloud.y = Math.floor(Math.random() * ((window.innerHeight / 3) - 50)) + 20;
    cloud.speedMultiplier = Math.floor(Math.random() * 3) + 1;
    return cloud;
}

function updateClouds() {
    if (clouds.array.length === 0) {
        clouds.array.push(buildCloud());
    }

    for (let i = 0; i < clouds.array.length; i++) {
        clouds.array[i].x -= 1 * clouds.array[i].speedMultiplier;

        if (clouds.array[i].x <= 0 - 100) {
            clouds.array.splice(i, 1);
        }
    }
}

function buildGroundSection(i, type, xPos) {
    const section = JSON.parse(JSON.stringify(groundSectionObject));
    
    if (!type) {
        const random = Math.floor(Math.random() * 100) + 1;
        if (random <= 90) {
            section.type = GROUND_SECTION_TYPES.FLAT;
        } else if (random > 90 && random < 96) {
            section.type = GROUND_SECTION_TYPES.LUMP;
        } else if (random > 96 && random <= 100) {
            section.type = GROUND_SECTION_TYPES.DIP;
        }
    } else {
        section.type = type;
    }

    section.x = xPos;
    section.pathBitY = Math.floor(Math.random() * 12 - 1) + groundSectionObject.FLAT_GROUND_Y + 3;
    section.pathBitW = Math.floor(Math.random() * 3) + 1;
    section.pathBitX = Math.floor(Math.random() * (section.x + (section.w - section.pathBitW))) + section.x;
    return section;
}

function updateGround() {
    if (groundSections.array.length === 0) {
        const sectionCount = (window.innerWidth / groundSectionObject.w) * 1.1;
        for (let i = 0; i < sectionCount; i++) {
            groundSections.array.push(buildGroundSection(i, GROUND_SECTION_TYPES.FLAT, groundSectionObject.w * i));
        }
    }

    for (let i = 0; i < groundSections.array.length; i++) {
        groundSections.array[i].x -= dino.SPEED;
        groundSections.array[i].pathBitX -= dino.SPEED;
        if (groundSections.array[i].x <= (groundSectionObject.w * -1)) {
            groundSections.array.splice(i, 1);
            groundSections.array.push(buildGroundSection(i, undefined, groundSections.array[groundSections.array.length - 1].x + groundSections.array[i].w));
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

    clouds.array.forEach(cloud => cloud.x++);
}, 150);

setInterval(() => {
    if (clouds.array.length < 4 && (Math.floor(Math.random() * 10) + 1) > 6) {
        clouds.array.push(buildCloud());
    }
}, 1000);