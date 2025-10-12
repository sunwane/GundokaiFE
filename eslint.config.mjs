/* eslint-disable */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ("next/core-web-vitals", "next/typescript"),
    rules: {
    // Thêm hoặc ghi đè các quy tắc ESLint tại đây nếu cần
    "react/react-in-jsx-scope": "off", // Next.js tự động import React
    "react/jsx-uses-react": "off", // Next.js tự động import React
    },
  }),
];

export default eslintConfig;
