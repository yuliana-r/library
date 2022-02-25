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

let addBookBtn = document.getElementById('addBtn').addEventListener('click', (e) => {
    if (bookAuthor.value == '' || bookTitle.value == '') {
        return;
    }
    e.preventDefault();
    addBookToLibrary();
    updateLocalStorage();
    updateTable();
    clearFields();
})

class Book {
    constructor(title, author, status) {
        this.title = title;
        this.author = author;
        this.status = status;
    }
}

function addBookToLibrary() {
    if (readStatus.checked == true) {
        readStatus = 'Yes';
    } else {
        readStatus = 'No';
    }

    const book = new Book(bookTitle.value, bookAuthor.value, readStatus);
    books.push(book);
    clearFields();
    updateLocalStorage();
    updateTable();
}

const createDeleteBtn = (index) => {
    let deleteCell = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.classList.add('deleteBtn');

    deleteBtn.addEventListener('click', () => {
        books.splice(index, 1);
        updateLocalStorage();
        updateTable();
    })

    deleteCell.appendChild(deleteBtn);
    return deleteCell;
}

const createStatusButton = (book) => {
    let statusCell = document.createElement('td');
    let editStatusBtn = document.createElement('button');
    editStatusBtn.innerHTML = '<i class="fa-solid fa-marker"></i>';
    editStatusBtn.classList.add('editStatusBtn');

    editStatusBtn.addEventListener('click', () => {
        if (book.status === 'Yes') {
            book.status = 'No';
        } else {
            book.status = 'Yes';
        }
        updateLocalStorage();
        updateTable();
    })
    statusCell.appendChild(editStatusBtn);
    return statusCell;
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
    bookTitle.value = '';
    bookAuthor.value = '';
    readStatus.checked = true;
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