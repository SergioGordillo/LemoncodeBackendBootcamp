/*import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "./tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "^#(.*)$": "<rootDir>/src/$1",
  },
};

export default config;*/

import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^\\.\\/room\\.mappers\\.js$": "<rootDir>/src/pods/room/room.mappers.ts",
    "^\\./room-detail\\.mappers\\.js$":
      "<rootDir>/src/pods/room/detail/room-detail.mappers.ts",
    "^#(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
