
$("#getuser").on("click", async (e) => {
    try{
        const user = await fetch('http://localhost:3000/user', {
            method: 'GET',
        })
        const userdata = await user.json()
        $("body").append(`<p>The user is ${userdata.user}<p>`)
    }
    catch(e) {
        console.log("Error getting user")
        console.log(e)
    }
})

