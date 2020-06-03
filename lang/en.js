
export default {
  continue: "Continue",
  save: "Save",
  upadte: "Upadte",
  cancle: "Cancle",
  filter: "Filter",
  rowsForTable: "Rows per page:",
  email: "email",
  appBar: {
    personalSettings: { text: "Personal Settings", url: '/en/settings/personal-settings' },
    changeLang: "Change Language",
    logout: "Log out"
  },
  navigationDrewer: {
    invoice: { text: "Invoices", url: '/en/invoices' },
    customer: { text: "Customers", url: '/en/customer' },
    user: { text: "Users", url: '/en/user' },
    article: { text: "Articles", url: '/en/articles' },
    salary: {
      main: { text: "Salaries" },
      unpaid: { text: "Unpaid salaries", url: '/en/uppaidsalary' },
      paid: { text: "Paid salaries", url: '/en/paidsalary' }
    },
    settings: { text: "Settings", url: '/en/settings' },
    statistics: { text: "Statistics", url: '/en/statistics' }
  },
  loginForm: {
    signIn: "Sign in",
    signUp: "Sign Up",
    signUpOverlay: {
      label: "Welcome Back!",
      text: "To keep connected with us please login with your personal info"
    },
    signInOverlay: {
      label: "Hello, Friend!",
      text: "Enter your personal details and start journey with us"
    },
    email: "email",
    password: "password",
    forgot: "Forgot your password?",
    noAcc: "Don't have account?",

    signUpForm: {
      label: "Create Account",
      fname: "First name",
      lname: "Last name",
      number: "Number",
      confirmPassword: "Confirm password",
      checkBox1: "By creating an account I approve ACREDIT  General  Terms and ConditionsGenom att skapa ett konto godkänner jag ACREDIT Allmänna villkor",
      checkBox2: "I consent to the processing of my personal data in accordance with  ACREDIT Privacy Policy",
      haveAcc: "Already have account?",
    },

    card: {
      text1: "Thank you for registration with us , your account have been created",
      text2: "into your account"
    }
  },
  invoice: {
    breadCampItems: [
      { text: "Invoices", href: "/en/invoices" },
      { text: "Invoice", disabled: true }
    ],
    title: "Invoices",
    newinvoiceBtn: { text: 'New Invoice', url: "/en/newinvoice" },
    overdueSection: {
      Overpaid: 'Overpaid (inc VAT)',
      Overdue: 'Overdue (inc VAT)',
      Outstanding: 'Outstanding (inc VAT)',
    },
    table: {
      activeInvoices: "Active invoices",
      allInvoices: "All Invoices",
      filters: {
        invoiceTypes: {
          all: "All states",
          draft: "Draft",
          published: "Published",
          paid: "Paid",
          overdue: "Overdue",
        }
      },
      links: {
        paid: "/en/invoices/paid/",
        overdue: "/en/invoices/overdue/",
        draft: "/en/invoices/draft/",
        published: "/en/invoices/published/",
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
    draftLink: "/en/invoices/draft/",
    breadCampItems: [
      { text: "Invoices", href: "/en/invoices" },
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
  },
  customer: {
    userModal: {
      title: {
        add: "Add Customer",
        edit: "Edit Customer",
      },
      form: {
        radio: {
          person: "Individuals",
          company: "Corporations"
        },

        name: {
          nameLabel: "Name",
          companyLabel: "Company",
          placeholder: "Customer full name",
        },
        number: {
          label: "personal number",
          placeholder: "YYYYMMDD-NNNN",
        },
        orgNumber: {
          label: "Org. number",
          placeholder: "YYYYMMDD-NNNN"
        },
        vatNumber: "VAT number",
        customerNumber: "Customer number",
        postAdress: "mailing address",
        zipCode: "ZIP code",
        city: "City",

        contctInfo: "Contact informations",
        country: "Country",
        contactPerson: "Contact person",
        email: "Email",

        terms: "Terms",
        days: {
          label: "days",
          hint: "Number of days before payment is due."
        },
        overdue: {
          label: "Interest on overdue payment",
          hint: "This is where you define the interest rate added when a payment is overdue. Remember that you must create a new invoice with the added interest rate and send it to your customer. Invoices with interest rates also have to be recorded manually."
        },
        delivery: {
          label: "Delivery",
          hint: "Define how the goods are delivered. Ex warehouse means that the risk is taken over by the customer as soon as the goods leave the warehouse."
        }
      }
    },

    breadCampItems: [
      { text: "Invoices", href: "/invoices" },
      { text: "Customers", disabled: true }
    ],
    title: "Customers",
    newCustomerbtnText: "+ New customer",
    table: {
      headers: {
        id: "Customer number",
        name: "Name",
        vat: "Amount incl VAT",
        interset: "Overdue interest (%)"
      }
    }
  },
  oneCustomer: {
    breadCampItems: [
      { text: "Customers", href: "/en/customer" },
      { text: "customer: " }
    ],
    newInvoice: "+ New invocie",
    dropDown: {
      edit: "Edit User",
      delete: "Delete Customer",
      download: "Download Data"
    },
    deleteModal: {
      header: "Deleting customer",
      text: "Are you sure you want to remove customer Marika Bengtsson? This cannot be undone!",
      deleteBtn: "Yes, delete",
    },
    customerInfo: {
      type: "Customer type",
      orgNumber: "Org-number",
      address: "Address",
      vat: "VAT number"
    },
  },
}

