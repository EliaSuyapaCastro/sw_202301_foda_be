import { IEmpresa } from "@server/dao/models/Empresas/IEmpresas";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Empresas {
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevaEmpresa: IEmpresa) {
    const date = new Date();
    const nueva: IEmpresa = {
      ...nuevaEmpresa,
      created: date,
      updated: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateEmpresa: IEmpresa) {
    const updateObject = { ...updateEmpresa, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}

/*export interface IEmpresa { //interface, extructura que define un tipo de dato
    codigo: string;
    nombre: string;
    status: string;
    created?: Date;
    update?: Date;
    observacion?: string; //signo de ?, ya que puede ser opcional
}

export class Empresas {
    
    private empresas : IEmpresa[];
    constructor(){
        this.empresas = [];
    }
    getAll(){
        return this.empresas;
    } 
    getById(codigo: string){
        const empresaToReturn = this.empresas.find((emp)=>{
          return emp.codigo === codigo;
        });
        return empresaToReturn;
      } 
    add(nuevaEmpresa : IEmpresa) {
        const date = new Date();
        const nueva: IEmpresa = {
            ...nuevaEmpresa,
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            created: date,
            update: date
        }
        this.empresas.push(nueva);
        return true;
    }
    
    update (updateEmpresa: IEmpresa){
        const newEmpresas: IEmpresa[] = this.empresas.map((emp)=>{
            if ( emp.codigo === updateEmpresa.codigo ) {
                return {...emp, ...updateEmpresa, update: new Date()};
            }
            return emp;
        });
        this.empresas = newEmpresas;
        return true;
    }

    delete(codigo: string){
        const empresaToDelete = this.empresas.find((emp)=>{
          return emp.codigo === codigo;
        });
        if(empresaToDelete){
          const newEmpresas: IEmpresa[] = this.empresas.filter((emp)=>{
            return emp.codigo !== codigo;
          });
          this.empresas = newEmpresas;
          return true;
        }
        return false;
      }

} */
