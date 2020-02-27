<template>
    <div>
        <v-dialog v-model="visible"  max-width="800" persistent>
            <v-card>
                <v-toolbar>
                    <v-card-title>Nombre del proyecto</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="closeModalProyecto()"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                     <v-card-subtitle class="subtitle-2 font-weight-black" style="padding: 2px;"><strong>Informacion del proyecto</strong></v-card-subtitle>
                        <v-row>
                            <v-col cols="12" sm="12" md="8" lg="8">
                                <v-text-field prepend-icon="fa fa-info" label="Nombre" v-model="datosProyecto.nombre" clearable />
                            </v-col>
                            <v-col cols="12" sm="12" md="4" lg="4">
                                <v-text-field type="text" prepend-icon="fa fa-info" label="Alumnos requeridos" v-model="datosProyecto.alumnosRequeridos" min="1" clearable/>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col cols="12" sm="12" md="6" lg="6">
                                <v-textarea rows="4" prepend-icon="fa fa-list-alt" label="Objetivo" v-model="datosProyecto.objetivo" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Objetivo</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" >
                                <v-textarea rows="4" prepend-icon="fa fa-list-alt" label="Alcences" v-model="datosProyecto.requerimientos" clearable>
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
                                <v-textarea rows="4" prepend-icon="fa fa-list-alt" label="Metas" v-model="datosProyecto.perfiles" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Perfiles</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="12" sm="12" md="6" lg="6" >
                                <v-textarea rows="4" prepend-icon="fa fa-list-alt" label="Metas" v-model="datosProyecto.habilidades" clearable>
                                  <template v-slot:label>
                                    <div>
                                        <p>Habilidades</p>
                                    </div>
                                  </template>
                                </v-textarea>
                            </v-col>
                        </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import { EventBus } from '@/EventBus'

export default {
    name: "informacion",
    props: ["visible","nomProyecto"],

    data: ()=>({
        Infoproyecto: "",
        datosProyecto:{
            alumnosRequeridos: "",
            nombre: "",
            objetivo: "",
            requerimientos: "",
            perfiles: "",
            habilidades: ""
        }
    }),

    methods: {
        // obtener infonomProyectormacion de un laboratorio
        async ObtenerInfoLab(){
            try {
                const {data} = await this.$apollo.query({
                    query: gql`
                        query($nombre: String!, $proyecto: String!){
                            proyecto(nombre: $nombre, proyecto: $proyecto){
                                proyecto
                                objetivo
                                requerimientos
                                perfiles
                                habilidades
                                numAlu
                            }
                        }
                    `,
                    variables: {
                        nombre: this.$route.params.nameLab,
                        proyecto: this.Infoproyecto
                    }   
                })
            this.datosProyecto.alumnosRequeridos =data.proyecto.numAlu;
            this.datosProyecto.nombre =data.proyecto.proyecto,
            this.datosProyecto.objetivo =data.proyecto.objetivo,
            this.datosProyecto.requerimientos =data.proyecto.requerimientos,
            this.datosProyecto.perfiles =data.proyecto.perfiles,
            this.datosProyecto.habilidades =data.proyecto.habilidades
                console.log(data.proyecto.proyecto)
            } catch (error) {
                console.log(error)
            }    
        },
        closeModalProyecto(){EventBus.$emit("CerrarVerProyecto")}
    },

    mounted(){
        document.addEventListener("keydown", event => {
            const keypressed = event.key;
            if(keypressed === "Escape"){
                EventBus.$emit("CerrarVerProyecto")
            }
        });
        // console.log(this.nomProyecto);
        EventBus.$on("VerInfoProyecto", (proyecto)=>{
            this.Infoproyecto = proyecto;
            this.ObtenerInfoLab();
        });
    }
}
</script>
