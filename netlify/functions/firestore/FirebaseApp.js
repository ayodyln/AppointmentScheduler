const admin = require("firebase-admin")
const { cert } = require("firebase-admin/app")
const key = require("./serviceKey.js")
admin.initializeApp({
  // credential: admin.credential.cert(key),
  credential: cert(key),
})

const db = admin.firestore()

module.exports = db
