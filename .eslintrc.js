// eslint --ext .js .
// eslint --ext .js . --fix

// https://eslint.org/docs/rules/

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'indent': [ // https://eslint.org/docs/rules/indent
      'error',
      2,
      {
        VariableDeclarator: {
          var: 2,
          let: 2,
          const: 3,
        },
        SwitchCase: 1,
        // flatTernaryExpressions:   false,
        // offsetTernaryExpressions: true,
        MemberExpression: 'off',
        // MemberExpression: 2,
      },
    ],
    'no-console': [ // https://eslint.org/docs/rules/no-console
      'error',
      {
        allow: [
          'info',
          'time',
          'timeEnd',
          'error',
        ],
      },
    ],
    // 'newline-per-chained-call': [ // https://eslint.org/docs/rules/newline-per-chained-call
    //   'error',
    //   {
    //     ignoreChainWithDepth: 1,
    //   },
    // ],
    'max-len': [ // https://eslint.org/docs/rules/max-len
      'warn',
      {
        code: 100,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        // 'ignore'
      },
    ],
    'no-mixed-spaces-and-tabs': [ // https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
      'error',
    ],
    'no-trailing-spaces': [ // https://eslint.org/docs/rules/no-trailing-spaces
      'error',
      {
        ignoreComments: true,
      },
    ],
    'padded-blocks': [ // https://eslint.org/docs/rules/padded-blocks
      'error',
      'never',
      {
        allowSingleLineBlocks: true,
      },
    ],
    'linebreak-style': [ // https://eslint.org/docs/rules/linebreak-style
      'error',
      'unix',
    ],
    'quotes': [ // https://eslint.org/docs/rules/quotes
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'semi': [ // https://eslint.org/docs/rules/semi
      'error',
      'always',
    ],
    'semi-style': [ // https://eslint.org/docs/rules/semi-style
      'error',
      'last',
    ],
    'block-scoped-var': [ // https://eslint.org/docs/rules/block-scoped-var
      'error',
    ],
    'block-spacing': [ // https://eslint.org/docs/rules/block-spacing
      'error',
      'always',
    ],
    'comma-dangle': [ // https://eslint.org/docs/rules/comma-dangle
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'only-multiline',
        functions: 'never',
      },
    ],
    'array-bracket-spacing': [ // https://eslint.org/docs/rules/array-bracket-spacing
      'error',
      'always',
      {
        singleValue: true,
        objectsInArrays: true,
        arraysInArrays: true,
      },
      // { 'objectsInArray': true },
      // { 'arraysInArrays': true },
    ],
    'func-call-spacing': [ // https://eslint.org/docs/rules/func-call-spacing
      'error',
      'never',
    ],
    'space-before-function-paren': [ // https://eslint.org/docs/rules/space-before-function-paren
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'key-spacing': [ // https://eslint.org/docs/rules/key-spacing
      'error',
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
        multiLine: {
          beforeColon: false,
          afterColon: true,
          mode: 'strict',
          // align:       'value',
        },
      },
    ],
    'brace-style': [ // https://eslint.org/docs/rules/brace-style
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    'comma-style': [ // https://eslint.org/docs/rules/comma-style
      'error',
      'last',
      {
        exceptions: {
          ArrayExpressions: false,
          ArrayPattern: false,
          ArrowFunctionExpression: false,
          CallExpression: false,
          FunctionDeclaration: false,
          FunctionExpression: false,
          ImportDeclaration: false,
          ObjectExpression: false,
          ObjectPattern: false,
          VariableDeclaration: false,
          NewExpression: false,
        },
      },
    ],
    'comma-spacing': [ // https://eslint.org/docs/rules/comma-spacing
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'arrow-body-style': [ // https://eslint.org/docs/rules/arrow-body-style
      'error',
      'as-needed',
    ],
    'arrow-parens': [
      'error',
      'always',
    ],
    'space-in-parens': [ // https://eslint.org/docs/rules/space-in-parens
      'error',
      'never',
    ],
    'no-whitespace-before-property': [ // https://eslint.org/docs/rules/no-whitespace-before-property
      'error',
    ],
    'no-tabs': [ // https://eslint.org/docs/rules/no-tabs
      'error',
    ],
    'space-unary-ops': [ // https://eslint.org/docs/rules/space-unary-ops
      'error',
      {
        words: true,
        nonwords: false,
        // 'nonwords': true,
        // 'overrides': {
        //   '++': false,
        //   '--': false,
        //   '!': false,
        // }
      },
    ],
    'space-before-blocks': [ // https://eslint.org/docs/rules/space-before-blocks
      'error',
      'always',
    ],
    'space-infix-ops': [ // https://eslint.org/docs/rules/space-infix-ops
      'error',
    ],
    'no-multi-spaces': [
      'error',
    ],
    'keyword-spacing': [ // https://eslint.org/docs/rules/keyword-spacing
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'prefer-object-spread': [ // https://eslint.org/docs/rules/prefer-object-spread
      'error',
    ],
    'no-new-object': [ // https://eslint.org/docs/rules/no-new-object
      'error',
    ],
    'eol-last': [ // https://eslint.org/docs/rules/eol-last
      'error',
      'always',
    ],
    'jsx-quotes': [ // https://eslint.org/docs/rules/jsx-quotes
      'error',
      'prefer-single',
    ],
    'no-multiple-empty-lines': [ // https://eslint.org/docs/rules/no-multiple-empty-lines
      'error',
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    'no-unneeded-ternary': [ // https://eslint.org/docs/rules/no-unneeded-ternary
      'error',
      {
        defaultAssignment: true,
      },
    ],
    'object-curly-spacing': [ // https://eslint.org/docs/rules/object-curly-spacing
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true,
      },
    ],
    'object-curly-newline': [ // https://eslint.org/docs/rules/object-curly-newline
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 2,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 2,
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 2,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2,
          consistent: true,
        },
      },
    ],
    'quote-props': [ // https://eslint.org/docs/rules/quote-props
      'error',
      'consistent-as-needed',
    ],
    'rest-spread-spacing': [ // https://eslint.org/docs/rules/rest-spread-spacing
      'error',
      'never',
    ],
    'template-curly-spacing': [ // https://eslint.org/docs/rules/template-curly-spacing
      'error',
      'never',
    ],
    'curly': [ // https://eslint.org/docs/rules/curly
      'error',
      // 'all',
      'multi',
    ],
    'no-dupe-keys': [ // https://eslint.org/docs/rules/no-dupe-keys
      'error',
    ],
    'one-var-declaration-per-line': [
      'error',
      'initializations',
    ],
    // 'no-extra-parens': [ // https://eslint.org/docs/rules/no-extra-parens
    //   'error',
    //   'all',
    //   {
    //     conditionalAssign:                  false,
    //     returnAssign:                       false,
    //     nestedBinaryExpressions:            false,
    //     ignoreJSX:                          'none',
    //     enforceForArrowConditionals:        false,
    //     enforceForSequenceExpressions:      false,
    //     enforceForNewInMemberExpressions:   false,
    //     enforceForFunctionPrototypeMethods: false,
    //   },
    // ],
  },
};
