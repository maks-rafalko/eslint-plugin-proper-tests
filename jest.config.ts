// eslint-disable-next-line import/no-extraneous-dependencies
import { Config } from '@jest/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig.json');

process.env.TZ = 'UTC';

/* eslint-disable @typescript-eslint/naming-convention */
const jestConfig: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'ts'],
  // https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/
  moduleNameMapper: compilerOptions.paths
    ? pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/..' })
    : undefined,
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '\\.ts?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  preset: 'ts-jest',
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/**/**.ts', '!<rootDir>/configs/recommended.ts'],
};

export default jestConfig;
