<template>
    <v-container>
        <h1 class="title">Laboratorios a nivel nacional</h1>
            <p class="font-weight-light">
                En este apartado podras visualizar cada uno de los laboratorios que existen a nivel nacional asi como el catalogo de proyectos
                con los que cuenta cada laboratorio.
            </p>
        <v-row>
            <v-col cols="12" md="4" lg="3" sm="6"  v-for="item of Datos" :key="item.nombre" class="my-2">
                <v-card elevation="5" >
                    <v-list-item> 
                        <v-list-item-content>
                            <v-list-item-title class="subtitle-2"><p>{{ item.nombre }}</p></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img> -->
                     <v-img :src="item.imagenLogo" height="200"></v-img>
                    <v-card-text class="text--primary">
                        <div><strong>Total de proyectos: </strong>20</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos admin</v-btn> 
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos lab</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver proyectos al</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else>Ver catalogos</v-btn>
                        <!-- <v-btn text color="primary accent-4" :to="{ name:'Metodologia'}">metodologia</v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from "vuex"
import gql from 'graphql-tag'
import { EventBus } from "../EventBus"
import axios from "axios";


export default {
    name: "CardsLaboratorios",
    
    data: () => ({
        Datos:[],
    }),

    computed: {
        ...mapState(['usuarioLogeado'])
    },

    methods: {
        // Consultar todos los laboratorio
        async obtenerLaboratorios(){
            try {
                const { data } = await this.$apollo.query({
                    query:gql`
                        query{
                            allLabs{
                                nombre
                            }
                        }
                    `,
                })   
                // console.log(data.allLabs)
                this.Datos = data.allLabs;
                
                for(let i of this.Datos){
                   
                  const dataImage = await axios.get(`/api/logos/sendImg/${i.nombre}`,{
                       responseType: "arraybuffer",
                       headers: {
                           Autorization: localStorage.getItem("token")
                       }
                   })

                   const logo = window.URL.createObjectURL(
                       new Blob([dataImage.data], {type: "image/png"})
                   )
                    Object.defineProperty(i, "imagenLogo", {value: logo})
                    // console.log(i)
                }

            } catch (error) {    }
        }

        // Obtener las imagenes de cada laboratorio

    },

    created(){
        this.obtenerLaboratorios();
    },

    mounted(){
        EventBus.$on("actualizar", ()=>{
            this.obtenerLaboratorios();
        })
    }
   
}
</script>
