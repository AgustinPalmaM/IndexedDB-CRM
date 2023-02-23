(function () {
  
  const form = document.querySelector('#formulario')
  let DB;

  document.addEventListener('DOMContentLoaded', () => {
    
    conectDB();
    
    form.addEventListener( 'submit', validateClient );
    
  });
  
  function conectDB() {
    
    const openConection = window.indexedDB.open('crm', 1);
  
    openConection.onerror = () => {
      console.log('there was an error');
    };
  
    openConection.onsuccess = () => {
      DB = openConection.result;
    }
  
  };

  function validateClient(e) {
    e.preventDefault();

    // read inputs

    const name = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#telefono').value;
    const company = document.querySelector('#empresa').value;

    if(name === '' || email === '' || phone === '' || company === '') {
      printAlert('Every field is needed', 'error');
      return;

    }

    // Create an object with the information

    const client = { name, email, phone, company, id: Date.now() };

    createNewClient(client);

    
  }

  function createNewClient(client) {
    
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.add(client)

    transaction.onerror = (e) => {
      printAlert('There was an error, check your data again', 'error');
    }

    transaction.oncomplete = () => {

      form.reset()
      printAlert('New client created ok');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000)

    }
  }

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
})();
