
export default {
  continue: "Fortsätta",
  save: "spara",
  upadte: "uppdatering",
  cancle: "Avbryt",
  filter: "Filtrera",
  rowsForTable: "Rader per sida:",
  appBar: {
    personalSettings: { text: "Personliga inställningar", url: '/settings/personal-settings' },
    changeLang: "Byt språk",
    logout: "Logga ut"
  },
  navigationDrewer: {
    invoice: { text: "Fakturor", url: "/invoices" },
    customer: { text: "Användare", url: "/user" },
    user: { text: "Kunder", url: "/customer" },
    article: { text: "Artiklar", url: "/articles" },
    salary: {
      main: { text: "löner" },
      unpaid: { text: "Obetalda löner", url: "/uppaidsalary" },
      paid: { text: "Betalade löner", url: "/paidsalary" }
    },
    settings: { text: "Inställningar", url: "/settings" },
    statistics: { text: "Statistik", url: "/statistics" }
  },
  invoice: {
    breadCampItems: [
      { text: "Fakturering", href: "/invoices" },
      { text: "Fakturor", disabled: true }
    ],
    title: "Fakturor",
    newinvoiceBtn: { text: 'Ny faktura', url: "/newinvoice" },
    overdueSection: {
      Overpaid: 'Överbetald (inkl moms)',
      Overdue: 'Försenat (inkl moms)',
      Outstanding: 'Obetalt (inkl moms)',
    },
    table: {
      activeInvoices: "Pågående fakturor",
      allInvoices: "Alla fakturor",
      filters: {
        invoiceTypes: {
          all: " Alla tillstånd",
          draft: "Utkast",
          published: "Publicerad",
          paid: "Betald",
          overdue: "Försenad",
        }
      },
      links: {
        paid: "/invoices/paid/",
        overdue: "/invoices/overdue/",
        draft: "/invoices/draft/",
        published: "/invoices/published/",
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
    draftLink: "/invoices/draft/",
    breadCampItems: [
      { text: "Fakturor", href: "/invoices" },
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
  },
  customer: {
    userModal: {
      title: {
        add: "Lägg till kund",
        edit: "Redigera kund",
      },
      form: {
        radio: {
          person: "individer",
          company: "företag"
        },

        name: {
          nameLabel: "Namn",
          companyLabel: "Företag",
          placeholder: "Kundens fulla namn",
        },
        number: {
          label: "personligt nummer",
          placeholder: "YYYYMMDD-NNNN",
        },
        orgNumber: {
          label: "Org. nummer",
          placeholder: "YYYYMMDD-NNNN"
        },
        vatNumber: "VAT nummer",
        customerNumber: "Customer number",

        postAdress: "postadress",
        zipCode: "postnummer",
        city: "Stad",

        contctInfo: "Kontakta information",
        country: "Land",
        contactPerson: "Kontaktperson",
        email: "E-post",

        terms: "Villkor",
        days: {
          label: "dagar",
          hint: "Antal dagar innan betalning förfaller."
        },
        overdue: {
          label: "Ränta på försenad betalning",
          hint: "Det är här du definierar räntan som läggs till när en betalning är försenad. Kom ihåg att du måste skapa en ny faktura med den tillagda räntan och skicka den till din kund. Fakturor med räntor måste också registreras manuellt."
        },
        delivery: {
          label: "Leverans",
          hint: "Definiera hur varorna levereras. Ex-lager betyder att risken tas över av kunden så snart varorna lämnar lagret."
        }
      }
    },
    breadCampItems: [
      { text: "Fakturering", href: "/invoices" },
      { text: "kunder", disabled: true }
    ],
    title: "kunder",
    newCustomerbtnText: "+ ny kund",
    table: {
      headers: {
        id: "Kundnummer",
        name: "Namn",
        vat: "Summa inkl moms",
        interset: "försenat intresse (%)"
      }
    }
  }
}
