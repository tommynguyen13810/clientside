$("#getuser").on("click", async (e) => {
    try{
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

$("#userbtn").on("click", async (e) => {
    try{
        if($("#name").val() == "" || $("#dob").val() == "" ) {
            console.log("empty input")
            $(".info").empty()
            $(".info").append(`<p>Empty Input<p>`)
        }
        else {
            const data = {
                name: `${$("#name").val()}`,
                dob: `${$("#dob").val()}`
            }
            const newUser = await fetch('http://localhost:3000/user', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const id = await newUser.json()
            const user = await fetch(`http://localhost:3000/user/${id.id}`, {
            method: 'GET',
            })
            const userdata = await user.json()
            $(".info").empty()
            $(".info").append(`<p>Created user ${userdata.name} with birthday ${userdata.dob} and id ${userdata._id}<p>`)
        }
    }
    catch(e) {
        console.log("Error creating user")
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
            const data = {
                id: `${$("#id").val()}`,
                stock: `${$("#stock").val()}`
            }
            const user = await fetch(`http://localhost:3000/stock/add/${data.id}/${data.stock}`, {
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

