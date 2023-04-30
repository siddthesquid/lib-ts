import type { Config } from "jest"

const config: Config = {
  // Which files to test
  testMatch: ["**/test/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["node_modules", "dist", "coverage"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },

  // Test environment
  testTimeout: 60000,

  // Coverage
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
  coveragePathIgnorePatterns: ["node_modules", "dist"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "json", "html", "cobertura", "text"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}

export default config
