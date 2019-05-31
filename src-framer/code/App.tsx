import { Data, animate, Override, Animatable } from 'framer';

// eslint-disable-next-line new-cap
const data = Data({ scale: Animatable(1) });

export const Scale: Override<any> = () => {
  return {
    scale: data.scale,
    onTap() {
      data.scale.set(0.6);
      animate.spring(data.scale, 1);
    },
  };
};
