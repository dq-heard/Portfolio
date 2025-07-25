export default class Particles {
  constructor(
    public x: number,
    public y: number,
    public rad: number,
    public alpha: number
  ) {}

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
