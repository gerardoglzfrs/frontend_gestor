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
                                    <v-btn text icon color="primary" v-on="on" @click="verInfo(item)">
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

                        <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '0'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on"  @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '1'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on"  @click="verInfo(item)">
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
        <informacion :visible="mostrarInfProyecto" :nomProyecto="nombreProyecto"/>
    </div>
</template>

<script>
import Login from '@/components/Login'
import Loading from '@/components/Loader/Loading'
import informacion from '../components/Proyectos/informacion'
import { EventBus } from '@/EventBus'
import { mapState } from "vuex"
import gql from 'graphql-tag'

export default {
    components: {Login, Loading, informacion},
    name: 'tablasProyectos',
    
    data: () => ({
        nombreRuta: "",
        filtro: "",
        loading: true,
        abrirLogin: false,
        open: null,
        mostrarInfProyecto: false,
        nombreProyecto: "",
        headers: [
            {text: "Número", value: "numero", filerable: false},
            {text: "Nombre", value: "proyecto"},
            {text: "Estatus", value: "status", filerable: false},
            {text: "Acciones", value: "acciones", filerable: false}
        ],
        proyectos: [],
        options: ['Nuevos proyectos', 'Proyectos en catalogo', 'Proyectos en desarrollo', 'Proyectos finalizados']
    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        async obtenerProyectos(){
            try {
                const { data } = await this.$apollo.query({
                    query:gql`
                        query($nombre: String!){
                            oneLab(nombre: $nombre){
                                proyectos{
                                    proyecto
                                    status
                                    objetivo
                                }
                            }
                        }
                    `,
                    variables:{
                        nombre: this.$route.params.nameLab
                    }
                }) 
               
                var i = 0;
                for(let val of data.oneLab.proyectos){
                    i=i+1;
                    var numero="numero";
                    var value = ""+i
                    val[numero]=value;
                }
                this.proyectos = data.oneLab.proyectos;
                this.loading = false;

            } catch (error) {
               console.log(error)
            }
        },

        solicitarProyecto(proyecto){
            if (localStorage.getItem("token")===null) {
                this.abrirLogin = true;
            }else{
                this.open = true;item
            }
        },

        verInfo(proyecto){
            this.nombreProyecto = proyecto.proyecto;
            EventBus.$emit("VerInfoProyecto", this.nombreProyecto)
            this.mostrarInfProyecto = true;   
        }
    },
    mounted(){
        EventBus.$on("cerrarLoginTabla",() => {
           setTimeout(()=>{
            this.abrirLogin = false;
            },3000)
        });

        EventBus.$on("closeLoader",() => {
            this.open = false;
        });

        EventBus.$on("closeLoginTachita",()=>{
            this.abrirLogin =false;
        });
        
        EventBus.$on("CerrarVerProyecto", () => {
            this.mostrarInfProyecto = false;
        })
    },
    created(){
        this.obtenerProyectos();
        this.name = this.$route.params.nameLab
    }

}
</script>
