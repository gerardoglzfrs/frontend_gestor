import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'
import { apolloClient } from '../graphql/apollo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async login({},usuario){
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
        localStorage.setItem("token", data.login)
        
      } catch (error) {
        
      }
    }
  },
  modules: {
  }
})
