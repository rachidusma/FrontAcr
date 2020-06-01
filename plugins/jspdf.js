// import Vue from 'vue';
if (process.client) {

    let jsPDF = require('jspdf');
    require('jspdf-autotable');
    let pdf_link;
    exports.link = pdf_link;
    exports.pdf = function (preview, vm, ocrid) {
        const doc = new jsPDF(),
            start = 20,
            end = 200,
            mid = 105;
            let endOfTitle = 50;

        function header() {
            /** Start The header */
            doc.setFont("times", "italic");
            doc.setFontSize("30");
            doc.setTextColor(51, 104, 130);

            doc.text("acredit", start, 20);
            doc.setFont("Helvetica", "");
            doc.setFontSize("12");
            doc.setTextColor(0);

            /** Start customer info */
            doc.text(`Referens: ${vm.$auth.user.name} ${vm.$auth.user.lastname}`, start, endOfTitle);
            doc.text(vm.customer.customername || "", mid, endOfTitle - 10);
            doc.text(vm.customer.postadress || "", mid, endOfTitle - 5);
            doc.text(vm.customer.postadress || "", mid, endOfTitle);
            doc.line(start, endOfTitle + 5, end, endOfTitle + 5);

            doc.autoTable({
                html: '#basic-table',

                margin: { top: endOfTitle + 8, left: start, right: start, bottom: 10 },
                headStyles: { fillColor: "[0, 88, 122]" },
                theme: "plain"
            })


            doc.line(start, endOfTitle + 32, end, endOfTitle + 32);
        }

        function footer() {
            doc.setFontSize(20);

            doc.line(20, 265, 190, 265);
            doc.text("acredit", 90, 272);

            doc.setFontSize(10.0);
            doc.text("Godkänd för F-skatt", 85, 276);
            doc.line(20, 280, 190, 280);

            doc.text("RUDSJÖTERRASSEN 3", 30, 285);
            doc.text("136 40 Handen", 35, 290);

            doc.text("Org.nr 5590303797", 85, 285);
            doc.text("VAT-nummer", 90, 290);
        }

        function pays() {
            doc.setFillColor(28, 137, 181);
            doc.rect(start, 200, 170, 35, "f");

            doc.setFontStyle("bold");
            doc.setTextColor('white');
            doc.setFontSize(10);

            let startY = 207;
            doc.text("SUMMA EX MOMS", mid, startY);
            doc.text(`${String(vm.calculations.amountExVAT.toFixed(2))} kr`, mid + 60, startY);

            let x = startY;
            if (vm.calculations.vat6) {
                doc.text("MOMS 25%", mid, x + 6);
                doc.text(`${String(vm.calculations.vat6.toFixed(2))} kr`, mid + 60, x + 6);
                x += 6;
            }

            if (vm.calculations.vat12) {
                doc.text("MOMS 12%", mid, x + 6);
                doc.text(`${String(vm.calculations.vat12.toFixed(2))} kr`, mid + 60, x + 6);
                x += 6;
            }

            if (vm.calculations.vat25) {
                doc.text("MOMS 6%", mid, x + 6);
                doc.text(`${String(vm.calculations.vat25.toFixed(2))} kr`, mid + 60, x + 6);
                x += 6;
            }

            doc.text("ÖRESAVRUNDNING", mid, x + 6);
            doc.text(`${String(vm.calculations.RoundedSum.toFixed(2))} kr`, mid + 60, x + 6);

            doc.setFillColor(54, 64, 107);
            doc.rect(start, startY + 25, 170, 6, "f");

            doc.setFontSize(12);
            doc.text("ANGE REFERENS", start, startY + 36);
            doc.setFontSize(10);
            doc.text("<Sätts automatiskt>", start, startY + 41);

            doc.setFontSize(12);
            doc.text("TILL BANKGIRO", start + 42, startY + 36);
            doc.setFontSize(10);
            doc.text("5124-4093", start + 42, startY + 41);

            doc.setFontSize(12);
            doc.text("FÖRFALLODATUM", start + 80, startY + 36);
            doc.setFontSize(10);
            doc.text(String(vm.invoice.dateTo), start + 80, startY + 41);

            doc.setFontSize(12);
            doc.text("SUMMA ATT BETALA", start + 125, startY + 36);
            doc.setFontSize(10);
            doc.setFontStyle("bold");
            doc.text(`${vm.calculations.totalSumToPay.toFixed(2)} kr`, 177, startY + 41);

            doc.setFontSize(12);
            doc.text("BETALNINGSVILLKOR", start + 124, startY + 50);
            doc.setFontSize(10);
            doc.setFontStyle("bold");
            doc.text(`${vm.invoice.dagar} Dagar`, 177, startY + 56);
        }

        pays();
        if (vm.draggableItems.length > 13) {
            doc.text("Se fakturaspecifikation på följande sidor", start, 90);

            doc.addPage();

            doc.autoTable({
                html: '#products-table',
                margin: { top: endOfTitle+40, left: start, right: start, bottom: 60 },
                headStyles: { fillColor: "#0d5892" }
            })

            let pagesNo = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pagesNo; i++) {
                doc.setPage(i);
                header();
                footer();
                doc.setFontSize(10);
                doc.text(`Page ${i} of ${pagesNo}`, 5, 292);
            }
        } else {
            header();
            doc.autoTable({
                html: '#products-table',
                margin: { top: endOfTitle+40, left: start, right: start, bottom: 60 },
                pageBreak: "avoid"
            })

            footer();
            doc.setFontSize(10);
            doc.text(`Page 1 of 1`, 5, 292);
        }
        if (!!preview) {
            doc.save(`${ocrid}.pdf`);

            return;
        } else {
            const pdf = new File([doc.output("blob")], `${ocrid}.pdf`, { type: "pdf" }),
                data = new FormData();

            data.append("file", pdf);

            return { data, doc }
        }
    }
}