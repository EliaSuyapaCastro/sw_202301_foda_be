import express from 'express'; //exportación de express
const router = express.Router();

import { EmpresasDao } from '@server/dao/models/Empresas/EmpresasDao';
import { MongoDBConn } from '@server/dao/MongoDBConn';
import { IEmpresa } from '@server/dao/models/Empresas/IEmpresas';
//registar los endpoint en router
import { Empresas} from '@server/libs/Empresas/Empresas';
const empresasModel = new Empresas(new EmpresasDao(MongoDBConn));

/*empresasModel.add({
    codigo: '',
    nombre: 'Mi Empresa',
    status: 'Activo'/*,
    created: undefined,
    update: undefined */
/*}); */

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

router.get('/all', async (_req, res) => {
    res.status(200).json(await empresasModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const empresa = await empresasModel.getById(codigo);
  if(empresa){
    return res.status(200).json(empresa);
  }
  return res.status(404).json({"error":"No se encontró Empresa"});
});

router.post('/new', async (req, res) => {
    console.log("Empresas /new request body:", req.body);
    const {
        codigo = "NA",
        nombre ="Ferretería Sofía", 
        status = "Activo"
        } = req.body;
    //Todo: Validar entrada de datos
    const newEmpresa: IEmpresa= {
        codigo,
        nombre,
        status
    };
    if(await empresasModel.add(newEmpresa)) {
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar nueva empresa"}
        );
});

router.put('/upd/:id', async (req, res) => {
    const { id } = req.params;
    const {
      nombre="----NotRecieved------",
      status="----NotRecieved------",
      observacion = "",
      codigo = "",
    } = req.body;
    if (
      nombre === "----NotRecieved------"
      || status === "----NotRecieved------"
    ) {
      return res.status(403).json({"error":"Debe venir el nombre y status correctos"});
    }
  
    const UpdateEmpresa : IEmpresa = {
      codigo,
      nombre,
      status,
      observacion
    };
  
    if (await empresasModel.update(id, UpdateEmpresa)) {
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

  router.delete('/del/:id', async (req, res)=>{
    const {id : codigo} = req.params;
    if(await empresasModel.delete(codigo)){
      return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Empresa"});
  });
/*
router.get('/', funtion(_req, res)=>{

});
 */

export default router;