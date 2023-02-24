(function() {

  let idClient;
  document.addEventListener('DOMContentLoaded', () => {
    
    conectDB();

    // Update client information

    form.addEventListener( 'submit', updateClient );

    // Chek url client id

    const urlParams = new URLSearchParams(window.location.search);
    idClient = urlParams.get('id');

    if(idClient) {
      setTimeout( () => {
        getClient(idClient);
      },500)
    }



  });

  function updateClient(e) {
    e.preventDefault();

    if( nameInput.value === '' || emailInput.value === '' || phoneInput.value === '' || companyInput.value === '' ) {
      printAlert('there was an error', 'error');
      return
    } 

    // update client
    const updatedClient = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      company: companyInput.value,
      id: Number(idClient)
    }

    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.put(updatedClient);

    transaction.oncomplete = () => {
      printAlert('Client edited succesfully');
      setTimeout( () => {
        window.location.href = 'index.html'
      },1000)
    }

    transaction.onerror = () => {
      printAlert('There was an error', 'error')
    }
  }

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


})();