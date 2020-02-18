<template>
    <div>
        <v-snackbar color="red" v-model="msjError" top :timeout="4000"><p class="text-center">¡{{ mensajeErrorLogin }}!</p></v-snackbar>
        <v-snackbar color="green" v-model="msjsuccess" top :timeout="4000"><p class="text-center">¡{{ registrado }}!</p></v-snackbar>
        <!-- Navbar para logeo -->
        <v-toolbar color="primary" dark> 
          <v-toolbar-items>
            <v-img src="@/assets/logo.png" />
          </v-toolbar-items>
          <v-spacer />
          <v-btn text @click="open"><v-icon>mdi-user</v-icon> Iniciar sesion</v-btn>
        </v-toolbar> 
        <Login :openModel="abrirLogin" />  
    </div>
</template>

<script>
import Login from '@/components/Login.vue'
import { EventBus } from '../EventBus'

export default {
  name: 'Navbar',
  components: {Login},
  
  data: () => ({
    abrirLogin: false,
    mensajeErrorLogin: "",
    msjError: false,
    registrado: "",
    msjsuccess: false,
  }),
 
  methods: {
    open(){
      this.abrirLogin = true;
    }
  },
 
  mounted(){
    EventBus.$on("closeLogin",() => {
      this.abrirLogin = false;
    });

    EventBus.$on("cerrarLogin", () =>{
      setTimeout(() => {
        this.abrirLogin = false;
      },3000)
    });

    EventBus.$on("errorLogin", (msj) => {
      this.mensajeErrorLogin = msj  
      this.msjError = true
    });

    EventBus.$on("registrado", (msj) => {
      this.registrado = msj  
      this.msjsuccess = true
    });


  }
}
</script>
