import express from 'express'; //exportación de express
const router = express.Router();

//registar los endpoint en router
import { Usuarios, IUsuario } from '@server/libs/Usuarios/Usuarios';
const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    correo: 'usuario@gmail.com',  
    nombre: 'Mi Usuario', 
    password: 'Ac123'
});

//http://localhost:3000/empresas
router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url": "usuarios/all"},
        "getById": {"method":"get", "url": "usuarios/byid/:id"},
        "new": {"method":"post", "url": "usuarios/upd/:id"},
        "delete": {"method":"delete", "url": "usuarios/del/:id"},
    }
    res.status(200).json(jsonUrls);
});

router.get('/all',(_req, res) => {
    res.status(200).json(usuariosModel.getAll());
});

router.get('/byid/:id', (req, res)=>{
  const {id: codigo} = req.params;
  const usuario = usuariosModel.getById(codigo);
  if(usuario){
    return res.status(200).json(usuario);
  }
  return res.status(404).json({"error":"No se encontró Usuario"});
});

router.post('/new', (req, res) => {
    console.log("Usuarios /new request body:", req.body);
    const {
        nombre ="Ferretería Sofía", 
        correo = "miusrio@gmail.com",
        password = "132466"
        } = req.body;
    //Todo: Validar entrada de datos
    const newUsuario: IUsuario= {
        codigo : "",
        nombre,
        correo,
        password
    };
    if(usuariosModel.add(newUsuario)) {
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar nueva empresa"}
        );
});

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;
    const {
      nombre="Sophia Newman",
      correo="intento1@gmail.com",
      password = "1223"
    } = req.body;
  
    const UpdateUsuario : IUsuario = {
      codigo: id,
      nombre,
      correo,
      password
    };
  
    if (usuariosModel.update(UpdateUsuario)) {
      return res
        .status(200)
        .json({"updated": true});
    }
    return res
      .status(404)
      .json(
        {
          "error": "Error al actualizar Empresa"
        }
      );
  });

  router.delete('/del/:id', (req, res)=>{
    const {id : codigo} = req.params;
    if(usuariosModel.delete(codigo)){
      return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Usuario"});
  });
/*
router.get('/', funtion(_req, res)=>{

});
 */

export default router;