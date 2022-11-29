export const getAppointments = async () => {
  try {
    const res = await fetch("/.netlify/functions/GET_appointments")
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

export const getSingleApppointment = async (id) => {
  try {
    const res = await fetch(`/.netlify/functions/GET_appointment?id=${id}`)
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

export const createAppointment = async ({ name, email, date, time, notes }) => {
  const Date_Time = new Date(`${date.value} ${time.value}`)

  try {
    const res = await fetch("/.netlify/functions/POST_appointment", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        date_ts: Date_Time.getTime(),
        notes: notes.value,
        status: "Upcoming",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(await res.json())
  } catch (error) {
    console.error(error)
  }
}

export const updateAppointmentStatus = async (id, status) => {
  try {
    const res = await fetch("/.netlify/functions/PUT_appointment", {
      method: "PUT",
      body: JSON.stringify({ id, status }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export const updateAppointmentNotes = async (id, notes) => {
  try {
    await fetch("/.netlify/functions/PUT_appointment", {
      method: "PUT",
      body: JSON.stringify({ id, notes }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const updateAppointmentData = async (id, data) => {
  try {
    await fetch("/.netlify/functions/PUT_appointment", {
      method: "PUT",
      body: JSON.stringify({ id, data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteAppointment = async (id) => {
  try {
    await fetch("/.netlify/functions/DELETE_appointment", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.error(err)
  }
}

export const emailClient = async (email_metaData) => {
  try {
    const SendEmail = await fetch("/.netlify/functions/Email", {
      method: "POST",
      body: JSON.stringify({ email_metaData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const res = await SendEmail.json()

    console.log(res)
  } catch (error) {
    console.error(error)
  }
}

// HISTORY
export const getAppointmentHistory = async () => {
  try {
    const History = await fetch("/.netlify/functions/GET_History")
    const res = await History.json()
    return res
  } catch (error) {
    console.error(error)
  }
}

export const getAvailability = async () => {
  try {
    const Availability = await fetch("/.netlify/functions/GET_Availability")
    const res = await Availability.json()
    return res
  } catch (error) {
    console.error(error)
  }
}
