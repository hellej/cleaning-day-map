
const initialNotification = { text: null, type: null }
let notifTimeout


const notificationReducer = (store = initialNotification, action) => {

  let notification = null

  switch (action.type) {
    case 'SHOWNOTIF':
      return { text: action.notification.text, type: action.notification.type }
    case 'RMNOTIF':
      return { ...initialNotification }
    case 'SET_MAP_LOADED':
      notification = store
      if (store.type === 'load') {
        store.text.indexOf('points') === -1 ? notification = initialNotification
          : notification.text = 'Loading points...'
      }
      return notification
    case 'SET_LAYER_LOADED':
      notification = store
      if (store.type === 'load') {
        store.text.indexOf('map') === -1 ? notification = initialNotification
          : notification.text = 'Loading map...'
      }
      return notification
    default:
      return store
  }
}


export const showNotification = (notification, notiftime) => {
  return async (dispatch) => {

    dispatch(rmNotification())
    await new Promise(resolve => notifTimeout = setTimeout(resolve, 150))

    dispatch({ type: 'SHOWNOTIF', notification })

    clearTimeout(notifTimeout)
    await new Promise(resolve => notifTimeout = setTimeout(resolve, notiftime * 1000))
    dispatch(rmNotification())
  }
}

export const showLoadNotification = () => {
  return async (dispatch) => {
    dispatch(rmNotification())
    const notification = { text: 'Loading map & points...', type: 'load' }
    dispatch({ type: 'SHOWNOTIF', notification })
    await new Promise(resolve => notifTimeout = setTimeout(resolve, 6000))
    dispatch({ type: 'RMNOTIF' })
  }
}

export const rmNotification = () => {
  return async (dispatch) => {
    clearTimeout(notifTimeout)
    dispatch({ type: 'RMNOTIF' })
  }
}


export default notificationReducer