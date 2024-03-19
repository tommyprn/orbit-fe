import Swal from 'sweetalert2';

export const showToast = (icon, text) => {
  Swal.mixin({
    timer: 3000,
    toast: true,
    position: 'top-end',
    animation: false,
    showConfirmButton: false,
  }).fire({
    icon: icon,
    title: text,
  });
};
