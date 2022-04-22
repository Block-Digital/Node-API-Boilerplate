const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {

    if(!req?._info.roles) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];
    const result = Object.values(req._info.roles).map(role => rolesArray.includes(parseInt(role))).find(val => val === true);

    if( !result ) return res.sendStatus(401);
    next();
  }
}

module.exports = verifyRoles;