//SERVER SE ENCARGA UNICAMENTE DE CONFIGURACIONES DE SERVIDOR!

// IMPORTS
const express = require("express");
const cors = require("cors");
const messageRouter = require("./src/routes/message")

// SETINGS
const app = express();
app.set("PORT", 5000);


// MIDDLEWARES
app.use(express.json()); //permite manejar respuestas json.
app.use(cors());
app.use("/message", messageRouter);
//-----------------------------------------------------------------------------------

// ROUTES
app.get("/about", (req, res) => {
    console.log(req.method)
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
    console.log(res.statusCode);
    res.send("About");
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Usuario con id: ${id}`);  
});

app.post("/register", (req, res) => { //POST se usa generalmente en formularios.
    console.log(req.body); //body = cuerpo de la solicitud
    console.log(req.body.nombre);
    console.log(req.body.apellido);
    res.status(201).send("Registro realizado con éxito.");
});

app.put("/update-product/:id", (req, res) => { // /:id = le paso un parametro a la URL que lee la solicitud
    const { id } = req.params //usamos llaves porque estamos desestructurando (params es un objeto, id es una propiedad de params)
    console.log(req.body); //body = cuerpo de la solicitud
    console.log(req.body.nombre);
    console.log(req.body.precio);
    /*if(!id){
        res.status(400).send("Necesitas pasar un id para actualizar un recurso.") //400 = bad request
    }*/
    res.status(200); //cambiar el status de la respuesta
    res.send(`Actualización realizada con éxito sobre el producto con id: ${id}`);
});

app.delete("/DELETE-product/:id", (req, res) => {
    const { id } = req.params
    res.status(204);
    res.send(`Eliminación realizada con éxito sobre el producto con id: ${id}`);
});


// LISTEN
app.listen(app.get("PORT"), () => {
    console.log(`Server corriendo en http://localhost:${app.get("PORT")}`);
});