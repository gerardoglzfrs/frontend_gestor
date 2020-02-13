<template>
    <div>
        <navAdmin />
        <CardsLaboratorios />
        
    </div>
</template>

<script>
import navAdmin from '@/components/navegacion/navAdmin'
import CardsLaboratorios from '@/components/CardsLaboratorios'

export default {
    name: 'Admins',
    components: { navAdmin, CardsLaboratorios }
}

</script>
