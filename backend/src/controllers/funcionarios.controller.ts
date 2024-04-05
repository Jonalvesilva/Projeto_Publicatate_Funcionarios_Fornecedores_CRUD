import express from "express";
import { Funcionario } from "../../../shared/types";
import * as funcionarioService from "../services/funcionarios.serv";

export const funcionarioController = express.Router();

//Controller Funcionarios
funcionarioController.get("/", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const order_by = req.query.order_by as string | undefined;
  const direction = req.query.direction as string | undefined;
  const search =
    req.query.search !== undefined ? req.query.search.toString() : undefined;
  const funcionarios = await funcionarioService.getFuncionarios({
    limit,
    offset,
    search,
    order_by,
    direction,
  });
  res.status(200).json(funcionarios);
});

//Controller Funcionario
funcionarioController.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const response = await funcionarioService.getFuncionario(id);
  res.status(200).json(response);
});

//Controller Add Funcionario
funcionarioController.post("/", async (req, res) => {
  const body: Omit<Funcionario, "id"> = req.body;
  const response = await funcionarioService.addFuncionario(body);
  res.status(200).json(response);
});

//Controller Editar Funcionario
funcionarioController.put("/:id", async (req, res) => {
  const body: Omit<Funcionario, "id"> = req.body;
  const id = +req.params.id;
  const response = await funcionarioService.editarFuncionario(id, body);
  res.status(200).json(response);
});

//Controller Deletar Funcionario
funcionarioController.delete("/:id", async (req, res) => {
  const id = +req.params.id;
  const response = await funcionarioService.deletarFuncionario(id);
  res.status(200).json(response);
});
