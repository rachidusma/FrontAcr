
export const state = () => ({
    loggedInUser: {},
    
    /** NEW INVOICE */
    customer: {},
    invoice: {
        dagar: 0,
        dateFrom: new Date().toISOString().substr(0, 10),
        dateTo: new Date().toISOString().substr(0, 10),
        Delivery: 'Fritt vårt lager',
        OverduePayment: '12%',
    }
});

export const mutations = {
    setUser(state, user) {
        return Object.assign(state.loggedInUser, user);
    },
    
    /** NEW INVOICE */
    setCustomer(state, customer) {
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
    }
};

export const actions = {

};

export const getters = {

};
