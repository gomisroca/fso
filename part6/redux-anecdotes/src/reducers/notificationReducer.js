import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(_, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const createNotification = content => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export default notificationSlice.reducer