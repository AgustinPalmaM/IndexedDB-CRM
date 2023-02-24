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
    console.log('conection ok')
    console.log(DB);
  }

};