import { db } from "../dbConn";
import jwt from 'jsonwebtoken'



export const getPosts = async (req,res) => {
const query = req.query.cat ? 
            'SELECT * FROM posts WHERE cat= ?' :
            'SELECT * FROM posts';
   db.query(query,[req.query.cat],(error,data) => {
    (error) && res.status(403).json(error);
    (data) && res.status(200).json(data);
   })         
}

export const getPost = async (req,res) => {
    const query = "SELECT `username`,`title`,`desc`,p.img,u.img AS userimg,`cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"; 
    db.query(query,[req.params.id],(error,data) => {
    (error) ?  res.status(403).json(error) 
            : res.status(200).json(data[0]);
    
    })
}

export const addPost = async (req,res) => {
    const token = req.cookies.access_token;
    if(!token) res.status(404).json('Not authentificated !')
    jwt.verify(token,'jwtkey',(error,obj_user) => {
        if(!error) res.status(404).json('Not valid !');
        
        const q =
        "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
  
      const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
      });
  
    
    } )
}


export const deletePost = async (req,res) => {
    const token = req.cookies.access_token;
    if(!token) res.status(404).json('Not authentificated !')
    jwt.verify(token,'jwtkey',(error,obj_user) => {
    if(!error) res.status(404).json('Not valid !');
    const query ='DELETE FROM posts WHERE `id` =? AND `uid` = ? ';
    db.query(query,[req.params.id,obj_user.id],(error) => {
            (error) ?  res.status(403).json(error) :
                       res.status(200).json('deleted  !');

    })    
    })
}


export const updatePost = async (req,res) => {
    
}