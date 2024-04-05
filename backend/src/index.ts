import express from "express";
import "dotenv/config";
import cors from "cors";
import { fornecedorController } from "./controllers/fornecedores.controller";
import { funcionarioController } from "./controllers/funcionarios.controller";
require("dotenv").config();

const app = express();
const host = process.env.HOST;
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: true }));

app.use("/fornecedores", fornecedorController);
app.use("/funcionarios", funcionarioController);

app.listen(port, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
