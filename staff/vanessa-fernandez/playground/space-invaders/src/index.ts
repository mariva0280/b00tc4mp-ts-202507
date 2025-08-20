/* 
State
- score
- lives
- game over
- level
- difficulty
- player position
- enemy position
- bullets position
*/

const constants = {
    player: {
        dimensions: { width: 50, height: 30 }
    },
    enemy: {
        dimensions: { width: 40, height: 40 }
    },
    bullets: {
        dimensions: { width: 5, height: 10 }
    },
    scene: {
        dimensions: { width: 800, height: 600 }
    }
}

const state = {
    score: 0,
    lives: 3,       
    level: 1,
    difficulty: 'easy',
    player: { 
        position: { x: 0, y: 0 }
    },
    enemies: [{
        position: { x: 10, y: 10 }
    }, {
        position: { x: 20, y: 20 }
    }, {
        position: { x: 40, y: 40 }  
    }],
    bulletsPosition: [{
        position: { x: 15, y: 15 },
        type: 'player'
    }, {
        position: { x: 25, y: 25 },
        type: 'enemy'
    }],
    gameOver: false,
}

/*
Logic
- move player
- move enemies
- shoot bullet
- check collision
- update score
- update lives
- update level
- reset game
*/

function checkCollision() {
    const playerHalfWidth = constants.player.dimensions.width / 2;
    const playerHalfHeight = constants.player.dimensions.height / 2;    
    const enemyHalfWidth = constants.enemy.dimensions.width / 2;
    const enemyHalfHeight = constants.enemy.dimensions.height / 2;

    const playerVertices = {
        topLeft: { x: state.player.position.x - playerHalfWidth, y: state.player.position.y + playerHalfHeight },
        topRight: { x: state.player.position.x + playerHalfWidth, y: state.player.position.y + playerHalfHeight },
        bottomRight: { x: state.player.position.x + playerHalfWidth, y: state.player.position.y - playerHalfHeight },
        bottomLeft: { x: state.player.position.x - playerHalfWidth, y: state.player.position.y - playerHalfHeight }
    }

    return state.enemies.some((enemy) => {
        const enemyVertices = {
            topLeft: { x: enemy.position.x - enemyHalfWidth, y: enemy.position.y + enemyHalfHeight },
            topRight: { x: enemy.position.x + enemyHalfWidth, y: enemy.position.y + enemyHalfHeight },
            bottomRight: { x: enemy.position.x + enemyHalfWidth, y: enemy.position.y - enemyHalfHeight },
            bottomLeft: { x: enemy.position.x - enemyHalfWidth, y: enemy.position.y - enemyHalfHeight }
        }

        return playerVertices.topLeft.x <= enemyVertices.bottomRight.x &&
                playerVertices.topRight.x >= enemyVertices.topLeft.x &&
                playerVertices.topLeft.y >= enemyVertices.bottomRight.y &&
                playerVertices.bottomRight.y <= enemyVertices.topLeft.y
        
    })
}
