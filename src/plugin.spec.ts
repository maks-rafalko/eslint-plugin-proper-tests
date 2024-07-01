import plugin from './plugin';

describe('proper tests plugin', (): void => {
  test('it exports all rules', (): void => {
    expect(Object.keys(plugin.rules)).toEqual([
      'no-useless-matcher-to-be-defined',
      'no-useless-matcher-to-be-null',
      'no-mixed-expectation-groups',
    ]);
  });

  test('it exposes recommended plugin', (): void => {
    expect(Object.keys(plugin.configs)).toEqual(['recommended']);
  });
});
