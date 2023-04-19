const logout_url = 'https://excited-deer-headscarf.cyclic.app/admin/logout'

document.querySelector('#logout').addEventListener('click',async (event) => {
    const sure = confirm('Logout from the website?');
    if(sure){
        const prev_text = event.target.innerText;
        event.target.innerText = 'Working...';
        await logout(logout_url);
        event.target.innerText = prev_text;
    }
})

async function logout(url){
    let res = await fetch(url,{
        method:'GET',
        headers:{
            'authorization': localStorage.getItem('admin_token')
        }
    })

    res = await res.json();

    alert(res.message);
}