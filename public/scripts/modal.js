export default function Modal(){
    const modalWrapper = document.querySelector('.modal-wrapper');
    const cancelButton = document.querySelector(".button.cancel");

    cancelButton.addEventListener("click", close)

    function open(){
        //atribuir classe active para o modal
        modalWrapper.classList.add("active")
    }

    function close(){
        //retirar classe active da modal
        modalWrapper.classList.remove("active")
    }

    return {
        open,
        close
    }

}