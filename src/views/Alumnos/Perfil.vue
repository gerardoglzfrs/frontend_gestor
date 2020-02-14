<template>
    <div>
        <navAlumn />
        <Info />
        <Proyecto />
    </div>
</template>

<script>
import navAlum from '@/components/navegacion/navAlum'
import Info from '@/components/Alumnos/Info'
import Proyecto from '@/components/Alumnos/Proyecto'
import { mapMutations } from "vuex";

export default {
    name: 'Perfil',
    components: { navAlum, info, Proyecto },

    created(){
        this.guardarUsuarioLog()
    },

    methods: {
        ...mapMutations(['guardarUsuarioLog'])
    }
}
</script>