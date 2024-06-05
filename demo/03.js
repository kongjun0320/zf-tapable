const { SyncWaterfallHook } = require('tapable');

const hook = new SyncWaterfallHook(['name', 'age']);

hook.tap('1', (name, age) => {
  console.log(1, name, age);
  // 前一个的返回值，会作为下一个函数的第一个参数
  return 'result1';
});

hook.tap('2', (name, age) => {
  console.log(2, name, age);
  return 'result2';
});

hook.tap('3', (name, age) => {
  console.log(3, name, age);
});

hook.call('aic', 27);
