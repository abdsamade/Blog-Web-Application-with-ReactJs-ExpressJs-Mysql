
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { db } from "../dbConn.js"

export const login = (req,res) => {

    const query  = 'SELECT * FROM users WHERE username= ?';
    db.query(query,[req.body.username],(data,err) => {
        (err) && res.status(404).json(err);
        (data.length ===0) && res.status(405).json("User Not found ! ");
        
        const isSimilarPassword = bcrypt.compareSync(req.body.password,data[0].password);
        (!isSimilarPassword) && res.status(400).json('Wrong user or password !');
        //data[0] the first item of our array wich is the user

        const token = jwt.sign({id:data[0].id},"jwtkey");
        res.cookie('access_token',token,{httpOnly:true}).status(200).json('...');
    })
}

export const signup = (req,res) => {
    const q =  'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(q,[req.body.email,req.body.name],(data,error)=> {
        (error) && res.status(405).json(error);
        (data.length) && res.status(500).json('User already exists !');
        //HAsh PAssword
        const salt =  bcrypt.genSaltSync(10);
        const hash= bcrypt.hashSync(req.body.password,salt);

        const query = 'INSERT INTO users (`username`,`email`,`password`) VALUES=(?)';
        const values= [req.body.username,req.body.email,hash];
        db.query(query,[values],(data,error) => {
                (error) ? res.status(405).json(error):
                res.status(200).json('User has been created !');
})
    })
}

export const logout = (req,res) => {

}