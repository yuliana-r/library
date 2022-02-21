let books = [];

const DEFAULT_DATA = [{
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        status: "Yes"
    },
    {
        title: "Harry Potter and the Goblet of Fire",
        author: "J. K. Rowling",
        status: "Yes"
    },
    {
        title: "Educated",
        author: "Tara Westover",
        status: "No"
    }
];

let tbody = document.querySelector('tbody');
let bookTitle = document.getElementById('title');
let bookAuthor = document.getElementById('author');
let readStatus = document.getElementById('status');
let addBookBtn = document.getElementById('addBtn').addEventListener('click', () => {
    if (bookAuthor.value == '' || bookTitle.value == '') {
        return;
    }
    addBookToLibrary();
    updateTable();
})

function Book(title, author, status) {
    this.title = title
    this.author = author
    this.status = status
}

function addBookToLibrary() {
    if (readStatus.checked) {
        readStatus = 'Yes';
    } else {
        readStatus = 'No';
    }

    const book = new Book(bookTitle.value, bookAuthor.value, readStatus);
    books.push(book);
    clearFields();
    updateLocalStorage();
}

const createStatusButton = (book) => {
    let statusCell = document.createElement('td');
    let statusButton = document.createElement('button');
    statusButton.textContent = "Change status";

    statusButton.addEventListener('click', () => {
        console.log(book.status);

        if (book.status === 'Yes') {
            book.status = 'No';
            updateTable();
        } else {
            book.status = 'Yes';
            updateTable();
        }
    })
    statusCell.appendChild(statusButton);
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

        row.appendChild(createStatusButton(book));
        row.appendChild(createDeleteBtn(index));
        tbody.appendChild(row);
    })
}

function clearFields() {
    bookTitle.textContent = '';
    bookAuthor.textContent = '';
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

updateTable();
