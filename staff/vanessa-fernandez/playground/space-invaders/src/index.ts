class Component {
    private container: HTMLElement

    private x: number = 0
    private y: number = 0
    private width: number = 0
    private height: number = 0

    private moveCallback: (() => void) | null = null

    constructor(container: HTMLElement, x: number, y: number, width: number, height: number) {
        if (!container) throw new Error("Container element is required")

        this.container = container

        this.getContainer()!.style.position = "absolute"
        this.setPosition(x, y)
        this.setSize(width, height)
    }

    public getContainer(): HTMLElement {
        return this.container!
    }

    public setPosition(x: number, y: number): void {
        this.x = x
        this.y = y
        this.getContainer()!.style.left = `${x - this.width / 2}px`
        this.getContainer()!.style.bottom = `${y - this.height / 2}px`

        if (this.moveCallback) this.moveCallback()
    }
    public getX(): number {
        return this.x
    }

    public getY(): number {
        return this.y
    }
    
    public setSize(width: number, height: number): void {
        this.width = width
        this.height = height
        this.getContainer()!.style.width = `${width}px`
        this.getContainer()!.style.height = `${height}px`
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public add(object: Component): void {
        this.getContainer()?.appendChild(object.getContainer()!)
    }

    public remove(object: Component): void {
        this.getContainer()?.removeChild(object.getContainer()!)
    }

    public collidesWith(object: Component): boolean {
        if (!(object instanceof Component)) throw new Error("Object is not a Component")
        
        return this.getX() < object.getX() + object.getWidth() &&
               this.getX() + this.getWidth() > object.getX() &&
               this.getY() < object.getY() + object.getHeight() &&
               this.getY() + this.getHeight() > object.getY()
    } 
    
    public onMove(callback: () => void): void {
        this.moveCallback = callback
    }

}

class Scene extends Component {

    constructor(x: number, y: number, width: number, height: number) {
        super(document.createElement("div"), x, y, width, height)

        //this.getContainer().style.overflow = "hidden"
        this.getContainer().style.backgroundColor = "gray"
    }

}

class Ship extends Component {
    constructor(x: number, y: number, width: number, height: number) {
        super(document.createElement("div"), x, y, width, height)

        
        this.getContainer().style.backgroundImage = "url(./public/images/ship.png)"
        this.getContainer().style.backgroundSize = "cover"

    }
}

class Bullet extends Component {
    constructor(x: number, y: number, width: number, height: number) {
        super(document.createElement("div"), x, y, width, height)

       
        this.getContainer().style.backgroundColor = "red"
    }
}

class Alien extends Component {
    constructor(x: number, y: number, width: number, height: number) {
        super(document.createElement("div"), x, y, width, height)

        
        this.getContainer().style.backgroundImage = "url(./public/images/invader.png)"
        this.getContainer().style.backgroundSize = "cover"

    }

}

class Game extends Component {

    private scene: Scene
    private ship: Ship
    private bullets: Bullet[]
    private aliens: Alien[]

    private gameOver: boolean = false

    constructor(containerId: string, x: number, y: number, width: number, height: number) {
        super(document.getElementById(containerId)!, x, y, width, height)

        this.getContainer().style.position = "relative"
        this.getContainer().style.backgroundColor = "darkgray"

        this.scene = new Scene(450, 350, 800, 600)
        this.add(this.scene)

        this.ship = new Ship(400, 50, 50, 50)
        this.scene.add(this.ship)

        this.ship.onMove (() => {
            if (this.gameOver) return
            this.aliens.forEach((alien) => {
                if (this.ship.collidesWith(alien)) {
                    alert("Game Over")

                    this.gameOver = true
                }
            })
        })

        document.addEventListener("keydown", (event) => {
            const step = 10

            if (event.key === "ArrowLeft") {
                this.ship.setPosition(this.ship.getX() - step, this.ship.getY())
            } else if (event.key === "ArrowRight") {
                this.ship.setPosition(this.ship.getX() + step, this.ship.getY())
            } else if (event.key === " ") {
                const bullet = new Bullet(this.ship.getX(), this.ship.getY() + this.ship.getHeight() / 2, 5, 10)

                this.bullets.push(bullet)
                this.scene.add(bullet)

                bullet.onMove(() => {
                    this.aliens.forEach(alien => {
                        if (bullet.collidesWith(alien)) {
                            let index = this.aliens.indexOf(alien)
                            this.aliens.splice(index, 1)

                            this.scene.remove(alien)

                            index = this.bullets.indexOf(bullet)
                            this.bullets.splice(index, 1)

                            this.scene.remove(bullet)
                        }
                    })
                })
            }    
        })


        this.bullets = []
        this.aliens = []

        // Initialize aliens in a grid
        const rows = 2
        const cols = 7
        const alienWidth = 50
        const alienHeight = 50
        const colSpacing = this.scene.getWidth() / cols - alienWidth
        const rowSpacing = alienHeight

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * (alienWidth + colSpacing) + colSpacing
                const y = this.scene.getHeight() - row * rowSpacing - alienHeight / 2

                const alien = new Alien(x, y, alienWidth, alienHeight)
                this.aliens.push(alien)
                this.scene.add(alien)

                alien.onMove(() => {
                    if (this.gameOver) return
                    this.aliens.forEach((alien) => {
                        if (this.ship.collidesWith(alien)) {
                            alert("Game Over")

                            this.gameOver = true
                        }
                    })
                })
            }
        }

        setInterval(() => {
            const step = 10

            this.aliens.forEach(alien => alien.setPosition(alien.getX(), alien.getY() > alienHeight / 2 ? alien.getY() - step : this.scene.getHeight() - alienHeight / 2))
            
        }, 300)

        setInterval(() => {
            const step = 5

            this.bullets.forEach(bullet => {
                bullet.setPosition(bullet.getX(), bullet.getY() + step)
            })
        }, 50)    
    }
}

// Initialize the game
const game = new Game("game", 450, 350, 800, 600)