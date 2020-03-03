<template>
    <v-container>
        <h1 class="title">Laboratorios a nivel nacional</h1>
            <p class="font-weight-light">
                En este apartado podras visualizar cada uno de los laboratorios que existen a nivel nacional asi como el catalogo de proyectos
                con los que cuenta cada laboratorio.
            </p>
        <v-row>
            <v-col cols="12" md="4" lg="3" sm="6"  v-for="item of Datos" :key="item.nombre" class="my-2">
                <v-card elevation="4" style="width: 150%" height="100%">
                    <v-toolbar color="white">
                    <v-card-title class="text-center">{{ item.nombre.toUpperCase() }}</v-card-title>
                        <v-spacer />
                         <v-badge v-if="item['notificaciones'] != '' && usuarioLogeado.tipUsuario === '0'" :content="item['notificaciones']" :value="item['notificaciones']" color="red" overlap>
                            <v-icon color="blue">fa fa-bell</v-icon>
                        </v-badge>
                    </v-toolbar>
                    <hr class="mb-2">
                    <v-card-text style="height: 200px;">
                        <v-container style="width: 42%; margin: 0 auto 0 auto; padding: 1%;">
                            <v-img id="redimencionar" style="max-width: 100%;" :src="item.imagenLogo" />
                        </v-container>
                    </v-card-text>
                    <v-card-text class="mt-2">Total de proyectos: {{ item.count }}</v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-if="usuarioLogeado.tipUsuario === '0'" >Ver proyectos</v-btn> 
                        <v-btn dark block color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '1' && item['nombre'] === usuarioLogeado.nombre">Mis proyectos</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '1'">Ver proyectos</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else-if="usuarioLogeado.tipUsuario === '2'">Ver catalogo</v-btn>
                        <v-btn text color="primary accent-4" :to="{ name: 'ProyectosLaboratorios', params:{nameLab:item.nombre} }" v-else>Ver catalogo</v-btn>
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
        ruta: ""
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
                                notificaciones
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

<style scoped>
   
</style>