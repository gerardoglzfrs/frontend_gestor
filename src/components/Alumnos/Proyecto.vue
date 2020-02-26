<template>
  <div>
    <v-card elevation="6" class="my-4">
      <v-card-title>Proyectos seleccionados
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
                  <v-btn class="px-11" large color="green" outlined>Actualizar</v-btn>Eliminar proyecto</span>
                </v-tooltip>
            </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Proyectos",

  data: () => ({
    filtro: "",
    loading: true,
    headers: [
      {text: "Numero", value: "numero", filerable: false},
      {text: "Nombre", value: "nombre"},
      {text: "Estatus", value: "estatus", filerable: false},
      {text: "Acciones", value: "acciones", filerable: false},
    ],
    proyectos: [
      {numero: 1, nombre: "Plataforma para la gestion de proyectos de innovacion", estatus: "Aceptado"}
    ]
  })
}
</script>
