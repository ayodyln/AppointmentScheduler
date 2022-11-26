const db = require("../firestore/FirebaseApp")
const sgMail = require("@sendgrid/mail")

exports.handler = async function (event) {
  const { email_metaData } = JSON.parse(event.body)

  console.log(email_metaData)

  sgMail.setApiKey(process.env.SG_KEY)

  const msg = {
    to: email_metaData.email,
    from: `10767128@uvu.edu`,
    subject: email_metaData.subject,
    text: email_metaData.text,
  }

  sgMail
    .send(msg)
    .then((res) => {
      console.log("Email Sent")
      console.log(res[0].statusCode)
      console.log(res[0].headers)
    })
    .catch((error) => {
      console.log(error)
    })

  return {
    statusCode: 200,
    body: JSON.stringify("Oof"),
  }
}

const markup = () => {
  return `<html>
    <head>
      <title></title>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@2.42.1/dist/full.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div>
          <h1>Hello World</h1>
      </div>
      <script src="https://cdn.tailwindcss.com"></script>
    </body>
  </html>`
}
