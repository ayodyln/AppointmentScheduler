import { getAppointmentHistory } from "../../lib/Handlers/Fetch.js"

export const renderHistoryPage = async (historySearch) => {
  const tableBody = document.getElementById("tableBody")
  tableBody.textContent = ""

  const history = await getAppointmentHistory()

  if (history.length === 0) {
    console.error("Empty History Array")
    return
  }

  if (historySearch) {
    historySearch.forEach((item, index) => {
      tableBody.insertAdjacentHTML("beforeend", renderTableRow(item, index))
    })
    return
  }

  history.forEach((item, index) => {
    tableBody.insertAdjacentHTML("beforeend", renderTableRow(item, index))
  })
}
renderHistoryPage()

const renderTableRow = (data, index) => {
  const date = new Date(data.data.date._seconds * 1000)

  const dateStr = `${date.getFullYear()}-${
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
  const timeStr = `${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${
    date.getHours() < 12 ? "AM" : "PM"
  }`

  return `<tr>
        <th class="bg-primary text-center text-primary-content">${
          index + 1
        }</th>
        <td>
            <div class="flex flex-col">
                <span>${data.data.name}</span>
                <span class="text-sm">${data.data.email}</span>
            </div>
        </td>
        <td>
            <div class="flex flex-col">
                <span>${dateStr}</span>
                <span class="text-sm">${timeStr}</span>
            </div>
        </td>
        <td>${data.data.status}</td>
    </tr>`
}

const searchInputBtn = document.querySelector("#searchButton")
const searchInput = document.querySelector("#searchInput")
searchInput.value = ""

searchInputBtn.addEventListener("click", searchHistoryHandler)
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchHistoryHandler()
  }
})

async function searchHistoryHandler() {
  if (searchInput.value === "") return
  const history = await getAppointmentHistory()

  const results = history.filter((appointment) => {
    const name = appointment.data.name.toLowerCase()
    const status = appointment.data.status.toLowerCase()

    if (
      name.includes(searchInput.value.toLowerCase()) ||
      status.includes(searchInput.value.toLowerCase())
    )
      return appointment
  })

  renderHistoryPage(results)
}

document.querySelector("#refresh").addEventListener("click", (event) => {
  renderHistoryPage()
})
