let products = JSON.parse(localStorage.getItem("cart"));

function variablesProduct() {
  productArticle = document.createElement("article");
  productDivImg = document.createElement("div");

  // Variables about items div
  productItemContent = document.createElement("div");
  productItemContentTitlePrice = document.createElement("div");
  productItemContentSettings = document.createElement("div");
  productItemContentSettingsQuantity = document.createElement("div");
  productItemContentSettingsDelete = document.createElement("div");

  // Variables about product informations
  productTitle = document.createElement("h2");
  productColor = document.createElement("p");
  productPrice = document.createElement("p");
  productTitleQuantity = document.createElement("p");
  productQuantity = document.createElement("input");
  productDelete = document.createElement("p");
}

function appendChildProducts() {
  // With the appendchild, we will move the elements to another.
  document.querySelector("#cart__items").appendChild(productArticle);
  productArticle.appendChild(productItemContent);
  productItemContent.appendChild(productItemContentTitlePrice);
  productItemContentTitlePrice.appendChild(productTitle);
  productItemContentSettings.appendChild(productColor);
  productItemContentTitlePrice.appendChild(productPrice);

  // AppendChild about ItemSettings
  productItemContent.appendChild(productItemContentSettings);
  productItemContentSettings.appendChild(productItemContentSettingsQuantity);
  productItemContentSettingsQuantity.appendChild(productTitleQuantity);
  productItemContentSettingsQuantity.appendChild(productQuantity);
  productItemContentSettings.appendChild(productItemContentSettingsDelete);
  productItemContentSettingsDelete.appendChild(productDelete);
}

function displayProducts() {
  variablesProduct();
  appendChildProducts();

  // Assignation of classes from the HTML/CSS
  // Assignation of the values from products[cart] with innerHTML
  productArticle.className = "cart__item";
  productArticle.setAttribute("data-id", products[cart].idProduct);
  productItemContent.className = "cart__item__content";
  productItemContentTitlePrice.className = "cart__item__content__titlePrice";
  productTitle.innerHTML = products[cart].name;
  productPrice.innerHTML = products[cart].price + " €";
  productItemContentSettings.className = "cart__item__content__settings";
  productColor.innerHTML = "Couleur : " + products[cart].colors;
  productColor.style.fontSize = "16px";

  // Insertion about quantity product
  productItemContentSettingsQuantity.className =
    "cart__item__content__settings__quantity";
  productTitleQuantity.innerHTML = "Quantité : ";
  productQuantity.value = products[cart].quantity;
  productQuantity.className = "itemQuantity";
  productQuantity.setAttribute("type", "number");
  productQuantity.setAttribute("min", "1");
  productQuantity.setAttribute("max", "100");
  productQuantity.setAttribute("name", "itemQuantity");
  productItemContentSettingsDelete.className =
    "cart__item__content__settings__delete";
  productDelete.className = "deleteItem";
  productDelete.innerHTML = "Supprimer";
}

function getTotalPriceOfProducts() {
  // get the totals price from the product and display it
  let totalPrice = 0;
  for (cart in products) {
    totalPrice += products[cart].price * products[cart].quantity;
  }
  document.querySelector("#totalPrice").innerHTML = totalPrice;
}

function modifyQuantityProduct() {
  // modify the quantity of the product and update the total price of the cart when the quantity is modified
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  for (let k = 0; k < itemQuantity.length; k++) {
    itemQuantity[k].addEventListener("change", function () {
      products[k].quantity = itemQuantity[k].value;
      localStorage.setItem("cart", JSON.stringify(products));
      getTotalPriceOfProducts();
    });
  }
}

function deleteProduct() {
  // delete the product from the cart by clicking on the productDelete element
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", (event) => {
      event.preventDefault();
      let idProduct =
        event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
      products.splice(idProduct, 1);
      localStorage.setItem("cart", JSON.stringify(products));
      location.reload();
    });
  }
}

function displayCart() {
  let EmptyCart = document.querySelector("#cart__items");
  // if the cart is empty, display a message
  if (products === null || products === 0) {
    EmptyCart.innerHTML = "<h2>Votre panier est vide</h2>";
    document.querySelector("#order").style.display = "none";
  } else {
    // insert the products with the elements of the cart
    for (cart in products) {
      displayProducts();
      getTotalPriceOfProducts();
    }
  }
}

displayCart();
deleteProduct();
modifyQuantityProduct();

function sendForm() {
  // send the form when the button is clicked
  let btnSubmit = document.getElementById("order");
  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const contact = {
      // create an object contact with the values given by the user with the form
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    console.log(contact);

    function formFirstName() {
      // REGEX for the first name and validate the conditions of the imputs
      const validFirstName = contact.firstName;
      let regExpFirstName =
        /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName);
      if (regExpFirstName) {
        document.querySelector("#firstNameErrorMsg").innerHTML = "";
        return true;
      } else {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerHTML =
          "Votre prénom doit contenir entre 3 et 20 caractères";
      }
    }

    function formLastName() {
      // REGEX for the last name and validate the conditions of the imputs
      const validLastName = contact.lastName;
      let regExpLastName =
        /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validLastName);
      if (regExpLastName) {
        document.querySelector("#lastNameErrorMsg").innerHTML = "";
        return true;
      } else {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerHTML =
          "Votre nom doit contenir entre 3 et 20 caractères";
      }
    }

    function formAddress() {
      // REGEX for the address and validate the conditions of the imputs
      const validAddress = contact.address;
      let regExpAddress =
        /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(
          validAddress
        );
      if (regExpAddress) {
        document.querySelector("#addressErrorMsg").innerHTML = "";
        return true;
      } else {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerHTML = "Votre adresse est invalide.";
      }
    }

    function formCity() {
      // REGEX for the city and validate the conditions of the imputs
      const validCity = contact.city;
      let regExpCity =
        /^[a-zA-Zàâäéèêëïîôöùûüç]+(?:[- ][a-zA-Zàâäéèêëïîôöùûüç]+)*$/.test(
          validCity
        );
      if (regExpCity) {
        document.querySelector("#cityErrorMsg").innerHTML = "";
        return true;
      } else {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerHTML = "Votre ville est invalide.";
      }
    }

    function formEmail() {
      // REGEX for email and validate the conditions of the imputs
      const validEmail = contact.email;
      let regExpEmail =
        /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(
          validEmail
        );
      if (regExpEmail) {
        document.querySelector("#emailErrorMsg").innerHTML = "";
        return true;
      } else {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerHTML = "Votre email est invalide.";
      }
    }

    function formValidation() {
      // if the form is correctly filled, it will create a item "contact" in the localStorage
      if (
        formFirstName() === true &&
        formLastName() === true &&
        formAddress() === true &&
        formCity() === true &&
        formEmail() === true
      ) {
        localStorage.setItem("contact", JSON.stringify(contact));
        return true;
      } else {
        event.preventDefault();
        alert("Merci de remplir correctement le formulaire");
      }
    }
    formValidation();

    // Array from the localStorage to send it to the server
    let products = [];
    for (let i = 0; i < products.length; i++) {
      products.push(products[i].idProduct);
    }

    console.log(products);

    if (formValidation() === true) {
      // Creation of an object order with the informations of "contact" and "products"
      const order = {
        contact,
        products,
      };

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.clear();
          localStorage.setItem("orderId", data.orderId);
          document.location.href = "confirmation.html";
        })
        .catch((error) => console.log(error));
    } else {
      event.preventDefault();
    }
  });
}
sendForm();
