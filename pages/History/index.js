import { getAppointmentHistory } from "../../lib/Handlers/Fetch.js"

export const renderHistoryPage = async () => {
  const tableBody = document.getElementById("tableBody")

  const history = await getAppointmentHistory()

  if (history.length === 0) {
    console.error("Empty History Array")
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
        <th class="bg-primary text-center">${index + 1}</th>
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
