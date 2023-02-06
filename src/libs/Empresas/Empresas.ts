export interface IEmpresa { //interface, extructura que define un tipo de dato
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

}