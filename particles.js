const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Устанавливаем размер canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 150; // Количество частиц

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 5 + 1;
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * 2 - 1;
        this.color = 'rgba(255, 255, 255, 0.6)';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(mouse) {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        const dist = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        if (dist < 100) {
            this.dx += (this.x - mouse.x) / 100;
            this.dy += (this.y - mouse.y) / 100;
        }
    }
}

for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}

const mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.draw();
        particle.update(mouse);
    });

    requestAnimationFrame(animate);
}

animate();
