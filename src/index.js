async function getData() {
    const url = "http://localhost:3000/films/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      const list = document.getElementById('films');
        // Render the list of films with a delete button for each film
    list.innerHTML = json.map(film => `
      <li class="film item">
        <span onclick='updateUi(${JSON.stringify(film)})'>${film.title}</span>
        <button onclick="deleteFilm(${film.id})" class="delete-btn">Delete</button>
      </li>
    `).join('');

  } catch (error) {
    console.error(error.message);
  }
}

// Function to handle film deletion
async function deleteFilm(filmId) {
  const url = `http://localhost:3000/films/${filmId}`;
  
  try {
    // Send DELETE request to the server
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      // Remove the film from the DOM after successful deletion
      const filmElement = document.querySelector(`button[onclick="deleteFilm(${filmId})"]`).parentElement;
      filmElement.remove();
      console.log(`Film with ID ${filmId} deleted successfully`);
    } else {
      console.error(`Failed to delete film with ID ${filmId}`);
    }
  } catch (error) {
    console.error(`Error deleting film: ${error.message}`);
  }
}   
  
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
   const descriptionElement = document.getElementById("film-info")
   if (descriptionElement){
    descriptionElement.innerText = film.description
   const showtimeElement = document.getElementById("showtime")
   if (showtimeElement){
    showtimeElement.innerText = film.showtime
   }
   const ticketnumElement = document.getElementById("ticket-num")
   if (ticketnumElement){
    let ticketNum = film.capacity - film.tickets_sold
    
    ticketnumElement.innerText = ticketNum
   }
   const buyTicketBtn = document.getElementById("buy-ticket")
    
   if (buyTicketBtn) {
    buyTicketBtn.onclick = () => buyTicket(film.id)
   }
  }

  function updateFilmDetails(film) {
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const filminfo = document.getElementById('film-info');
    const ticketNum = document.getElementById('ticket-num');
    const buyTicketButton = document.getElementById('buy-ticket');

    poster.src = film.poster;
    title.textContent = film.title;
    runtime.textContent = `${film.runtime} minutes`;
    showtime.textContent = film.showtime;
    filminfo.textContent = film.description;
    const availableTickets = film.capacity - film.tickets_sold;
    ticketNum.textContent = availableTickets;
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
  }
  getData();