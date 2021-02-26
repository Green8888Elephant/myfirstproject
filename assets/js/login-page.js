function buttonclick() {
    let userinfo = {
        username: document.getElementById("emailaddress").value,
        password: document.getElementById("password").value
    };

    let xhttppost = new XMLHttpRequest();


    xhttppost.onload = function (e) {
        if (xhttppost.readyState === 4) {
            if (xhttppost.status === 200) {
                var response = JSON.parse(xhttppost.responseText);

                localStorage.setItem("token", 'Bearer ' + (response.token));
                localStorage.setItem("datatime", (response.expiresIn));

            } else {
                console.error(xhttppost.statusText);
            }
        }
    };

    xhttppost.open("POST", "https://91713894.ngrok.io/auth/admin/login", false);
    xhttppost.setRequestHeader("Content-Type", "application/json");
    xhttppost.send(JSON.stringify(userinfo));
    //location.href = 'C:\\Users\\user\\Desktop\\ldsgs\\Hyper_v1.2.0\\dist\\pages-profile.html'

}