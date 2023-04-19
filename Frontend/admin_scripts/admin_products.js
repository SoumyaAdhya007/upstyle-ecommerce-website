let editbuttons = document.querySelectorAll(".edit");
const info = document.querySelector('.info');

const url = "https://excited-deer-headscarf.cyclic.app/products";

async function getproducts(url){
  try {
    let res = await fetch(url);
    if(res.ok){
      let data = await res.json();
      render(data);
  }
  else{
      if(!localStorage.getItem('admin_token')){
          info.innerText = 'You are not logged in'
          console.log({msg: 'admin_token not available in local storage'})
      }
      else{
          info.innerText = `Server Response: ${res.json()}`
      }
      console.log(await res.json());
  }
  }
  catch (error) {
    console.log(error);
  }
}

getproducts(url);

function render(data) {
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let elem of data) {
    let div = document.createElement("div");
    div.style.borderColor = elem.color
    div.className = elem._id;

    let imgdiv = document.createElement("div");
    let img = document.createElement("img");
    img.src = elem.image_1;
    imgdiv.append(img);

    let detailsdiv = document.createElement("div");
    let select = document.createElement("select");
    select.innerHTML = `<select class="category" disabled>
                                <option value="">Category</option>
                                <option value="male">Men</option>
                                <option value="female">Women</option>
                            </select>`;
    select.value = elem.gender;
    select.className = "category";
    select.disabled = true;

    let title_heading = document.createElement("p");
    title_heading.innerText = "Title";

    let title = document.createElement("input");
    title.value = elem.title;
    title.placeholder = "title";
    title.readOnly = true;
    title.className = "title";
    title.type = "text";

    let Price_heading = document.createElement("p");
    Price_heading.innerText = "Price(Rs.)";
    let price = document.createElement("input");
    price.value = elem.price;
    price.placeholder = "price";
    price.readOnly = true;
    price.className = "price";
    price.type = "text";

    let brand_heading = document.createElement("p");
    brand_heading.innerText = "Brand";
    let brand = document.createElement("input");
    brand.value = elem.brand;
    brand.placeholder = "brand";
    brand.readOnly = true;
    brand.className = "brand";
    brand.type = "text";

    let color_heading = document.createElement("p");
    color_heading.innerText = "Color";
    let color = document.createElement("input");
    color.value = elem.color;
    color.placeholder = "color";
    color.readOnly = true;
    color.className = "color";
    color.type = "text";

    let discount_heading = document.createElement("p");
    discount_heading.innerText = "Discount(%)";
    let discount = document.createElement("input");
    discount.value = elem.discount;
    discount.placeholder = "discount";
    discount.readOnly = true;
    discount.className = "discount";
    discount.type = "text";

    let buttondiv = document.createElement("div");
    buttondiv.className = "buttons";

    let editbutton = document.createElement("button");
    editbutton.className = "edit";
    editbutton.innerText = "Edit";

    let deletebutton = document.createElement("button");
    deletebutton.className = "delete";
    deletebutton.innerText = "Delete";

    buttondiv.append(editbutton, deletebutton);

    detailsdiv.append(
      select,
      title_heading,
      title,
      Price_heading,
      price,
      brand_heading,
      brand,
      color_heading,
      color,
      discount_heading,
      discount,
      buttondiv
    );

    div.append(imgdiv, detailsdiv);

    gallery.append(div);
  }

  let editbuttons = document.querySelectorAll(".edit");
  for (let elem of editbuttons) {
    elem.addEventListener("click", () => {
      let inputs = elem.parentElement.parentElement.childNodes;
      let id = elem.parentElement.parentElement.parentElement.className;
      var deletebutton = elem.parentElement.childNodes[1];
      if (elem.innerText == "Edit") {
        for (let input of inputs) {
          input.readOnly = false;
          if (input.className == "category") {
            input.disabled = false;
          }
        }

        elem.innerText = "Save";
        elem.style.border = '1px solid white'
        deletebutton.disabled = true;
        deletebutton.style.color = "grey";
      } else {
        let updates = {};
        for (let input of inputs) {
          input.readOnly = true;
          if (input.className == "category") {
            input.disabled = true;
            updates.category = input.value;
          }
          if (input.className == "title") {
            updates.title = input.value;
          }
          if (input.className == "price") {
            updates.price = input.value;
          }
          if (input.className == "color") {
            updates.color = input.value;
          }
          if (input.className == "brand") {
            updates.brand = input.value;
          }
          if (input.className == "discount") {
            updates.discount = input.value;
          }
        }
        update(id, updates, elem);
        elem.style.border = '1px solid rgba(255, 255, 255, 0.103)'
        deletebutton.disabled = false;
        deletebutton.style.color = "white";
      }
    });
  }

  let deletebuttons = document.querySelectorAll(".delete");
  for (let elem of deletebuttons) {
    elem.addEventListener("click", () => {
      const sure = confirm('Delete this product?')
      if(sure){
        let id = elem.parentElement.parentElement.parentElement.className;
        deleteproduct(id, elem);
      }
    });
  }
}

