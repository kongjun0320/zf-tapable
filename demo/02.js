const { SyncBailHook } = require('tapable');

const hook = new SyncBailHook(['name', 'age']);

hook.tap('1', (name, age) => {
  console.log(1, name, age);
});

hook.tap('2', (name, age) => {
  console.log(2, name, age);
  // 如果有一个事件函数的返回值不为 undefined，则跳过剩下的事件函数
  return 'result2';
});

hook.tap('3', (name, age) => {
  console.log(3, name, age);
});

hook.call('aic', 27);
