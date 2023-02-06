import express from 'express'; //exportación de express
const router = express.Router();

//registar los endpoint en router
import { Empresas, IEmpresa} from '@server/libs/Empresas/Empresas';
const empresasModel = new Empresas();

empresasModel.add({
    codigo: '',
    nombre: 'Mi Empresa',
    status: 'Activo'/*,
    created: undefined,
    update: undefined */
});

//http://localhost:3000/empresas
router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url": "empresas/all"},
        "getById": {"method":"get", "url": "empresas/byid/:id"},
        "new": {"method":"post", "url": "empresas/upd/:id"},
        "delete": {"method":"delete", "url": "empresas/del/:id"},
    }
    res.status(200).json(jsonUrls);
});

router.get('/all',(_req, res) => {
    res.status(200).json(empresasModel.getAll());
});

router.get('/byid/:id', (req, res)=>{
  const {id: codigo} = req.params;
  const empresa = empresasModel.getById(codigo);
  if(empresa){
    return res.status(200).json(empresa);
  }
  return res.status(404).json({"error":"No se encontró Empresa"});
});

router.post('/new', (req, res) => {
    console.log("Empresas /new request body:", req.body);
    const {
        nombre ="Ferretería Sofía", 
        status = "Activo"
        } = req.body;
    //Todo: Validar entrada de datos
    const newEmpresa: IEmpresa= {
        codigo : "",
        nombre,
        status
    };
    if(empresasModel.add(newEmpresa)) {
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar nueva empresa"}
        );
});

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;
    const {
      nombre="John Doe Corp",
      status="Activo",
      observacion = ""
    } = req.body;
  
    const UpdateEmpresa : IEmpresa = {
      codigo: id,
      nombre,
      status,
      observacion
    };
  
    if (empresasModel.update(UpdateEmpresa)) {
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
    if(empresasModel.delete(codigo)){
      return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Empresa"});
  });
/*
router.get('/', funtion(_req, res)=>{

});
 */

export default router;