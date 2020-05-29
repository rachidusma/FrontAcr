
export const state = () => ({   
    /** NEW INVOICE */
    customer: {},
    customerEpost: null,
    invoice: {
        dagar: null,
        dateFrom: new Date().toISOString().substr(0, 10),
        dateTo: new Date().toISOString().substr(0, 10),
        Delivery: null,
        OverduePayment: null,
    }
});

export const mutations = {
    /** NEW INVOICE */
    setCustomer(state, customer) {
        state.customerEpost = customer.epost;
        
        state.invoice.dagar = customer.dagar;
        state.invoice.OverduePayment = customer.overdueinterest;

        return Object.assign(state.customer, customer);
    },
    dateFrom(state, date) {
        state.invoice.dateFrom = date;
        state.invoice.dagar = (new Date(state.invoice.dateTo) - new Date(state.invoice.dateFrom))/ 86400000;
        return
    },
    dateTo(state, date) {
        state.invoice.dateTo = date;

        state.invoice.dagar = (new Date(state.invoice.dateTo) - new Date(state.invoice.dateFrom))/ 86400000;

        return 
    },
    setDelivery(state, delivery) {
        return state.invoice.Delivery = delivery
    },
    setOverduePayment(state, payment) {
        return state.invoice.OverduePayment = payment
    },
    setDagar(state, dagar) {
        return state.invoice.dagar = dagar
    },
    setEmail(state, email) {
        return state.customer.epost = email;
    }
};

export const actions = {

};

export const getters = {
};
