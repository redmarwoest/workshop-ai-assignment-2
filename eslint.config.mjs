import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["prettier"],
    overrides: [
      {
        files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
        rules: {
          "prettier/prettier": ["error"],
          "react/function-component-definition": [
            2,
            {
              namedComponents: ["arrow-function", "function-declaration"],
            },
          ],
          "react/no-multi-comp": ["error", { "ignoreStateless": true }],
          "react/jsx-props-no-spreading": "off",
          "react/prop-types": "off",
          "react/react-in-jsx-scope": 0,
          "react/require-default-props": "off",
          "@typescript-eslint/no-unused-vars": ["error"],
          quotes: ["error", "single", { avoidEscape: true }],
          eqeqeq: ["error", "always"],
          "import/prefer-default-export": [
            "error",
            {
                "target": "single"
            }
          ],
          "prefer-const": ["error", { destructuring: "any", ignoreReadBeforeAssign: false }],
          "no-else-return": ["error"],
          "import/no-duplicates": ["error", { "prefer-inline": false }],
          "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: true }],
          "no-multiple-empty-lines": [
            "error",
            {
              max: 1,
              maxEOF: 0,
              maxBOF: 0,
            },
          ],
          "@typescript-eslint/consistent-type-imports": "error",
          "default-case": ["error"],
          "linebreak-style": ["error", "unix"],
          "react/self-closing-comp": ["error"],
          "react/jsx-curly-brace-presence": [
            "error",
            {
              props: "never",
              children: "never",
              propElementValues: "always",
            },
          ],
        },
      },
    ],
  }),
];

export default eslintConfig;
