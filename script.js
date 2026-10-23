const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const main = document.querySelector("#main")
const productsDiv = document.querySelector("#productsDiv")
const productsList = document.querySelector("#products")
const footer = document.querySelector("#footer")
const myShop = document.querySelector("#myShop")
const cartNumber = document.querySelector("#cartNumber")
const categorySelect = document.querySelector("#category")
const priceSelect = document.querySelector("#priceSelect")

// Product Data
const products = [
  { id: 1, name: "Headphones", price: 499, emoji: "🎧", category: "audio" },
  { id: 2, name: "Keyboard", price: 799, emoji: "⌨️", category: "computer" },
  { id: 3, name: "Mouse", price: 349, emoji: "🖱️", category: "computer" },
  { id: 4, name: "Webcam", price: 599, emoji: "📷", category: "computer" },
  { id: 5, name: "Speaker", price: 699, emoji: "🔊", category: "audio" },
  { id: 6, name: "Phone case", price: 149, emoji: "📱", category: "phone" },
  { id: 7, name: "Charger", price: 199, emoji: "🔌", category: "phone" },
  { id: 8, name: "Backpack", price: 899, emoji: "🎒", category: "other" },
  { id: 9, name: "Desk lamp", price: 299, emoji: "💡", category: "other" },
  { id: 10, name: "Notebook", price: 99, emoji: "📓", category: "other" },
];

// Loading saved cart
let cart = [];

try {
  const saved = localStorage.getItem("cart");
  cart = JSON.parse(saved) || [];
} catch (error) {
  console.log("Could not read saved cart");
}

// Saving the cart
function save() {
  const text = JSON.stringify(cart);
  localStorage.setItem("cart", text);
};

// Drawing the products
function render(cat, order) {

  let spreadedProducts = [...products] // exact same copy

  if (order === "ascending"){
    spreadedProducts.sort((a,b) => a.price - b.price)
  }
  if (order === "descending"){
    spreadedProducts.sort((a,b) => b.price-a.price)
  }
  

  
  productsList.textContent = "";
  for (let i = 0; i < spreadedProducts.length; i++) {

    if (cat === spreadedProducts[i].category || cat === "all"
    ) {
    


    const li = document.createElement("li")
    const emojiElement = document.createElement("p")
    const namnElement = document.createElement("p")
    const prisElement = document.createElement("p")
    const buttonElement = document.createElement("button")

    emojiElement.textContent = spreadedProducts[i].emoji
    namnElement.textContent = spreadedProducts[i].name
    prisElement.textContent = spreadedProducts[i].price + " kr"
    buttonElement.textContent = "Add to cart"
    emojiElement.classList.add("emoji")
    buttonElement.classList.add("buttonAdd")

    buttonElement.addEventListener("click", function () {

      

  const product = spreadedProducts[i];

  let found = false;

  for (let item of cart) {
    if (item.name === product.name) {
      item.quantity++;
      found = true;
      break;
      
      
    }
  }

  
  if (found === false) {
    const newProduct = {
      name: product.name,
      price: product.price,
      quantity: 1,
      category: product.category
    };

    cart.push(newProduct);
  }


  render(cat, order);
  save();
  updateCart();
});



    li.appendChild(emojiElement)
    li.appendChild(namnElement)
    li.appendChild(prisElement)
    li.appendChild(buttonElement)

    productsList.appendChild(li)

    
  }
  

  

  }
}
let choice1 = "all"
let choice2 ="default"
render("all", "default");

function updateCart(){
  let summa = 0;
  for (let i=0; i<cart.length;i++){
    summa = cart[i].quantity + summa
  }
  cartNumber.textContent= "(" + summa + ")"
}
updateCart();






categorySelect.addEventListener("change", function(){
  
  choice1 = categorySelect.value
console.log(choice1)

render(choice1, choice2);


})

priceSelect.addEventListener("change", function(){
  choice2 = priceSelect.value
  console.log(choice2)

  render(choice1, choice2)
})



//Testing sort()
/*
const array = [1,3,2,6,5]

const sorted = array.sort(((a,b) => b-a))

console.log(sorted) // sorted corectly desc
*/


//Testing includes
/*
const names = ["stefan", "sstteffann","sugic"]
const name1 = ["stefan"]
const name3 =["marco"]
const name2 = [];

console.log(names.includes(name1[0])); // true
console.log(names.includes(name3[0])); // true
console.log(!names.includes(name1[0])) // false
console.log(!names.includes(name3[0])) // true
console.log(names.includes(name2))
console.log(!names.includes(name2))
console.log(names[0]===name1[0]) // true
console.log(names[0]!==name1[0]) // false
console.log(names[0]!==name2[0])

works good!
*/

