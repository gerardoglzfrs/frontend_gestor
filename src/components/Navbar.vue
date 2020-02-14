<template>
    <div>
        <v-snackbar color="red" v-model="msjError" top :timeout="4000"><p class="text-center">¡{{ mensajeErrorLogin }}!</p></v-snackbar>
        <!-- Navbar para logeo -->
        <v-toolbar color="primary" dark> 
          <v-toolbar-title><v-img src="@/assets/logo.png"></v-img></v-toolbar-title>
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
    msjError: false
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
  }
}
</script>
