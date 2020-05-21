<template>
    <v-layout>
        <overdueInvoice :overdueID="this.$route.params.id"/>
    </v-layout>
</template>
<script>
import overdueInvoice from '@/components/overdueinvoice/overdueInvoice';
export default {
    layout: 'admin',
    components : {
        overdueInvoice
    },
}
</script>