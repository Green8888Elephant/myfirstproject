let commentxhr = new XMLHttpRequest();

commentxhr.open("GET", "https://91713894.ngrok.io/api/admin/comments", true);

commentxhr.setRequestHeader("Authorization", localStorage.getItem("token"));

commentxhr.onload = function (e) {
    if (commentxhr.readyState === 4) {
        if (commentxhr.status === 200) {
            let data = JSON.parse(commentxhr.responseText);


            for (let i = 0; i < data.length; i++) {

                let tableID = document.getElementById("tbody");

                let row = tableID.insertRow();
                // id value to delete row
                row.setAttribute("id", data[i].commentId);

                let td_2 = row.insertCell(0);
                let td_4 = row.insertCell(1);

                let btn_ACCEPT = document.createElement('button');
                btn_ACCEPT.title = "Подтвердить коментарий";
                btn_ACCEPT.type = "button";
                btn_ACCEPT.className = "btn btn-success";
                btn_ACCEPT.name = "ACCEPT";
                btn_ACCEPT.innerHTML = "Accept";
                btn_ACCEPT.setAttribute('action', 'ACCEPT');

                let btn_DELETE = document.createElement('button');
                btn_DELETE.title = "Удалить коментарий";
                btn_DELETE.type = "button";
                btn_DELETE.className = "btn btn-danger";
                btn_DELETE.name = "DELETE";
                btn_DELETE.innerHTML = "Delete";
                btn_DELETE.setAttribute('action', 'DELETE');


                let btn_WARN = document.createElement('button');
                btn_WARN.title = "Удалить с предупреждением";
                btn_WARN.type = "button";
                btn_WARN.className = "btn btn-warning";
                btn_WARN.name = "WARN";
                btn_WARN.innerHTML = "Warning";
                btn_WARN.setAttribute('action', 'WARN');


                btn_ACCEPT.addEventListener('click', function () {
                    buttonAction(data[i], "ACCEPT");
                });

                btn_DELETE.addEventListener('click', function () {
                    buttonAction(data[i], "DELETE");
                });

                btn_WARN.addEventListener('click', function () {
                    buttonAction(data[i], "WARN");
                });

                td_2.innerText = data[i].text;

                td_4.appendChild(btn_ACCEPT);
                td_4.appendChild(btn_DELETE);
                td_4.appendChild(btn_WARN);
            }
        }else if (xhttppost.status === 401) {
            localStorage.clear();
            window.location = "pages-login.html";
        }else {
            console.log('Smth really bad');
        }
    }
};


function buttonAction(data, action) {
    // if (action == 'WARN') {
    //     let removedrow = document.getElementById('tbody').deleteRow(data.id);
    // }


    let removexhr = new XMLHttpRequest();


    removexhr.onload = function (e) {
        if (removexhr.readyState === 4) {
            if (removexhr.status === 200) {
                // var response = JSON.parse(removexhr.responseText);

                // localStorage.setItem("token", 'Bearer ' + (response.token));
                // localStorage.setItem("datatime", (response.expiresIn));
                // window.location = "publPage.html";

            }
            else if (removexhr.status === 401) {
                localStorage.clear();
                window.location = "pages-login.html";
            }else {
                console.error(removexhr.statusText);
            }
        }
    };

   let ServerAction = {
        "id": data.commentId,
        "status": action,
        "type": "COMMENT"
    };

    removexhr.open("POST", "https://91713894.ngrok.io/api/admin/moderate", true);
    removexhr.setRequestHeader("Authorization", localStorage.getItem("token"));

    removexhr.setRequestHeader("Content-Type", "application/json");
    removexhr.send(JSON.stringify(ServerAction));

    // let removedrow = document.getElementById('tbody').deleteRow(data.id);

}



// commentxhr.send(JSON.stringify(ServerAction));
commentxhr.send();
//location.href = 'C:\\Users\\user\\Desktop\\ldsgs\\Hyper_v1.2.0\\dist\\pages-profile.html'