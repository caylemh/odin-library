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
};

function Book(title, author, pages, read){
    if(!new.target){
        throw Error("You must use the 'new' operator before calling this constructor.");
    }
    this.id = crypto.randomUUID()   // Use to create a unique ID for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.isBookRead = function(book) {
  if (book.read == "No") {
    book.read = "Yes";
  } else if(book.read == "Yes"){
    book.read = "No";
  }

  //Clear the Card Container
  cardContainer.textContent = "";

  //Add the cards to the page again
  addBooksToPage();
};

function addBookToLibrary(title, author, pages, read) {
  // Create a new Book object
  const book = new Book(title, author, pages, read);

  // Add the new book to the Library array
  myLibrary.push(book);
}
  
function addBooksToPage() {
  myLibrary.forEach(book => {
    const count =  myLibrary.indexOf(book);

    const bookCard = elementFromHtml(`
      <div class="card">
        <div id="details">
          <h1>${book.title}</h1>
          <h4>${book.author}</h4>
          <p>Pages:  ${book.pages}</p>
          <p>Read It? <span id="readColor${count}">${book.read}</span></p>
        </div>
        <div id="btnContainer">
          <button id="deleteBtn${count}">Delete?</button>
          <button id="readBtn${count}">Read Toggle</button>
        </div>
      </div>
    `);

    cardContainer.appendChild(bookCard);

    //Deleting a book from the library
    document.querySelector(`#deleteBtn${count}`).addEventListener("click", () => {
      deleteBook(book.id);
    });

    document.querySelector(`#readBtn${count}`).addEventListener("click", () => {
      book.isBookRead(book);
    });
  });
}

// Delete books from library
function deleteBook(id) {
  myLibrary.forEach(book => {
    const bookId = myLibrary.indexOf(book);
    if (book.id === id) {
      if(confirm("Are you sure you want to delete?")) {
        myLibrary.splice(bookId,1);
      }
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