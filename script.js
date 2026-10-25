const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicBtn.classList.add('playing');
        musicIcon.className = 'fa-solid fa-pause';
    } else {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicIcon.className = 'fa-solid fa-music';
    }
});

const canvas = document.getElementById('particles-canvas'), ctx = canvas.getContext('2d');
let particlesArray = [];
const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.addEventListener('resize', () => { resize(); init(); });
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * -1 - 0.2;
        this.color = Math.random() > 0.3 ? `rgba(230, 0, 0, ${Math.random()})` : `rgba(0, 85, 255, ${Math.random()})`;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.y < 0) { this.y = canvas.height + 10; this.x = Math.random() * canvas.width; }
    }
    draw() {
        ctx.fillStyle = this.color; ctx.shadowBlur = 8; ctx.shadowColor = '#ff0000';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

function drawWebs() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 85) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - dist/850})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function init() { particlesArray = Array.from({ length: 55 }, () => new Particle()); }
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    drawWebs();
    requestAnimationFrame(animate);
}
init(); animate();