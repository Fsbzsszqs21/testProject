// 聊天室模块的入口脚本 —— 在这里编写你的功能逻辑
App.applyTheme();

const userDisplay = document.getElementById('userDisplay');
const userInput = document.getElementById('userInput');

function renderUser() {
    const name = App.getUser();
    userDisplay.textContent = name || '未设置';
    userInput.value = name;
}
renderUser();

document.getElementById('saveUser').addEventListener('click', function () {
    App.setUser(userInput.value.trim());
    renderUser();
});

document.getElementById('toggleTheme').addEventListener('click', function () {
    App.toggleTheme();
});
