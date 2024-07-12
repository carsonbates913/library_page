const myLibrary = [];

function Book(title, author, genre, pages, hasRead){
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addToLibrary () {
  const title = document.querySelector(".title-input");
  const author = document.querySelector(".author-input");
  const genre = document.querySelector(".genre-input");
  const pages = document.querySelector(".pages-input");

  const book = new Book(title.value, author.value, genre.value, pages.value, false);
  myLibrary.push(book);
  
  title.value = "";
  author.value = "";
  genre.value = "";
  pages.value = "";
}