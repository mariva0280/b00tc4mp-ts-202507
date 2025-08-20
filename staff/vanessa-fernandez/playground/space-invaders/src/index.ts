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
        dimensions: { width: 40, height: 20 }
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
    spaceship: { 
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


