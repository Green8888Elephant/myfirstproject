
    // var elem = document.querySelector("#photo");
    // elem.remove();

    $('#myModal').on('hidden.bs.modal', function (e) {
        const myNode = document.getElementById("photo");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    });