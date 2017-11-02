module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "mocha": true
  },
  "rules": {
    "no-underscore-dangle": "off",
    "max-len": ["error", 120, 2, {
      "ignoreComments": true,
      "ignoreTrailingComments": true
    }],
    "react/jsx-filename-extension": ["error", {"extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": ["error", { "forbid": ["array"] }],
  }
};
