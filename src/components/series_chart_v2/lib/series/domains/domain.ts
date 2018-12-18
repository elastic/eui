import { Domain } from '../../utils/domain';
import { ScaleType } from '../../utils/scales/scales';

export interface BaseDomain {
  scaleType: ScaleType;
  domain: Domain;
  isBandScale: boolean;
}
