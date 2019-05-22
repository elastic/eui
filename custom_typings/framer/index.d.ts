/**
 * This was cobbled together from a few places, most notably:
 *
 * https://github.com/modest/framerx-js-lib/blob/master/src/index.d.ts
 *
 * It's extremley incompletely, probably wrong and shouldn't be relied upon
 * to do almost anything.
 */

declare module 'framer' {
  export enum ControlType {
    Boolean = 'boolean',
    Number = 'number',
    String = 'string',
    FusedNumber = 'fusednumber',
    Enum = 'enum',
    SegmentedEnum = 'segmentedenum',
    Color = 'color',
    Image = 'image',
    File = 'file',
    ComponentInstance = 'componentinstance',
    Array = 'array',
    Object = 'object',
  }

  export interface PropertyControls {
    [propName: string]: { type: ControlType; [otherProp: string]: any };
  }

  export type Override<
    T extends object & {
      [key: string]: any;
    }
  > = OverrideObject<T> | OverrideFunction<T>;

  export type OverrideFunction<P extends object = any> = (
    props: P
  ) => Partial<P>;

  export type OverrideObject<T extends object = any> = Partial<T>;

  export function Data<T extends object = object>(
    initial?: Partial<T> | object
  ): T;

  export interface Animatable<Value> {
    get(): Value;
    set(value: Value | Animatable<Value>): void;
    set(value: Value | Animatable<Value>, transaction?: number): void;
  }

  export function Animatable<Value>(
    value: Value | Animatable<Value>
  ): Animatable<Value>;

  export interface Animate {
    spring(from: any, to: any, options?: object): any;
    bezier(from: any, to: any, options?: object): any;
    linear(from: any, to: any, options?: number | object): any;
    ease(from: any, to: any, options?: object): any;
    easeIn(from: any, to: any, options?: object): any;
    easeOut(from: any, to: any, options?: object): any;
    easeInOut(from: any, to: any, options?: object): any;
  }

  export const animate: Animate;
}
