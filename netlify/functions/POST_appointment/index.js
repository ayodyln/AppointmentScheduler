const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const { name, email, date_ts, notes, status } = await JSON.parse(event.body)

  const currDate = new Date()
  const currDateStr = `${currDate.getMonth()}-${currDate.getDate()}-${currDate.getFullYear()}`
  const currTimeStr = `${currDate.getHours()}:${
    currDate.getMinutes() < 10
      ? `0${currDate.getMinutes()}`
      : currDate.getMinutes()
  } ${currDate.getHours() < 12 ? "AM" : "PM"}`
  if (currDate.getTime() > date_ts) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        statusCode: 400,
        msg: `Date Not Valid. Schedule future appointments, greater than ${currDateStr} ${currTimeStr}`,
      }),
    }
  }

  // Checking Database/table/collection for Appointments for already exisiting timestamp
  // If result isn't empty, appointment already exists and can't be made. Choose a different time.
  const appointmentRef = db.collection("Appointments")
  const snapshot = await appointmentRef.where("date", "==", date_ts).get()
  snapshot.forEach((doc) => {
    console.log(doc.data())
  })
  if (!snapshot.empty) {
    return {
      statusCode: 409,
      body: JSON.stringify({
        statusCode: 409,
        msg: `Appointment data object already exists on Appointments table.`,
      }),
    }
  }
  // -- End of Database checking

  const docRef = db.collection("Appointments").doc()
  const data = await docRef.set({
    name: name,
    email: email,
    date: date_ts,
    notes: notes,
    status: status,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
