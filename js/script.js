$("#getuser").on("click", async (e) => {
    try{
        console.log("testing")
        $(".info").empty()
        const user = await fetch('http://localhost:3000/user/all', {
            method: 'GET',
        })
        const userdata = await user.json()
        console.log(userdata)
        for(let i = 0; i < userdata.length; i++) {
            $(".info").append(`<p>The user is ${userdata[i].name} with dob ${userdata[i].dob}, watching: ${userdata[i].stock}<p>`)
        }
    }
    catch(e) {
        console.log("Error getting user")
        console.log(e)
    }
})

$("#deleteall").on("click", async (e) => {
    try{
        $(".info").empty()
        $(".info").append("Deleted all Users")
        const user = await fetch('http://localhost:3000/user/deleteall', {
            method: 'DELETE',
        })
    }
    catch(e) {
        console.log("Error deleting users")
        console.log(e)
    }
})

$("#stockbtn").on("click", async (e) => {
    try{
        if($("#id").val() == "" || $("#stock").val() == "" ) {
            console.log("empty input")
            $(".info").empty()
            $(".info").append(`<p>Empty Input<p>`)
        }
        else {
            id = $("#id").val(),
            stock = $("#stock").val()
            const user = await fetch(`http://localhost:3000/stock/add/${id}/${stock}`, {
            method: 'GET',
            })
            const userdata = await user.json();
            $(".info").empty()
            $(".info").append(`<p>User ${userdata.name} is now watching ${userdata.stock}<p>`)
        }
    } catch(e) {
        console.log("Error adding stock")
        console.log(e)
    }
})

$("#test").on("click", async (e) => {
    try{
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=1RYOT2M4HI7WUUS7';
        const data = await fetch(url)
        const datajson = await data.json()
        console.log(datajson)
    }catch(e) {
        console.log("Error getting stock")
        console.log(e)
    }
})
