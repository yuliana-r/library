
function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

Book.prototype.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.status;
}

function addBookToLibrary() {

}




const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "295", "not read yet");
const book2 = new Book("Harry Potter and the Goblet of Fire", "J. K. Rowling",
    "636", "read");
const book3 = new Book("Pride and Prejudice", "Jane Austen",
    "279", "read");
const book4 = new Book("Me Before You", "Jojo Moyes",
    "369", "read");
const book5 = new Book("Educated", "Tara Westover",
    "334", "read");

    let myLibrary = [book1, book2, book3, book4, book5];

    myLibrary.forEach(book => {
            const e = document.createElement('p');
            e.textContent = book.info();
            document.body.appendChild(e);
    })