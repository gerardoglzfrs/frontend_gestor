<template>
  <div>
      <navAdmin />
      <v-container>
        <v-expansion-panels>
            <v-expansion-panel>
            <v-expansion-panel-header>Nuevos proyectos</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <!-- Tabla de nuevos proyectos -->
                    <Nuevos />
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
            <v-expansion-panel-header>Proyectos en catalogo</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <!-- Table proyectos en catalogo-->
                    <EnCatalogo />
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>Proyectos en desarrollo</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <!-- Tabla de proyectos en desarrollo -->
                    <EnDesarrollo />
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
            <v-expansion-panel-header>Proyectos terinados</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <!-- Tabla de proyectos terminados -->
                    <Finalizados />
                </v-expansion-panel-content>
            </v-expansion-panel>

        </v-expansion-panels>
      </v-container>
  </div>
</template>

<script>
import navAdmin from '@/components/navegacion/navAdmin'
import Nuevos from '@/components/Proyectos/Nuevos'
import Finalizados from '@/components/Proyectos/Finalizados'
import EnDesarrollo from '@/components/Proyectos/EnDesarrollo'
import EnCatalogo from '@/components/Proyectos/EnCatalogo'

export default {
    name: 'Admin',
    components: { navAdmin, Nuevos, Finalizados, EnDesarrollo, EnCatalogo },
    data: () => ({

    })

}
</script>