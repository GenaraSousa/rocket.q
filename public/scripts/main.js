import Modal from './modal.js';

const modal = Modal();
const modalTitle =  document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");
const ckeckButtons = document.querySelectorAll('.actions a.check');
const deleteButton = document.querySelectorAll(".actions a.delete");


//pegar botões com a classe check
//pegar quando o marcar como lido for clicado
ckeckButtons.forEach(button => {
    button.addEventListener('click', handleClick)
});

// pegar botão de excluir
// colocar evento pra abrir modal
deleteButton.forEach( button =>  {
    button.addEventListener("click", (event) => handleClick(event, false)) 
})

function handleClick(event, check = true){
    //abrir modal
    event.preventDefault()
    const form = document.querySelector(".modal form");
    const slug = check ? "check": "delete"
    const questionId = event.target.dataset.id
    // Pegando dados do html com dataset
    const roomId = document.querySelector("#room-id").dataset.id;
    // Adicionando atributo a uma tag html dinâmicamente
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    const text = check ? "Marcar como lida " : "Excluir  ";
    modalTitle.innerHTML = `${text} essa pergunta?`;
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} essa pergunta?`;
    modalButton.innerHTML = check ? 'Sim, marcar':'Sim, excluir';
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red");

    modal.open()
}



