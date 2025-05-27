document.addEventListener('DOMContentLoaded', () => {
    const topBtn = document.querySelector('#backTopButton');

    topBtn.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    });
});