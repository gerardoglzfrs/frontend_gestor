<template>
  <div>
      <Navbar />
      <v-container>
        <h1 class="title">{{ name }}</h1>
        <tablasProyectos />
      </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import tablasProyectos from '../components/Laboratorio/tablasProyectos'
import { mapMutations } from "vuex";

export default {
    name: "DatosLaboratorio",
    components: {Navbar, tablasProyectos},
    
    data: () => ({    
        name: "",
        direccion:"", 
    }),

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
