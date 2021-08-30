
$("#getuser").on("click", async (e) => {
    try{
        const user = await fetch('http://localhost:3000/user/all', {
            method: 'GET',
        })
        const userdata = await user.json()
        console.log(userdata)
        for(let i = 0; i < userdata.length; i++) {
            $("body").append(`<p>The user is ${userdata[i].name} with dob ${userdata[i].dob}<p>`)
        }
    }
    catch(e) {
        console.log("Error getting user")
        console.log(e)
    }
})

$("#deleteall").on("click", async (e) => {
    try{
        const user = await fetch('http://localhost:3000/user/deleteall', {
            method: 'DELETE',
        })
        const userdata = await user.json()
        console.log(userdata)
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
        }
        else {
            const data = {
                name: `${$("#name").val()}`,
                dob: `${$("#dob").val()}`
            }
            console.log(data)
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
            $("body").append(`<p>Created user ${userdata.name} with birthday ${userdata.dob}<p>`)
        }
    }
    catch(e) {
        console.log("Error creating user")
        console.log(e)
    }
}) 
