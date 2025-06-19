const elements = {
    overlay: document.querySelector('.search-pop-overlay'),
    modal: document.querySelector('.modal'),
    input: document.getElementById('search-text'),
    btn: document.querySelector('#search-pop-btn')
};

const searchModal = {
    open() {
        elements.overlay.classList.add('search-active');
        elements.input?.focus();
    },
    close() {
        elements.modal.classList.add('closing');
        setTimeout(() => {
            elements.overlay.classList.remove('search-active');
            elements.modal.classList.remove('closing');
        }, 300);
    }
};

const handleKeydown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchModal.open();
    } else if (e.key === 'Escape') {
        searchModal.close();
    }
};

const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('btn-close')) {
        searchModal.close();
    }
};

elements.btn.addEventListener('click', () => searchModal.open());
elements.overlay.addEventListener('click', handleOverlayClick);
document.addEventListener('keydown', handleKeydown);