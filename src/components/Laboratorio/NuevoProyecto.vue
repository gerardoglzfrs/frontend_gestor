<template>
    <div>
        <v-snackbar color="green" v-model="msjRegistrado" top>¡Proyecto registrado! <v-btn color="white" text @click="msjRegistrado=false">Cerrar</v-btn></v-snackbar>
        <v-dialog v-model="abrirRegProyecto" max-width="1200" persistent> 
            <v-form ref="formRegProyecto" v-model="esValido">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Nuevo proyecto</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="cerrarModalProyecto()"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-card-subtitle class="subtitle-2 font-weight-black"><strong>Informacion del proyecto</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="12" md="12" lg="12">
                                <v-text-field :rules="reglaNombre" prepend-icon="fa fa-info" label="Nombre" v-model="datosProyecto.nombre" clearable />
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col cols="12" sm="12" md="4" lg="4" >
                                <v-textarea :rules="reglaObjetivo" prepend-icon="fa fa-list-alt" label="Objetivo" v-model="datosProyecto.objetivo" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Objetivo</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" md="4" lg="4" >
                                <v-textarea :rules="reglaAlcances" prepend-icon="fa fa-list-alt" label="Alcences" v-model="datosProyecto.alcances" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Alcances</p>
                                    </div>
                                  </template>

                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" md="4" lg="4" >
                                <v-textarea :rules="reglaMetas" prepend-icon="fa fa-list-alt" label="Metas" v-model="datosProyecto.metas" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Metas</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn :disabled="!esValido" block color="success" rounded @click="regProyecto(datosProyecto)">Guardar</v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from "@/EventBus"
import { mapActions } from "vuex"

export default {
    name: "NuevoProyecto",
    props: ['abrirRegProyecto'],

    data: () => ({
        datosProyecto:{
            nombre: "",
            objetivo: "",
            alcances: "",
            metas: ""
        },
        esValido: true,
        msjRegistrado: false,
        reglaNombre: [
            value => !!value || "El nombre del proyecto es requerido"
        ],
        reglaObjetivo: [
            value => !!value || "La justifiación es requerida"
        ],
        reglaAlcances: [
            value => !!value || "El alcance es requerido"
        ],
        reglaMetas: [
            value => !!value || "Las metas son requeridas"
        ]

    }),
    methods: {
        cerrarModalProyecto(){ 
            EventBus.$emit("cerrarRegistroProyecto")
            try {
                this.$refs.formRegProyecto.reset()
            } catch (error) {
            }
        },

        ...mapActions(["regProyecto"])
    },

    mounted(){
        document.addEventListener("keydown", event => {
           const keyPressed = event.key;
           if (keyPressed === "Escape") {
               this.cerrarModalProyecto();
           }
        });

        EventBus.$on("proyectoRegistrado", (msj)=>{
            this.msjRegistrado = true
            setTimeout(()=>{
                EventBus.$emit("cerrarModalRegProyecto", (msj))
                this.msjRegistrado = false
                try {
                    this.$refs.formRegProyecto.reset()
                } catch (error) {
            }
            }, 3000)
        })
    }
}
</script>