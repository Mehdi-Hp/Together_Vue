module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 8
	},
	plugins: ['vue', 'xss', 'security', 'promise', 'no-loops'],
	extends: ['airbnb', 'prettier', 'prettier/standard', 'plugin:security/recommended', 'plugin:promise/recommended', 'plugin:array-func/recommended', 'plugin:vue/recommended'],
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'no-param-reassign': ['error', { props: false }],
		'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
		'arrow-body-style': ['error', 'always'],
		'space-before-function-paren': ['error', 'never'],
		'comma-dangle': ['error', 'never'],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
				optionalDependencies: false,
				peerDependencies: false
			}
		],
		'consistent-return': 'off',
		'no-shadow': 'off',
		'no-plusplus': 'off',
		'no-prototype-builtins': 'off',
		'no-underscore-dangle': 'off',
		'global-require': 'off',
		'prefer-promise-reject-errors': 'off',
		'function-paren-newline': 'off',
		'no-console': 'off',
		'prefer-arrow-callback': 'off',
		'func-names': 'off',
		'max-len': 'off',
		'vue/html-indent': ['error', 'tab'],
		'vue/max-attributes-per-line': [
			2,
			{
				singleline: 1,
				multiline: {
					max: 1,
					allowFirstLine: false
				}
			}
		],
		'vue/html-self-closing': 'off',
		'vue/attributes-order': 'off',
		'vue/require-prop-types': 'off',
		'no-loops/no-loops': 2,
		'promise/always-return': 'off',
		'promise/avoid-new': 'off',
		'promise/no-callback-in-promise': 'off',
		'promise/no-promise-in-callback': 'off',
		'security/detect-object-injection': 'off',
		'import/no-named-as-default': 'off',
		'import/no-named-as-default-member': 'off',
		'react/jsx-no-bind': 'off'
	}
};
