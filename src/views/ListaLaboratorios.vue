<template>
  <div>
      <Navbar />
      <CardsLaboratorios />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import CardsLaboratorios from '@/components/CardsLaboratorios'
import { mapMutations } from "vuex";

export default {
    name: 'ListaLaboratorios', 
    components: {Navbar, CardsLaboratorios},

    created(){
      this.guardarUsuarioLog()
    },

    methods:{
      ...mapMutations(['guardarUsuarioLog'])
    }
}
</script>
