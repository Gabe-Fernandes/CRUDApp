function AddModal(modal) {modal.classList.add("modal-show")}
function RemoveModal(modal) {modal.classList.remove("modal-show")}

function Sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}