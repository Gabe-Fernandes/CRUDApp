const adminViewUsersBtn = document.getElementById("adminViewUsersBtn");
//const adminCreateStudyBtn = document.getElementById("adminCreateStudyBtn");

//const userModal = document.getElementById("userModal");
//const userBackBtn = document.getElementById("userBackBtn");

const createModal = document.getElementById("createModal");
const createStudyName = document.getElementById("createStudyName");
const createDescription = document.getElementById("createDescription");
const createRegion = document.getElementById("createRegion");
const createStartDate = document.getElementById("createStartDate");
const createEndDate = document.getElementById("createEndDate");
const endDateError = document.getElementById("endDateError");
//const createCreateBtn = document.getElementById("createCreateBtn");
//const createBackBtn = document.getElementById("createBackBtn");
const createError = document.getElementById("createError");

function CreateErrorToggle(toggle, opposite) {
  createError.classList[toggle]("create-error");
  createCreateBtn.classList[toggle]("btn-disable");
  endDateError.classList[opposite]("create-error-txt-hide");
}

createModal.addEventListener("submit", function (evt) {
  if(createStartDate.value > createEndDate.value && createEndDate.value !== "") {
    CreateErrorToggle("add", "remove");
    evt.preventDefault();
  }
});


//adminViewUsersBtn.addEventListener("click", ()=> {AddModal(userModal)});
//userBackBtn.addEventListener("click", ()=> {RemoveModal(userModal)});
//adminCreateStudyBtn.addEventListener("click", ()=> {AddModal(createModal)});
//createBackBtn.addEventListener("click", ()=> {RemoveModal(createModal)});

//createCreateBtn.addEventListener("click", ()=> {ValidateStudy()});
createStartDate.addEventListener("input", ()=> {CreateErrorToggle("remove", "add")});
createEndDate.addEventListener("input", () => { CreateErrorToggle("remove", "add")});
