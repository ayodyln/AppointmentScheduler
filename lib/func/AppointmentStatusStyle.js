export const appointmentStatusStyle = (status) => {
    switch (status) {
      case "PastDue" || "Past Due":
        return `text-secondary-content bg-secondary`
      case "Current":
        return `text-primary-content bg-primary`
      case "Upcoming":
        return `text-warning-content bg-warning`
      case "Canceled":
        return `bg-red-600 text-white`
      case "Completed":
        return `bg-green-600 text-white`
  
      default:
        return `bg-primary`
    }
  }
  