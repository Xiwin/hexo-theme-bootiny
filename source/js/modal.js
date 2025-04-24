// 获取按钮和模态框元素
const openModalButton = document.getElementById('openSearchModal');
const customModal = document.getElementById('searchModal');
const closeModalButtons = customModal.querySelectorAll('[data-bs-dismiss="modal"]');

// 打开模态框
openModalButton.addEventListener('click', () => {
    customModal.style.display = 'flex'; // 显示模态框
    customModal.classList.add('slide-in'); // 添加打开动画类
    customModal.classList.remove('slide-out'); // 移除关闭动画类
});

// 关闭模态框
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        customModal.classList.add('slide-out'); // 添加关闭动画类
        customModal.classList.remove('slide-in'); // 移除打开动画类
        setTimeout(() => {
            customModal.style.display = 'none'; // 隐藏模态框
        }, 400); // 等待动画完成后隐藏
    });
});

// 点击模态框外部关闭模态框
customModal.addEventListener('click', (event) => {
    if (event.target === customModal) {
        customModal.classList.add('slide-out'); // 添加关闭动画类
        customModal.classList.remove('slide-in'); // 移除打开动画类
        setTimeout(() => {
            customModal.style.display = 'none'; // 隐藏模态框
        }, 400); // 等待动画完成后隐藏
    }
});