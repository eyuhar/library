let myLibrary = [];

function Book(author, title, NumberOfPages, isRead){
    this.author = author;
    this.title = title;
    this.NumberOfPages = NumberOfPages;
    this.isRead = false;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}