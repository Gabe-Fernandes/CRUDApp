function AddModal(modal) {modal.classList.add("modal-show")}
function RemoveModal(modal) {modal.classList.remove("modal-show")}
/*
function Sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

document.addEventListener("DOMContentLoaded", () => {
  const fadeLayer = document.getElementById("fadeLayer");
  fadeLayer.classList.add("hide-fade-layer");
});

let anchors = document.getElementsByTagName("a");

for (let i = 0; i < anchors.length; i++) {
  if (anchors[i].hostname !== window.location.hostname ||
    anchors[i].pathname === window.location.pathname) { continue; }

  anchors[i].addEventListener("click", () => {
    event.preventDefault();
    fadeLayer.classList.remove("hide-fade-layer");
    const anchorTarget = event.currentTarget;

    Sleep(200).then(() => {
      window.location = anchorTarget});
  });
}*/
