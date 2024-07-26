const myLibrary = [];

class Book {
  constructor(title, author, genre, pages, cover, hasRead){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.hasRead = hasRead;
    this.cover = cover;
  }

  read = function () {
    this.hasRead = !this.hasRead;
  }
}

let slides = document.querySelectorAll('.slide');

function addToLibrary () {
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const genre = document.querySelector("#book-genre").value;
  const pages = document.querySelector("#book-pages").value;
  const coverInput = document.querySelector("#book-image");
  const file = coverInput.files[0];
  const cover = file ? 'images/' + file.name : '';

  const book = new Book(title, author, genre, pages, cover, false);
  myLibrary.push(book);
  
  clearForm();
  updateDisplay();
  location.hash = `slide${slides.length - 1}`;
}

function clearForm() {
  const title = document.querySelector("#book-title").value = "";
  const author = document.querySelector("#book-author").value = "";
  const genre = document.querySelector("#book-genre").value = "";
  const pages = document.querySelector("#book-pages").value = "";
  const cover = document.querySelector("#book-image").value = "";
}

function updateDisplay() {

  const container = document.querySelector(".container");
  container.innerHTML = '';
  document.querySelectorAll("span.slide").forEach(span => span.remove())

  myLibrary.forEach((book, i) => {

    const newCard = createCard(book, i);
    container.appendChild(newCard);

    const slide = createSlide(i);
    const firstChild = document.body.firstChild;
    document.body.insertBefore(slide, firstChild);
  });

  addEventListeners();

  slides = document.querySelectorAll('.slide');
}

function createCard(book, i) {
  const newCard = document.createElement('div');
  newCard.classList.add("card");
  newCard.id = `card${i}`;
  newCard.setAttribute('data-index', i);

  newCard.innerHTML = `<div class="card-image">
    <img src="${book.cover}" />
  </div>
  <button class="read-button ${book.hasRead ? 'hasRead' : ''}">
    <svg class="bookmark" viewBox="0 0 24 24" width="50" height="50" fill="currentColor">
      <path d="M6 2a2 2 0 0 0-2 2v18l8-5.333L20 22V4a2 2 0 0 0-2-2H6z"></path>
    </svg>
  </button>
  <div class="card-info">
    <h2>${book.title}</h2>
    <ul class="card-info-list">
      <li>${book.author}</li>
      <li>${book.genre}</li>
      <li>${book.pages}</li>
    </ul>
  </div>
  <button class="card-remove">remove</button>
  <a href="#slide${i}" class="nav-tool"></a>`;

  return newCard;
}

function createSlide(i) {
  const slide = document.createElement('span');
  slide.id = `slide${i}`;
  slide.classList.add("slide");

  return slide;
}

function addEventListeners(){
  document.querySelectorAll('.card-remove').forEach(button => {
    button.addEventListener('click', function() {
      const index = button.closest(".card").getAttribute('data-index');
      myLibrary.splice(index, 1);
      updateDisplay();
      location.hash = `slide${index - 1}`;
    });
  });

  document.querySelectorAll(".read-button").forEach(button => {
    button.addEventListener("click", function() {
      const index = button.closest(".card").getAttribute('data-index');
      const book = myLibrary[index];
      book.read();
      button.classList.toggle("hasRead", book.hasRead);
    })
  });
}

document.querySelector(".submit-book").addEventListener('click', function (event) {
  event.preventDefault();
  addToLibrary();
})

document.querySelector(".add-book-button").addEventListener('click', function() {
  const form = document.querySelector(".form-add");
  form.classList.toggle('show');
  const container = document.querySelector(".container");
  container.classList.toggle('show');

  this.classList.toggle('add-active');
    
    if (this.classList.contains('add-active')) {
        this.innerHTML = '<i class="fa-solid fa-x"></i>';
        this.style.width = '61px';
    } else {
        this.innerHTML = 'Add Book';
        this.style.width = '120px';
    }
})

window.addEventListener('hashchange', function () {
  console.log("hello");
  const container = document.querySelector(".container");
  const targetSlide = document.querySelector(':target');
  const reversedArray = Array.from(slides).reverse();
  const index = reversedArray.indexOf(targetSlide);
  container.style.left = "756px";
  container.style.transform = `TranslateX(${-217.5 - index * 360}px)`;
  document.querySelectorAll('.card-image').forEach(card => {
    card.style.height = "450px";
    card.style.width = "300px";
  });
  document.querySelector(`#card${index} > .card-image`).style.height = '562.5px';
  document.querySelector(`#card${index} > .card-image`).style.width = '375px';

  this.document.querySelectorAll(".card-remove").forEach(button => {
    button.classList.remove("active");
  });
  document.querySelector(`#card${index} .card-remove`).classList.add("active");

  this.document.querySelectorAll(".read-button").forEach(button => {
    button.classList.remove("active");
  });
  document.querySelector(`#card${index} .read-button`).classList.add("active");

})