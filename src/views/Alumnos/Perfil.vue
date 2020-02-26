<template>
    <div>
        <navAlum />
        <v-container >
            <Info />
            <br>
            <Proyecto />
            <br>
            <v-row justify="center">
                <v-btn clearable color="success">Pagina inicial</v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import navAlum from '@/components/navegacion/navAlum'
import Info from '../../components/Alumnos/Info'
import Proyecto from '@/components/Alumnos/Proyecto'
import { mapMutations } from "vuex";

export default {
    name: 'Perfil',
    components: { navAlum, Info, Proyecto },

    created(){
        this.guardarUsuarioLog()
       
    },

    methods: {
        ...mapMutations(['guardarUsuarioLog'])
    }
}
</script>