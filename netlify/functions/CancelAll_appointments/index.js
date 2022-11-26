const db = require("../firestore/FirebaseApp")

exports.handler = async function (event) {
  const appointmentsRef = db.collection("Appointments")
  const batch = db.batch()
  const snapshot = await appointmentsRef.get()
  snapshot.forEach((doc) => {
    console.log(doc.id)
    const ref = db.collection("Appointments").doc(doc.id)
    batch.update(ref, { status: "Canceled" })
  })
  await batch.commit()

  return {
    statusCode: 200,
    body: JSON.stringify('Batch Updated Appointment Status'),
  }
}
