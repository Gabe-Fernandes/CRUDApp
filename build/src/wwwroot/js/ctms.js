const adminViewUsersBtn = document.getElementById("adminViewUsersBtn");
const adminCreateStudyBtn = document.getElementById("adminCreateStudyBtn");

const userModal = document.getElementById("userModal");
const userBackBtn = document.getElementById("userBackBtn");

const createModal = document.getElementById("createModal");
const createStudyName = document.getElementById("createStudyName");
const createDescription = document.getElementById("createDescription");
const createRegion = document.getElementById("createRegion");
const createStartDate = document.getElementById("createStartDate");
const createEndDate = document.getElementById("createEndDate");
const createCreateBtn = document.getElementById("createCreateBtn");
const createBackBtn = document.getElementById("createBackBtn");
const createError = document.getElementById("createError");

function CreateErrorToggle(toggle, message) {
  createError.classList[toggle]("create-error");
  createCreateBtn.innerHTML = message;
  createCreateBtn.classList[toggle]("btn-disable");
}

function VerifyStudy() {
  if (createStartDate.value > createEndDate.value && createEndDate.value !== "") {
    CreateErrorToggle("add", "Invalid Dates");
  }else {
    RemoveModal(createModal);
    Sleep(1000).then(()=> {ClearCreateModal()});
  }
}

function ClearCreateModal() {
  createStudyName.value = "";
  createDescription.value = "";
  createRegion.value = "";
  createStartDate.value = "";
  createEndDate.value = "";
}

adminViewUsersBtn.addEventListener("click", ()=> {AddModal(userModal)});
userBackBtn.addEventListener("click", ()=> {RemoveModal(userModal)});
adminCreateStudyBtn.addEventListener("click", ()=> {AddModal(createModal)});
createBackBtn.addEventListener("click", ()=> {RemoveModal(createModal)});

createCreateBtn.addEventListener("click", ()=> {VerifyStudy()});
createStartDate.addEventListener("input", ()=> {CreateErrorToggle("remove", "Create")});
createEndDate.addEventListener("input", ()=> {CreateErrorToggle("remove", "Create")});