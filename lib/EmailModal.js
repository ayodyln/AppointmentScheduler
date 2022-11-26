import { emailClient } from "./Fetch.js"

export const EmailModal = async (email) => {
  const main = document.querySelector("main")

  main.insertAdjacentHTML("beforeend", await markup(email))

  main.addEventListener("click", async (event) => {
    event.stopPropagation()

    if (event.target.id === "emailModal") event.target.remove()

    if (event.target.id === "cancel")
      event.target.parentElement.parentElement.parentElement.remove()

    if (event.target.id === "send") {
      inputsHandler(email)
      event.target.parentElement.parentElement.parentElement.remove()
    }
  })
}

async function inputsHandler(email) {
  const subject = document.querySelector("#subject").value
  const text = document.querySelector("#emailMsg").value

  try {
    await emailClient({
      email,
      subject,
      text,
    })
  } catch (error) {
    console.error(error)
  }
}

const markup = async (email) => `<div id="emailModal" class="modal modal-open">
    <div class="modal-box flex flex-col h-[30rem]">
        
            <section class="w-full flex flex-col gap-2 h-full">
                <h3 class="font-bold text-lg">Email Appointment</h3>

                <input type="text" value="${email}" name="email" required/>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Subject</span>
                    </label>
                    <input id="subject" type="text" placeholder="Subject" class="input input-bordered w-full w-full" />
                </div>
                <div class="form-control w-full h-full"> 
                    <label class="label">
                        <span class="label-text">Your Message</span>
                    </label> 
                    <textarea
                        id="emailMsg"
                        name="message" 
                        class="textarea textarea-bordered resize-none w-full h-full rounded-xl" 
                        required
                    ></textarea>
                </div>
            </section>
      
            <div class="modal-action">
                <button id="cancel" class="btn btn-ghost text-primary">cancel</button>
                <button id="send" class="btn btn-primary text-white">Send</button>
            </div>
       
    </div>
</div>`
