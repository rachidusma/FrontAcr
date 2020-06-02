
export default {
  continue: "Fortsätta",
  cancle: "Avbryt",

  appBar: {
    personalSettings: { text: "Personliga inställningar", url: '/sv/settings/personal-settings' },
    changeLang: "Byt språk",
    logout: "Logga ut"
  },
  navigationDrewer: {
    invoice: { text: "Fakturor", url: "/sv/invoices" },
    customer: { text: "Kunder", url: "/sv/user" },
    user: { text: "Användare", url: "/sv/customer" },
    article: { text: "Artiklar", url: "/sv/articles" },
    salary: {
      main: { text: "löner" },
      unpaid: { text: "Obetalda löner", url: "/sv/uppaidsalary" },
      paid: { text: "Betalade löner", url: "/sv/paidsalary" }
    },
    settings: { text: "Inställningar", url: "/sv/settings" },
    statistics: { text: "Statistik", url: "/sv/statistics" }
  },
  invoice: {
    breadCampItems: [
      { text: "Fakturering", href: "/sv/invoices" },
      { text: "Fakturor", disabled: true }
    ],
    title: "Fakturor",
    newinvoiceBtn: { text: 'Ny faktura', url: "/sv/newinvoice" },
    overdueSection: {
      Overpaid: 'Överbetald (inkl moms)',
      Overdue: 'Försenat (inkl moms)',
      Outstanding: 'Obetalt (inkl moms)',
    },
    table: {
      activeInvoices: "Pågående fakturor",
      allInvoices: "Alla fakturor",
      filters: {
        textPlaceholder: "Filtrera",
        invoiceTypes: {
          all: " Alla tillstånd",
          draft: "Utkast",
          published: "Publicerad",
          paid: "Betald",
          overdue: "Försenad",
        }
      },
      links: {
        paid: "/sv/invoices/paid/",
        overdue: "/sv/invoices/overdue/",
        draft: "/sv/invoices/draft/",
        published: "/sv/invoices/published/",
      },
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
  },
  oneInvoice: {
    draftLink: "/sv/invoices/draft/",
    breadCampItems: [
      { text: "Fakturor", href: "/sv/invoices" },
      { text: "Faktura nr. " }
    ],
    dropDown: {
      btnText: "Mer",
      amend: "Ändra faktura",
      download: "ladda ner"
    },
    modal: {
      btnText: "Klart",
      undo: {
        title: "Ångra publicera",
        text: "Du kan ångra den senaste publicerade fakturan. Fakturan raderas inte utan sparas som ett utkast.",
        btnText: "Ångra nu"
      },
      undoConfirm: {
        title: "Ångra publicera?",
        text: "Fakturan återgår till utkast. Du kommer då att kunna redigera eller ta bort det.",
      },
      edit: {
        title: "Redigera faktura",
        text: "Fakturan kan redigeras så länge den inte har spelats in.",
        btnText: "Redigera"
      }
    },
    invoiceInfo: {
      dop: "Fakturan är publicerad:",
      amount: "Fakturabelopp (inkl. Moms):"
    },
  }
}
