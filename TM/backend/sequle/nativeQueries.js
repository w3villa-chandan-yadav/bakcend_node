NATIVEQUERIES = {
    FETCHALLUSER : "SELECT * FROM users ;",
    FETCHISVALIDATED: "SELECT * FROM users u JOIN emailVerificatoins  e ON u.id = e.userId WHERE token = ? ORDER BY expiresAt DESC LIMIT 1 ;",
    ISMEMBEROFGROP: "SELECT p.userType FROM `groups` g JOIN participans p ON g.id = p.groupId WHERE p.userId = ? ;",
    FINDGROUPOFUSER: "SELECT * FROM `groups` g JOIN participans p ON g.id = p.groupId WHERE p.userId = ? ;",
}



module.exports = { NATIVEQUERIES }