const cartList = document.querySelector("#cartList");
const sumElement = document.querySelector("#sum");
const clearAll = document.querySelector("#clearAll")

let cart = [];

try {
  const saved = localStorage.getItem("cart");
  cart = JSON.parse(saved) || [];
} catch (error) {
  console.log("Could not read saved cart");
}

console.log(cart);

function save() {
  const text = JSON.stringify(cart);
  localStorage.setItem("cart", text);
};

// function render() {
//     cartList.textContent = "";

//     for (let i = 0; i < cart.length; i++) {
//         const li = document.createElement("li");
//         const namnElement = document.createElement("p")
//         const prisElement = document.createElement("p")

//         namnElement.textContent = cart[i].name;
//         prisElement.textContent = cart[i].price;

//         li.appendChild(namnElement);
//         li.appendChild(prisElement);

//         cartList.appendChild(li);
//         console.log(cartList)
//     }
// }

// render();

function render() {
  cartList.textContent = "";
  for (const item of cart) {
    const li = document.createElement("li");
    const namnElement = document.createElement("p")
    const prisElement = document.createElement("p")
    const qtyElement = document.createElement("p")
    const minusElement = document.createElement("button")
    const plusElement = document.createElement("button")
    const clearElement = document.createElement("button")
    

    namnElement.textContent = item.name;
    prisElement.textContent = `${item.price} kr`;
    qtyElement.textContent = item.quantity
    qtyElement.classList.add("transition")

    minusElement.textContent="-"
    plusElement.textContent="+"

    clearElement.textContent = "x"


    li.appendChild(namnElement);
    li.appendChild(prisElement);
    li.appendChild(qtyElement)
    li.appendChild(minusElement)
    li.appendChild(plusElement)
    li.appendChild(clearElement)
    li.classList.add("liCart")
    

    plusElement.addEventListener("click", function(){
      item.quantity++;
      render();
      save();
    })

    minusElement.addEventListener("click", function(){
      if(item.quantity>1){
        item.quantity--;
      }
      else{
        cart.splice(cart.indexOf(item),1)
      }
      render();
     save(); 
    })

    clearElement.addEventListener("click", function(){
          cart.splice(cart.indexOf(item),1)
         
          render();
          save();
        
    })

    cartList.appendChild(li);
    console.log(cartList)
  }
  sumElement.textContent = `Total: ${updateSum()} kr`;
}

save();
render();


function updateSum() {
  let sum = 0;
  for (const item of cart) {
    sum = (item.price*item.quantity) + sum;
  };
  return sum; // Moved outside of the for loop 
}

clearAll.addEventListener("click", function(){
  cart.splice(0,cart.length);
  localStorage.removeItem("cart");
  console.log("All items removed")
  render();
  save();
})

