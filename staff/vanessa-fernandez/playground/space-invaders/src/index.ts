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
   invader : {
        dimensions: { width: 50, height: 50 }
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
    ship: { 
        position: { x: 400, y: 100 }
    },
   invaders : [{
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
    bulletsPosition: [{
        position: { x: 15, y: 15 },
        type: 'ship'
    }, {
        position: { x: 25, y: 25 },
        type: 'invader'
    }],
    gameOver: false,
}

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

function checkCollision() {
    const shipHalfWidth = constants.ship.dimensions.width / 2;
    const shipHalfHeight = constants.ship.dimensions.height / 2;    
    const invaderHalfWidth = constants.invader.dimensions.width / 2;
    const invaderHalfHeight = constants.invader.dimensions.height / 2;

    const shipVertices = {
        topLeft: { x: state.ship.position.x - shipHalfWidth, y: state.ship.position.y + shipHalfHeight },
        topRight: { x: state.ship.position.x + shipHalfWidth, y: state.ship.position.y + shipHalfHeight },
        bottomRight: { x: state.ship.position.x + shipHalfWidth, y: state.ship.position.y - shipHalfHeight },
        bottomLeft: { x: state.ship.position.x - shipHalfWidth, y: state.ship.position.y - shipHalfHeight }
    }

    return state.invaders.some(invader => {
        const invaderVertices = {
            topLeft: { x:invader.position.x - invaderHalfWidth, y: invader.position.y + invaderHalfHeight },
            topRight: { x: invader.position.x + invaderHalfWidth, y: invader.position.y + invaderHalfHeight },
            bottomRight: { x: invader.position.x + invaderHalfWidth, y: invader.position.y - invaderHalfHeight },
            bottomLeft: { x: invader.position.x - invaderHalfWidth, y: invader.position.y - invaderHalfHeight }
        }

        return shipVertices.topLeft.x <=invaderVertices.bottomRight.x &&
                shipVertices.topRight.x >=invaderVertices.topLeft.x &&
                shipVertices.topLeft.y >=invaderVertices.bottomRight.y &&
                shipVertices.bottomRight.y <=invaderVertices.topLeft.y
        
    })

}

/* Interface */

const scene = document.getElementById('scene') as HTMLDivElement
scene.style.position = 'relative'
scene.style.width = '800px'
scene.style.height = '600px'
scene.style.backgroundColor = 'gray'
//scene.style.overflow = 'hidden'

const ship = document.createElement('div')
ship.style.position = 'absolute'
ship.style.width = `${constants.ship.dimensions.width}px`
ship.style.height = `${constants.ship.dimensions.height}px`
ship.style.backgroundImage = 'url(./public/images/ship.png)'
ship.style.backgroundSize = 'cover'

const invaders  = state.invaders.map(invader => {
    const invaderElement = document.createElement('div') as HTMLDivElement
    invaderElement.style.position = 'absolute'
    invaderElement.style.width = `${constants.invader.dimensions.width}px`
    invaderElement.style.height = `${constants.invader.dimensions.height}px`
    invaderElement.style.backgroundImage = 'url(./public/images/invader.png)'
    invaderElement.style.backgroundSize = 'cover'
    invaderElement.style.left = `${invader.position.x - constants.invader.dimensions.width /2}px`
    invaderElement.style.top = `${constants.scene.dimensions.height - (invader.position.y + constants.invader.dimensions.height /2)}px`
    return invaderElement
})

scene.appendChild(ship)
invaders.forEach(invader => scene.appendChild(invader))

document.addEventListener('keydown', event => {
    const step = 10

    if (event.key === 'ArrowLeft') {
        state.ship.position.x = Math.max(state.ship.position.x - step, constants.ship.dimensions.width / 2)
    } else if (event.key === 'ArrowRight') {
        state.ship.position.x = Math.min(state.ship.position.x + step, constants.scene.dimensions.width - constants.ship.dimensions.width / 2)
    } else if (event.key === 'ArrowUp') {
        state.ship.position.y = Math.min(state.ship.position.y + step, constants.scene.dimensions.height - constants.ship.dimensions.height / 2)
    } else if (event.key === 'ArrowDown') {
        state.ship.position.y = Math.max(state.ship.position.y - step, constants.ship.dimensions.height / 2)
    }

    ship.style.left = `${state.ship.position.x - constants.ship.dimensions.width / 2}px`
    ship.style.top = `${constants.scene.dimensions.height - (state.ship.position.y + constants.ship.dimensions.height / 2)}px`

    gameLoop()
})    

function gameLoop() {
    if (checkCollision()) {
        console.log('Game Over')
        state.gameOver = true
        alert('Game Over')
        // Reset game
        //state.score = 0
        //state.lives = 3
        //state.level = 1
        //state.ship.position = { x: constants.scene.dimensions.width / 2, y: constants.ship.dimensions.height / 2 }
        //ship.style.left = `${state.ship.position.x - constants.ship.dimensions.width / 2}px`
        //ship.style.top = `${constants.scene.dimensions.height - (state.ship.position.y + constants.//ship.dimensions.height / 2)}px`  
        //state.gameOver = false
    }
}

setInterval(() => {
    if (state.gameOver) return

    state.invaders = state.invaders.map(invader => {
        invader.position.y -= 5

        if (invader.position.y - constants.invader.dimensions.height / 2 < 0) {
            invader.position.y = constants.scene.dimensions.height - constants.invader.dimensions.height / 2
        }

        return invader
    })

    invaders.forEach((invaderElement, index) => {
        const invader = state.invaders[index]!

        invaderElement.style.left = `${invader.position.x - constants.invader.dimensions.width / 2}px`
        invaderElement.style.top = `${constants.scene.dimensions.height - (invader.position.y + constants.invader.dimensions.height / 2)}px`
    })

    gameLoop()
}, 200);