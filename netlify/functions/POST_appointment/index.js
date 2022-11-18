const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const { name, email, date_ts, notes, status } = await JSON.parse(event.body)

  const currDate = new Date()
  if (currDate.getTime() < date_ts) {
    return {
      statusCode: 409,
      data: JSON.stringify({
        msg: "Date Not Valid",
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
        msg: `Appointment data object already exists on Appointments table.`,
        data: snapshot[0].data(),
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
