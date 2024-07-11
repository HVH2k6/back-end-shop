const iconTheme = document.querySelector('.icon-theme');
if (iconTheme) {
  const dark = localStorage.getItem('dark');
  if (dark == 'true') {
    document.body.classList.add('dark');
    iconTheme.classList.replace('fa-moon', 'fa-sun');
  }
  iconTheme.addEventListener('click', () => {
    const mode = document.body.classList.toggle('dark');

    localStorage.setItem('dark', mode);
    if (mode === true) {
      iconTheme.classList.replace('fa-moon', 'fa-sun');
    } else {
      iconTheme.classList.replace('fa-sun', 'fa-moon');
    }
  });
}
const formDelete = document.querySelector('#form-delete');
const btnDelete = document.querySelectorAll('.btn-delete');
const form_abcde = document.querySelector('.form-abcde');
if (form_abcde) {
  const path = formDelete.getAttribute('data-path');
  if (path) {
    if (btnDelete) {
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          if (confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
            const id = btn.getAttribute('data-id');
            const action = `${path}/${id}?_method=DELETE`;
            formDelete.action = action;

            formDelete.submit();
          }
        });
      });
    }
  }
}
const alert = document.querySelector('.alert');
if (alert) {
setTimeout(() => {
    alert.remove();
  }, 4000);
}
