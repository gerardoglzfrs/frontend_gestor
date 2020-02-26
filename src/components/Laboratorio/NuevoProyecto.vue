<template>
    <div>
        <v-snackbar color="green" v-model="msjRegistrado" top>¡Proyecto registrado! <v-btn color="white" text @click="msjRegistrado=false">Cerrar</v-btn></v-snackbar>
        <v-snackbar color="red" v-model="msjErrorDeRegistro" top>¡El proyecto ya existe!<v-btn color="white" text @click="msjErrorDeRegistro=false">Cerrar</v-btn></v-snackbar>
        <v-dialog v-model="abrirRegProyecto" max-width="1000" persistent> 
            <v-form ref="formRegProyecto" v-model="esValido">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Nuevo proyecto</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="cerrarModalProyecto()"><v-icon>fa fa-times</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 2px;"><strong>Informacion del proyecto</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="12" md="8" lg="8">
                                <v-text-field :rules="reglaNombre" prepend-icon="fa fa-info" label="Nombre" v-model="datosProyecto.nombre" clearable />
                            </v-col>
                            <v-col cols="12" sm="12" md="4" lg="4">
                                <v-text-field v-mask="mask" type="text" :rules="reglaAlumnosRequeridos" prepend-icon="fa fa-info" label="Alumnos requeridos" v-model="datosProyecto.alumnosRequeridos" min="1" clearable/>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col cols="12" sm="12" md="6" lg="6">
                                <v-textarea rows="4" :rules="reglaObjetivo" prepend-icon="fa fa-list-alt" label="Objetivo" v-model="datosProyecto.objetivo" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Objetivo</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" >
                                <v-textarea rows="4" :rules="reglaRequerimientos" prepend-icon="fa fa-list-alt" label="Alcences" v-model="datosProyecto.requerimientos" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Requerimientos</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 2px;"><strong>Perfiles y habilidades requeridas</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="12" md="6" lg="6" >
                                <v-textarea rows="4" :rules="reglaPerfiles" prepend-icon="fa fa-list-alt" label="Metas" v-model="datosProyecto.perfiles" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Perfiles</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" >
                                <v-textarea rows="4" :rules="reglaHabilidades" prepend-icon="fa fa-list-alt" label="Metas" v-model="datosProyecto.habilidades" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Habilidades</p>
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
import { mask } from "vue-the-mask"

export default {
    name: "NuevoProyecto",
    props: ['abrirRegProyecto'],    

    directives: {
        mask
    },

    data: () => ({
        mask: '#',
        esValido: true,
        msjRegistrado: false,
        msjErrorDeRegistro: false,
        datosProyecto:{
            alumnosRequeridos: "",
            nombre: "",
            objetivo: "",
            requerimientos: "",
            perfiles: "",
            habilidades: ""
        },
        reglaAlumnosRequeridos: [
            value => !!value || "La cantidad de alumnos es requerido",
            value => value >= 1 || "Debe de ingresar al menos un integrante"
        ],
        reglaNombre: [
            value => !!value || "El nombre del proyecto es requerido"
        ],
        reglaObjetivo: [
            value => !!value || "El objetivo es requerido"
        ],
        reglaRequerimientos: [
            value => !!value || "Los requerimientos son requeridos"
        ],
        reglaPerfiles: [
            value => !!value || "El perfil es requerido"
        ],
        reglaHabilidades: [
            value => !!value || "Las habilidades son requeridas"
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
        });

        EventBus.$on("errorRegProyecto", (msj)=>{
            this.msjErrorDeRegistro = true
            setTimeout(()=>{
                this.msjErrorDeRegistro = false
            }, 3000)
        });

    }
}
</script>