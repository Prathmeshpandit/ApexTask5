
function addToCart(productName) {
  alert(`${productName} has been added to your cart!`);
}
// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function (event) {
event.preventDefault();

const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();

if (!name || !email || !message) {
    alert('Please fill out all fields.');
    return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
}

alert('Thank you for contacting us! We will get back to you soon.');
this.reset();
});

// Initialize To-Do List
function initializeToDoList() {
const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => li.remove());

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = ""; // Clear the input field
}

// Add event listener to the "Add Task" button
addTaskButton.addEventListener('click', addTask);

// Optional: Handle "Enter" key for adding a task
taskInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
}

// Initialize features after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
initializeToDoList();
});

// Initialize features after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
initializeToDoList();
});


document.addEventListener('DOMContentLoaded', () => {
const images = document.querySelectorAll('.carousel img');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        currentIndex = parseInt(indicator.getAttribute('data-index'));
        showImage(currentIndex);
    });
});

// Auto-rotate every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}, 2000);
});



// Function to fetch products from the API
async function fetchApiProducts() {
  try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
          throw new Error("Failed to fetch data");
      }
      const products = await response.json();
      displayApiProducts(products);
  } catch (error) {
      console.error("Error fetching API data:", error);
      document.getElementById("api-product-gallery").innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

// Function to display API products
function displayApiProducts(products) {
  const apiProductGallery = document.getElementById("api-product-gallery");
  apiProductGallery.innerHTML = ""; // Clear previous content

  products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <p>${product.description.slice(0, 50)}...</p>
          <button data-id="${product.id}">Add to Cart</button>
      `;

      apiProductGallery.appendChild(productCard);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".product-card button").forEach(button => {
      button.addEventListener("click", event => {
          const productId = event.target.getAttribute("data-id");
          const selectedProduct = products.find(p => p.id == productId);
          addToCart(selectedProduct);
      });
  });
}

// Function to add a product to the cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Product added to cart!");
}

// Function to update cart count
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Function to display the cart
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear previous content

  if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
  }

  cart.forEach((product, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
          <img src="${product.image}" alt="${product.title}" width="50">
          <p>${product.title} - $${product.price.toFixed(2)}</p>
          <button data-index="${index}">Remove</button>
      `;

      cartItemsContainer.appendChild(cartItem);
  });

  // Add event listeners to "Remove" buttons
  document.querySelectorAll(".cart-item button").forEach(button => {
      button.addEventListener("click", event => {
          const itemIndex = event.target.getAttribute("data-index");
          removeFromCart(itemIndex);
      });
  });
}

// Function to remove a product from the cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove item from cart array
  localStorage.setItem("cart", JSON.stringify(cart)); // Update storage
  updateCartCount();
  displayCart();
}

// Fetch API products when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchApiProducts();
  displayCart(); // Display cart if user visits the cart page
});


