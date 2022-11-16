export const RenderNotesModal = (data) => {
  const main = document.querySelector("body")

  const markup = `<div id="notesModal" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Notes</h3>
      <p class="py-4">${data}</p>
      <div class="modal-action">
        <button id="close" class="btn btn-primary text-white">Close</button>
      </div>
    </div>
  </div>`

  main.insertAdjacentHTML("beforeend", markup)

  main.addEventListener("click", (event) => {
    event.stopPropagation()

    if (event.target.id === "notesModal") event.target.remove()

    if (event.target.id === "close")
      event.target.parentElement.parentElement.parentElement.remove()
  })
}
