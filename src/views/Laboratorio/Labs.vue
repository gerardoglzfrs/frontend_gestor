<template>
  <div>
        <navLab />
        <CardsLaboratorios />
  </div>
</template>

<script>
import navLab from '@/components/navegacion/navLab'
import CardsLaboratorios from '@/components/CardsLaboratorios'
import { mapMutations } from "vuex";

export default {
    name: "Labs",
    components: { navLab, CardsLaboratorios},

    created(){
      this.guardarUsuarioLog()
    },

    methods: {
      ...mapMutations(['guardarUsuarioLog'])
    }
}
</script>
