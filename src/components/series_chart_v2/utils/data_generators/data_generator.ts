import { Simple1DNoise } from './simple_noise';

export class DataGenerator {
  private generator: Simple1DNoise;
  private frequency: number;
  constructor(frequency = 500) {
    this.generator = new Simple1DNoise();
    this.frequency = frequency;
  }
  public generateSimpleSeries(totalPoints = 50) {
    const dataPoints = new Array(totalPoints)
      .fill(0)
      .map((value, i) => {
        return {
          x: i,
          y: 3 +  Math.sin(i / this.frequency) + this.generator.getValue(i),
        };
      });
    return dataPoints;
  }
}
