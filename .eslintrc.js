module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue', "prettier"
  ],
  rules: {
    // Name of componentes should be PascalCase
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    // Disables the rule
    "vue/multi-word-component-names": "off",
    // Forces the use of self closing tags
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
      },
    ],
  },
};
