//onload = () => process("{\"1\":{\"article_id\":\"1\",\"name\":\"Salami\",\"picture\":\"pizza.gif\",\"price\":\"8.57\",\"ordered_article_id\":\"57\",\"ordering_id\":\"20\",\"status\":\"0\"},\"2\":{\"article_id\":\"2\",\"name\":\"Vegetaria\",\"picture\":\"pizza.gif\",\"price\":\"12.5\",\"ordered_article_id\":\"56\",\"ordering_id\":\"20\",\"status\":\"0\"},\"3\":{\"article_id\":\"3\",\"name\":\"Spinat-H\u00fchnchen\",\"picture\":\"pizza.gif\",\"price\":\"11.99\",\"ordered_article_id\":\"54\",\"ordering_id\":\"20\",\"status\":\"0\"}}");
onload = () => window.setInterval(requestData, 2000);

var request = new XMLHttpRequest();

function process(json) {
    const obj = JSON.parse(json);

    for (const key in obj) {
        const id = obj[key].ordered_article_id;
        const status = obj[key].status;

        document.getElementById("bestellt_" + id).checked = status == 0;
        document.getElementById("im_ofen_" + id).checked = status == 1;
        document.getElementById("fertig_" + id).checked = status == 2;
        document.getElementById("unterwegs_" + id).checked = status == 3;
        document.getElementById("geliefert_" + id).checked = status == 4;
    }
}

function requestData() { // fordert die Daten asynchron an
    request.open("GET", "customer_status.php"); // URL für HTTP-GET
    request.onreadystatechange = processData; //Callback-Handler zuordnen
    request.send(null); // Request abschicken
}

function processData() {
    // Uebertragung = DONE
    if (request.readyState == 4) {
        // HTTP-Status = OK
        if (request.status == 200) {
            if (request.responseText != null)
                // Daten verarbeiten
                process(request.responseText);
        }else console.error("Dokument ist leer");
        } else console.error("Uebertragung fehlgeschlagen");
    // Uebertragung laeuft noch
    } else ;
}
