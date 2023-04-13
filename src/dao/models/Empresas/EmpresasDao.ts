import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IEmpresa } from "./IEmpresas";

export class EmpresasDao extends MongoDAOBase<IEmpresa>{
  constructor(conexion: IDBConnection){
      super("empresas", conexion);//super para inicialiazar y expandirnos enla clase. 
  }
}