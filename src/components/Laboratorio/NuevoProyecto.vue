<template>
    <div>
        <v-dialog v-model="abrirRegProyecto" max-width="700" persistent>
            <v-form ref="formProyecto">
                <v-card color="grey lighten-3">
                    <v-toolbar color="primary" dark>
                        <v-card-title>Nuevo proyecto</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="cerrarModalProyecto"><v-icon>fa fa-time</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-card-subtitle class="subtitle-2 font-weight-black"><strong>Informacion del proyecto</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="4">
                                <v-text-field prepend-icon="fa fa-info" label="Nombre" v-model="datosProyecto.nombre" clearable />
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col cols="12">
                                <v-textarea prepend-icon="fa fa-info" label="Justificacion" v-model="datosProyecto.justificacion" clearable>
                                  <template v-slot:label>
                                    <div>
                                      Bio <small>(optional)</small>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col cols="12">
                                <v-textarea prepend-icon="fa fa-info" label="Alcances" v-model="datosProyecto.alcances" clearable>
                                  <template v-slot:label>
                                    <div>
                                      Bio <small>(optional)</small>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col cols="12">
                                <v-textarea prepend-icon="fa fa-info" label="Metas" v-model="datosProyecto.metas" clearable>
                                  <template v-slot:label>
                                    <div>
                                      Bio <small>(optional)</small>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn block color="success" rounded> Guardar proyecto</v-btn>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "NuevoProyecto",
    props: ['abrirRegProyecto'],
    data: () => ({
        datosProyecto:{
            nombre: "",
            justificacion: "",
            alcances: "",
            metas: ""
        }
    })
}
</script>