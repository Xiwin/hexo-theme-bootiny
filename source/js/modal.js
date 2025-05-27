const searchPopOverlay = document.querySelector('.search-pop-overlay');
const searchPopBtn = document.querySelector('#search-pop-btn');
const searchModal = document.querySelector('.modal');

// 打开搜索框
searchPopBtn.addEventListener('click', () => {
    searchPopOverlay.classList.add('search-active');
});

// 关闭搜索框
searchPopOverlay.addEventListener('click', (e) => {
    // 点击模态框外部或关闭按钮时关闭搜索框
    if (e.target.classList.contains('modal') || e.target.classList.contains('btn-close')) {
        closeSearchModal();
    }
});

// 绑定全局 Ctrl+K 快捷键，打开搜索框
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchPopOverlay.classList.add('search-active');
    } else if (e.key === 'Escape') {
        closeSearchModal();
    }
    setSearchInputFocus();
});

function setSearchInputFocus() {
    const searchInput = document.getElementById('search-text');
    if (searchInput) {
        searchInput.focus(); // 设置焦点到搜索输入框
    }
}

function closeSearchModal() {
    searchModal.classList.add('closing'); // 添加关闭动画类
    setTimeout(() => {
        searchPopOverlay.classList.remove('search-active'); // 移除激活状态
        searchModal.classList.remove('closing'); // 移除关闭动画类
    }, 300); // 等待动画完成（与 CSS 中的 transition 时间一致）
}