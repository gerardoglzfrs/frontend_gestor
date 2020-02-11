<template>
  <div>
      <Navbar />
      <v-container>
        <v-expansion-panels>
            <v-expansion-panel>
            <v-expansion-panel-header>Nuevos proyectos</v-expansion-panel-header>
            <v-expansion-panel-content>
                <!-- aqui va la table prro -->
            </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
            <v-expansion-panel-header>Proyectos en catalogo</v-expansion-panel-header>
            <v-expansion-panel-content>
                <!-- aqui va la table prro -->
            </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
            <v-expansion-panel-header>Proyectos en desarrollo</v-expansion-panel-header>
            <v-expansion-panel-content>
                <!-- aqui va la table prro -->
            </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
            <v-expansion-panel-header>Proyectos terinados</v-expansion-panel-header>
            <v-expansion-panel-content>
                <!-- aqui va la table prro -->
            </v-expansion-panel-content>
            </v-expansion-panel>

        </v-expansion-panels>
      </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
    name: 'Admin',
    components: { Navbar },
    data: () => ({

    })

}
</script>