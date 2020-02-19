import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'
import { apolloClient } from '../graphql/apollo'
import { VueEasyJwt } from 'vue-easy-jwt'
import { EventBus } from "../EventBus"
import router from "../router/index"

const jwt = new VueEasyJwt()
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    usuarioLogeado: {
      tipUsuario: "",
      nom_usuario: "",
      nombre: ""
    }
  },

  mutations: {
    guardarUsuarioLog(state){
      const tokenDec =  jwt.decodeToken(localStorage.getItem("token"))
      if (tokenDec) {
        state.usuarioLogeado.tipUsuario = tokenDec.typeUser
        state.usuarioLogeado.nom_usuario = tokenDec.usuario
        state.usuarioLogeado.nombre = tokenDec.nombre
      }
    }
  },
  
  actions: {
    async login({ commit, state },user){
      try {
        const {data} = await apolloClient.mutate({
          mutation: gql`
            mutation($usuario: String!, $clave: String!)
            {
              login(usuario: $usuario, clave: $clave)
            }
          `,
            variables: {
              usuario: user.usuario,
              clave: user.password 
            }
        }) 
        
        const mensajeError = data.login;
       
        switch (mensajeError) {
          case "Contraseña incorrecta":
            EventBus.$emit("errorLogin", mensajeError)
            break;
          
          case "El usuario no existe":
            EventBus.$emit("errorLogin", mensajeError)
            break;
          
          default:
            localStorage.setItem("token", data.login)
            commit("guardarUsuarioLog")
            EventBus.$emit("cerrarLogin")
            break;
        }

      } catch (error) {
        
      }
    },

    async agregarAlumno({  }, datosAlumno){
      try {
        const {data} = await apolloClient.mutate({
          mutation: gql`
            mutation($alumno: String!, $ape_p: String!, $ape_m: String!, $correo: String!, $telefono: String!, $institucion: String!, $carrera: String!, $semestre_cursado: String!, $domicilio: String!, $usuario: String!, $clave: String!)
            {
              agregarAlumno(alumno: $alumno, ape_p: $ape_p, ape_m: $ape_m, correo: $correo, telefono: $telefono, institucion: $institucion, carrera: $carrera, semestre_cursado: $semestre_cursado, domicilio: $domicilio, usuario: $usuario, clave: $clave)
            }
          `,
          variables: {
            alumno: datosAlumno.nombre,
            ape_p: datosAlumno.apellidoP,
            ape_m: datosAlumno.apellidoM,
            correo: datosAlumno.correo,
            telefono: datosAlumno.telefono,
            institucion: datosAlumno.institucion,
            carrera: datosAlumno.carrera, 
            semestre_cursado: datosAlumno.semestre,
            domicilio: datosAlumno.domicilio,
            usuario: datosAlumno.usuario,
            clave: datosAlumno.psw
          }
        })

        const msj = data.agregarAlumno;

        if(msj === "Usuario registrado"){
          EventBus.$emit("successRegistro", msj);
        }else{
          EventBus.$emit("errorRegistro", msj);
        }

      } catch (error) {
        console.log(datosAlumno)
      }
    },

    //Logout
    async Logout(){
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation{
              logOut
            }
          `
        })
        localStorage.removeItem("token")
        // router.push({ name: 'ListaLaboratorios' })
        location.reload();
      } catch (error) {
        
      }
    }
    
  },
  modules: {
  }
})
