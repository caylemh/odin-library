const myLibrary = [
    {id: 123456,
      title: "The Hobbit",
      author: "JK Rowling",
      pages: 310,
      read: "Yes",
    },
    {id: 112345,
      title: "The Alchemist",
      author: "Paulo Coelho",
      pages: 210,
      read: "No",
    },
];

function Book(title, author, pages, read){
    if(!new.target){
        throw Error("You must use the 'new' operator before calling this constructor.");
    }
    this.id = crypto.randomUUID()   // Use to create a unique ID for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
}
  
function refreshBooks() {
  myLibrary.forEach(book => {
    console.log(book)
    document.querySelector(".card-container").innerHTML += `
      <div class="card" data-id="${book.id}">
          <div id="details">
            <h2>${book.title}</h2>
            <h4>${book.author}</h4>
            <p>${book.pages}</p>
            <p>${book.read}</p>
          </div>
          <div id="buttons">
            <button>Delete?</button>
            <button>Read?</button>
          </div>
      </div>
    `;
  });
}

refreshBooks();

/* Pseudocode

*/