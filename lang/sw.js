
export default {
    appBar: {
        personalSettings: { text: "Personliga inställningar", url: '/sw/settings/personal-settings' },
        changeLang: "Byt språk",
        logout: "Logga ut"
    },
    navigationDrewer: {
        invoice: { text: "Fakturor", url: "/sw/invoices" },
        customer: { text: "Kunder", url: "/sw/user" },
        user: { text: "Användare", url: "/sw/customer" },
        article: { text: "Artiklar", url: "/sw/articles" },
        salary: {
            main: { text: "löner" },
            unpaid: { text: "Obetalda löner", url: "/sw/uppaidsalary" },
            paid: { text: "Betalade löner", url: "/sw/paidsalary" }
        },
        settings: { text: "Inställningar", url: "/sw/settings" },
        statistics: { text: "Statistik", url: "/sw/statistics" }
    },
    invoice: {
        breadCampItems: [
            { text: "Fakturering", href: "/sw/invoices" },
            { text: "Fakturor", disabled: true }
        ],
        title: "Fakturor",
        newinvoiceBtn: 'Ny faktura',
        overdueSection: {
            Overpaid: 'Överbetald (inkl moms)',
            Overdue: 'Försenat (inkl moms)',
            Outstanding: 'Obetalt (inkl moms)',
        },
        table: {
            activeInvoices: "Pågående fakturor",
            allInvoices: "Alla fakturor",
            header: {
                no: "Fakturanr",
                customer: "Kund",
                amount: "Belopp (inkl moms)",
                status: "Status",
                doi: "Fakturadatum",
                due: "Förfallodatum",
                delivery: "Leveransstatus"
            }
        }
    }
}
