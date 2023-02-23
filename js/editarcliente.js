(function() {
  let DB;

  const nameInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#telefono');
  const companyInput = document.querySelector('#empresa');

  document.addEventListener('DOMContentLoaded', () => {
    connectDB();

    // Chek url client id

    const urlParams = new URLSearchParams(window.location.search);
    const idClient = urlParams.get('id');

    if(idClient) {
      setTimeout( () => {
        getClient(idClient);
      },500)
    }



  });

  function getClient(id) {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    const client = objectStore.openCursor();
    client.onsuccess = (e) => {
      const cursor = e.target.result;

      if(cursor) {
        if(cursor.value.id === Number(id)) {
          
          fillForm(cursor.value);
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

  function connectDB() {
    const openConection = window.indexedDB.open('crm', 1);

    openConection.onerror = () => {
      console.log('There was an error')
    }

    openConection.onsuccess = () => {
      DB = openConection.result;
    }
  }

})();