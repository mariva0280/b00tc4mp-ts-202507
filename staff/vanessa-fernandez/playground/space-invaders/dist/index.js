/*
State
- score
- lives
- game over
- level
- difficulty
- ship position
-invader    position
- bullets position
*/
const constants = {
    ship: {
        dimensions: { width: 50, height: 50 }
    },
    invader: {
        dimensions: { width: 50, height: 50 }
    },
    bullet: {
        dimensions: { width: 5, height: 10 }
    },
    scene: {
        dimensions: { width: 800, height: 600 }
    }
};
const state = {
    score: 0,
    lives: 3,
    level: 1,
    difficulty: "easy",
    ship: {
        position: { x: 400, y: 100 }
    },
    invaders: [{
            position: { x: 100, y: 500 }
        }, {
            position: { x: 200, y: 500 }
        }, {
            position: { x: 300, y: 500 }
        }, {
            position: { x: 400, y: 500 }
        }, {
            position: { x: 500, y: 500 }
        }, {
            position: { x: 600, y: 500 }
        }, {
            position: { x: 700, y: 500 }
        }, {
            position: { x: 100, y: 400 }
        }, {
            position: { x: 200, y: 400 }
        }, {
            position: { x: 300, y: 400 }
        }, {
            position: { x: 400, y: 400 }
        }, {
            position: { x: 500, y: 400 }
        }, {
            position: { x: 600, y: 400 }
        }, {
            position: { x: 700, y: 400 }
        }],
    bullets: [],
    gameOver: false,
};
/*
Logic
- move ship
- moveinvader
- shoot bullet
- check collision
- update score
- update lives
- update level
- reset game
*/
function checkCollisionShipVsInvaders() {
    const shipHalfWidth = constants.ship.dimensions.width / 2;
    const shipHalfHeight = constants.ship.dimensions.height / 2;
    const invaderHalfWidth = constants.invader.dimensions.width / 2;
    const invaderHalfHeight = constants.invader.dimensions.height / 2;
    const shipVertices = {
        topLeft: { x: state.ship.position.x - shipHalfWidth, y: state.ship.position.y + shipHalfHeight },
        topRight: { x: state.ship.position.x + shipHalfWidth, y: state.ship.position.y + shipHalfHeight },
        bottomRight: { x: state.ship.position.x + shipHalfWidth, y: state.ship.position.y - shipHalfHeight },
        bottomLeft: { x: state.ship.position.x - shipHalfWidth, y: state.ship.position.y - shipHalfHeight }
    };
    const collision = state.invaders.some(invader => {
        const invaderVertices = {
            topLeft: { x: invader.position.x - invaderHalfWidth, y: invader.position.y + invaderHalfHeight },
            topRight: { x: invader.position.x + invaderHalfWidth, y: invader.position.y + invaderHalfHeight },
            bottomRight: { x: invader.position.x + invaderHalfWidth, y: invader.position.y - invaderHalfHeight },
            bottomLeft: { x: invader.position.x - invaderHalfWidth, y: invader.position.y - invaderHalfHeight }
        };
        return shipVertices.topLeft.x <= invaderVertices.bottomRight.x &&
            shipVertices.topRight.x >= invaderVertices.topLeft.x &&
            shipVertices.topLeft.y >= invaderVertices.bottomRight.y &&
            shipVertices.bottomRight.y <= invaderVertices.topLeft.y;
    });
    if (collision) {
        state.lives -= 1;
        if (state.lives <= 0) {
            state.gameOver = true;
            alert('Game Over');
        }
        else {
            alert(`You have ${state.lives} lives left.`);
        }
    }
}
function checkCollisionBulletVsInvaders() {
    const bulletHalfWidth = constants.bullet.dimensions.width / 2;
    const bulletHalfHeight = constants.bullet.dimensions.height / 2;
    const invaderHalfWidth = constants.invader.dimensions.width / 2;
    const invaderHalfHeight = constants.invader.dimensions.height / 2;
    return state.bullets.forEach(bullet => {
        const bulletVertices = {
            topLeft: { x: bullet.position.x - bulletHalfWidth, y: bullet.position.y + bulletHalfHeight },
            topRight: { x: bullet.position.x + bulletHalfWidth, y: bullet.position.y + bulletHalfHeight },
            bottomRight: { x: bullet.position.x + bulletHalfWidth, y: bullet.position.y - bulletHalfHeight },
            bottomLeft: { x: bullet.position.x - bulletHalfWidth, y: bullet.position.y - bulletHalfHeight }
        };
        state.invaders = state.invaders.filter(invader => {
            const invaderVertices = {
                topLeft: { x: invader.position.x - invaderHalfWidth, y: invader.position.y + invaderHalfHeight },
                topRight: { x: invader.position.x + invaderHalfWidth, y: invader.position.y + invaderHalfHeight },
                bottomRight: { x: invader.position.x + invaderHalfWidth, y: invader.position.y - invaderHalfHeight },
                bottomLeft: { x: invader.position.x - invaderHalfWidth, y: invader.position.y - invaderHalfHeight }
            };
            const collision = bulletVertices.topLeft.x <= invaderVertices.bottomRight.x &&
                bulletVertices.bottomRight.x >= invaderVertices.topLeft.x &&
                bulletVertices.topLeft.y >= invaderVertices.bottomRight.y &&
                bulletVertices.bottomRight.y <= invaderVertices.topLeft.y;
            if (collision) {
                state.score += 10;
                invadersElements.forEach((invaderElement, index) => {
                    const invaderIndex = state.invaders.indexOf(invader);
                    if (index === invaderIndex) {
                        sceneElement.removeChild(invaderElement);
                        invadersElements.splice(index, 1);
                    }
                });
                bulletsElements.forEach((bulletElement, index) => {
                    const bulletIndex = state.bullets.indexOf(bullet);
                    if (index === bulletIndex) {
                        sceneElement.removeChild(bulletElement);
                        bulletsElements.splice(index, 1);
                        state.bullets.splice(bulletIndex, 1);
                    }
                });
            }
            return !collision;
        });
    });
}
/* Interface */
const sceneElement = document.getElementById("scene");
sceneElement.style.position = "relative";
sceneElement.style.width = "800px";
sceneElement.style.height = "600px";
sceneElement.style.backgroundColor = "gray";
const shipElement = document.createElement("div");
shipElement.style.position = "absolute";
shipElement.style.width = `${constants.ship.dimensions.width}px`;
shipElement.style.height = `${constants.ship.dimensions.height}px`;
shipElement.style.backgroundImage = "url(./public/images/ship.png)";
shipElement.style.backgroundSize = "cover";
shipElement.style.left = `${state.ship.position.x - constants.ship.dimensions.width / 2}px`;
shipElement.style.top = `${constants.scene.dimensions.height - (state.ship.position.y + constants.ship.dimensions.height / 2)}px`;
const invadersElements = state.invaders.map(invader => {
    const invaderElement = document.createElement("div");
    invaderElement.style.position = "absolute";
    invaderElement.style.width = `${constants.invader.dimensions.width}px`;
    invaderElement.style.height = `${constants.invader.dimensions.height}px`;
    invaderElement.style.backgroundImage = "url(./public/images/invader.png)";
    invaderElement.style.backgroundSize = "cover";
    invaderElement.style.left = `${invader.position.x - constants.invader.dimensions.width / 2}px`;
    invaderElement.style.top = `${constants.scene.dimensions.height - (invader.position.y + constants.invader.dimensions.height / 2)}px`;
    return invaderElement;
});
sceneElement.appendChild(shipElement);
invadersElements.forEach(invader => sceneElement.appendChild(invader));
const bulletsElements = [];
document.addEventListener("keyup", event => {
    const step = 10;
    if (event.key === "ArrowLeft") {
        state.ship.position.x = Math.max(state.ship.position.x - step, constants.ship.dimensions.width / 2);
    }
    else if (event.key === "ArrowRight") {
        state.ship.position.x = Math.min(state.ship.position.x + step, constants.scene.dimensions.width - constants.ship.dimensions.width / 2);
    }
    else if (event.key === "ArrowUp") {
        state.ship.position.y = Math.min(state.ship.position.y + step, constants.scene.dimensions.height - constants.ship.dimensions.height / 2);
    }
    else if (event.key === "ArrowDown") {
        state.ship.position.y = Math.max(state.ship.position.y - step, constants.ship.dimensions.height / 2);
    }
    shipElement.style.left = `${state.ship.position.x - constants.ship.dimensions.width / 2}px`;
    shipElement.style.top = `${constants.scene.dimensions.height - (state.ship.position.y + constants.ship.dimensions.height / 2)}px`;
    if (event.key === " ") {
        const bullet = {
            position: { x: state.ship.position.x, y: state.ship.position.y + constants.ship.dimensions.height / 2 + constants.bullet.dimensions.height / 2 }
        };
        state.bullets.push(bullet);
        const bulletElement = document.createElement("div");
        bulletElement.style.position = "absolute";
        bulletElement.style.width = `${constants.bullet.dimensions.width}px`;
        bulletElement.style.height = `${constants.bullet.dimensions.height}px`;
        bulletElement.style.backgroundColor = "yellow";
        bulletElement.style.left = `${bullet.position.x - constants.bullet.dimensions.width / 2}px`;
        bulletElement.style.top = `${constants.scene.dimensions.height - (bullet.position.y + constants.bullet.dimensions.height / 2)}px`;
        sceneElement.appendChild(bulletElement);
        bulletsElements.push(bulletElement);
    }
});
// Game Loop
setInterval(() => {
    if (state.gameOver)
        return;
    state.invaders = state.invaders.map(invader => {
        invader.position.y -= 5;
        if (invader.position.y - constants.invader.dimensions.height / 2 < 0) {
            invader.position.y = constants.scene.dimensions.height - constants.invader.dimensions.height / 2;
        }
        const invaderIndex = state.invaders.indexOf(invader);
        const invaderElement = invadersElements[invaderIndex];
        invaderElement.style.left = `${invader.position.x - constants.invader.dimensions.width / 2}px`;
        invaderElement.style.top = `${constants.scene.dimensions.height - (invader.position.y + constants.invader.dimensions.height / 2)}px`;
        return invader;
    });
    state.bullets = state.bullets.map((bullet, index) => {
        bullet.position.y += 10;
        if (bullet.position.y - constants.bullet.dimensions.height / 2 > constants.scene.dimensions.height) {
            state.bullets.splice(index, 1);
            const bulletElement = bulletsElements[index];
            sceneElement.removeChild(bulletElement);
            bulletsElements.splice(index, 1);
        }
        else {
            const bulletElement = bulletsElements[index];
            bulletElement.style.left = `${bullet.position.x - constants.bullet.dimensions.width / 2}px`;
            bulletElement.style.top = `${constants.scene.dimensions.height - (bullet.position.y + constants.bullet.dimensions.height / 2)}px`;
        }
        return bullet;
    });
    checkCollisionShipVsInvaders();
    checkCollisionBulletVsInvaders();
}, 200);
export {};
//# sourceMappingURL=index.js.map