import express from 'express';
import multer from "multer";
import cors from "cors";
import { create_new_post, list_posts, update_new_post, upload_image } from '../controllers/posts_controllers.js';

const cors_options = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const routes = (app) => {
    // Middleware para converter objetos JSON em objetos Javascript
    app.use(express.json());
    app.use(cors(cors_options));
    // Rota para listar todos os posts
    app.get("/posts", list_posts);   
    // Rota para criar um novo post
    app.post("/posts", create_new_post);
    // Rota para subir uma imagem para o servidor
    app.post("/upload", upload.single("image"), upload_image);
    // Roda para atualizar os dados do post
    app.put("/upload/:id", update_new_post);
};

export default routes;