
export default {
  continue: "Fortsätta",
  save: "spara",
  update: "uppdatering",
  cancle: "Avbryt",
  delete: "Radera",
  edit: "Redigera",
  noData: "INGEN DATA TILLGÄNGLIG",
  more: "Mer",
  createNew: "Skapa ny",
  saveAsItem: "Spara som objekt",

  filter: "Filtrera",
  rowsForTable: "Rader per sida:",
  email: "E-post",
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
  loginForm: {
    signIn: "Logga in",
    signUp: "Bli Medlem",
    signInOverlay: {
      label: "Hej kompis!",
      text: "Ange dina personuppgifter och börja resa med oss"
    },
    signUpOverlay: {
      label: "Välkommen tillbaka!",
      text: "För att hålla kontakten med oss, logga in med din personliga information"
    },
    email: "e-post",
    password: "Lösenord",
    forgot: "Glömt ditt lösenord?",
    noAcc: "Har du inte konto?",

    signUpForm: {
      label: "Skapa konto",
      fname: "förnamn",
      lname: "efternamn",
      number: "nummer",
      confirmPassword: "bekräfta lösenord",
      checkBox1: "Genom att skapa ett konto godkänner jag ACREDIT Allmänna villkor",
      checkBox2: "Jag godkänner behandlingen av mina personuppgifter i enlighet med ACREDIT Privacy Policy",
      haveAcc: "Har du redan konto?"
    },

    card: {
      text1: "Tack för att du registrerar dig hos oss, ditt konto har skapats",
      text2: "logga in på ditt konto"
    }
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
  newInvoice: {
    breadCampItems: [
      { text: 'fakturor', href: '/invoices' },
      { text: 'skapa ny faktura', disabled: true }
    ],
    title: "skapa ny faktura", // Skapa en faktura
    customer: {
      title: "Kund:",
      autoPlaceholder: "Sök efter kund",
      customerNO: "Kundnummer:"
    },
    product: {
      title: "Artiklar / tjänster:",
      modal: {
        newRow: "+ Lägg till en ny rad",
        addText: "+ Lägg till text",
        addToInvoice: "Lägg till på fakturan",
        desc: "Beskrivning",
        placeholder: "Sök efter sparat objekt",
        moreEdits: "Redigera mer",

        quantity: "Kvantitet",
        amountVAT: "Belopp exkl. Moms",
        checkBox: {
          label: "",
          hint: "Rot / Rut kommer att redovisas om denna ruta är markerad OCH om du har aktiverat Rot / Rut på fakturan",
        },
        material: {
          typMaterialLable: "Typ av material",
          typMaterialService: "Typ av service",

          materialType: [
            "Barntjänster",
             "Data- och IT-tjänster",
             "Borttagningstjänster",
             "Kläder och textilvård",
             "Personlig hjälp och vård",
             "Reparation av apparater",
             "Snöskakning",
             "Rengöring",
             "Trädgårdsarbete"
          ],
          serviceType: [
            "Barntjänster",
             "Data- och IT-tjänster",
             "Borttagningstjänster",
             "Kläder och textilvård",
             "Personlig hjälp och vård",
             "Reparation av apparater",
             "Snöskakning",
             "Rengöring",
             "Trädgårdsarbete"
          ]
        }
      }
    },
    draggable: {
      name: "artikelnamn",
      vat: "moms",
      amount: "siffra",
      unit: "Enhetspris",
      total: "Totalt (exkl. Skatt)"
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
  },
  oneCustomer: {
    breadCampItems: [
      { text: "kunder", href: "/customer" },
      { text: "kund: " }
    ],
    newInvoice: "+ ny faktura",
    dropDown: {
      edit: "Redigera användare",
      delete: "Radera kund",
      download: "Ladda ner data"
    },
    deleteModal: {
      header: "Ta bort kund",
      text: "Är du säker på att du vill ta bort kunden Marika Bengtsson? Detta kan inte göras ogjort!",
      deleteBtn: "Ja, radera",
    },
    customerInfo: {
      type: "Kundtyp",
      orgNumber: "Org-nummer",
      address: "postadress",
      vat: "Momsregistreringsnummer"
    },
  },
  articles: {
    breadCampItems: [
      { text: "Fakturering", href: "/invoices" },
      { text: "Artiklar", disabled: true }
    ],
    header: "Artiklar",
    articleModal: {
      title: {
        btn: "+ Lägg till ny",
        add: "Lägg till artikel",
        edit: "Redigera artikeln"
      },
      form: {
        name: "Artikelnamn",
        code: "Produktkod",
        price: "Pris enhet",
        unit: "Enhet",
        vat: "Moms",
        type: "typ"
      },
      units: [
        "-",
				"timmar",
				"pund",
				"bitar",
				"dagar",
				"månader",
				"kilogram",
				"gram",
				"liter",
				"meter",
				"centimeter",
				"millimeter",
				"m²",
				"m³",
				"miles",
				"kms"
      ],
      kind: ["gods", "tjänster"]
    },
    deleteModal: {
      label: "Radera objekt",
      text: "Är du säker på att du vill ta bort det här objektet?"
    }
  },

}
