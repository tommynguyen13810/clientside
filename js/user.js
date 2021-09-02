async function loadUserInfo() {
    storage = window.localStorage
    const id = storage.getItem('id')
    storage.removeItem('id')
    $("#user").append(id)
    
    try{
        const user = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'GET',
        })
        const userdata = await user.json()
        for(let i = 0; i < userdata.stock.length; i++) {
            $("#stocks").append(`<li>${userdata.stock[i]}</li>`)
        }
    
    }
    catch (e) {
        console.log(e)
    }
}

(async function(){
    await loadUserInfo();
  })()