const url = 'https://excited-deer-headscarf.cyclic.app/orders'
const info = document.querySelector('.info');

async function getusers(){
    const url = "https://excited-deer-headscarf.cyclic.app/users"
    let res = await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("admin_token")
            }
    })
    
    if(res.ok){
        let data = await res.json();
        return data;
    }
}

async function getproduct(id){
    const url = `https://excited-deer-headscarf.cyclic.app/products/${id}`
    let res = await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("admin_token")
            }
    })
    
    if(res.ok){
        let data = await res.json();
        return data;
    }
}

getorders(url);

async function getorders(url){
    let res = await fetch(url,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            "authorization" : localStorage.getItem("admin_token")
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
            info.innerText = `Server Response: ${await res.json()}`
        }
        console.log(await res.json());
    }
}

async function render(data){
    let users = await getusers();
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    for(let elem of data){

        let div = document.createElement('div');

        let div1 = document.createElement('div');

        let img = document.createElement('img');
        img.src = './Images/profile.png';

        let user = users.filter((user) => elem.user_id == user._id)[0];

        let name = document.createElement('p');
        name.innerText = `${user.first_name} ${user.last_name}`;

        let address = document.createElement('p');

        address.innerText = 'address'

        let time = document.createElement('p');

        time.innerText = new Date(elem.placedAt).toDateString();

        let price = document.createElement('p');

        price.innerText = `Total Price: Rs. ${elem.price}.00/-`;

        let info = document.createElement('p');
        info.style.color = 'lightcoral';

        let status = document.createElement('select');

        status.innerHTML = `<Select>
                                <option value="placed">Placed</option>
                                <option value="inprocess">In Process</option>
                                <option value="delivered">Delivered</option>
                                <option value="onread">On Road</option>
                                <option value="declined">Declined</option>
                                <option value="cancelled">Cancelled ⚠️</option>
                            </Select>`

        status.className = 'order_status';

        status.value = elem.status;

        status.addEventListener('change',async (event) => {
            if(event.target.value == 'cancelled'){
                let sure = confirm('Cancel this order?');
                if(sure){
                    info.innerText = 'Cancellation in progress...';
                    await cancelOrder(elem._id);
                    info.innerText = '';
                }
            }
        })

        div1.append(img, name, address, time, price, status, info);

        let div2 = document.createElement('div');

        for(let item of elem.order){
            let div = document.createElement('div');

            let product = await getproduct(item.productId);

            let img = document.createElement('img');
            img.src = product.image_1

            let title = document.createElement('p');
            title.innerText = product.title;

            let quantity = document.createElement('p');
            quantity.innerText = `Qty: ${item.quantity}`;

            let price = document.createElement('p');
            price.innerText = `Rs. ${product.price}/-`

            div.append(img, title, quantity, price);

            div2.append(div);
        }

        div.append(div1, div2);

        gallery.append(div);

    }
}

async function cancelOrder(id){
    const cancel_URL = `https://excited-deer-headscarf.cyclic.app/orders/cancel/${id}`;
    try {
        let res = await fetch(cancel_URL,{
            method:'DElETE',
            headers:{
                'authorization': localStorage.getItem('admin_token')
            }
        })

        res = await res.json();
        console.log(res);
        alert(res.message);
    }
    catch (error) {
        console.log(error);
    }
}
