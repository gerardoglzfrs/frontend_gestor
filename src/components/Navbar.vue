<template>
    <div>
        <v-snackbar color="red" v-model="msjError" top :timeout="4000">¡{{ mensajeErrorLogin }}! <v-btn color="white" text @click="msjError=false">Cerrar</v-btn></v-snackbar>
        <!-- Navbar para logeo -->
        <v-toolbar color="primary" dark> 
          <v-toolbar-items>
            <v-img src="@/assets/ILN.png" />
            <v-img class="mt-3" style="height: 30px; width: 80px" src="@/assets/labsol.png" />
          </v-toolbar-items>
          <v-spacer />
          <v-btn text @click="open"><v-icon>mdi-user</v-icon> Iniciar sesion</v-btn>
        </v-toolbar> 
        <Login :openModel="abrirLogin" />  
        <Registro :openModelStudent="openFormStudent"/>
    </div>
</template>

<script>
import Login from '@/components/Login.vue'
import { EventBus } from '../EventBus'
import Registro from '@/components/Alumnos/Registro.vue'

export default {
  name: 'Navbar',
  components: {Login, Registro},
  
  data: () => ({
    abrirLogin: false,
    mensajeErrorLogin: "",
    msjError: false,
    openFormStudent: false
  }),
 
  methods: {
    open(){
      this.abrirLogin = true;
    }
  },
 
  mounted(){
    EventBus.$on("closeLoginTachita",() => {
      this.abrirLogin = false;
    });

    EventBus.$on("errorLogin", (msj) => {
      this.mensajeErrorLogin = msj  
      this.msjError = true
    });
    
    EventBus.$on('closeModalStudent', ()=>{
      this.openFormStudent = false;    
    });

    EventBus.$on("openModalStudent", () => {
      this.openFormStudent = true;
    })

    EventBus.$on('cerrarRegistro', ()=>{
      this.openFormStudent = false;
    })

    EventBus.$on("regresarLogin", ()=>{
      this.abrirLogin = true;
    })


  }
}
</script>
