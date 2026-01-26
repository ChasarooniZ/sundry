import antfu from "@antfu/eslint-config";

export default antfu(
	{
		formatters: true,

		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: true,
		},

		languageOptions: { parserOptions: { ecmaVersion: 2025 } },

		rules: {
			"import/order": "off",
			"sort-imports": "off",
			"unicorn/consistent-function-scoping": "off",
			"antfu/consistent-list-newline": "warn",
			"antfu/if-newline": "off",
			"import/no-mutable-exports": "off",
			"style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
			"unused-imports/no-unused-vars": "warn",
			"node/prefer-global/process": "off",
		},

		ignores: [],
	},
);