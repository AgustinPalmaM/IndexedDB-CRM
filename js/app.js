(function() {

  let DB;
  
  document.addEventListener('DOMContentLoaded', () => {
    createDB();
  })

})();

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