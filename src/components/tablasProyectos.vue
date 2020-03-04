<template>
    <div>
        <v-container>
            <!-- Selector de categorias -->
            <v-row justify="center" v-if="usuarioLogeado.tipUsuario === '0' || usuarioLogeado.tipUsuario === '1'">
                <v-col cols="12" sm="4">
                    <v-select v-if="usuarioLogeado.nombre != this.$route.params.nameLab && !usuarioLogeado.tipUsuario==='0'" v-model="proyectosNuevos" :items="options2" @input="categorias" outlined label="Seleccione la categoria"/>
                    <v-select v-else v-model="proyectosNuevos" :items="options" @input="categorias" outlined label="Seleccione la categoria"/>
                </v-col>
            </v-row>
            
            <v-row justify="center" v-if="labExistente===1">
                <v-card  class="my-4">
                    <v-card-title>Lista de proyectos
                        <v-spacer />
                        <v-text-field prepend-icon="fa fa-search" label="Buscar proyecto por nombre" v-model="filtro"></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" v-if="usuarioLogeado.tipUsuario === '1' && usuarioLogeado.nombre === this.$route.params.nameLab"
                    :search="filtro" 
                    no-data-text="No existen proyectos disponibles" 
                    :loading="loading"
                    class="elevation-1" 
                    loading-text="Cargando..."
                    no-results-text="Proyecto no encontrado"
                    :footer-props="{itemsPerPageText:'Paginación'}"
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
                                    <v-icon>fa fa-paper-plane</v-icon>
                                    </v-btn>
                                </template>
                                <span>Solicitar proyecto</span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '0'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '1'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                        </template>
                        <template v-slot:item.notificaciones="{item}" v-if="usuarioLogeado.tipUsuario === '1'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text color="blue" v-on="on" @click="verSolicitudes(item)">
                                        <v-badge :content="item['notificaciones']" :value="item['notificaciones']" color="red" overlap>
                                            <v-icon>fa fa-bell</v-icon>
                                        </v-badge>
                                    </v-btn>
                                </template>
                                <span>Ver solicitudes</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>

                    <!-- para cuando no es el propietaro -->
                    <v-data-table :headers="headers2" v-else
                    :search="filtro" 
                    no-data-text="No existen proyectos disponibles" 
                    :loading="loading"
                    class="elevation-1" 
                    loading-text="Cargando..."
                    no-results-text="Proyecto no encontrado"
                    :footer-props="{itemsPerPageText:'Paginación'}"
                    :items="proyectos"> 
                        <template v-slot:item.acciones="{item}" v-if="(usuarioLogeado.tipUsuario === '' || usuarioLogeado.tipUsuario === '2')">
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
                                    <v-icon>fa fa-paper-plane</v-icon>
                                    </v-btn>
                                </template>
                                <span>Solicitar proyecto</span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '0'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                            <v-tooltip bottom v-if="selected ==='Nuevos proyectos'">
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="green" v-on="on" @click="solicitudProyecto(item['proyecto'], 'Aceptado')">
                                    <v-icon>fa fa-check</v-icon>
                                    </v-btn>
                                </template>
                                <span>Aceptar proyecto</span>
                            </v-tooltip>
                            <v-tooltip bottom v-if="selected ==='Nuevos proyectos'">
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="red" v-on="on" @click="solicitudProyecto(item['proyecto'], 'Rechazado')">
                                    <v-icon>fa fa-times</v-icon>
                                    </v-btn>
                                </template>
                                <span>Rechazar proyecto</span>
                            </v-tooltip>
                        </template>

                        <template v-slot:item.acciones="{item}" v-else-if="usuarioLogeado.tipUsuario === '1'">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on" @click="verInfo(item)">
                                    <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-row>
            <v-container style="display: flex; justify-content: center;" v-else-if="labExistente===2">   
                <v-card color="grey lighten-4" width="400">
                    <v-toolbar color="red" dark>
                        <v-row class="justify-center">
                            <v-card-title >¡Error 404!</v-card-title> 
                        </v-row>
                    </v-toolbar>
                    <v-card-text>
                        <h1 class="text-center">El laboratorio no existe</h1>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn block color="red" outlined to="/">Regresar al inicio</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-container>

        <Login :openModel="abrirLogin" />
        <Loading :openLoading="open" />
        <informacion :visible="mostrarInfProyecto" :nomProyecto="nombreProyecto"/>
        <Solicitudes :mostrarSolocitudes="abrirModalSolicitud"/>
    </div>
</template>

<script>
import Login from '@/components/Login'
import Loading from '@/components/Loader/Loading'
import informacion from '../components/Proyectos/informacion'
import { EventBus } from '@/EventBus'
import { mapState } from "vuex"
import { apolloClient } from '../graphql/apollo'
import gql from 'graphql-tag'
import Solicitudes from '@/components/Laboratorio/Solicitudes'

