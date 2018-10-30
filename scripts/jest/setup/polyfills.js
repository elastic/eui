import { MutationObserver, MutationNotifier } from '../polyfills/mutation_observer';

// polyfill window.MutationObserver and intersect jsdom's relevant methods
// from https://github.com/aurelia/pal-nodejs
// https://github.com/aurelia/pal-nodejs/blob/56396ff7c7693669dbafc8e9e49ee6bc29472f12/src/nodejs-pal-builder.ts#L63
Object.defineProperty(window, 'MutationObserver', { value: MutationObserver });
patchNotifyChange(window);

function patchNotifyChange(window) {
  const notifyInstance = MutationNotifier.getInstance();
  const notify = function (node) {
    notifyInstance.notifyChanged(node);
  };

  const nodeProto = window.Node.prototype;

  intersectMethod(nodeProto, 'appendChild', notify);
  intersectMethod(nodeProto, 'insertBefore', notify);
  intersectMethod(nodeProto, 'removeChild', notify);
  intersectMethod(nodeProto, 'replaceChild', notify);
  intersectSetter(nodeProto, 'nodeValue', notify);
  intersectSetter(nodeProto, 'textContent', notify);

  const charProto = window.CharacterData.prototype;

  intersectSetter(charProto, 'data', notify);

  const elementProto = window.Element.prototype;

  intersectMethod(elementProto, 'setAttribute', notify);
  intersectMethod(elementProto, 'removeAttribute', notify);
  intersectMethod(elementProto, 'removeAttributeNode', notify);
  intersectMethod(elementProto, 'removeAttributeNS', notify);
}

function intersectMethod(proto, methodName, intersect) {
  const orig = proto[methodName];
  proto[methodName] = function (...args) {
    const ret = orig.apply(this, args);
    intersect(this);
    return ret;
  };
}

function intersectSetter(proto, propertyName, intersect) {
  const old = Object.getOwnPropertyDescriptor(proto, propertyName);
  const oldSet = old.set;
  const newSet = function set(V) {
    oldSet.call(this, V);
    intersect(this);
  };
  Object.defineProperty(proto, propertyName, {
    set: newSet,
    get: old.get,
    configurable: old.configurable,
    enumerable: old.enumerable
  });
}
