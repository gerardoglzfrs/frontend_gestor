<template>
    <div>
        <v-toolbar color="primary" dark>
            <v-toolbar-items>
                <v-img src="@/assets/logo.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title>{{ usuarioLogeado.nombre }}</v-toolbar-title>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" @click="abrirModalRegProyecto">
                        <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                </template>
                <span>Nuevo proyecto</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                    <v-btn text icon color="" v-on="on" >
                        <v-icon>fa fa-tasks</v-icon>
                    </v-btn>
                </template>
                <span>Proyectos</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-btn text icon color="" v-on="on" @click="Logout">
                    <v-icon>fa fa-sign-out-alt</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar sesion</span>
            </v-tooltip>
        </v-toolbar>
        <NuevoProyecto  :abrirRegProyecto="añadirProyecto"/>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { EventBus } from "@/EventBus"
import NuevoProyecto from "../Laboratorio/NuevoProyecto"

export default {
    name: "navLab",
    components: { NuevoProyecto },

    data: () => ({
        añadirProyecto: false
    }),
    
    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        ...mapActions(["Logout"]),

        abrirModalRegProyecto(){
            this.añadirProyecto = true;
        }
    },

    mounted(){
        EventBus.$on('cerrarRegistroProyecto', () =>{
            this.añadirProyecto = false;
        }),

        EventBus.$on("cerrarModalRegProyecto", ()=>{
            this.añadirProyecto = false
        })
    
    }


}
</script>