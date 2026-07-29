export default class Particle {
  constructor(
    public x: number,
    public y: number,
    public rad: number,
    public alpha: number,
    public fadeSpeed: number,
    public color: string,
    public vx: number,
    public vy: number,
    public friction = 1
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.96;
    this.vy *= 0.96;

    this.vx *= this.friction;
    this.vy *= this.friction;

    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
