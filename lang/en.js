
export default {
    appBar: {
        personalSettings: { text: "Personal Settings", url: '/settings/personal-settings' },
        changeLang: "Change Language",
        logout: "Log out"
    },
    navigationDrewer: {
        invoice: { text: "Invoices", url: '/invoices' },
        customer: { text: "Customers", url: '/user' },
        user: { text: "Users", url: '/customer' },
        article: { text: "Articles", url: '/articles' },
        salary: {
            main: { text: "Salaries" },
            unpaid: { text: "Unpaid salaries", url: '/uppaidsalary' },
            paid: { text: "Paid salaries", url: '/paidsalary' }
        },
        settings: { text: "Settings", url: '/settings' },
        statistics: { text: "Statistics", url: '/statistics' }
    },
    invoice: {
        breadCampItems: [
            { text: "Invoices", href: "/invoices" },
            { text: "Invoice", disabled: true }
        ],
        title: "Invoices",
        newinvoiceBtn: 'New Invoice',
        overdueSection: {
            Overpaid: 'Overpaid (inc VAT)',
            Overdue: 'Overdue (inc VAT)',
            Outstanding: 'Outstanding (inc VAT)',
        },
        table: {
            activeInvoices: "Active invoices",
            allInvoices: "All Invoices",
            header: {
                no: "Invoice number",
                customer: "Customer",
                amount: "Invoice amount (inc VAT)",
                status: "Status",
                doi: "Date of invoice",
                due: "Due date",
                delivery: "Delivery date"
            }
        }
    }
}

