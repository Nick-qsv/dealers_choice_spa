import axios from "axios";

const authorList = document.querySelector("#author-list");
const bookList = document.querySelector("#book-list");
const authoredList = document.querySelector("#authored-list");

let authors, books;

const renderAuthors = (authors)=>{
    const authorId = window.location.hash.slice(1);
    const html = authors.map(
        (author) =>`
        <li class = '${author.id === authorId ? 'selected': ''}'>
        <a>
        ${author.name}
        </a>
        </li>`).join('');
    authorList.innerHTML = html;
};


const init = async () => {
    try {
      authors = (await axios.get('/router/authors')).data;
    //   const cars = (await axios.get("/api/cars")).data;
      renderAuthors(authors);
    //   renderCars(cars);
    //   const userId = window.location.hash.slice(1);
    //   if(userId){
    //       const url = `/api/users/${userId}/sales`;
    //       sales = (await axios(url)).data;
    //       renderSales(sales)
    //   }
    } catch (ex) {
      console.log(ex);
    }
  };

init();