export default {
    components: {Login, Loading, informacion, Solicitudes},
    name: 'tablasProyectos',
    
    data: () => ({
        labExistente: 0,
        proyectosNuevos: "Nuevos proyectos",
        nombreRuta: "",
        total: "",
        filtro: "",
        loading: true,
        abrirLogin: false,
        open: null,
        mostrarInfProyecto: false,
        abrirModalSolicitud: false,
        nombreProyecto: "",
        selected: "Nuevos proyectos",
        headers: [
            {text: "Número", value: "numero", filerable: false},
            {text: "Nombre", value: "proyecto"},
            {text: "Alumnos requeridos", value: "numAlu", align: 'center', sortable: false, value: 'numAlu'},
            {text: "Estatus", value: "status", filerable: false},
            {text: "Acciones", value: "acciones", filerable: false, align: 'center', sortable: false, value: 'acciones'},
            {text: "Solicitudes", value: "notificaciones", filerable: false, align: 'center', sortable: false, value: 'notificaciones'}
        ],
        headers2: [
            {text: "Número", value: "numero", filerable: false},
            {text: "Nombre", value: "proyecto"},
            {text: "Alumnos requeridos", value: "numAlu", align: 'center', sortable: false, value: 'numAlu'},
            {text: "Estatus", value: "status", filerable: false},
            {text: "Acciones", value: "acciones", filerable: false, align: 'center', sortable: false, value: 'acciones'},
        ],
        com: [],
        proyectos: [],
        options: ['Nuevos proyectos', 'Proyectos en catalogo', 'Proyectos en desarrollo', 'Proyectos finalizados'],
        options2: ['Proyectos en catalogo', 'Proyectos en desarrollo', 'Proyectos finalizados'],

    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        categorias(item){
            this.selected = item;
            if(item==="Proyectos en catalogo") {
                this.headers = this.com
            }else{
                this.headers = this.headers2
            }
            this.obtenerProyectos();
        },
        
        //Aceptar o rechazar proyectos de laboratorios
        async solicitudProyecto(proyecto, estatus){
            try {
                const {data} = await apolloClient.mutate({
                    mutation: gql`
                        mutation($proyecto: String!, $nombre: String!, $estatus: String!)
                        {
                            aceptarNuevoProyecto(proyecto: $proyecto, nombre: $nombre, accion: $estatus)
                        }
                    `,
                    variables: {
                        proyecto: proyecto,
                        nombre: this.$route.params.nameLab,
                        estatus: estatus
                    }
                }) 
                this.obtenerProyectos();
            } catch (error) {
                
            }
        },

        // Obtener los proyectos de los laboratorios
        async obtenerProyectos(){
            try {
                const { data } = await this.$apollo.query({
                    query:gql`
                        query($nombre: String!, $proyectoCategoria: String!){
                            oneLab(nombre: $nombre, proyectoCategoria: $proyectoCategoria){
                                    proyecto
                                    status
                                    objetivo
                                    numAlu
                            }
                        }
                    `,
                    variables:{
                        nombre: this.$route.params.nameLab,
                        proyectoCategoria: this.selected
                    }
                }) 
                if(data.oneLab!=null) {
                    this.labExistente=1;
                }else{
                    this.labExistente=2;
                }
                var i = 0;
                for(let val of data.oneLab){
                    i=i+1;
                    var numero="numero";
                    var value = ""+i;
                    val[numero]=value;
                }
                this.proyectos = data.oneLab;
                this.loading = false;

            } catch (error) {
               
            }
            this.notificaciones();
        },
        async notificaciones(){
            for(let val of this.proyectos){
                let i =0;
                try{
                    const { data } = await this.$apollo.query({
                        query:gql`
                            query($nombre: String!, $proyecto: String!){
                                proyecto(nombre: $nombre, proyecto: $proyecto){
                                    alumnos{
                                        status
                                    }
                                }
                            }    
                        `,
                        variables:{
                            nombre: this.$route.params.nameLab,
                            proyecto: val.proyecto
                        }
                    })
                    
                    for(let val of data.proyecto.alumnos){
                        if(val.status==="Nuevo") i++
                    }

                }catch(err){
                    console.log(err)
                }
                val["notificaciones"]=i;
            }
        },
       
        async solicitarProyecto(proyecto){
            if (localStorage.getItem("token")===null) {
                this.abrirLogin = true;
                }else{
            try{
                this.open=true;
                 const { data } = await apolloClient.mutate({
                     mutation:gql`
                            mutation($nombre: String!, $proyecto: String!)
                            {
                                solicitarProyecto(nombre: $nombre, proyecto: $proyecto)
                            }    
                        `,
                        variables:{
                            nombre: this.$route.params.nameLab,
                            proyecto: proyecto.proyecto
                        }
                    })
                }
            catch(error){
                console.log(error)
            }
            }
        },

        verInfo(proyecto){
            this.nombreProyecto = proyecto.proyecto;
            EventBus.$emit("VerInfoProyecto", this.nombreProyecto)
            this.mostrarInfProyecto = true;   
        },

        verSolicitudes(proyecto){
            this.nombreProyecto = proyecto.proyecto;
            EventBus.$emit("verSolicitudesProyecto", this.nombreProyecto)
            this.abrirModalSolicitud = true;
        }
    },
    mounted(){
        this.com = this.headers;
        this.headers = this.headers2;
        if((this.usuarioLogeado.tipUsuario === '2' || this.usuarioLogeado.tipUsuario === '' || this.usuarioLogeado.nombre != this.$route.params.nameLab) && this.usuarioLogeado.tipUsuario != '0'){
            this.selected = 'Proyectos en catalogo'
            this.proyectosNuevos = 'Proyectos en catalogo'
            this.obtenerProyectos();
        }
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
        });

        EventBus.$on("cerrarModalSolicitud",()=>{
            this.abrirModalSolicitud = false;
            this.notificaciones();
        });

        EventBus.$on("ActualizarTablaProyectos", ()=>{
            this.obtenerProyectos();
        })
    },
    created(){
        this.obtenerProyectos();
        this.name = this.$route.params.nameLab
    }

}
</script>
