<template>
    <v-container>
        <h1 class="title">Laboratorios a nivel nacional</h1>
            <p class="font-weight-light">
                En este apartado podras visualizar cada uno de los laboratorios que existen a nivel nacional asi como el catalogo de proyectos
                con los que cuenta cada laboratorio.
            </p>
        <v-row>
            <v-col cols="12" md="4" lg="3" sm="6"  v-for="item of Datos" :key="item.nombre" class="my-2">
                <v-card class="mx-auto" max-width="400">
                    <v-card-title>{{ item.nombre.toUpperCase() }}</v-card-title>
                    <v-container>
                        <v-row class="text-center">
                            <v-img style="width: 100px; height: 100px;" :src="item.imagenLogo"/>
                        </v-row>
                    </v-container>
                    <v-card-text>total de proyectos: 20</v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos admin</v-btn> 
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos lab</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver proyectos al</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else>Ver catalogos</v-btn>
                    </v-card-actions>

                    <!-- <v-list-item> 
                        <v-list-item-content>
                            <v-list-item-title class="subtitle-1"><p class="text-center"><strong>{{ item.nombre.toUpperCase() }}</strong></p></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <div style="margin-right: 10px; margin-left: 10px; width: 18rm;">
                        <v-row class="text-center">
                            <v-img style="width: 200px; height: 200px;" :src="item.imagenLogo" />
                        </v-row>
                    </div>
                    <v-card-text class="text--primary">
                        <div><strong>Total de proyectos: </strong>{{ item.count }}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos admin</v-btn> 
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos lab</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver proyectos al</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else>Ver catalogos</v-btn>
                        <!-- <v-btn text color="primary accent-4" :to="{ name:'Metodologia'}">metodologia</v-btn> -->
                    <!-- </v-card-actions>  -->
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
                                count
                            }
                        }
                    `,
                })   
                this.Datos = data.allLabs;
               
                // Obtener las imagenes de cada laboratorio
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
                }

            } catch (error) {  }
        },
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