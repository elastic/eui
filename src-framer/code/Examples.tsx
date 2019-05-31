import { Data, animate, Override, Animatable } from 'framer';

/* eslint-disable new-cap */

const data = Data({
  toggle: true,
  scale: Animatable(1),
  opacity: Animatable(1),
  rotation: Animatable(0),
  rotationY: Animatable(0),
});

export const Scale: Override<any> = () => {
  return {
    scale: data.scale,
    onTap() {
      data.scale.set(0.6);
      animate.spring(data.scale, 1);
    },
  };
};

export const Rotate: Override<any> = (props: any) => {
  data.rotation.set(props.rotation);

  return {
    rotation: data.rotation,
    onTap() {
      animate.spring(data.rotation, data.rotation.get() + 90, {
        tension: 250,
        friction: 20,
      });
    },
  };
};

export const Fade: Override<any> = (props: any) => {
  data.opacity.set(props.opacity);

  return {
    opacity: data.opacity,
    onTap() {
      animate.linear(data.opacity, 0, 0.2);
    },
  };
};

export const FlipOutput: Override<any> = () => {
  return {
    rotationY: data.rotationY,
  };
};

export const FlipInput: Override<any> = () => {
  return {
    onTap() {
      const toggle = data.toggle;
      animate.spring(
        { rotationY: data.rotationY },
        {
          rotationY: toggle ? 360 : 0,
        },
        { tension: 200, friction: 20 }
      );
      data.toggle = !toggle;
    },
  };
};
