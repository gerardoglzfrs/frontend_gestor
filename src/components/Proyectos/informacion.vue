<template>
    <div>
        <v-dialog v-model="visible"  max-width="800" persistent>
            <v-card>
                <v-toolbar>
                    <v-card-title>Nombre del proyecto</v-card-title>
                        <v-spacer />
                        <v-btn icon @click="closeModalStudent()"><v-icon>fa fa-times</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col >
                            <p>ndn</p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: "informacion",
    props: ["visible","nomProyecto"],

    methods: {
        // obtener informacion de un laboratorio
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
                            }
                        }
                    `,
                    variables: {
                        nombre: this.$route.params.nameLab,
                        proyecto: this.nomProyecto
                    }   
                })
                console.log(data)
            } catch (error) {
                console.log(error)
            }    
        } 
    },

    mounted(){
        // console.log(this.nomProyecto);
        
         this.ObtenerInfoLab();
    }
}
</script>
