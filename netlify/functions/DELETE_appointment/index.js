const db = require("../firestore/FirebaseApp.js")
const firebase = require("firebase-admin")

exports.handler = async function (event) {
  const body = await JSON.parse(event.body)

  // Moving Document and contents to a new Collection for History...
  const currentRef = db.collection("Appointments").doc(body.id)
  const doc = await currentRef.get()
  const { name, email, status, date, notes } = doc.data()
  const firestoreTS = firebase.firestore.Timestamp.fromDate(new Date(date))
  const historyRef = db.collection("AppointmentHistory").doc(body.id)
  await historyRef.set({
    name,
    email,
    notes,
    date: firestoreTS,
    status,
  })

  await db.collection("Appointments").doc(body.id).delete()

  let data = []
  const snapshot = await db.collection("Appointments").get()
  snapshot.forEach((doc) => data.push({ id: doc.id, data: doc.data() }))

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
