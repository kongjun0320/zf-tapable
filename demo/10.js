const { AsyncSeriesWaterfallHook } = require('tapable');

const hook = new AsyncSeriesWaterfallHook(['name', 'age']);

console.time('cost');

hook.tapAsync('1', (name, age, callback) => {
  setTimeout(() => {
    console.log(1, name, age);
    callback(null, '结果1');
  }, 1000);
});

hook.tapAsync('2', (name, age, callback) => {
  setTimeout(() => {
    console.log(2, name, age);
    callback(null, '结果2');
  }, 2000);
});

hook.tapAsync('3', (name, age, callback) => {
  setTimeout(() => {
    console.log(3, name, age);
    callback();
  }, 3000);
});

hook.callAsync('aic', 27, () => {
  console.timeEnd('cost');
});
