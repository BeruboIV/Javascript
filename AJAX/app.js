document.addEventListener("DOMContentLoaded", () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            const ul = document.getElementById("ul");
            var n = myObj.length;
            myObj.map((ele, idx) => {
                const li = document.createElement("li");
                const div = document.createElement("div");
                div.innerText = ele.city + ": ";
                ele.forecast.forEach((temp) => {
                    if (temp >= 70) {
                        const img = document.createElement("img");
                        img.src = "warm.jpg";
                        img.style.width = "50px";
                        img.style.height = "50px";
                        img.style.margin = "10px";
                        div.appendChild(img);
                    } else {
                        const img = document.createElement("img");
                        img.src = "cold.png";
                        img.style.width = "50px";
                        img.style.height = "50px";
                        img.style.margin = "10px";
                        div.appendChild(img);
                    }
                });
                li.appendChild(div);
                ul.appendChild(li);
            });
        }
    };
    xmlhttp.open("GET", "forecast.txt", true);
    xmlhttp.send();
});
