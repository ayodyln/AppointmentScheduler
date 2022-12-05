// Used to create controlled time comparison to update if appointments are overdue and more...
// Generating the Current Date-Time, Appointments Date-Time, and max comparision Date-Time that is exactly one hour in the future.
export const dateComparing = async (appointment) => {
  const appointmentDate = new Date(appointment)

  const currentDate = new Date()

  const compareDate = new Date()
  compareDate.setHours(appointmentDate.getHours() + 1)
  compareDate.setMinutes(0)
  compareDate.setSeconds(0)
  compareDate.setMilliseconds(0)

  return { appointmentDate, currentDate, compareDate }
}
