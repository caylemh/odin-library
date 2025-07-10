const myLibrary = [];

const dialog = document.querySelector("dialog");
const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector("#addBookBtn");
const closeBtn = document.querySelector("#closeBtn");
const createBookBtn = document.querySelector("#createBook");
const bookForm = document.querySelector("#bookForm");

//Book variables
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");

// function to make an element from HTML
function elementFromHtml(html) {
  const template = document.createElement("template");

  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

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
  
function addBooksToPage() {
  myLibrary.forEach(book => {
    const btnNumber =  myLibrary.indexOf(book);

    const bookCard = elementFromHtml(`
      <div class="card">
        <div id="details">
          <h1>${book.title}</h1>
          <h4>${book.author}</h4>
          <p>Pages:  ${book.pages}</p>
          <p>Read?  ${book.read}</p>
        </div>
        <div id="btnContainer">
          <button id="deleteBtn${btnNumber}">Delete?</button>
          <button>Read?</button>
        </div>
      </div>
    `);

    cardContainer.appendChild(bookCard);

    //Deleting a book from the library
    document.querySelector(`#deleteBtn${btnNumber}`).addEventListener("click", () => {
      deleteBook(book.id);
    });
  });
  console.log(myLibrary)
}

// Delete books from library
function deleteBook(id) {
  myLibrary.forEach(book => {
    const bookId = myLibrary.indexOf(book);
    if (book.id === id) {
      myLibrary.splice(bookId,1);
    }
  });

  //Clear the Card Container
  cardContainer.textContent = "";

  //Add the cards to the page again
  addBooksToPage();
}

// Button to open Modal
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

// Button to close Modal
closeBtn.addEventListener("click", () => {
  dialog.close();
});

// Create a Book and add to the myLibrary array
createBookBtn.addEventListener("click", function(e) {
  e.preventDefault();

  //Reset the Card Container
  cardContainer.innerHTML = "";

  // Create the new Book
  addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.value);
  
  // Add the array top the Page
  addBooksToPage();

  // Reset the form for new input
  bookForm.reset();

  // close the Modal
  dialog.close();
});

// addBookToLibrary("The Hobbit", "JK Rowling", 310, "Yes");
// addBookToLibrary("The Alchemist", "Paul Coelho", 267, "No");
// addBookToLibrary("A Tale of Two Cities", "Charles Dickens", 200, "No");
// addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 197, "No");
// addBookToLibrary("Pride and Prejudice", "Jane Austen", 327, "No");
// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 301, "No");
// addBooksToPage();