class Component {
    container;
    constructor(container) {
        if (!container)
            throw new Error("Container element is required");
        this.container = container;
    }
    getContainer() {
        return this.container;
    }
    add(object) {
        this.getContainer()?.appendChild(object.getContainer());
    }
}
class Scene extends Component {
    width;
    height;
    constructor(width, height) {
        super(document.createElement("div"));
        this.width = width;
        this.height = height;
        this.getContainer().style.position = "relative";
        this.getContainer().style.width = `${width}px`;
        this.getContainer().style.height = `${height}px`;
        this.getContainer().style.border = "1px solid black";
        this.getContainer().style.overflow = "hidden";
        this.getContainer().style.backgroundColor = "gray";
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
class Ship extends Component {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    constructor(x, y, width, height) {
        super(document.createElement("div"));
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.getContainer().style.position = "absolute";
        this.getContainer().style.width = `${width}px`;
        this.getContainer().style.height = `${height}px`;
        this.getContainer().style.left = `${x - width / 2}px`;
        this.getContainer().style.bottom = `${y - height / 2}px`;
        this.getContainer().style.backgroundImage = "url(./public/images/ship.png)";
        this.getContainer().style.backgroundSize = "cover";
    }
}
class Bullet extends Component {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    constructor(x, y, width, height) {
        super(document.createElement("div"));
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.getContainer().style.position = "absolute";
        this.getContainer().style.width = `${width}px`;
        this.getContainer().style.height = `${height}px`;
        this.getContainer().style.backgroundColor = "red";
        this.getContainer().style.left = `${x - width / 2}px`;
        this.getContainer().style.bottom = `${y - height / 2}px`;
    }
}
class Alien extends Component {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    constructor(x, y, width, height) {
        super(document.createElement("div"));
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.getContainer().style.position = "absolute";
        this.getContainer().style.width = `${width}px`;
        this.getContainer().style.height = `${height}px`;
        this.getContainer().style.left = `${x - width / 2}px`;
        this.getContainer().style.bottom = `${y - height / 2}px`;
        this.getContainer().style.backgroundImage = "url(./public/images/invader.png)";
        this.getContainer().style.backgroundSize = "cover";
    }
}
class Game extends Component {
    scene;
    ship;
    bullets;
    aliens;
    constructor(containerId) {
        super(document.getElementById(containerId));
        this.scene = new Scene(800, 600);
        this.add(this.scene);
        this.ship = new Ship(400, 50, 50, 50);
        this.scene.add(this.ship);
        this.bullets = [];
        this.aliens = [];
        // Initialize aliens in a grid
        const rows = 2;
        const cols = 7;
        const alienWidth = 50;
        const alienHeight = 50;
        const colSpacing = this.scene.getWidth() / (cols + 1);
        const rowSpacing = 50;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * (alienWidth + colSpacing) + colSpacing;
                const y = this.scene.getHeight() - (row + 1) * rowSpacing;
                const alien = new Alien(x, y, alienWidth, alienHeight);
                this.aliens.push(alien);
                this.scene.add(alien);
            }
        }
    }
}
// Initialize the game
const game = new Game("game");
export {};
//# sourceMappingURL=index.js.map