const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const body = await JSON.parse(event.body)

  // Insert into history datatable first, then delete from primary.
  

  await db.collection("Appointments").doc(body.id).delete()

  let data = []
  const snapshot = await db.collection("Appointments").get()
  snapshot.forEach((doc) => data.push({ id: doc.id, data: doc.data() }))

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
