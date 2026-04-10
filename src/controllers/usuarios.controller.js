const prisma = require("../config/prisma");

class UsuariosController {
    static async listar(req, res) {
        try {
            const usuarios = await prisma.usuario.findMany({
                orderBy: { id: "asc" }
            });
            res.send(200, usuarios);
            return next();
        } catch (error) {
            res.send(500, { message: "Erro ao listar usuários." });
            return next();
        }
    }
    static async criar(req, res) {
        try {
            const { nome, email } = req.body;
            if (!nome || !email) {
                res.send(400, {
                    message: "Nome e email são obrigatórios."
                });
                return next();
            }
            const novoUsuario = await prisma.usuario.create({
                data: { nome, email }
            });
            res.send(201, novoUsuario);
            return next();
        } catch (error) {
            if (error.code === "P2002") {
                res.send(409, { message: "Já existe usuário com esse email." });
            }
            return next();
        }
    }
    static async listarUsuarioById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await prisma.usuario.findUnique({
                where: { id: parseInt(id) }
            });
            if (!usuario) {
                res.send(404, { message: "Usuário não encontrado." });
                return next();
            }
            res.send(200, usuario);
            return next();
        } catch (error) {
            res.send(500, { message: "Erro ao buscar usuário." });
            return next();
        }
    }
    static async editarUsuarioById(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;
            const usuarioExistente = await prisma.usuario.findUnique({
                where: { id: parseInt(id) }
            });
            if (!usuarioExistente) {
                res.send(404, { message: "Usuário não encontrado." });
                return next();
            }
            const usuarioAtualizado = await prisma.usuario.update({
                where: { id: parseInt(id) },
                data: { nome, email }
            });
            res.send(200, usuarioAtualizado);
            return next();
        } catch (error) {
            if (error.code === "P2002") {
                res.send(409, { message: "Já existe usuário com esse email." });
            }
            res.send(500, { message: "Erro ao atualizar usuário." });
            return next();
        }
    }
    static async excluirUsuarioById(req, res) {
        try {
            const { id } = req.params;
            const usuarioExistente = await prisma.usuario.findUnique({
                where: { id: parseInt(id) }
            }); 
            if (!usuarioExistente) {
                res.send(404, { message: "Usuário não encontrado." });
                return next();
            }
            await prisma.usuario.delete({
                where: { id: parseInt(id) }
            });
            res.send(204);
            return next();
        } catch (error) {
            res.send(500, { message: "Erro ao excluir usuário." });
            return next();
        }
    }
}

module.exports = UsuariosController;