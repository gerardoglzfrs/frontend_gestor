<template>
  <div>
      <Navbar />
      <CardsLaboratorios />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import CardsLaboratorios from '@/components/CardsLaboratorios'

export default {
    name: 'ListaLaboratorios', 
    components: {Navbar, CardsLaboratorios}
}
</script>
