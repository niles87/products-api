const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const swaggerOptions = {
  defaultModelsExpandDepth: -1,
};

app.use(
  "/doc",
  swaggerUi.serveFiles(swaggerDoc, { swaggerOptions }),
  swaggerUi.setup(swaggerDoc)
);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
