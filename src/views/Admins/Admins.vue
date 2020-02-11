<template>
  <div>
      <Navbar />
      <CardLaboratorios />
      <v-row>
        <p>dmd</p>
      </v-row>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import CardLaboratorios from '@/components/CardsLaboratorios'

export default {
  name: 'Admins',
  components: {Navbar, CardLaboratorios}

}
</script>

<style>

</style>