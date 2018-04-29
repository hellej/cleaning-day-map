
const initialNotification = { text: null, type: null }
let notifTimeout


const notificationReducer = (store = initialNotification, action) => {

  switch (action.type) {
    case 'SHOWNOTIF':
      return { text: action.notification.text, type: action.notification.type }
    case 'RMNOTIF':
      return { ...initialNotification }
    default:
      return store
  }
}


export const showNotification = (notification, notiftime) => {
  return async (dispatch) => {

    dispatch({ type: 'RMNOTIF' })

    clearTimeout(notifTimeout)
    await new Promise(resolve => notifTimeout = setTimeout(resolve, 150))
    dispatch({ type: 'SHOWNOTIF', notification })

    clearTimeout(notifTimeout)
    await new Promise(resolve => notifTimeout = setTimeout(resolve, notiftime * 1000))

    dispatch({ type: 'RMNOTIF' })
  }
}



export default notificationReducer