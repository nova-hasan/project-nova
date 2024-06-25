
const saved = [];
const RENDER_EVENT = 'save'
const SAVE = 'book';
const BOOK_KEY = 'BOOK_APPS';
const SEARCH = 'book_title';

function generatedID() {
    return +new Date();
}

localStorage.setItem('book', 'BOOK_APPS');

function bookdata(id, title, author, year, isCompleted) {
  return {
        id: id,
        title: title, 
        author: author,
        year: parseInt(year),
        isCompleted: isCompleted,
      };
    }
    
    function isStorageExist() {
      if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }
  
  function findBook(bookId) {
    for (const bookItem of saved) {
      if (bookItem.id === bookId) {
        return bookItem;
      }
    }
    return null;
  }
  function findBookIndex(bookId) {
    for (const index in saved) {
      if (saved[index].id === bookId) {
        return index;
      }
    }
    return -1;
  }

/** Tombol booksubmit */
var button = document.getElementById("bookSubmit");

button.addEventListener("click", function() {
    alert("Berhasil input judul buku");
    localStorage.name = inputBook.value;
});

/** Fungsi yang digunakan untuk menyimpan data buku */ 
function saveBook() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(saved);
    localStorage.setItem(BOOK_KEY, parsed);

    handleStorageChange();
  }

  function handleStorageChange() {
    document.dispatchEvent(new Event(SAVE));
  }
}

//* Fungsi menampilkn buku */
function showBook() {
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  const completeBookshelfList = document.getElementById('completeBookshelfList');
  
  incompleteBookshelfList.innerHTML = '';
  completeBookshelfList.innerHTML = '';
  
  saved.forEach(book => {
    const article = document.createElement('article');
    article.classList.add ('book_item');
    
    const h3 = document.createElement('h3');
    h3.innerText = book.textTitle;
    article.appendChild(h3);
    
    const p1 = document.createElement('p');
    p1.innerText = 'Penulis : ' + book.textAuthor;
    article.appendChild(p1);
    
    const p2 = document.createElement('p');
    p2.innerText = 'Tahun : ' + book.textYear;
    article.appendChild(p2);
    
    const divAction = document.createElement('div');
    divAction.classList.add('action');
    
    const buttonToggle = document.createElement('button');
    buttonToggle.classList.add(book.isComplete ? 'green' : 'red');
    buttonToggle.innerText = book.isComplete? 'Belum selesai di Baca' : 'Selesai dibaca';
    buttonToggle.addEventListener('click', function () {
      toggleBookStatus(article, book.isComplete);
    });
    divAction.appendChild(buttonToggle);
    
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('red');
    buttonDelete.innerText = 'Hapus Buku';
    buttonDelete.addEventListener('click', function () {
      deleteBook(article);
    })
    divAction.appendChild(buttonDelete);
    
    article.appendChild(divAction);
    
    if (book.isComplete) {
      completeBookshelfList.appendChild(article);
    } else {
      incompleteBookshelfList.appendChild(article);
    }
  });
}
/** Fungsi Menambah buku */
function keepBook() {
  const textTitle = document.getElementById('inputBookTitle').value;
  const textAuthor = document.getElementById('inputBookAuthor').value;
  const textYear = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').Checked;
  const bookObject = bookdata(+new Date(), textTitle, textAuthor, textYear, isComplete)
  saved.push(bookObject)
  
  const bookshelfList = isComplete ? document.getElementById('completeBookshelfList') : document.getElementById('incompleteBookshelfList');

  const article = document.createElement('article');
  article.classList.add('book_item');

  const h3 = document.createElement('article');
    h3.innerText = textTitle;
    article.appendChild(h3);
    
    const p1 = document.createElement('p');
    p1.innerText = 'Penulis : ' + textAuthor;
    article.appendChild(p1);
    
    const p2 = document.createElement('p');
    p2.innerText = 'Tahun : ' + textYear;
    article.appendChild(p2);
    
    const divAction = document.createElement('div');
    divAction.classList.add('action');
    
    const buttonToggle = document.createElement('button');
    buttonToggle.classList.add(isComplete ? 'green' : 'blue');
    buttonToggle.innerText = isComplete? 'Belum selesai di Baca' : 'Selesai dibaca';
    buttonToggle.addEventListener('click', function () {
      toggleBookStatus(article, isComplete);
    })
    divAction.appendChild(buttonToggle);
    
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('red');
    buttonDelete.innerText = 'Hapus Buku';
    buttonDelete.addEventListener('click', function () {
      deleteBook(article);
    })
    divAction.appendChild(buttonDelete);
    
    article.appendChild(divAction);
    
    bookshelfList.appendChild(article);
    
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
  }
  
  /** Fungsi hapus buku */
  function deleteBook(article) {
    article.remove();
    
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
  }
  
  /** Fungsi untuk memuat data dari localStorage */
  function loadDataFromStorage() {
      const serializedData = localStorage.getItem(saved);
      let book = JSON.parse(serializedData);
  
      if (book !== null) {
              saved.push(saved);
          } 
      }

/** Tanda buku selesai dibaca */
function toggleBookStatus(article, isComplete) {
  const bookshelfList = isComplete ? document.getElementById('completeBookshelfList') : document.getElementById('incompleteBookshelfList');
  const bookComplete = isComplete ? document.getElementById('incompleteBookshelfList') : document.getElementById('completeBookshelfList');

  const button = article.querySelector('button');
  button.classList.remove(isComplete ? 'green' : 'red');
  button.classList.add(isComplete ? 'red' : 'green');
  button.innerText = isComplete ? 'Selesai dibaca' : 'Belum selesai dibaca';

  bookComplete.appendChild(article);

  document.dispatchEvent(new Event (RENDER_EVENT));
  saveBook();
}

/**SEARCH BOOK */
function searchBook () {
  const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase(); 
  const filterBook = saved.filter(function(key){ 
    key.title.toLowerCase().includes(searchTitle.toLowerCase()); 
  })
  const incompleteBook = document.getElementById('incompleteBookshelfList');
  const completedBook = document.getElementById('completeBookshelfList');
  incompleteBook.innerHTML = '';
  completedBook.innerHTML = '';

for (const title of filterBook) {
  if (title.toLowerCase().includes(searchTitle)) {
    console.log('Judul Ditemukan');
  } else {
    console.log('Judul Tidak Ditemukan');
  }
  
  console.log(title.toLowerCase(), searchTitle);
}
}

/** DOM Content Loaded */
document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  const searchBookForm = document.getElementById('searchBook');
  submitForm.addEventListener('submit', function(event) {
    event.preventDefault();
    keepBook();
  });

  searchBookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()); {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVE, function () {
  console.log(localStorage.getItem(BOOK_KEY));
})
