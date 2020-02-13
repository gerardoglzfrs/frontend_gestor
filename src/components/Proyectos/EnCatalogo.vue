<template>
    <div>
        <v-row justify="center">
            <v-card class="my-4">
                <v-card-title>Lista de proyectos
                    <v-spacer />
                    <v-text-field prepend-icon="fa fa-search" label="Buscar proyecto por nombre" v-model="filtro"></v-text-field>
                </v-card-title>
                 <v-data-table :headers="headers" 
                :search="filtro" 
                no-data-text="No existen proyectos disponibles" 
                :loading="loading" 
                loading-text="Cargando..."
                no-results-text="Proyecto no encontrado"
                :footer-props="{itemsPerPageText:'Proyectos por página'}"
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
                    </template>
                </v-data-table>
            </v-card>
        </v-row>
    </div>
</template>

<script>

export default {
    name: 'EnCatalogo',

    data: () => ({
        headers: [
            {text: "Numero", value: "numero", filerable: false},
            {text: "Nombre", value: "nombre"},
            {text: "Estatus", value: "estatus", filerable: false},
            {text: "Acciones", value: "acciones", filerable: false},
        ],
        proyectos: [
            {numero: 1, nombre: "proyecto", estatus: "activo"}
        ],
        filtro: "",
        loading: true
    })

}
</script>
