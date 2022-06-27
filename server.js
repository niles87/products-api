const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerV1 = require("./swagger-v1.json");
const swaggerV2 = require("./swagger-v2.json");
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
  "/docs/v1",
  swaggerUi.serveFiles(swaggerV1, { swaggerOptions }),
  swaggerUi.setup(swaggerV1)
);

app.use(
  "/docs/v2",
  swaggerUi.serveFiles(swaggerV2, { swaggerOptions }),
  swaggerUi.setup(swaggerV2)
);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
