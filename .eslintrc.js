module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "react-app"
  ],
  "globals": {
    "test": true,
    "expect": true,
    "describe": true,
    "beforeAll": true,
    "beforeEach": true,
    "process": true,
    "afterAll": true
  },
  "rules": {
    "indent": [
      "off",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single",
      "avoid-escape"
    ],
    "semi": [
      "error",
      "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0
  },
  "plugins": [
    "cypress"
  ],
  "env": {
    "cypress/globals": true
  }
}