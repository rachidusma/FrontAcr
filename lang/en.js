
export default {
  continue: "Continue",
  cancle: "Cancle",
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
        newinvoiceBtn: {text: 'New Invoice', url: "/newinvoice"},
        overdueSection: {
            Overpaid: 'Overpaid (inc VAT)',
            Overdue: 'Overdue (inc VAT)',
            Outstanding: 'Outstanding (inc VAT)',
        },
        table: {
            activeInvoices: "Active invoices",
            allInvoices: "All Invoices",
            filters: {
                textPlaceholder: "Search",
                invoiceTypes: {
                    all: "All states",
                    draft: "Draft",
                    published: "Published",
                    paid: "Paid",
                    overdue: "Overdue",
                }
            },
            links: {
                paid: "/invoices/paid/",
                overdue: "/invoices/overdue/",
                draft: "/invoices/draft/",
                published: "/invoices/published/",
            },
            header: {
                no: "Invoice number",
                customer: "Customer",
                amount: "Invoice amount (inc VAT)",
                status: "Status",
                doi: "Date of invoice",
                due: "Due date",
                delivery: "Delivery date"
            },
        }
    },
    oneInvoice: {
      draftLink: "/invoices/draft/",
        breadCampItems: [
            { text: "Invoices", href: "/invoices" },
            { text: "Invoice no. " }
        ],
        dropDown: {
          btnText: "More",
          amend: "Amend invoice",
          download: "Download"
        },
        modal: {
          btnText: "Done",
          undo: {
            title: "Undo publish",
            text: "You may undo the latest published invoice. The invoice is not deleted but saved as a draft.",
            btnText: "Undo now"
          },
          undoConfirm: {
            title: "Undo publish",
            text: "The invoice will be reverted to a draft. You will then be able to edit or delete it.",
          },
          edit: {
            title: "Edit invoice",
            text: "The invoice can be edited as long as it hasn't been recorded.",
            btnText: "Edit"
          }
        },
        invoiceInfo: {
          dop: "Invoice was published:",
          amount: "Invoice amount (inc VAT):"
        }
    }
}

