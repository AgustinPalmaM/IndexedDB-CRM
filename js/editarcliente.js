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
        getClient(idClient, fillForm);
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
      },500)
    }

    transaction.onerror = () => {
      printAlert('There was an error', 'error')
    }
  }






})();