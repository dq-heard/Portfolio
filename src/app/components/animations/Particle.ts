export default class Particle {
  constructor(
    public x: number,
    public y: number,
    public rad: number,
    public alpha: number,
    public fadeSpeed: number,
    public color: string,
    public vx: number,
    public vy: number
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
