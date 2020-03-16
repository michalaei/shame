import * as SystemActions from './system.actions';

describe('System', () => {
  it('should create an instance', () => {
    expect(new SystemActions.LoadSystems()).toBeTruthy();
  });
});
