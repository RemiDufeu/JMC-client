const isAuth = () => {
    let token = ''
    try {
        token = JSON.parse(localStorage.getItem('token'))
        console.log(token)
    } catch (error) {
        return false
    }
    fetch(`http://localhost:3001/api/auth/signInToken`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ token
        },
    })
    .then(res => {  
        if (res.status >= 200 && res.status <= 299) {
            return true
        } else {
            return false
        }
    })
}


export default isAuth