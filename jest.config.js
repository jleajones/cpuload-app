module.exports = {
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'test'
    },
    restoreMocks: true,
    coveragePathIgnorePatterns: [
        'node_modules',
        'bin',
        'src/app.js'
    ],
    coverageReporters: ['text', 'html']
};
