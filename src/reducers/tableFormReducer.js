

const initialForm = {
  title: '',
  description: '',
  phonenum: '',
  openhours: '',
  location: 1234
}


const tableFormReducer = (store = initialForm, action) => {
  console.log('Action: ', action)

  switch (action.type) {
    case 'UPDATE_FORM':
      return { ...store, [action.name]: action.value }

    case 'SUBMIT':
      return initialForm

    default:
      return store
  }
}


export const handleFormChange = (e) => {
  return { type: 'UPDATE_FORM', name: e.target.name, value: e.target.value }
}

export const handleSubmit = (form) => {
  return { type: 'SUBMIT', form }
}

export default tableFormReducer
