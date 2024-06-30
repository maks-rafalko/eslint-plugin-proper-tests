import * as tsutils from 'ts-api-utils';
import * as ts from 'typescript';

// inspired by https://github.com/typescript-eslint/typescript-eslint/blob/72c9dd3ff17803f51c964b350991348e566f40a9/packages/type-utils/src/typeFlagUtils.ts#L27

const getTypeFlags = (type: ts.Type): ts.TypeFlags => {
  // @ts-expect-error Since typescript 5.0, this is invalid, but uses 0 as the default value of TypeFlags.
  let flags: ts.TypeFlags = 0;

  for (const t of tsutils.unionTypeParts(type)) {
    flags |= t.flags;
  }

  return flags;
};

export const isTypeFlagSet = (type: ts.Type, flagsToCheck: ts.TypeFlags): boolean => {
  const flags = getTypeFlags(type);

  return (flags & flagsToCheck) !== 0;
};
