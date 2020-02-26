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
        <tablaProyectosLabs />
      </v-container>
    </div>
</template>

<script>
import navAdmin from '@/components/navegacion/navAdmin'
import tablaProyectosLabs from '@/components/Proyectos/tablaProyectosLabs'
import { mapMutations } from "vuex";

export default {
    name: 'ProyectosLabs',
    components: { navAdmin, tablaProyectosLabs },
    
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