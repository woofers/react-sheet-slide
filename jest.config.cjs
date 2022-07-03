
module.exports = {
  testMatch: ["./**/tests/index.[jt]s?(x)"],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.ts[x]?$": "ts-jest",
    "\\.[j]sx?$": "./jest-transformer.cjs",
  },
  setupFilesAfterEnv: [
    './tests/setup/index.ts'
  ],
  globals: {
    __isDev__: false
  },
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  coverageReporters: ['json-summary']
}
