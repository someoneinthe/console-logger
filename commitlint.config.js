module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [
      2,
      'always',
      90,
    ],
    'scope-case': [
      2,
      'always',
      'lower-case',
    ],
    'subject-case': [
      2,
      'always',
      'sentence-case',
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [
      2,
      'never',
      '.',
    ],
    'subject-max-length': [
      2,
      'always',
      70,
    ],
    'subject-min-length': [
      2,
      'always',
      10,
    ],
    'type-case': [
      2,
      'always',
      'lower-case',
    ],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
