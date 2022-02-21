let books = [];

const DEFAULT_DATA = [{
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        status: "not read"
    },
    {
        title: "Harry Potter and the Goblet of Fire",
        author: "J. K. Rowling",
        status: "read"
    },
    {
        title: "Educated",
        author: "Tara Westover",
        status: "read"
    }
];

let tbody = document.querySelector('tbody');


function Book(title, author, status) {
    this.title = title
    this.author = author
    this.status = status
}

function addBookToLibrary() {

}

const createStatusToggle = (book) => {
    let statusCell = document.createElement('td');
    let statusToggle = document.createElement('button');
    statusToggle.textContent = "Change status";
    //event listener for this

    statusCell.appendChild(statusToggle);
    return statusCell;
}



const createDeleteBtn = (index) => {
    let deleteCell = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener('click', () => {
        books.splice(index, 1);
        updateLocalStorage();
        updateTable();
    })

    deleteCell.appendChild(deleteBtn);
    return deleteCell;
}


function updateLocalStorage() {
    localStorage.setItem('my_books', JSON.stringify(books));
}

function checkLocalStorage() {
    if (localStorage.getItem('my_books')) {
        books = JSON.parse(localStorage.getItem('my_books'));
    } else {
        books = DEFAULT_DATA;
    }
}

const updateTable = () => {

    checkLocalStorage();
    tbody.innerHTML = '';

    books.forEach((book, index) => {

        let row = document.createElement('tr');

        Object.values(book).forEach(text => {

            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        row.appendChild(createStatusToggle(book));
        row.appendChild(createDeleteBtn(index));
        tbody.appendChild(row);
    })
}

updateTable();

// const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "not read");
// const book2 = new Book("Harry Potter and the Goblet of Fire", "J. K. Rowling",
//     "read");
// const book3 = new Book("Pride and Prejudice", "Jane Austen",
//     "read");
// const book4 = new Book("Me Before You", "Jojo Moyes",
//     "read");
// const book5 = new Book("Educated", "Tara Westover",
//     "read");


// books = [book1, book2, book3, book4, book5];