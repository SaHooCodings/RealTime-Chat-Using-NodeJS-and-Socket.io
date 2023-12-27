const socket = io('http://localhost:8000')
const form = document.getElementById('send-con');
const msg = document.getElementById('msgInput');
const msgContainer = document.querySelector(".container");
let names;
do{
    names = prompt('Please enter your Name')
}
while(!names)

form.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter')
    sendMSG(e.target.value)
})

function sendMSG(msg){
    let msg = {
        users: names,
        message: msg 
    }
    appendMsg(msg, 'outgoing')
}
function appendMsg(msg, type){
    let Div = document.createElement('div')
    let className  = type
    Div.classList.add(className, 'msg')
    
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    Div.innerHTML = markup
    msgContainer.appendChild(Div)
}

socket.on('message', (msg) => {
    appendMsg(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    msgContainer.scrollTop = msgContainer.scrollHeight
}
