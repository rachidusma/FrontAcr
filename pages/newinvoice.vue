<template>
    <v-layout>
        <NewInvoice />
    </v-layout>
</template>
<script>
import NewInvoice from '@/components/NewInvoice';
export default {
    layout: 'admin',
    components : {
        NewInvoice
    },
}
</script>