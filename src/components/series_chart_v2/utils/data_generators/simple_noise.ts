export class Simple1DNoise {
  private maxVertices: number;
  private maxVerticesMask: number;
  private amplitude: number;
  private scale: number;
  constructor(maxVertices = 256, amplitude = 5.1, scale = 0.6) {
    this.maxVerticesMask = maxVertices - 1;
    this.amplitude = amplitude;
    this.scale = scale;
    this.maxVertices = maxVertices;
  }
  public getValue(x: number) {
    const r = new Array(this.maxVertices).fill(0).map(Math.random);
    const scaledX = x * this.scale;
    const xFloor = Math.floor(scaledX);
    const t = scaledX - xFloor;
    const tRemapSmoothstep = t * t * ( 3 - 2 * t );

      // tslint:disable-next-line:no-bitwise
    const xMin = xFloor & this.maxVerticesMask;
      // tslint:disable-next-line:no-bitwise
    const xMax = ( xMin + 1 ) & this.maxVerticesMask;

    const y = this.lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

    return y * this.amplitude;
  }
  private lerp(a: number, b: number, t: number ) {
    return a * ( 1 - t ) + b * t;
  }
}
