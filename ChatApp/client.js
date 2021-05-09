document.addEventListener("DOMContentLoaded", () => {
    const socket = io(); // No need to write the URL since it default connects to the host that serves the page.
    const form = document.getElementById("form");
    const message = document.getElementById("text");
    const message_container = document.getElementById("message-container");
    const name = prompt("Enter your name: ");

    // New user joins
    addMessage("You joined");
    socket.emit("new-user", name);
    socket.on("user-joined", (name) => {
        addMessage(name + " joined");
    });

    //Hitting the send button
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (message.value) {
            addMessage("You : " + message.value);
            socket.emit("chat-message", {
                message: message.value,
                name: name,
            });
            message.value = "";
        }
    });

    socket.on("send-message", (info) => {
        addMessage(info.name + " " + info.message);
        console.log(info);
    });

    function addMessage(msg) {
        const item = document.createElement("div");
        item.style.paddingTop = "10px";
        item.innerText = msg;
        message_container.appendChild(item);
    }
});
