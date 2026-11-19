// 备忘录模块的入口脚本 —— 在这里编写 crr 的功能逻辑
App.applyTheme();

let count = 0;
const countEl = document.getElementById('count');
function render() { countEl.textContent = count; }

document.getElementById('inc').addEventListener('click', function () { count++; render(); });
document.getElementById('dec').addEventListener('click', function () { count--; render(); });
document.getElementById('reset').addEventListener('click', function () { count = 0; render(); });
