const restify = require("restify");
const UsuariosController = require("./controllers/usuarios.controller");
const server = restify.createServer({
 name: "api-usuarios-restify"
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get("/usuarios", UsuariosController.listar);
server.post("/usuarios/criar", UsuariosController.criar);
server.get("/usuarios/:id", UsuariosController.listarUsuarioById);
server.put("/usuarios/editar/:id", UsuariosController.editarUsuarioById);
server.del("/usuarios/excluir/:id", UsuariosController.excluirUsuarioById);

const PORT = 3000;
server.listen(PORT, () => {
 console.log(`${server.name} rodando em ${server.url}`);
});