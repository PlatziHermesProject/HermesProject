export const catCodes = {
    'registermail/exist': {
      status: 'registermail/exist',
      code:"HS-001",
      message: 'Email already exist.'
    },
    'registermail/ok': {
      status: 'registermail/ok',
      code:"HS-002",
      message: 'Account created.'
    },
    'general/bad': {
      status: 'general/bad',
      code:"HS-003",
      message: 'Ocurrió un error al procesar la petición, contacte al administrador.'
    },
    'emailcode/dontexist': {
      status: 'emailcode/dontexist',
      code:"HS-004",
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
    },
    'lettercreate/ok' : {
        status: 'lettercreate/ok',
        code:"HS-007",
        message: 'Carta creada' 
    },
    'letterreaction/ok' : {
        status: 'letterreaction/ok',
        code:"HS-008",
        message: 'respuesta a carta creada' 
    },
    'replyreaction/ok' : {
        status: 'replyreaction/ok',
        code:"HS-009",
        message: 'reacción a respuesta de carta creada' 
    },
    'interaction/tracking' : {
      status: 'interaction/tracking',
        code:"HS-010",
        message: 'Interacción trackeada' 
    },
    'initchat/ok' : {
      status: 'initchat/ok',
      code:"HS-011",
      message: 'START PRIVATE CHAT'
    },
    'chatcreation/ok' : {
      status: 'chatcreation/ok',
      code:"HS-012",
      message: 'chat creation done'
    }
  }
