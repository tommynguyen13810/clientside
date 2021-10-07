//gets id from prev login page or signup page
storage = window.localStorage
const id = storage.getItem('id')

//shows adding stock menu
$("#addstock").on("click", (e) => {
    console.log("trigger")
    $(".stockinfo").attr("style", "display:none")
    $(".stockadd").attr("style", "display:inline-block")
})

//goes back to user info
$("#cancel").on("click", (e) => {
    console.log("trigger")
    $(".stockadd").attr("style", "display:none")
    $(".stockinfo").attr("style", "display:inline-block")
})

//adds stock to user
$("#stockbtn").on("click", async (e) => {
    try {
        if ($("#stock").val() == "") {
            console.log("empty input")
            $(".info").empty()
            $(".info").append(`<p>Empty Input<p>`)
        }
        else {
            stock = $("#stock").val()
            const user = await fetch(`http://localhost:3000/stock/add/${id}/${stock}`, {
                method: 'GET',
            })
            const price = await getStockPrice(stock)
            $("#stocklist").append(`<li class="list-group-item">${stock}: <span class="badge badge-success">${price}</span></li>`)
            $(".stockadd").attr("style", "display:none")
            $(".stockinfo").attr("style", "display:inline-block")
        }
    } catch (e) {
        console.log("Error adding stock")
        console.log(e)
    }
})

async function getStockPrice(symbol) {
    try {
        var url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=1RYOT2M4HI7WUUS7`;
        const data = await fetch(url)
        const datajson = await data.json()
        const price = datajson['Global Quote']['02. open']
        return price
    } catch (e) {
        console.log("Error getting stock")
        console.log(e)
    }
}

//loads in stocks
async function loadUserInfo() {
    try {
        const user = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'GET',
        })
        const userdata = await user.json()
        $("#user").append(userdata.name)
        for (let i = 0; i < userdata.stock.length; i++) {
            const price = await getStockPrice(userdata.stock[i])
            $("#stocklist").append(`<li class="list-group-item">${userdata.stock[i]}: <span class="badge badge-success">${price}</span></li>`)
        }
    }
    catch (e) {
        console.log(e)
    }

}

(async function () {
    await loadUserInfo();
})()