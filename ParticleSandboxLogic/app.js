// Fully working particle sandbox
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const gravityInput = document.getElementById("gravity");
  const dragInput = document.getElementById("drag");
  const clearBtn = document.getElementById("clear");

  const particles = [];
  const colors = ["#66d9ff", "#aaffcc", "#ffcc66", "#ff6699", "#b266ff"];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.5) * 10;
      this.size = 5 + Math.random() * 15;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      const gravity = parseFloat(gravityInput.value);
      const drag = parseFloat(dragInput.value);
      this.vy += gravity;
      this.vx *= drag;
      this.vy *= drag;
      this.x += this.vx;
      this.y += this.vy;

      // bounce
      if (this.x < this.size || this.x > canvas.width - this.size) {
        this.vx *= -1;
      }
      if (this.y > canvas.height - this.size) {
        this.vy *= -0.8;
        this.y = canvas.height - this.size;
      }
    }

    draw() {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      g.addColorStop(0, this.color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function spawnParticles(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y));
    }
  }

  canvas.addEventListener("click", e => {
    spawnParticles(e.clientX, e.clientY, 40);
  });

  clearBtn.addEventListener("click", () => {
    particles.length = 0;
  });

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
});
