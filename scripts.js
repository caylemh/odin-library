const myLibrary = [];

// DOM Element references
const dialog = document.querySelector("dialog");
const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector("#addBookBtn");
const closeBtn = document.querySelector("#closeBtn");
const createBookBtn = document.querySelector("#createBook");
const bookForm = document.querySelector("#bookForm");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputRead = document.querySelector("#read");

// Class for creating Book objects
class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = "No";
  }

  // Method to toggle the read status of a book
  toggleReadStatus() {
    this.read = this.read === "Yes" ? "No" : "Yes";
  }
}

// Function to create an element from an HTML string
function elementFromHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

// Function to create a book and add it to the library array
function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
}

// Function to handle the form submission
function handleFormSubmission(event) {
  event.preventDefault();
  addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value);
  bookForm.reset();
  dialog.close();
  renderLibrary();
}

// Function to render a single book card
function createBookCard(book) {
  const bookCard = elementFromHtml(`
    <div class="card" data-id="${book.id}">
      <div id="bookTitle">
        <h1>${book.title}</h1>
        <h4>${book.author}</h4>
      </div>
      <div id="details">
        <p>Pages: ${book.pages}</p>
        <p>Read It? <span class="read-status">${book.read}</span></p>
      </div>
      <div id="btnContainer">
        <button class="delete-btn">Delete?</button>
        <button class="read-toggle-btn">Read Toggle</button>
      </div>
    </div>
  `);

  // Add event listeners for the card's buttons
  bookCard.querySelector(".delete-btn").addEventListener("click", () => {
    deleteBook(book.id);
  });

  bookCard.querySelector(".read-toggle-btn").addEventListener("click", () => {
    book.toggleReadStatus();
    renderLibrary();
  });

  return bookCard;
}

// Function to render the entire library
function renderLibrary() {
  cardContainer.innerHTML = ""; // Clear the container
  myLibrary.forEach(book => {
    const card = createBookCard(book);
    cardContainer.appendChild(card);
  });
}

// Function to delete a book from the library
function deleteBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1 && confirm("Are you sure you want to delete?")) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

// Function to initialize all event listeners
function initializeEventListeners() {
  addBookBtn.addEventListener("click", () => dialog.showModal());
  closeBtn.addEventListener("click", () => dialog.close());
  bookForm.addEventListener("submit", handleFormSubmission);
}

// Initial setup
initializeEventListeners();

// Add initial library
addBookToLibrary("Pride & Prejudice", "Jane Austen", 133);
addBookToLibrary("The Hobbit","JK Rowling", 266);
addBookToLibrary("The Little Price","Antoine de Saint-Exupéry", 125);
renderLibrary();