async function update(id, updates, elem) {
  const url = `https://excited-deer-headscarf.cyclic.app/products/update/${id}`;
  try {
    elem.innerText = "...";
    let res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("admin_token"),
      },
      body: JSON.stringify(updates),
    });
    res = await res.json();
    elem.innerText = "Edit";
    alert(res.message);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteproduct(id, elem) {
  const url = `https://excited-deer-headscarf.cyclic.app/products/delete/${id}`;
  const prev_text = elem.innerText;
  elem.innerText = 'Deleting...'
  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("admin_token"),
      },
    });

    res = await res.json();
    console.log(res);
    // elem.innerText = prev_text;
    elem.parentElement.parentElement.parentElement.style.display = 'none';
    alert(res.message);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

// =======================================================================NEW PRODUCT================================

const plus = document.querySelector(".add_new");
const form = document.querySelector(".new_product");
form.style.display = "none";

plus.addEventListener("click", () => {
  if (form.style.display == "none") {
    plus.title = 'Close new product form';
    plus.style.transform = "rotate(45deg)";
    form.style.display = "block";
  } else {
    plus.style.transform = "rotate(0deg)";
    form.style.display = "none";
    plus.title = 'Add new product'
  }
});

document.querySelector('.new_product_form').addEventListener('submit',(event) => {
    event.preventDefault();
    const image_1 = document.querySelector('#image_1').value;
    const image_2 = document.querySelector('#image_2').value || image_1
    const image_3 = document.querySelector('#image_3').value || image_1
    const title = document.querySelector('#title').value;
    const brand = document.querySelector('#brand').value;
    const price = document.querySelector('#price').value;
    const gender = document.querySelector('#gender').value;
    const discount = document.querySelector('#discount').value;
    const description = document.querySelector('#description').value;
    const category = document.querySelector('#category').value;
    const color = document.querySelector('#color').value;

    const payload = {
        image_1,
        image_2,
        image_3,
        image_4:image_1,
        image_5:image_1,
        image_6:image_1,
        title,
        brand,
        price,
        gender,
        discount,
        description,
        category,
        color
    }

    new_product(payload);
})

async function new_product(payload){
  const submit_button = document.querySelector('#submit_button');
  const prev_text = submit_button.innerText;
  submit_button.innerText = 'Adding...';
  const url = 'https://excited-deer-headscarf.cyclic.app/products/add'
  try {
    let res = await fetch(url,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'authorization': localStorage.getItem('admin_token')
      },
      body: JSON.stringify(payload)
    })

    res = await res.json();
    console.log(res);
    submit_button.innerText = prev_text;
    alert(res.message);
  }
  catch (error) {
    console.log(error);
  }
}

document.querySelector('#color').addEventListener('input',(event) => {
    event.target.style.borderColor = event.target.value;
})
