(function () {

  document.addEventListener("DOMContentLoaded", () => {
    conectDB();

    form.addEventListener("submit", validateClient);
  });

  function validateClient(e) {
    e.preventDefault();

    // read inputs

    const name = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#telefono").value;
    const company = document.querySelector("#empresa").value;

    if (name === "" || email === "" || phone === "" || company === "") {
      printAlert("Every field is needed", "error");
      return;
    }

    // Create an object with the information

    const client = { name, email, phone, company, id: Date.now() };

    createNewClient(client);
  }

  function createNewClient(client) {
    console.log('creating new client')
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.add(client);

    transaction.onerror = (e) => {
      printAlert("There was an error, check your data again", "error");
    };

    transaction.oncomplete = () => {
      form.reset();
      printAlert("New client created ok");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    };
  }
})();
