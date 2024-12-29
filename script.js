// script.js
document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('nameInput').value;
    if (name) {
        document.getElementById('greeting').innerHTML = `Bonne et Heureuse Année 2025, ${name}! 🎉`;
        document.getElementById('greeting').classList.remove('hidden');
        startFireworks();
    }
});

let fireworks = [];

function Firework(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 10 + 5;
    this.speed = Math.random() * 2 + 3;
    this.angle = Math.random() * Math.PI * 2;
    this.dx = Math.cos(this.angle) * this.speed;
    this.dy = Math.sin(this.angle) * this.speed;
    this.alpha = 1;

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.alpha -= 0.02;

        if (this.alpha <= 0) {
            return false;
        }
        return true;
    };

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    };
}

function startFireworks() {
    let canvas = document.getElementById('fireworksCanvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.05) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height / 2;
            let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            fireworks.push(new Firework(x, y, color));
        }

        fireworks = fireworks.filter(firework => firework.update());
        fireworks.forEach(firework => firework.draw(ctx));

        requestAnimationFrame(animate);
    }

    animate();
}
