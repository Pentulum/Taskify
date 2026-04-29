module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    collectCoverageFrom: [
        'src/app.js'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/db/'
    ],
    forceExit: true
};