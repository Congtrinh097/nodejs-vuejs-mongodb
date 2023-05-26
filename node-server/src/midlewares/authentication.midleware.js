
const checkAuth = (req, res, next) => {
  // Ignore anonymous apis
  if (req.url === '/login') {
    return next()
  }
  // const idToken = req.headers.id_token || req.body.id_token
  // const loginTenant = req.headers.login_tenant
  // if (!loginTenant) {
  //   return res.status(200).send({ success: false, code: ERROR_CODE_NO_TENANT_ID, message: 'The tenant ID must be a valid non-empty string' })
  // }
  
  // if (idToken) {
  //   return authRef
  //     .verifyIdToken(idToken)
  //     .then((decode) => {
  //       if (decode.uid) {
  //         return authRef.getUser(decode.uid)
  //       } else {
  //         return null
  //       }
  //     })
  //     .then((user) => {
  //       if (user) {
  //         // set user information if exist from database
  //         req.user = user
  //         return next()
  //       } else {
  //         return res.status(200).send({ success: false, code: ERROR_CODE_NO_ACCESS_TOKEN, message: 'Unauthentication' })
  //       }
  //     })
  //     .catch((error) => {
  //       return res.status(200).send({ success: false, code: ERROR_CODE_EXCEPTION, message: error.message })
  //     })
  // } else {
  //   return res.status(200).send({ success: false, code: ERROR_CODE_ACCESS_DENY, message: 'Access deny' })
  // }

  // HARDCODE TO BY PASS
  return next();
}

// check permissions if implement roles
const checkAdminPermission = async (req, res, next) => {
  // by pass check permissions
  return next();

  // if (req.user) {
  //   const user = req.user
  //   if (
  //     user.customClaims.role === 'owner' || user.customClaims.role === 'super-admin' 
  //   ) {
  //     return next()
  //   } else {
  //     return res.status(500).send('Access deny')
  //   }
  // } else {
  //   return res.status(500).send('Access deny')
  // }
}

module.exports = {
  checkAdminPermission,
  checkAuth
}
