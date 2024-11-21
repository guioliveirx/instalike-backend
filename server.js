// Estou primeiro dando o nome usado das exportações (padrões ou nomeadas) e depois armazenando as importações do módulo "express" nessa instância.
import express from 'express';
import conectarAoBanco from './src/config/db_config.js';

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Gatinho fofo dormindo",
        imagem: "https://placecats.com/cute/200/300"
    },
    {
        id: 4,
        descricao: "Gato curioso olhando pela janela",
        imagem: "https://placecats/curious/300/200"
    },
    {
        id: 5,
        descricao: "Gato brincando com um novelo de lã",
        imagem: "https://placecats/playful/400/300"
    },
    {
        id: 6,
        descricao: "Gato preto elegante",
        imagem: "https://placecats/black/300/300"
    },
    {
        id: 7,
        descricao: "Gato branco com olhos azuis",
        imagem: "https://placecats/white/200/300"
    }
];

// Passo todos os dados armazenado da minha função que apelidei como "express" para minha variável "app". Com isso eu crio ou instâncio uma unidade de um servidor.
const app = express();


app.use(express.json());

// Com o servidor criado, eu peço para ele ouvir todas as requisições que cheguem na porta 3000.
app.listen(3000, () => {
    console.log('Servidor escutando...');
});

// Quando acessada a rota "/api" eu solicito que meu servidor pegue uma resposta e exiba na tela. 
async function get_all_posts(){
    const db = conexao.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

app.get("/posts", async (req, res) => {
    const posts = await get_all_posts();
    res.status(200).json(posts);
});


// function buscarPostPorId(id){
//     return posts.findIndex((post) => {
//         // Verifica a igualdade entre o id do post no indice atual e o id recebido como parâmetro na função. Retorna verdadeiro ou falso.
//         return post.id === Number(id);
//     })
// }

// app.get("/posts/:id", (req, res) => {
//     const index = buscarPostPorId(req.params.id);
//     res.status(200).json(posts[index]);
// });