module.exports = {
    automock: false,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/*.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    moduleFileExtensions: ['js'],
    roots: ['src'],
    transform: {
        '.js$': 'babel-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: true
};
