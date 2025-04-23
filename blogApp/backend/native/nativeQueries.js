const nativeQueries ={
    GETALLCOMMENTOFPOST: "SELECT * FROM posts p JOIN comments c ON p.id = c.blogId JOIN users u ON c.userId = u.id WHERE u.id = 1 ;",
    
}