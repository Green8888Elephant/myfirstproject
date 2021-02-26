let advertPage = new XMLHttpRequest();

advertPage.open("GET", "https://91713894.ngrok.io/api/admin/advertisements", true);

advertPage.setRequestHeader("Authorization", localStorage.getItem("token"));



advertPage.onload = function (e) {
    if (advertPage.readyState === 4) {
        if (advertPage.status === 200) {
            let data = JSON.parse(this.responseText);


            for (let i = 0; i < data.length; i++) {

                let tableID = document.getElementById("tbody");

                let row = tableID.insertRow();
                // id value to delete row
                row.setAttribute("id", data[i].id);

                let td_2 = row.insertCell(0);
                let td_3 = row.insertCell(1);
                let td_4 = row.insertCell(2);


                td_2.innerText = data[i].description;
                let img = document.createElement('img');
                // img.setAttribute('src', data.images[i]);
                img.setAttribute('src', data[i].image);
                img.style = "max-width:50%;" +
                    "    height:auto;";
                td_3.appendChild(img);

                let btn = document.createElement('button');
                btn.title = "Больше информации";
                btn.type = "button";
                btn.className = "btn btn-primary";
                btn.name = "More";
                btn.innerHTML = "Moderate";
                // btn.value = data[i].id;
                btn.setAttribute("data-toggle", "modal");
                btn.setAttribute("data-target", "#myModal");
                btn.addEventListener('click', function () {
                    fillModal(data[i], i);
                });

                td_4.appendChild(btn);
            }
        }
        else if (xhttppost.status === 401) {
            localStorage.clear();
            window.location = "pages-login.html";
        }else {
            console.log('Smth really bad');
        }
    }
};

function fillModal(data, rowIndex) {

    document.getElementById('name_of_creator').innerHTML = "Creator: " + data.creator;



    //let postInfo = JSON.parse(this.responseText);
    for (let i = 0; i < data.images.length; i++) {

        let img = document.createElement('img');
        // img.setAttribute('src', data.images[i]);
        img.setAttribute('src', data.images[i]);
        img.style = "max-width:100%;" +
            "    height:auto;";


        let photoID = document.getElementById("photo");
        photoID.appendChild(img);
        // img.appendChild(img);
    }


    document.getElementById('sport').innerHTML = "Sport: " + data.sport;
    document.getElementById('sportCategory').innerHTML = "SportCategory: " + data.description;
    document.getElementById('price').innerHTML = "Price: " + data.description;
    document.getElementById('description').innerHTML = "Description: " + data.description;
    document.getElementById('title').innerHTML = "Title: " + data.description;
    //document.getElementById('id').innerHTML = "Description: " + data.description;


    // button
    let btnSuccess = document.getElementById('btn-success');
    let btnDelete = document.getElementById('btn-delete');
    let btnWARN = document.getElementById('btn-warning');

    btnSuccess.setAttribute('action', 'ACCEPT');
    btnDelete.setAttribute('action', 'DELETE');
    btnWARN.setAttribute('action', 'WARN');


    btnSuccess.setAttribute('type', 'ADVERTISEMENT');
    btnDelete.setAttribute('type', 'ADVERTISEMENT');
    btnWARN.setAttribute('type', 'ADVERTISEMENT');



    btnSuccess.addEventListener('click', function () {
        buttonAction(data, "ACCEPT", rowIndex);
    });

    btnDelete.addEventListener('click', function () {
        buttonAction(data, "DELETE", rowIndex);
    });

    btnWARN.addEventListener('click', function () {
        buttonAction(data, "WARN", rowIndex);
    });







}

function buttonAction(data, action, rowIndex) {
    // if (action == 'DELETE') {
    //     let removedrow = document.getElementById('tbody').deleteRow(data.id);
    // }


    let removexhr = new XMLHttpRequest();


    removexhr.onload = function (e) {
        if (removexhr.readyState === 4) {
            if (removexhr.status === 200) {
                var response = JSON.parse(removexhr.responseText);

                // localStorage.setItem("token", 'Bearer ' + (response.token));
                // localStorage.setItem("datatime", (response.expiresIn));
                // window.location = "publPage.html";

            }else if (removexhr.status === 401){
                localStorage.clear();
                window.location = "pages-login.html";
            }else {
                console.error(removexhr.statusText);
            }
        }
    };
    let ServerAction = {
        "id": data.id,
        "status": action,
        'type' : 'ADVERTISEMENT'
    };
    removexhr.open("POST", "https://91713894.ngrok.io/api/admin/moderate", true);
    removexhr.setRequestHeader("Content-Type", "application/json");
    removexhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    removexhr.send(JSON.stringify(ServerAction));

    let removedrow = document.getElementById('tbody').deleteRow(rowIndex);

}

advertPage.send();

//location.href = 'C:\\Users\\user\\Desktop\\ldsgs\\Hyper_v1.2.0\\dist\\pages-profile.html'