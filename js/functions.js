let DB;


function printAlert(message, typeAlert) {

  const alert = document.querySelector('.alert');

  if(!alert) {

    const divAlert = document.createElement('DIV');
    divAlert.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alert');

    if(typeAlert === 'error') {
      divAlert.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    } else {
      divAlert.classList.add('bg-green=100', 'border-green-400', 'text-green-700');
    }

    divAlert.textContent = message;

    form.appendChild(divAlert);

    setTimeout(() => {
      divAlert.remove();
    }, 3000)
  }
}


function conectDB() {
    
  const openConection = window.indexedDB.open('crm', 1);

  openConection.onerror = () => {
    console.log('there was an error');
    return
  };

  openConection.onsuccess = () => {
    DB = openConection.result;
  }

};

function getClient(id, action) {
  const transaction = DB.transaction(['crm'], 'readwrite');
  const objectStore = transaction.objectStore('crm');

  const client = objectStore.openCursor();
  client.onsuccess = (e) => {
    const cursor = e.target.result;

    if(cursor) {
      if(cursor.value.id === Number(id)) {
        console.log(cursor.value);
        action(cursor.value);
      }

      cursor.continue();
    }
  }
}

function fillForm(clientData) {

  const { name, email, phone, company } = clientData;

  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;
  companyInput.value = company;

}

function showName(clientData) {
  const { name } = clientData;
  return name;
}