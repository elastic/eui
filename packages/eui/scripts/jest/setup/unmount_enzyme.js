const mockMountedComponents = [];
jest.mock('enzyme', () => {
  const enzyme = jest.requireActual('enzyme');
  return {
    ...enzyme,
    mount: component => {
      const mountedComponent = enzyme.mount(component);
      mockMountedComponents.push(mountedComponent);
      return mountedComponent;
    },
  };
});

afterAll(() => {
  while (mockMountedComponents.length) {
    const component = mockMountedComponents.pop();
    if (component.length === 1) {
      component.unmount();
    }
  }
});
