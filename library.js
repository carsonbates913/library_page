const myLibrary = [];

function Book(title, author, genre, pages, cover, hasRead){
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.hasRead = hasRead;
  this.cover = cover;
}

let slides = document.querySelectorAll('.slide');

function addToLibrary () {
  const title = document.querySelector("#book-title");
  const author = document.querySelector("#book-author");
  const genre = document.querySelector("#book-genre");
  const pages = document.querySelector("#book-pages");
  const cover = document.querySelector("#book-image");
  const file = cover.files[0]; // Get the selected file
  let coverFile = '';
            if (file) {
                var img = document.getElementById('displayImage');
                coverFile = 'images/' + file.name; // Set the src to the file name in the repository
            }

  const book = new Book(title.value, author.value, genre.value, pages.value, coverFile, false);
  myLibrary.push(book);
  
  title.value = "";
  author.value = "";
  genre.value = "";
  pages.value = "";

  updateDisplay();
  location.hash = `slide${slides.length-1}`;
}

const addBook = document.querySelector(".submit-book");
addBook.addEventListener('click', function (event) {
  event.preventDefault();
  addToLibrary();
})

function updateDisplay() {

  const container = document.querySelector(".container");
  container.innerHTML = '';
  document.querySelectorAll("span.slide").forEach(span => span.remove())

  for(i = 0; i < myLibrary.length; i++) {
    const newCard = document.createElement('div');
    newCard.classList.add("card");
    newCard.id = `card${i}`;

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const cardCover = document.createElement('img');
    cardCover.src = `${myLibrary[i].cover}`;

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');

    const cardTitle = document.createElement('h2');
    cardTitle.innerText = `${myLibrary[i].title}`;

    const cardInfoList = document.createElement('ul');
    cardInfoList.classList.add('card-info-list');

    const cardAuthor = document.createElement('li');
    cardAuthor.innerText = `${myLibrary[i].author}`;
    const cardGenre = document.createElement('li');
    cardGenre.innerText = `${myLibrary[i].genre}`;
    const cardPages = document.createElement('li');
    cardPages.innerText = `${myLibrary[i].pages}`;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.classList.add('card-remove');
    removeButton.setAttribute('data-index', i);

    const navTool = document.createElement('a');
    navTool.href = `#slide${i}`;
    navTool.classList.add('nav-tool');

    const slide = document.createElement('span');
    slide.id = `slide${i}`;
    slide.classList.add("slide");
    

    newCard.appendChild(cardImage);
    cardImage.appendChild(cardCover);
    newCard.appendChild(cardInfo);
    cardInfo.appendChild(cardTitle);
    cardInfo.appendChild(cardInfoList);
    cardInfoList.appendChild(cardAuthor);
    cardInfoList.appendChild(cardGenre);
    cardInfoList.appendChild(cardPages);
    newCard.appendChild(removeButton);
    newCard.appendChild(navTool);
  
    container.appendChild(newCard);

    const firstChild = document.body.firstChild;
    document.body.insertBefore(slide, firstChild);

  }
  document.querySelectorAll('.card-remove').forEach(button => {
    button.addEventListener('click', function() {
      const targetSlide = document.querySelector(':target');
      const reversedArray = Array.from(slides).reverse();
      const index = reversedArray.indexOf(targetSlide);
      myLibrary.splice(button.getAttribute('data-index'), 1);
      console.log(myLibrary);
      updateDisplay();
      location.hash = `slide${index-1}`
    });
  });

  slides = document.querySelectorAll('.slide');
}

const addButton = document.querySelector(".add-book-button");
addButton.addEventListener('click', function() {
  const form = document.querySelector(".form-add");
  form.classList.toggle('show');
  const container = document.querySelector(".container");
  container.classList.toggle('show');

  addButton.classList.toggle('active');
    
    if (addButton.classList.contains('active')) {
        addButton.innerHTML = '<i class="fa-solid fa-x"></i>';
        addButton.style.width = '61px';
    } else {
        addButton.innerHTML = 'Add Book';
        addButton.style.width = '120px';
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
})