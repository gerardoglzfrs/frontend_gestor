<template>
    <div>
        <v-container>
            <!-- Selector de categorias -->
            <v-row justify="center" v-if="usuarioLogeado.tipUsuario === '0' || usuarioLogeado.tipUsuario === '1'">
                <v-col cols="12" sm="4">
                    <v-select :items="options" outlined label="Seleccione la categoria"/>
                </v-col>
            </v-row>

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
                    class="elevation-1" 
                    loading-text="Cargando..."
                    no-results-text="Proyecto no encontrado"
                    :footer-props="{itemsPerPageText:'Proyectos por página'}"
                    :items="proyectos"> 
                        <template v-slot:item.acciones="{item}" v-if="usuarioLogeado.tipUsuario === '' || usuarioLogeado.tipUsuario === '2'">
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

                        <template v-slot:item.acciones="" v-else-if="usuarioLogeado.tipUsuario === '0'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.acciones="" v-else-if="usuarioLogeado.tipUsuario === '1'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-row>
        </v-container>

        <Login :openModel="abrirLogin" />
        <Loading :openLoading="open" />
    </div>
</template>

<script>
import Login from '@/components/Login'
import Loading from '@/components/Loader/Loading'
import { EventBus } from '@/EventBus'
import { mapState } from "vuex";

export default {
    components: {Login, Loading},
    name: 'tablasProyectos',
    
    data: () => ({
        headers: [
            {text: "Número", value: "numero", filerable: false},
            {text: "Nombre", value: "nombre"},

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
        open: null,
        options: ['Nuevos proyectos', 'Proyectos en catalogo', 'Proyectos en desarrollo', 'Proyectos finalizados']
    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        solicitarProyecto(proyecto){
            if (sessionStorage.getItem("token")==="") {
                this.abrirLogin = true;
            }else{
                this.open = true;
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
