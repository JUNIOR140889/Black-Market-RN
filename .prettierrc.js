module.exports = {
    singleQuote: true,
    endOfLine: 'auto',
    arrowParens: 'avoid',
    bracketSameLine: true,
    bracketSpacing: true,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    plugins: ['prettier-plugin-tailwindcss'],
    importOrder: ['^@(.*)/(.*)$', '^[./*]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
  };
  