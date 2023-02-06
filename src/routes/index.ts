import express from 'express';
const router  = express.Router();

import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';

//http://localhost:3000
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 //http://localhost:3000/version
 router.get('/version', (_req, res)=>{ 
  const version: string = "1.0.0";
  const jsonResp = {"name":"FODA Be", "version": version}; 
  // string, number, boolen, types, interfaces, classes, enumerators
  res.json(jsonResp);
 });

 router.use('/empresas', empresasRouter);
 router.use('/usuarios', usuariosRouter);

export default router;
