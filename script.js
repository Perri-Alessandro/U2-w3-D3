const getBook = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((risposta) => {
      console.log("RISPOSTA DEL SERVER", risposta);
      if (risposta.ok) {
        console.log("FETCH ESEGUITA CORRETTAMENTE");
        return risposta.json();
      } else {
        throw new Error("Errore generico");
      }
    })
    .then((booksArray) => {
      console.log(
        "BOOKS ARRAY, RISULTATO/RISPOSTA RICEVUTA CORRETTAMENTE",
        booksArray
      );
      const divBook = document.getElementById("divBook");
      const rowCard = document.createElement("div");
      rowCard.classList.add("row", "justify-content-center", "g-3");
      booksArray.forEach((book) => {
        const contenutoCard = document.createElement("div");
        contenutoCard.classList.add("col-4");
        contenutoCard.innerHTML = `
                      <div class="card border-warning" >
                         <img src="${
                           book.img
                         }" class="card-img-top" alt="copertina">
                         <div class="card-body text-center">
                          <h5 class="card-title">TITLE:<br>${book.title.toUpperCase()}</h5>
                          <p class="card-text">PRICE: ${book.price}</p>
                          <a href="#" class="btn btn-primary">SCARTA</a>
                         </div>
                      </div>
        `;
        divBook.appendChild(rowCard);
        rowCard.appendChild(contenutoCard);

        const deleteButton = contenutoCard.querySelector(".btn-primary");
        deleteButton.addEventListener("click", function () {
          contenutoCard.classList.add("d-none");
        });
      });
    })

    .catch((errore) => {
      console.log("Errore generico", errore);
    });
};

getBook();