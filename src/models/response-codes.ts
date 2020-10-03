export const catCodes = {
  'registermail/exist': {
    status: 'registermail/exist',
    code:'HS-001',
    message: 'Email already exist.'
  },
  'registermail/ok': {
    status: 'registermail/ok',
    code:'HS-002',
    message: 'Account created.'
  },
  'general/bad': {
    status: 'general/bad',
    code:'HS-003',
    message: 'Ocurrió un error al procesar la petición, contacte al administrador.'
  },
  'emailcode/dontexist': {
    status: 'emailcode/dontexist',
    code:'HS-004',
    message: 'Código de verificación invalido.'
  },
  'login/bad': {
    status: 'login/bad',
    code: 'HS-005',
    message: 'Datos incorrectos, Intente de nuevo'
  },
  'login/ok': {
    status: 'login/ok',
    code: 'HS-006',
    message: 'Inicio de sesión correcto'
  }
}
