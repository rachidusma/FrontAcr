
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

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

export const mutations = {
    /** NEW INVOICE */
    setCustomer(state, customer) {

        if (customer.epost)
            state.customerEpost = customer.epost;

        state.invoice.OverduePayment = customer.overdueinterest;

        return Object.assign(state.customer, customer);
    },
    dateFrom(state,  date) {
        state.invoice.dateFrom = date;

            state.invoice.dagar = (new Date(state.invoice.dateTo) - new Date(state.invoice.dateFrom)) / 86400000;
            state.invoice.dateTo = new Date(state.invoice.dateFrom).addDays( state.invoice.dagar).toISOString()
            .substr(0, 10);
        return
    },
    setDelivery(state, delivery) {
        return state.invoice.Delivery = delivery
    },
    setOverduePayment(state, payment) {
        return state.invoice.OverduePayment = payment
    },
    setDagar(state, dagar) {
        console.log('here setDagar =>', dagar);
        
        state.invoice.dagar = dagar;
        console.log('before',new Date(state.invoice.dateFrom).toISOString()
        .substr(0, 10));
        
        console.log('after', new Date(state.invoice.dateFrom).addDays(Number(dagar) ).toISOString()
        .substr(0, 10));
        state.invoice.dateTo = new Date(state.invoice.dateFrom).addDays(Number(dagar) ).toISOString()
        .substr(0, 10)
        return
    },
    setEmail(state, email) {
        return state.customer.epost = email;
    }
};

export const actions = {

};

export const getters = {
};
