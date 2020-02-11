<template>
    <div>
        <v-toolbar color="primary" dark> 
          
          <v-spacer></v-spacer>
          <v-btn text @click="open"><v-icon>fa fa-user</v-icon> Iniciar sesion</v-btn>
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
    abrirLogin: false
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
  }
}
</script>
