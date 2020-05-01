module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js'
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  coverageReporters: ['text', 'html']
};
