export const validationLogin = (email, password) => {
  let val = {
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  }

  if (!email) {
    val.email.error = true
    val.email.message = "email must not empty"
  } else if (!email.includes("@")) {
    val.email.error = true
    val.email.message = "please use valid email"
  }
  if (!password) {
    val.password.error = true
    val.password.message = "password must not empty"
  } else if (password.length < 6) {
    val.password.error = true
    val.password.message = "min character length 6"
  }

  if (!val.email.error && !val.email.password) {
    val = {
      email: {
        error: false,
        message: "",
      },
      password: {
        error: false,
        message: "",
      },
    }
  }
  return { updatedValue: val, errorValidate: val.email.error || val.password.error }
}
export const validationTexfieldAddPlace = (title, address, description, image) => {
  let val = {
    title: {
      error: false,
      message: "",
    },
    address: {
      error: false,
      message: "",
    },
    description: {
      error: false,
      message: "",
    },
    image: {
      error: false,
      message: "",
    },
  }

  if (!title) {
    val.title.error = true
    val.title.message = "title must not empty"
  }
  if (!description) {
    val.description.error = true
    val.description.message = "description must not empty"
  } else if (description.length < 10) {
    console.log(description)
    val.description.error = true
    val.description.message = "min character length 10"
  }
  if (!address) {
    val.address.error = true
    val.address.message = "address must not empty"
  }
  if (!image) {
    val.image.error = true
    val.image.message = "image must filled"
  }

  if (!val.title.error && !val.description.error && !val.address.error) {
    val = {
      title: {
        error: false,
        message: "",
      },
      address: {
        error: false,
        message: "",
      },
      description: {
        error: false,
        message: "",
      },
      image: {
        error: false,
        message: "",
      },
    }
  }
  return {
    updatedValue: val,
    errorValidate: val.address.error || val.title.error || val.description.error,
  }
}

export const validationRegister = (name, email, password, confirmPassword, image) => {
  let val = {
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    name: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
    image: {
      error: false,
      message: "",
    },
  }
  if (!email) {
    val.email.error = true
    val.email.message = "email must not empty"
  } else if (!email.includes("@")) {
    val.email.error = true
    val.email.message = "please use valid email"
  }
  if (!name) {
    val.name.error = true
    val.name.message = "name must not empty"
  }
  if (!confirmPassword) {
    val.confirmPassword.error = true
    val.confirmPassword.message = "confirm password must not empty"
  } else if (confirmPassword !== password) {
    val.confirmPassword.error = true
    val.confirmPassword.message = "confirm password does not match"
  }

  if (!password) {
    val.password.error = true
    val.password.message = "password must not empty"
  } else if (password.length < 6) {
    val.password.error = true
    val.password.message = "min character length 6"
  }

  if (!image) {
    val.image.error = true
    val.image.message = "image must Filled"
  }

  if (!val.name.error && !val.email.error && !val.password.error && !val.confirmPassword.error) {
    val = {
      email: {
        error: false,
        message: "",
      },
      password: {
        error: false,
        message: "",
      },
      name: {
        error: false,
        message: "",
      },
      confirmPassword: {
        error: false,
        message: "",
      },
      image: {
        error: false,
        message: "",
      },
    }
  }
  return {
    updatedValue: val,
    errorValidate:
      val.email.error || val.password.error || val.name.error || val.confirmPassword.error,
  }
}
