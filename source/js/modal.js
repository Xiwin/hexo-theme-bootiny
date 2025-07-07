const elements = {
    overlay: document.querySelector('.search-pop-overlay'),
    modal: document.querySelector('.modal'),
    input: document.getElementById('search-text'),
    btnDesktop: document.querySelector('#search-pop-btn'),
    btnMobile: document.querySelector('#search-pop-btn-mobile')
};

const searchModal = {
    open() {
        console.log('Opening search modal');
        elements.overlay.classList.add('search-active');
        // 延迟聚焦，确保模态框完全显示后再聚焦
        setTimeout(() => {
            elements.input?.focus();
        }, 100);
    },
    close() {
        console.log('Closing search modal');
        elements.modal.classList.add('closing');
        setTimeout(() => {
            elements.overlay.classList.remove('search-active');
            elements.modal.classList.remove('closing');
            elements.input?.blur(); // 确保失去焦点
        }, 300);
    }
};

const handleKeydown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchModal.open();
    } else if (e.key === 'Escape') {
        if (elements.overlay.classList.contains('search-active')) {
            e.preventDefault();
            searchModal.close();
        }
    }
};

const handleOverlayClick = (e) => {
    // 检查是否点击了模态框外部或关闭按钮
    if (e.target.classList.contains('search-pop-overlay') ||
        e.target.classList.contains('modal') ||
        e.target.classList.contains('btn-close')) {
        searchModal.close();
    }
};

// 确保DOM加载完成后再绑定事件
document.addEventListener('DOMContentLoaded', function () {
    // 绑定桌面端搜索按钮
    if (elements.btnDesktop) {
        elements.btnDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Desktop search button clicked');
            searchModal.open();
        });
    }

    // 绑定移动端搜索按钮
    if (elements.btnMobile) {
        elements.btnMobile.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile search button clicked');
            searchModal.open();
        });
    }

    // 绑定覆盖层点击事件
    if (elements.overlay) {
        elements.overlay.addEventListener('click', handleOverlayClick);
    }

    // 绑定键盘事件
    document.addEventListener('keydown', handleKeydown);
});