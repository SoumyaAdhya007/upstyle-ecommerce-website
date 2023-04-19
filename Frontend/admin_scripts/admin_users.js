const url = "https://excited-deer-headscarf.cyclic.app/users"
const info = document.querySelector('.info');

getdata(url);
async function getdata(url){
    try {
        let res = await fetch(url,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("admin_token")
                }
        })
        
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

function render(data){
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    for(let elem of data){
        let div = document.createElement("div");
        div.className = elem._id;
        let img = document.createElement('img');
        img.src = "./Images/profile.png"
        let name = document.createElement("p");
        name.innerText = `${elem.first_name} ${elem.last_name}`;
        let email = document.createElement("p");
        email.innerText = elem.email;
        let phone = document.createElement("p");
        phone.innerText = elem.mobile;
        let gender = document.createElement("p");
        gender.innerText = elem.gender
        let address = document.createElement('p');
        if(elem.address && elem.address.length){
            address.innerText = `Address (${elem.address.length}) : ${elem.address[0].city}, ${elem.address[0].state}`;
        }
        else{
            address.innerText = `Address (0) : none`;
        }
        let cartItems = document.createElement('p');
        cartItems.innerText = `Cart Items: ${elem.cart.length}`;

        let wishlists = document.createElement('p');
        wishlists.innerText = `Wishlists: ${elem.wishlist.length}`;

        let deletebutton = document.createElement("button");
        deletebutton.className = "delete"
        deletebutton.innerText = "Delete"
        
        div.append(img,name,email,phone,address,cartItems,wishlists,deletebutton)

        gallery.append(div);

    }

    let deletebuttons = document.querySelectorAll(".delete");
    for(let elem of deletebuttons){
        elem.addEventListener("click",async (event)=>{
            let response = confirm("Delete this user?")
            if(response){
                let id = elem.parentElement.className;
                let prev_text = event.target.innerText;
                event.target.innerText = 'Deleting...';
                await deleteuser(`https://excited-deer-headscarf.cyclic.app/users/delete/${id}`);
                event.target.innerText = prev_text;
            }
        })
    }
}

async function deleteuser(url){
    try {
        let res = await fetch(url,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("admin_token")
                }
        })
        
        if(res.ok){
            let res = await res.json();
            alert(res.message);
            getdata(`https://excited-deer-headscarf.cyclic.app/users`);
        }
        else{
            let err = await res.json();
            console.log(err);
            alert(err.message);
        }
    }
    catch (error) {
        console.log(error);
    }
}