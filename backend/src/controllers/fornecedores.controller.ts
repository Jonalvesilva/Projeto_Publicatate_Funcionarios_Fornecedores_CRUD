import express from "express";
import * as fornecedorService from "../services/fornecedores.serv";
import { Fornecedor } from "../../../shared/types";

export const fornecedorController = express.Router();

//Controller Fornecedores
fornecedorController.get("/", async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const offset = req.query.offset ? Number(req.query.offset) : undefined;
  const order_by = req.query.order_by as string | undefined;
  const direction = req.query.direction as string | undefined;
  const search =
    req.query.search !== undefined ? req.query.search.toString() : undefined;
  const funcionarios = await fornecedorService.getFornecedores({
    limit,
    offset,
    search,
    order_by,
    direction,
  });
  res.status(200).json(funcionarios);
});

//Controller Fornecedor
fornecedorController.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const response = await fornecedorService.getFornecedor(id);
  res.status(200).json(response);
});

//Controller Add Fornecedor
fornecedorController.post("/", async (req, res) => {
  const body: Omit<Fornecedor, "id"> = req.body;
  const response = await fornecedorService.addFornecedor(body);
  res.status(200).json(response);
});

//Controller Editar Fornecedor
fornecedorController.put("/:id", async (req, res) => {
  const body: Omit<Fornecedor, "id"> = req.body;
  const id = +req.params.id;
  const response = await fornecedorService.editarFornecedor(id, body);
  res.status(200).json(response);
});

//Controller Deletar Fornecedor
fornecedorController.delete("/:id", async (req, res) => {
  const id = +req.params.id;
  const response = await fornecedorService.deletarFornecedor(id);
  res.status(200).json(response);
});
