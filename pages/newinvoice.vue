<template>
    <v-layout>
        <NewInvoice />
    </v-layout>
</template>
<script>
import NewInvoice from '@/components/NewInvoice';
export default {
    	middleware: "auth",

    layout: 'admin',
    components : {
        NewInvoice
    },
}
</script>