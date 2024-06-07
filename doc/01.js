// 动态创建的
// this.call = CALL_DELEGATE

const callFn = new Function('a,b', 'return a + b');

function callFn2(a, b) {
  return a + b;
}

console.log(callFn(1, 2));
console.log(callFn2(1, 2));
