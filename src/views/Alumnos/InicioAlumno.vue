<template>
    <div>
        <navAlum />
        <CardsLaboratorios />
    </div>
</template>

<script>
import navAlum from '@/components/navegacion/navAlum'
import CardsLaboratorios from '@/components/CardsLaboratorios'
import { mapMutations } from "vuex";

export default {
    name: 'InicioAlum',
    components: { navAlum, CardsLaboratorios },

    methods: {
        ...mapMutations(['guardarUsuarioLog'])
    },
    
}
</script>