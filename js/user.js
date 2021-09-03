//gets id from prev login page or signup page
storage = window.localStorage
const id = storage.getItem('id')
storage.removeItem('id')

//shows adding stock menu
$("#addstock").on("click", (e) => {
    console.log("trigger")
    $(".stockinfo").attr("style","display:none")
    $(".stockadd").attr("style","display:inline-block")
})

//goes back to user info
$("#cancel").on("click", (e) => {
    console.log("trigger")
    $(".stockadd").attr("style","display:none")
    $(".stockinfo").attr("style","display:inline-block")
})

//adds stock to user
$("#stockbtn").on("click", async (e) => {
    try{
        if($("#stock").val() == "") {
            console.log("empty input")
            $(".info").empty()
            $(".info").append(`<p>Empty Input<p>`)
        }
        else {
            stock = $("#stock").val()
            const user = await fetch(`http://localhost:3000/stock/add/${id}/${stock}`, {
            method: 'GET',
            })
            $("#stocks").append(`<li>${stock}</li>`)
            $(".stockadd").attr("style","display:none")
            $(".stockinfo").attr("style","display:inline-block")
        }
    } catch(e) {
        console.log("Error adding stock")
        console.log(e)
    }
})

//loads in stocks
async function loadUserInfo() {
    try{
        const user = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'GET',
        })
        const userdata = await user.json()
        for(let i = 0; i < userdata.stock.length; i++) {
            $("#stocks").append(`<li>${userdata.stock[i]}</li>`)
        }
        $("#user").append(userdata.name)
    }
    catch (e) {
        console.log(e)
    }

}

(async function(){
    await loadUserInfo();
  })()