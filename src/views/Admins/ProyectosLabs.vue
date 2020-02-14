<template>
  <div>
      <navAdmin />
      <v-container>
        <p class="display-1 text-center">Nombre de laboratorio</p>
        <v-row justify="end">
            <v-col cols="12" sm="4">
                <v-select :items="options" outlined label="Seleccione la categoria"/>
            </v-col>
        </v-row>
        <Nuevos />
      </v-container>
    </div>
</template>

<script>
import navAdmin from '@/components/navegacion/navAdmin'
import Nuevos from '@/components/Proyectos/Nuevos'
import { mapMutations } from "vuex";

export default {
    name: 'ProyectosLabs',
    components: { navAdmin, Nuevos },
    
    data: () => ({
        options: ['Nuevos proyectos', 'Proyectos en catalogo', 'Proyectos en desarrollo', 'Proyectos finalizados']
    }),

    mounted:{
        ...mapMutations(['guardarUsuarioLog'])
    },

    created(){
        this.guardarUsuarioLog()
    }
}
</script>