module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "airbnb",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "jsx-a11y", "import", "prettier", "unused-imports"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off", // Not needed in Next.js or Vite
    "import/no-unresolved": "off",
    "react/prop-types": "off",

    // 🧹 Unused code cleanup
    "no-unused-vars": "off", // turn off core rule
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "unused-imports/no-unused-imports": "warn",
  },
};
