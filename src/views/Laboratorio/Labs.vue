<template>
  <div>
        <navLab />
        <CardsLaboratorios />
  </div>
</template>

<script>
import navLab from '@/components/navegacion/navLab'
import CardsLaboratorios from '@/components/CardsLaboratorios'

export default {
    name: "Labs",
    components: { navLab, CardsLaboratorios},
}
</script>
