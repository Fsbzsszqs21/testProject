/* =========================================================
 * 公共工具：基于 localStorage 的轻量共享状态
 * 提供主题、用户等跨模块共享的数据读写。
 * 用法：在每个模块里 <script src="../../shared/js/common.js"></script>
 * 然后调用全局 App 对象：
 *   App.getTheme() / App.setTheme('dark') / App.toggleTheme() / App.applyTheme()
 *   App.getUser() / App.setUser('小明') / App.clearUser()
 * ========================================================= */
(function (global) {
    const KEY_THEME = 'app.theme';
    const KEY_USER = 'app.user';

    function get(key, fallback) {
        try {
            const v = localStorage.getItem(key);
            return v === null ? fallback : v;
        } catch (e) {
            return fallback;
        }
    }

    function set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            /* 隐私模式等情况写入失败时静默忽略 */
        }
    }

    function remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {}
    }

    const App = {
        /* ---------- 主题 ---------- */
        getTheme() {
            return get(KEY_THEME, 'light');
        },
        setTheme(theme) {
            set(KEY_THEME, theme);
            this.applyTheme();
        },
        toggleTheme() {
            this.setTheme(this.getTheme() === 'dark' ? 'light' : 'dark');
        },
        applyTheme() {
            document.documentElement.setAttribute('data-theme', this.getTheme());
        },

        /* ---------- 共享用户 ---------- */
        getUser() {
            return get(KEY_USER, '');
        },
        setUser(name) {
            set(KEY_USER, name);
        },
        clearUser() {
            remove(KEY_USER);
        }
    };

    global.App = App;
})(window);
