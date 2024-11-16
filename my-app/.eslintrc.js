module.exports = {
    env: {
        browser: true,
        es2021: true,
        "cypress/globals": true,
    },
    extends: [
        "eslint:recommended",
        "plugin:cypress/recommended",
        "plugin:storybook/recommended"
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["cypress"],
    rules: {
        // Add custom rules here, if needed
    },
};