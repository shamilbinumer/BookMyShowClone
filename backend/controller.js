import movie_schema from './models/movie.model.js';
import user_schema from './models/user.model.js';
import bcrypt from 'bcrypt';
import pkg from "jsonwebtoken";
const {sign}=pkg
export function addTask(req,res){
    const {...movie}=req.body
    console.log(req.body);

    res.status(201).send(movie_schema.create({...movie}));
    console.log(req.body);
    res.end();
}
export async function getTask(req,res){
    let Movie=await movie_schema.find();
    console.log(Movie);
    res.status(200).send(Movie)
}
export async function getDetails(req,res){
    const{id}=req.params;
    console.log(id);
    let Movie=await movie_schema.findOne({_id:id})
    console.log(Movie);
    res.status(200).send(Movie)
}

export async function delMovie(req,res){
    const {id}=req.params;
    console.log(id);
    const data=movie_schema.deleteOne({_id:id})
    data.then((resp)=>{
        res.status(200).send(resp)
    }).catch((error)=>{
        res.status(404).send(error)
    })
}

export async function editMovie(req, res) {
    const {id}=req.params;
    try{
        const value=await movie_schema.findOne({_id:id});
        res.status(200).send(value);
    }catch(error){
        res.status(404).send(error);
    }
}

export async function edit(req, res) {
    const { id } = req.params;
    console.log(id);
    const { ...movie } = req.body;
    await movie_schema.updateOne({ _id: id }, { $set: { ...movie } });
    res.status(201).send("updated")
}

export async function addUser(req,res)
{
  try {
    const {user,password,name}=req.body;
    const usr=await user_schema.findOne({user})
    if(usr)
    return res.status(404).send("Username already exist")
  if(!(user && password && name))
  return res.status(404).send("Feilds are empty")
 bcrypt
 .hash(password,10)
 .then((hashedPwd)=>{
 return res.status(201).send(user_schema.create({name,user,password:hashedPwd}));
 })
 .catch((error)=>{
  console.log(error);
  res.status(500).send(error)
 })
  } catch (error) {
    console.log(error);
  }
}

export async function login(req,res)
{
  const{user,password}=req.body;
  const usr=await user_schema.findOne({user});
  console.log(usr);
  if(usr===null)return res.status(404).send("username or password does not exist");
  const success=await bcrypt.compare(password,usr.password)
  if(success!==true)return res.status(404).send("username or password does not exist");
  const token=await sign({usr},process.env.JWT_KEY,{expiresIn:"1h"})
  console.log(token);
  res.status(200).send({msg:"succesfully Login",token});
  res.end();
}

export async function home(req,res)
{
  try {
    console.log(req.user);
    const username=req.user.usr.user
    console.log(username);
    res.status(200).send({msg:`${username}`})
  } catch (error) {
    res.status(404).send(error)
  }
}

