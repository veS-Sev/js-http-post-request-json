let contactForm = document.getElementById('form'),
  contactInput = contactForm.getElementsByTagName('input'),
  statusLoading = document.createElement('div');

statusLoading.classList.add('status');
// добавляем  в html атрибут name и его значения, если их нет. 
contactInput[0].setAttribute('name', 'email');
contactInput[1].setAttribute('name', 'tel');

// навешиваем обработчик на form. Это важно! На input навешивать не следует.
contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  contactForm.appendChild(statusLoading);
  let request = new XMLHttpRequest();

  request.open('POST', 'server.php');
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  let contactFormData = new FormData(contactForm);

  let contain = {};
  contactFormData.forEach(function (value, key) {
    contain[key] = value;
  });

  let contact = JSON.stringify(contain);
  request.send(contact);

  // сообщаем пользователю о процессе загрузки
  let message = {
    loading: 'Секундочку! Еще загружается...',
    succes: "Все ок!",
    error: 'Что-то пошло не так...'
  };

  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status == 200) {
      statusLoading.innerHTML = message.succes;

    } else if (request.readyState < 4) {
      statusLoading.innerHTML = message.loading;

    } else {
      statusLoading.innerHTML = message.error;
    }
  });

  for (let i = 0; i < contactInput.length; i++) {
    contactInput[i].value = "";
  }

});