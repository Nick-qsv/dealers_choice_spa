import axios from "axios";

const authorList = document.querySelector("#author-list");
const bookList = document.querySelector("#book-list");
const authoredList = document.querySelector("#authored-list");

let authors, books

const renderAuthors = (authors)=>{

    const html = authors.map(
        (author) =>`
        <li>
        <a href='#${author.id}'>
        ${author.name}
        </a>
        </li>`).join('');
    authorList.innerHTML = html;
};


const renderBooks = (books)=>{
    const html = books.map(
        (book)=> `
        <li>
        ${book.title}
        </li>`
    ).join('');
    bookList.innerHTML = html;
};

const renderAuthored = (books)=>{
    const html = books.map(
        (book)=>`
        <li>
        ${book.name}
        </li>`
    ).join('');
    authoredList.innerHTML = html;
}

const init = async () => {
    try {
      authors = (await axios.get('/router/authors')).data;
      books = (await axios.get("/router/books")).data;
      renderAuthors(authors);
      renderBooks(books);
      const authorId = window.location.hash.slice(1);
      if(authorId){
          const url = `/router/authors/${authorId}/authored`;
          let authored = (await axios(url)).data;
          renderAuthored(authored)
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  window.addEventListener('hashchange', async () =>{
    const authorId = window.location.hash.slice(1);
    const url = `/router/authors/${authorId}/authored`;
    let authored = (await axios(url)).data;
    renderAuthored(authored);
    renderAuthors(authors);
});

init();
