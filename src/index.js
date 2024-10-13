// index.js
const ramenMenu = document.getElementById("ramen-menu");
const detailImage = document.querySelector(".detail-image");
const detailName = document.querySelector(".name");
const detailRestaurant = document.querySelector(".restaurant");
const ratingDisplay = document.querySelector("#rating-display");
const commentDisplay = document.querySelector("#comment-display");
// Callbacks
const handleClick = (event) => {
  // Find the closest ramen card that was clicked
  const ramen = event.target.closest(".ramen-card");

  // If a ramen card was clicked, proceed with getting the details
  if (ramen) {
    const ramenImage = ramen.querySelector("img").src;
    const ramenName = ramen.querySelector("h2").textContent;
    const ramenRestaurant = ramen.querySelectorAll("h3")[0].textContent; // Ensure this gets the correct h3
    const ramenRating = ramen.querySelector(".ramen-rating").textContent;
    const ramenComment = ramen.querySelector(".ramen-comment").textContent;

    // Populate the ramen-detail div with the selected ramen details
    detailImage.src = ramenImage;
    detailName.textContent = ramenName;
    detailRestaurant.textContent = ramenRestaurant;
    ratingDisplay.textContent = `${ramenRating} / 10`;
    commentDisplay.textContent = ramenComment;

    // Change the alt text of the detail image for accessibility
    detailImage.alt = ramenName;
  }
};

// Event delegation for ramen cards
ramenMenu.addEventListener("click", handleClick);

const addSubmitListener = (e) => {
  // Add code
  e.preventDefault();

  let ramenObj = {
    name: e.target.new_name.value,
    restaurant: e.target.new_restaurant.value,
    image: e.target.new_image.value,
    rating: e.target.new_rating.value,
    comment: e.target.new_comment.value,
  };

  renderRamens(ramenObj);
  addRamen(ramenObj);
};
document
  .querySelector("#new-ramen")
  .addEventListener("submit", addSubmitListener);
//Grabbing the new comment values

const renderRamens = (ramen) => {
  const card = document.createElement("div");
  card.classList.add("ramen-card");
  card.innerHTML = `
      <img src="${ramen.image}" alt="${ramen.name}">
      <h2 class="hidden">${ramen.name}</h2>
      <h3 class="hidden">${ramen.restaurant}</h3>
      <h3 class="hidden">Rating:</h3>
      <p class="hidden">
        <span class="ramen-rating">${ramen.rating}</span> / 10
      </p>
      <h3 class="hidden">Comment:</h3>
      <p class="ramen-comment  hidden" >
        ${ramen.comment}
      </p>
      <div id="remove-ramen-btn">
      <button ><i class="fa-solid fa-trash"></i></button>
      </div>

  `;

  card
    .querySelector("#remove-ramen-btn")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      const ramenCard = event.target.closest(".ramen-card");
      ramenCard.remove();
      removeRamen(ramen.id);
    });

  //update Ramen
  document
    .querySelector("#edit-ramen")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("Submsission prevented on the second form");

      const newRating = event.target["new-rating"].value;
      const newComment = event.target["new-comment"].value;

      console.log(newRating);
      console.log(newComment);

      ratingDisplay.textContent = newRating;
      commentDisplay.textContent = newComment;
    });

  document.getElementById("ramen-menu").appendChild(card);
};

const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((ramenData) => ramenData.forEach((ramen) => renderRamens(ramen)));
};

const addRamen = (ramenObj) => {
  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(ramenObj),
  })
    .then((response) => response.json())
    .then((ramen) => console.log(ramen));
};

const updateRamen = (id, newRating, newComment) => {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating: newRating,
      comment: newComment,
    }),
  });
};
const removeRamen = (id) => {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((ramen) => console.log(ramen));
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
