<template>
    <div>
        <Navbar v-if="usuarioLogeado.tipUsuario === '' "/>
        <navAdmin v-else-if="usuarioLogeado.tipUsuario === '0'"/>
        <navLab  v-else-if="usuarioLogeado.tipUsuario === '1'"/>
        <navAlum  v-else-if="usuarioLogeado.tipUsuario === '2'"/>
        
      <v-container>
        <p class="display-1 text-center">{{ name.toUpperCase() }}</p>
        <hr>
        <tablasProyectos />
      </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import navAlum from '@/components/navegacion/navAlum'
import navAdmin from '@/components/navegacion/navAdmin'
import navLab from '@/components/navegacion/navLab'
import tablasProyectos from '../components/tablasProyectos'
import { mapMutations, mapState } from "vuex";

export default {
    name: "ProyectoLaboratorios",
    components: { Navbar, tablasProyectos, navAdmin, navAlum, navLab  },
    
    data: () => ({    
        name: "",
        direccion:"", 
    }),

    computed: {
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        ...mapMutations(['guardarUsuarioLog']),

        async getdataLab(){
            try {
                const datalab = await this.$apollo.query({
                    query:gql`
                        query($lab: String!){
                            getLab(lab: $lab){
                                name
                                jefe
                                direccion
                            }
                        }
                    `,
                    variables:{
                        lab: this.$route.params.nameLab
                    }
                })
                this.direccion = datalab.data.getLab.direccion
            } catch (error) {
                
            }
        } 
    },
    created(){
        this.guardarUsuarioLog();
        this.getdataLab();
        this.name = this.$route.params.nameLab
    },
}
</script>
