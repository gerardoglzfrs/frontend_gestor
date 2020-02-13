<template>
    <div>
        <v-row justify="center">
            <v-card  class="my-4">
                <v-card-title>Lista de proyectos
                    <v-spacer />
                    <v-text-field prepend-icon="fa fa-search" label="Buscar proyecto por nombre" v-model="filtro"></v-text-field>
                </v-card-title>
                 <v-data-table :headers="headers" 
                :search="filtro" 
                no-data-text="No existen proyectos disponibles" 
                :loading="loading" 
                loading-text="Cargando..."
                no-results-text="Proyecto no encontrado"
                :footer-props="{itemsPerPageText:'Proyectos por página'}"
                :items="proyectos"> 
                    <template v-slot:item.acciones="{item}">
                        <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-btn text icon color="primary" v-on="on">
                                  <v-icon>fa fa-info</v-icon>
                                </v-btn>
                            </template>
                            <span>Ver información</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-btn text icon color="green" v-on="on" @click="solicitarProyecto(item)">
                                  <v-icon>fa fa-check-circle</v-icon>
                                </v-btn>
                            </template>
                            <span>Solicitar proyecto</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </v-card>
        </v-row>

        <Login :openModel="abrirLogin" />
        <Loading :openLoading="open" />
    </div>
</template>

<script>
import Login from '@/components/Login'
import Loading from '@/components/Loader/Loading'
import { EventBus } from '../../EventBus'

export default {
    components: {Login, Loading},
    name: 'tablasProyectos',
    
    data: () => ({
        headers: [
            {text: "Número", value: "numero", filerable: false},
            {text: "Nombre", value: "nombre"},
            {text: "Estatus", value: "estatus", filerable: false},
            {text: "Acciones", value: "acciones", filerable: false}
        ],
        filtro: "",
        proyectos: [
            {numero: 1, nombre:"proyecto 1", estatus: "activo"},
            {numero: 2, nombre:"proyecto 2", estatus: "activo"},
            {numero: 3, nombre:"proyecto 3", estatus: "activo"},
            {numero: 4, nombre:"proyecto 4", estatus: "activo"},
            {numero: 5, nombre:"proyecto 5", estatus: "activo"},
            {numero: 6, nombre:"proyecto 6", estatus: "inactivo"}
        ],
        loading: true,
        abrirLogin: false,
        open: false
    }),
    methods: {
        solicitarProyecto(proyecto){
            if (sessionStorage.getItem("token")===null) {
                // this.abrirLogin = true;
                this.open = true;
            }else{
            }
        }
    },
    mounted(){
        EventBus.$on("closeLogin",() => {
            this.abrirLogin = false;
        });

        EventBus.$on("closeLoader",() => {
            this.open = false;
        });
    }

}
</script>
