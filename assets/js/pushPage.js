
localStorage.getItem('token');

let btn = document.getElementById('pushbutton');

btn.addEventListener('click', function () {
    buttonAction();
});



function buttonAction() {

    let removexhr = new XMLHttpRequest();


    removexhr.onload = function (e) {
        if (removexhr.readyState === 4) {
            if (removexhr.status === 200) {
                var response = JSON.parse(removexhr.responseText);
            } else if (removexhr.status === 401) {
                localStorage.clear();
                window.location = "pages-login.html";
            } else {
                console.error(removexhr.statusText);
            }
        }
    };

    let textfile = document.getElementById('text');
    removexhr.open("POST", "https://91713894.ngrok.io/api/admin/push", true);
    removexhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    removexhr.setRequestHeader("Content-Type", "application/json");
    removexhr.send(JSON.stringify(textfile.value));
    textfile.value = "";
}


