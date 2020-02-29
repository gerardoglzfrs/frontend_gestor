<template>
    <v-row justify="center">
        <v-dialog v-model="confirmacionLogout" max-width="300" persistent>
            <v-card color="white" elevation="6">
                <v-toolbar color="white">
                    <v-card-title >Cerrar sesión</v-card-title>
                    <v-spacer />
                        <v-btn icon @click="cerrarLogout"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" lg="12">
                            <p>¿Estás seguro de quierer cerrar sesión?</p>
                        </v-col>
                    </v-row>
                    <hr>
                    <v-row justify="center">
                        <v-col cols="6" sm="6" md="6" lg="6">
                            <v-btn class="mx-4" style="width:100px; height:40px;" color="error" @click="cerrarLogout" outlined>Cerrar</v-btn>
                        </v-col>
                        <v-col cols="6" sm="6" md="6" lg="6">
                            <v-btn style="width:100px; height:40px;" color="success" @click="Logout" outlined>Aceptar</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapActions } from "vuex"
import { EventBus } from "@/EventBus"

export default {
    name: "Logout",
    props:["confirmacionLogout"],

    methods:{
        cerrarLogout(){
            EventBus.$emit("cerrarLogoutAlumno");
            EventBus.$emit("cerrarLogoutAdmin");
            EventBus.$emit("cerrarLogoutLab");
        },
        
        ...mapActions(["Logout"])
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keyPressed = event.key;
            if (keyPressed === "Escape") {
                this.cerrarLogout();
            }
        })
    }
}
</script>
