const myLibrary = [];

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
  // Create a new Book object
  const book = new Book(title, author, pages, read);

  // Add the new book to the Library array
  myLibrary.push(book);
}
  
function refreshBooks() {
  myLibrary.forEach(book => {
    console.log(book)
    document.querySelector(".card-container").innerHTML += `
      <div class="card" data-id="${book.id}">
        <div id="details">
          <h1>${book.title}</h1>
          <h4>${book.author}</h4>
          <p>${book.pages}</p>
          <p>${book.read}</p>
        </div>
        <div id="btnContainer">
          <button>Delete?</button>
          <button>Read?</button>
        </div>
      </div>
    `;
  });
}

// Button to open Modal
document.querySelector("#addBookBtn").addEventListener("click", () => {
  document.querySelector("dialog").showModal();
});

addBookToLibrary("The Hobbit", "JK Rowling", 310, "Yes");
addBookToLibrary("The Alchemist", "Paul Coelho", 267, "No");
addBookToLibrary("A Tale of Two Cities", "Charles Dickens", 200, "No");
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 197, "No");
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 197, "No");
// console.log(myLibrary);
refreshBooks();

/* Pseudocode

*/