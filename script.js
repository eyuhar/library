let myLibrary = localStorage["libraryStorage"] ? JSON.parse(localStorage.getItem("libraryStorage")) : [];

function updateLocalStorage(){
    localStorage.setItem("libraryStorage", JSON.stringify(myLibrary));
}

class Book{
    constructor(id, author, title, numberOfPages, isRead){
        this.id = id;
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
    updateLocalStorage();
}

const addBook = document.querySelector(".addBook");
const addBookForm = document.querySelector(".addBookForm");
addBook.addEventListener("click", showNewBookForm);
const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", hideBookForm);

function showNewBookForm(e){
    addBookForm.classList.add("active");
    overlay.classList.add("active");
}

function hideBookForm() {
    addBookForm.classList.remove("active");
    overlay.classList.remove("active");
}

const authorInput = document.getElementById("author");
const titleInput = document.getElementById("title");
const numberOfPagesInput = document.getElementById("numberOfPages");
const isReadInput = document.getElementById("isRead");
const newBookBtn = document.getElementById("addNewBook");

newBookBtn.addEventListener("click", addNewBook);

function addNewBook(e){
    //e.preventDefault();

    if (authorInput.checkValidity() && titleInput.checkValidity() && numberOfPagesInput.checkValidity()) {
        let newBook = new Book( myLibrary.length === 0 ? myLibrary.length : myLibrary[myLibrary.length - 1].id + 1,
                                authorInput.value,
                                titleInput.value,
                                numberOfPagesInput.value,
                                isReadInput.checked);

        addBookToLibrary(newBook);
    }

    //hideBookForm();
    //resetFormInput();
    //resetBookList();
    //showBookList();
}

function resetFormInput(){
    authorInput.value = "";
    titleInput.value = "";
    numberOfPagesInput.value = "";
    isReadInput.checked = false;
}

const main = document.querySelector("main");

function showBookList(){
    myLibrary.forEach(book => {
        let bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookCard.setAttribute("data-id", book.id);

        let author = document.createElement("h4");
        author.innerHTML = "Author:";

        let authorValue = document.createElement("p");
        authorValue.innerHTML = `${book.author}`;

        let title = document.createElement("h4");
        title.innerHTML = "Title:";

        let titleValue = document.createElement("p");
        titleValue.innerHTML = `${book.title}`;

        let numberOfPages = document.createElement("h4");
        numberOfPages.innerHTML = "Pages:"

        let numberOfPagesValue = document.createElement("p");
        numberOfPagesValue.innerHTML = `${book.numberOfPages}`

        let wrapper = document.createElement("div");
        wrapper.classList.add("btns-wrapper");

        let isReadBtn = document.createElement("button");
        isReadBtn.innerHTML = `${book.isRead === true ? "Read" : "Not read"}`;
        isReadBtn.classList.add("isReadBtn", `${book.isRead === true ? "read" : "not-read"}`);
        isReadBtn.addEventListener("click", switchIsRead);

        let removeBtn = document.createElement("button");
        removeBtn.innerHTML = "Remove";
        removeBtn.classList.add("removeBtn");
        removeBtn.addEventListener("click", removeBook);
        
        wrapper.append(isReadBtn, removeBtn);

        bookCard.append(author, authorValue, title, titleValue, numberOfPages, numberOfPagesValue, wrapper);
        main.appendChild(bookCard);
    });
}

function resetBookList(){
    let bookcards = document.querySelectorAll(".bookCard");
    Array.from(bookcards).map((bookcard) => bookcard.remove());
}

function switchIsRead(e){
    const currentBook = myLibrary.find(book => book.id.toString() === e.target.parentNode.parentNode.dataset.id);
    currentBook.isRead = !currentBook.isRead;
    if(e.target.classList.contains("read")){
        e.target.classList.remove("read");
        e.target.classList.add("not-read");
        e.target.innerHTML = "Not read";
    }else{
        e.target.classList.remove("not-read");
        e.target.classList.add("read");
        e.target.innerHTML = "Read";
    }
    updateLocalStorage();
}

function removeBook(e) {
    const currentBook = myLibrary.find(book => book.id.toString() === e.target.parentNode.parentNode.dataset.id);
    myLibrary.splice(myLibrary.indexOf(currentBook), 1);
    updateLocalStorage();
    resetBookList();
    showBookList();
}

showBookList();