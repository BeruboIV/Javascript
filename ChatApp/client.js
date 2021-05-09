document.addEventListener("DOMContentLoaded", () => {
    const socket = io(); // No need to write the URL since it default connects to the host that serves the page.
    const form = document.getElementById("form");
    const message = document.getElementById("text");
    const message_container = document.getElementById("message-container");

    socket.on("connect", () => {
        console.log(socket.id);
    });

    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (message.value) {
            socket.emit("chat-message", message.value);
            message.value = "";
        }
    });

    socket.on("chat-message", (msg) => {
        const item = document.createElement("div");
        item.innerText = msg;
        message_container.appendChild(item);
        // window.scrollTo(0, document.body.scrollHeight);
        // alert("Message!");
    });
});
