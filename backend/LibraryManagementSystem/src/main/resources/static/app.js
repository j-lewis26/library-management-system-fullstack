let currentBookId = null;

function loadBooks() {

    fetch('/books')
        .then(response => response.json())
        .then(data => {

            let tableBody =
                document.getElementById("bookTableBody");

            tableBody.innerHTML = "";

            data.forEach(book => {

             tableBody.innerHTML += `
                 <tr>
                     <td>${book.id}</td>
                     <td>${book.name}</td>
                     <td>${book.author}</td>
                     <td>${book.price}</td>

                    <td>

                        <button onclick="
                            editBook(
                                ${book.id},
                                '${book.name}',
                                '${book.author}',
                                ${book.price}
                            )
                        ">
                            Edit
                        </button>

                        <button onclick="deleteBook(${book.id})">
                            Delete
                        </button>

                    </td>

                 </tr>
             `;

            });

        })
        .catch(error => {
            console.log(error);
            alert("Failed to load books");
        });

}

function addBook() {

    const name =
        document.getElementById("name").value;

    const author =
        document.getElementById("author").value;

    const price =
        document.getElementById("price").value;

        if(name === "" || author === "" || price === ""){

            alert("Please fill all fields");

            return;
        }

    if (currentBookId === null) {

        fetch('/books', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: name,
                author: author,
                price: parseFloat(price)
            })

        })

        .then(response => response.text())
        .then(message => {

            alert(message);

            document.getElementById("name").value = "";
            document.getElementById("author").value = "";
            document.getElementById("price").value = "";

            loadBooks();

        });

    } else {

        fetch(`/books/${currentBookId}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name: name,
                author: author,
                price: parseFloat(price)
            })

        })

        .then(response => response.text())

        .then(message => {

            alert(message);

            currentBookId = null;

            loadBooks();

            document.getElementById("name").value = "";
            document.getElementById("author").value = "";
            document.getElementById("price").value = "";

        });

    }

}

function deleteBook(id) {

    if (!confirm("Are you sure you want to delete this book?")) {
        return;
    }

    fetch(`/books/${id}`, {

        method: 'DELETE'

    })

    .then(response => response.text())

    .then(message => {

        alert(message);

        loadBooks();

    })

    .catch(error => {

        console.log(error);

        alert("Delete Failed");

    });

}

function editBook(id, name, author, price) {

    document.getElementById("name").value = name;

    document.getElementById("author").value = author;

    document.getElementById("price").value = price;

    currentBookId = id;

}

window.onload = function() {
    loadBooks();
};
