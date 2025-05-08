import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      import: eslintPluginImport,
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Unused cleanup
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Safety & clean code
      "no-console": "warn",
      "no-debugger": "warn",
      "no-undef": "warn",
      "no-unused-vars": "off", // Handled by unused-imports
      "no-redeclare": "warn",
      "no-dupe-keys": "warn",
      "no-duplicate-case": "warn",
      "no-empty": "warn",
      // "no-fallthrough": "warn",
      // "no-unreachable": "warn",
      // "no-unexpected-multiline": "warn",
      // "no-self-compare": "warn",
      // "no-unsafe-negation": "warn",
      // "no-useless-escape": "warn",
      // "no-irregular-whitespace": "warn",
      // "no-cond-assign": ["warn", "always"],

      // // Best practices
      // eqeqeq: ["warn", "always"],
      // "prefer-const": "warn",
      // "no-var": "warn",
      // "object-shorthand": ["warn", "always"],
      // "no-lonely-if": "warn",
      // "no-else-return": "warn",
      // "consistent-return": "warn",
      // "arrow-body-style": ["warn", "as-needed"],
      // "prefer-arrow-callback": "warn",

      // // Imports
      // "import/no-unresolved": "warn",
      // "import/no-duplicates": "warn",
      // "import/order": [
      //   "warn",
      //   {
      //     groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      //     "newlines-between": "always",
      //   },
      // ],

      // // Hooks
      // "react-hooks/rules-of-hooks": "error",
      // "react-hooks/exhaustive-deps": "warn",
    },
  },
];
