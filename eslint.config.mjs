import nextConfig from "eslint-config-next";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextConfig,
  {
    rules: {
      // Keep the codebase free of stray console output in production code;
      // errors are still allowed to surface for debugging during development.
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default config;
