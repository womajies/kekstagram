const getDataUrl = 'https://23.javascript.pages.academy/kekstagram/data';
const sendDataUrl = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(getDataUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(sendDataUrl,
    {
      method: 'POST',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        onFail();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
