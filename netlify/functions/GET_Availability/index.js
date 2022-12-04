const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const data = []

  const citiesRef = db.collection("AvailableTimes")
  const snapshot = await citiesRef.get()
  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      body: doc.data(),
    })
  })

  if (!snapshot)
    return {
      statusCode: 404,
      body: JSON.stringify("No Data"),
    }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
