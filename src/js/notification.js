import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const option = {
    position: 'topRight',
    timeout: 3500
}

export const showSuccessNotification = (message) => iziToast.success({
    ...option,
    message
});

export const showInfo = (message) => iziToast.info({
    ...option,
    message
});


export const showError = (message) => iziToast.error({
    ...option,
    title: 'Opps!',
    message
});