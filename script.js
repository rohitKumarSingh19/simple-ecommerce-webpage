const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");

let productsData = [];

async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    productsData = data;
    populateCategoryFilter(data);
    displayProducts(data);
  } catch (error) {
    productContainer.innerHTML = `<p>Error fetching data</p>`;
  }
}

function populateCategoryFilter(products) {
  const categories = ["all", ...new Set(products.map(p => p.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category[0].toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

function displayProducts(products) {
  productContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
      <p>${product.category}</p>
    `;
    productContainer.appendChild(card);
  });
}
function applyFiltersAndSort() {
  let filtered = [...productsData];

  // Filter
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }
  // Sort
  const sortValue = sortBy.value;
  if (sortValue === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }
  displayProducts(filtered);
}
categoryFilter.addEventListener("change", applyFiltersAndSort);
sortBy.addEventListener("change", applyFiltersAndSort);
fetchProducts();
