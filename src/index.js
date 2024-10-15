async function getData() {
    const url = "http://localhost:3000/films/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      const list = document.getElementById('films');
      list.innerHTML = json.map(i => `<li class="film item" onclick='updateUi(${JSON.stringify(i)})'>${i.title}</li>`).join('')
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
    
  }
  getData()
  function updateUi(film){
    console.log(film.poster)
   const imageElement = document.getElementById("poster")
   if (imageElement){
    imageElement.src = film.poster
   }
   const titleElement = document.getElementById("title")
   if (titleElement){
    titleElement.innerText = film.title
   }
   const runtimeElement = document.getElementById("runtime")
   if (runtimeElement){
    runtimeElement.innerText = film.runtime
   }
//    const descriptionElement = document.getElementById("film-info")
//    if (descriptionElement){
//     descriptionElement.innerHTML = film.film-info 
//     console.log(film.film-info)
//    }
   const showtimeElement = document.getElementById("showtime")
   if (showtimeElement){
    showtimeElement.innerHTML = film.showtime
   }
//    const ticketnumElement = document.getElementById("ticket-num")
//    if (ticketnumElement){
//     ticketnumElement = film.ticket-num
//    }
  }

  function updateFilmDetails(film) {
    poster.src = film.poster;
    title.textContent = film.title;
    runtime.textContent = `${film.runtime} minutes`;
    showtime.textContent = film.showtime;
    filmInfo.textContent = film.description;
    const availableTickets = film.capacity - film.tickets_sold;
    ticketNum.textContent = `${availableTickets} remaining tickets`;
    if (availableTickets === 0) {
        buyTicketButton.textContent = "Sold Out";
        buyTicketButton.disabled = true;
    } else {
        buyTicketButton.textContent = "Buy Ticket";
        buyTicketButton.disabled = false;
    }
}
// buy a ticket and update server
function buyTicket(filmId) {
    fetch(`http://localhost:3000/films/${filmId}`)
        .then(response => response.json())
        .then(film => {
            const availableTickets = film.capacity - film.tickets_sold;
            if (availableTickets > 0) {
                const newTicketsSold = film.tickets_sold + 1;
                // Update tickets sold on the server
                fetch(`http://localhost:3000/films/${filmId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tickets_sold: newTicketsSold }),
                })
                    .then(response => response.json())
                    .then(updatedFilm => {
                        updateFilmDetails(updatedFilm);
                    });
            }
        });
}
// // Assuming this is your movie list data
// let movies = [];

// async function getData() {
//   const url = "http://localhost:3000/films/";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(Response status: ${response.status});
//     }

//     const json = await response.json();
//     movies = json; // Store the fetched movies for later use
//     const list = document.getElementById('films');
//     list.innerHTML = json.map(i => 
//       <li class="film item" onclick="updateUi(${i.id})">${i.title}</li>
//     ).join('');
//     console.log(json);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// getData();

// function updateUi(movieId) {
//   const film = movies.find(film => film.id == movieId); // Find the movie by id

//   if (film) {
//     console.log(film.poster);
    
//     const imageElement = document.getElementById("poster");
//     if (imageElement) {
//       imageElement.src = film.poster;
//     }

//     const titleElement = document.getElementById("title");
//     if (titleElement) {
//       titleElement.innerText = film.title;
//     }

//     const runtimeElement = document.getElementById("runtime");
//     if (runtimeElement) {
//       runtimeElement.innerText = ${film.runtime} minutes;
//     }

//     const showtimeElement = document.getElementById("showtime");
//     if (showtimeElement) {
//       showtimeElement.innerText = film.showtime;
//     }
//   } else {
//     console.error("Movie not found!");
//   }
// } 


// const filmTime = document.getElementById('film-item')
// //declare the json url as an API for easy access.
// const API = "http://localhost:3000/films";
// fetch(API)
//     .then((res) => res.json())
//     .then(renderFilm)
//const allMovies = renderFilm;
//rendering only the one poster and its details.
// function renderFilm(film) {
//     const filmMenuDiv = document.getElementById("poster");
//     const titleDiv = document.getElementById("film-info");
//     const runDiv = document.getElementById("runtime")
//     const showDiv = document.getElementById("showtime")
//     const availableDiv = document.getElementById("ticket-num")
//     filmMenuDiv.src = film.poster;
//     titleDiv.textContent = film.title;
//     runDiv.textContent = film.runtime;
//     showDiv.textContent = film.showtime;
//     const filmCap = film.capacity
//     const filmTick = film.tickets_sold
//     availableDiv.textContent = (filmCap - filmTick);
//     console.log(availableDiv.textContent)
//     //Buy tickets button
//     const button = document.getElementById("buy-ticket");
//     const btn = parseInt(availableDiv.innerText);
//     console.log(btn);
//     button.addEventListener('click', () => {
//         if (btn >= 1) {
//             availableDiv.innerText = (availableDiv.innerText - 1)
//         }
//         if (availableDiv.innerText < 0) {
//             availableDiv.innerText = '0';
//             alert('Sorry, we are currently sold out of tickets for this film.')
//         }
//         if (availableDiv.innerHTML <= 0) {
//             button.innerHTML = 'SOLD OUT'
//         }
//     })
// }
// //Get the movie list.
// function getFilms() {
//     fetch(API)
//         .then((response) => response.json())
//         .then(renderFilms);
// }
// getFilms();
// function renderFilms(films) {
//     films.forEach(filmDetails); console.log(films)
// }
// function filmDetails(details) {
//     const titlesElement = document.getElementById("films");
//     let listElement = document.createElement("li");
//     listElement.innerText = details.title;
//     listElement.className = 'film-item'
//     let imgElement = document.createElement("film-details");
//     imgElement.src = details.poster;
//     console.log(imgElement)
//     const moviePoster = document.getElementById('poster')
//     titlesElement.append(listElement);
//     listElement.addEventListener('click', () => {
//         console.log(details.title)
//         document.getElementById('title').innerText = details.title
//         document.getElementById('runtime').innerText = details.runtime
//         document.getElementById('film-info').innerText = details.description
//         document.getElementById('showtime').innerText = details.showtime
//         document.getElementById('ticket-num').innerText = details.capacity - details.tickets_sold
//         moviePoster.src = details.poster
//     })
// }