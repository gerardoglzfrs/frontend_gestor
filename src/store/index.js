import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'
import { apolloClient } from '../graphql/apollo'
import { VueEasyJwt } from 'vue-easy-jwt'
import { EventBus } from "../EventBus";

const jwt = new VueEasyJwt()
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    usuarioLogeado: {
      tipUsuario: "",
      nom_usuario: ""
    }
  },
  mutations: {
    guardarUsuarioLog(state){
      const tokenDec =  jwt.decodeToken(localStorage.getItem("token"))
      if (tokenDec) {
        state.usuarioLogeado.tipUsuario = tokenDec.typeUser
        state.usuarioLogeado.nom_usuario = tokenDec.usuario
      }
    }
  },
  actions: {
    async login({ commit },usuario){
      try {
        const {data} = await apolloClient.mutate({
          mutation: gql`
            mutation($usuario: String!, $clave: String!)
            {
              login(usuario: $usuario, clave: $clave)
            }
          `,
            variables: {
              usuario: usuario.usuario,
              clave: usuario.password 
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
    }
  },
  modules: {
  }
})
