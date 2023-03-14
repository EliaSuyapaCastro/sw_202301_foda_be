import { IDataAccessObject } desde "@dao/IDataAccessObject" ;
import { UserDao } desde "@dao/models/Users/UserDao" ;
import { JWT } desde "@server/utils/Jwt";
import { Security } desde "@utils/Security" ;

exportar clase Usuarios {
  private userDao: UserDao;
  constructor(usuario: IDataAccessObject) {
    esto. userDao = usuario como UserDao;
  }
  public async newUser(email: string, password: string) {
    probar {
      const newUser = {
 correo electrónico,
        contraseña: Seguridad. encodePassword(contraseña),
        pswdExpires: new Date(new Date().  getTime () + (3 * 30 * 24 * 60 * 60    * 1000   ))
      };
      const result = esperar esto. userDao. create(newUser);
      const rt = esperar esto. userDao. findOneByFilter({ _id: result?. insertedId });
      Eliminar RT. contraseña;
      Devolver RT;
    } captura (ex) {
      consola. error('newFoda error:', ex);
      return null;
    }
  }
  public async loginUser(email:string, password:string) {
    probar{
      const dbUser = esperar esto. userDao. findOneByFilter(
        {correo electrónico},
        {proyección:{_id:1, email:1, contraseña:1, estado:1, roles:1, pswdExpires:1, avatar:1}}
      );
      if (Seguridad. verifyPassword(password, dbUser. contraseña)){
        eliminar dbUser. contraseña;
        eliminar dbUser. pswdExpires;
        eliminar dbUser. estado;
        JWT
         const token = JWT. singJWT(dbUser);
        token de retorno ;
      }
      consola. error("User.loginUser no puede validar la contraseña");
      throw new Error("No se pueden validar las credenciales");
    }catch(err){
      consola. error(err);
      throw new Error("No se pueden validar las credenciales");
    }
  }
}