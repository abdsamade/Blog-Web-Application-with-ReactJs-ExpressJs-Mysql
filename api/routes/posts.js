import { addPost, deletePost, getPost, getPosts } from '../controllers/post';

const express = require('express');

const route= express.Router();

route.get('/',getPosts);
route.get('/:id',getPost);
route.post('/add',addPost);
route.delete('/delete',deletePost);

export default route;