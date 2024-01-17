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
      booksArray.forEach((book, i) => {
        const contenutoCard = document.createElement("div");
        contenutoCard.classList.add("col-4");
        contenutoCard.innerHTML = `
                      <div class="card border-warning" >
                         <img src="${
                           book.img
                         }" class="card-img-top h-100" alt="copertina">
                         <div class="card-body text-center ">
                          <h5 class="card-title"><span class = "text-danger">Title:</span><br>${book.title.toUpperCase()}</h5>
                          <p class="card-text">PRICE: ${book.price}</p>
                          <div class = "row row-col-2  align-items-center g-2">
                           <a href="#" class="btn btn-primary">SCARTA</a>
                           <a href="#" class="btn btn-danger mt-1">AGGIUNGI A CARRELLO</a>
                          </div>
                         </div>
                      </div>
        `;
        divBook.appendChild(rowCard);
        rowCard.appendChild(contenutoCard);

        const deleteButton = contenutoCard.querySelector(".btn-primary");
        deleteButton.addEventListener("click", function () {
          contenutoCard.closest(".col-4").remove();
        });

        const addToCartButton = contenutoCard.querySelector(".btn-danger");
        addToCartButton.addEventListener("click", function (e) {
          e.preventDefault();
          const card = this.closest(".col-4");
          const carrello = document.getElementById("carrello");
          const titolo = document.getElementsByClassName("card-title")[i];
          carrello.appendChild(titolo);
          titolo.classList.add("mb-4");
          card.classList.add("d-none");

          const bottTogliCarrello = document.createElement("button");
          bottTogliCarrello.textContent = "RIMUOVI";
          bottTogliCarrello.classList.add(
            "fs-5",
            "col-12",
            "py-1",
            "px-3",
            "bg-dark",
            "text-white",
            "mt-2"
          );
          titolo.appendChild(bottTogliCarrello);
          bottTogliCarrello.addEventListener("click", function () {
            card.classList.remove("d-none");
            titolo.remove();
          });
        });
      });
    })
    .catch((errore) => {
      console.log("Errore generico", errore);
    });
};

getBook();
