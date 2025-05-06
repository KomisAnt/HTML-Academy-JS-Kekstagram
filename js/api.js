
function getData(onSuccess) {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    });
}

export { getData };
