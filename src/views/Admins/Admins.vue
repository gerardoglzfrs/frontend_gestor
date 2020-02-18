<template>
    <div>
        <navAdmin />
        <CardsLaboratorios />
    </div>
</template>

<script>
import navAdmin from '@/components/navegacion/navAdmin'
import CardsLaboratorios from '@/components/CardsLaboratorios'
import { mapMutations } from "vuex";

export default {
    name: 'Admins',
    components: { navAdmin, CardsLaboratorios },

    methods: {
        ...mapMutations(['guardarUsuarioLog'])
    },

    created(){
        this.guardarUsuarioLog()
    }
}

</script>
