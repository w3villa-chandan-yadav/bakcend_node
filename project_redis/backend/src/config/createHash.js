import crypto from "crypto";



const getToken = ()=>{
    const token = crypto.randomBytes(64).toString("hex");
    return token
}


const hashToken = (token)=>{
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    return hashToken ;
}

// const verifyToken = (token , storedHash)=>{
//     const hashTokens = hashToken(token);
//     return hashTokens === storedHash ;
// 

export { getToken , hashToken }


