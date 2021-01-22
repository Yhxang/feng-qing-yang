module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        modules: false,
        corejs: {
          version: 3, // 使用core-js@3
          proposals: true,
        },
      },
    ],
  ],
  plugins: [],
  // plugins: [
  //   [
  //     '@babel/plugin-transform-runtime',
  //     {
  //       corejs: {
  //         version: 3,
  //         proposals: true,
  //       },
  //       useESModules: true,
  //     },
  //   ],
  // ],
};
