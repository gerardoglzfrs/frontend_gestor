<template>
    <div>
        <v-toolbar color="primary" dark>
            <v-toolbar-items>
                <v-img src="@/assets/ILN.png" />
                <v-img class="mt-4" style="height: 30px; width: 80px" src="@/assets/labsol.png" />
            </v-toolbar-items>
            <v-spacer />
            <v-toolbar-title>{{ usuarioLogeado.nombre.toUpperCase() }}</v-toolbar-title>
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
                  <v-btn text icon color="" v-on="on" @click="logOut">
                    <v-icon>fa fa-sign-out-alt</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar sesión</span>
            </v-tooltip>
        </v-toolbar>
        <NuevoProyecto :abrirRegProyecto="añadirProyecto"/>
        <Logout :confirmacionLogout="abrirLogout"/>
    </div>
</template>

<script>
import { mapState } from "vuex"
import { EventBus } from "@/EventBus"
import NuevoProyecto from "../Laboratorio/NuevoProyecto"
import Logout from '../Logout'

export default {
    name: "navLab",
    components: { NuevoProyecto, Logout },

    data: () => ({
        añadirProyecto: false,
        abrirLogout: false
    }),
    
    computed:{
        ...mapState(["usuarioLogeado"])
    },

    methods: {
        abrirModalRegProyecto(){
            this.añadirProyecto = true;
        },

        logOut(){
            this.abrirLogout = true;
        }

    },

    mounted(){
        EventBus.$on('cerrarRegistroProyecto', () =>{
            this.añadirProyecto = false;
        });

        EventBus.$on("cerrarModalRegProyecto", ()=>{
            this.añadirProyecto = false
        });

         EventBus.$on("cerrarLogoutLab", ()=>{
            this.abrirLogout = false;
        })
    
    }


}
</script>