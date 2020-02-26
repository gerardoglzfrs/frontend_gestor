<template>
    <div>
        <v-container>
            <p class="display-1 text-center">{{  usuarioLogeado.nombre  }}</p>
            <hr>
            <v-row justify="center">
                <v-col cols="12" sm="4">
                    <v-select :items="options" outlined label="Seleccione la categoria"/>
                </v-col>
            </v-row>
            <!-- Tabla de proyectos por laboratorio -->
            <v-row justify="center">
                <v-card class="my-4">
                    <v-card-title>Lista de proyectos
                        <v-spacer />
                        <v-text-field prepend-icon="fa fa-search" label="Buscar proyecto por nombre" v-model="filtro"></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" 
                    :search="filtro" 
                    no-data-text="No has seleccionado ningún proyecto" 
                    :loading="loading" 
                    loading-text="Cargando..."
                    no-results-text="Proyecto no encontrado"
                    :footer-props="{itemsPerPageText:'Paginación'}"
                    :items="proyectos"> 
                        <template v-slot:item.acciones="">
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="primary" v-on="on">
                                        <v-icon>fa fa-info</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{on}">
                                    <v-btn text icon color="red" v-on="on">
                                        <v-icon>fa fa-trash</v-icon>
                                    </v-btn>
                                </template>
                                <span>Eliminar proyecto</span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: "tablaCategoriaProyectos",

    data: () => ({
        loading: true,
        filtro: "",
        headers: [
            {text: "Numero", value: "numero", filerable: false},
            {text: "Nombre", value: "nombre"},
            {text: "Acciones", value: "acciones", filerable: false},
        ],
        proyectos: [
            {numero: 1, nombre: "proyecto", estatus: "activo"}
        ],
        options: ['Nuevos proyectos', 'Proyectos en catalogo', 'Proyectos en desarrollo', 'Proyectos finalizados']
    }),

    computed:{
        ...mapState(["usuarioLogeado"])
    },
}
</script>
