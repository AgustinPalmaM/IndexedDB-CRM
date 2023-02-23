(function() {

  let DB;
  
  document.addEventListener('DOMContentLoaded', () => {
    createDB();

    if(window.indexedDB.open('crm', 1)) {

      printClients();
    
    }
  })

  function createDB() {
    const createDB = window.indexedDB.open('crm', 1);
  
    createDB.onerror = () => {
      console.log('hubo un error');
    }
  
    createDB.onsuccess = () => {
      DB = createDB.result;
    };
  
    createDB.onupgradeneeded = (e) => {
  
      const db = e.target.result;
  
      const objectStore = db.createObjectStore( 'crm', { 
        keyPath: 'id', 
        autoIncrement: true} 
      );
  
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('phone', 'phone', { unique: false });
      objectStore.createIndex('companyName', 'companyName', { unique: false });
      objectStore.createIndex('id', 'id', { unique: true });
  
      console.log('db created successfully');
  
  
  
    }
  }

  function printClients() {
  
    const openConection = window.indexedDB.open('crm', 1);

    openConection.onerror = () => {
      console.log('there was an error');
    }

    openConection.onsuccess = () => {
      DB = openConection.result;
      const objectStore = DB.transaction('crm').objectStore('crm');
      const tableBody = document.querySelector('#listado-clientes');
      
      
        objectStore.openCursor().onsuccess = (e) => {
          const cursor = e.target.result

          if(cursor) {
            const { id, name, email, phone, company} = cursor.value;

            const tr = document.createElement('TR');

            const tdNameEmail = document.createElement('TD');
            const pName = document.createElement('P');
            const pEmail = document.createElement('P');
            tdNameEmail.className = 'px-6 py-4 whitespace-no-wrap border-b border-gray-200';
            pName.className = 'text-sm leading-5 font-medium text-gray-700 text-lg font-bold';
            pEmail.className = 'text-sm leading-10 text-gray-700';
            pName.textContent = name;
            pEmail.textContent = email;
            tdNameEmail.appendChild(pName);
            tdNameEmail.appendChild(pEmail);

            const tdPhone = document.createElement('TD');
            const pPhone = document.createElement('P');
            tdPhone.className = 'px-6 py-4 whitespace-no-wrap border-b border-gray-200';
            pPhone.className = 'text-gray-700';
            pPhone.textContent = phone;
            tdPhone.appendChild(pPhone);

            const tdCompany = document.createElement('TD');
            const pCompany = document.createElement('P');
            tdCompany.className = 'px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700';
            pCompany.className = 'text-gray-600';
            pCompany.textContent = company;
            tdCompany.appendChild(pCompany);

            const tdActions = document.createElement('TD');
            const aEdit = document.createElement('A');
            const aDelete = document.createElement('A');
            tdActions.className = 'px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-sm cursor-pointer';
            aEdit.className = 'text-teal-600 hover:text-teal-900 mr-5'
            aDelete.className = 'text-red-600 hover:text-red-900 mr-5'
            aEdit.textContent = 'Edit';
            aDelete.textContent = 'Delete';
            aEdit.setAttribute('href', `editar-cliente.html?id=${id}`);
            aDelete.setAttribute('href', '#');
            aDelete.setAttribute('data-cliente', `${id}`);
            tdActions.appendChild(aEdit);
            tdActions.appendChild(aDelete);
            tr.appendChild(tdNameEmail);
            tr.appendChild(tdPhone);
            tr.appendChild(tdCompany);
            tr.appendChild(tdActions);

            tableBody.appendChild(tr)
            
            cursor.continue();
          }
        }

    }
    
  
  
  }

})();



