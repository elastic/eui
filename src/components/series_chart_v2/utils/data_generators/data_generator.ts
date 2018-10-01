import { Simple1DNoise } from './simple_noise';

export class DataGenerator {
  private generator: Simple1DNoise;
  private frequency: number;
  constructor(frequency = 500) {
    this.generator = new Simple1DNoise();
    this.frequency = frequency;
  }
  public generateSimpleSeries(totalPoints = 50, group = 1) {
    const dataPoints = new Array(totalPoints)
      .fill(0)
      .map((value, i) => {
        return {
          x: i,
          y: 3 +  Math.sin(i / this.frequency) + this.generator.getValue(i),
          g: group,
        };
      });
    return dataPoints;
  }
  public generateGroupedSeries(totalPoints = 50, totalGroups = 2) {
    const groups = new Array(totalGroups)
      .fill(0)
      .map((group, i) => {
        return this.generateSimpleSeries(totalPoints, i);
      });
    return groups.reduce((acc, curr) => [...acc, ...curr]);
  }
}
