const myLibrary = [

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
  
function addBookToPage() {

}

/* Pseudocode

*/