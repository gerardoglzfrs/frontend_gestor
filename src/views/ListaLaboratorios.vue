<template>
  <div>
      <Navbar v-if="usuarioLogeado.tipUsuario === '' "/>
      <navAdmin v-else-if="usuarioLogeado.tipUsuario === '0'"/>
      <navLab  v-else-if="usuarioLogeado.tipUsuario === '1'"/>
      <navAlum  v-else-if="usuarioLogeado.tipUsuario === '2'"/>
      <CardsLaboratorios />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import navAlum from '@/components/navegacion/navAlum'
import navAdmin from '@/components/navegacion/navAdmin'
import navLab from '@/components/navegacion/navLab'
import CardsLaboratorios from '@/components/CardsLaboratorios'
import { mapMutations, mapState } from "vuex"


export default {
    name: 'ListaLaboratorios', 
    components: { Navbar, CardsLaboratorios, navAdmin, navAlum, navLab },

    created(){
      this.guardarUsuarioLog()
    },

    computed:{
      ...mapState(["usuarioLogeado"])
    },

    methods:{
      ...mapMutations(['guardarUsuarioLog'])
    }
}
</script>
