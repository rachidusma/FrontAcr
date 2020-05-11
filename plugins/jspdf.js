// import Vue from 'vue';
if (process.client) {

    let jsPDF = require('jspdf');
    require('jspdf-autotable');

    exports.pdf = async function (preview, vm) {
        const doc = new jsPDF(),
            res = doc.autoTableHtmlToJson(document.getElementById("basic-table")),
            product = doc.autoTableHtmlToJson(
                document.getElementById("products-table")
            ),
            start = 20,
            end = 200,
            mid = 105;

        function header() {
            doc.setFont("times", "italic");
            doc.setFontSize("30");
            doc.setTextColor(25, 212, 0);

            doc.text("acredit", start, 20);
            doc.setFont("Helvetica", "");
            doc.setFontSize("12");
            doc.setTextColor(0);

            doc.text("invoice Title", start, 30);
            doc.text(vm.customer.customername || "", mid, 25);
            doc.text(vm.customer.postadress || "", mid, 30);
            doc.text(vm.customer.postadress || "", mid, 20);
            doc.line(start, 35, end, 35);
            doc.autoTable(res.columns, res.data, {
                margin: { top: 38, left: start, right: start, bottom: 10 },
                theme: "plain"
            });

            doc.line(start, 70, end, 70);
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

            doc.textWithLink("Vist StackOverflow here", 150, 290, {
                url: "https://stackoverflow.com/"
            });
        }

        function pays() {
            doc.setFillColor(164, 172, 212);
            doc.rect(start, 200, 170, 35, "f");

            doc.setFontStyle("bold");
            doc.setTextColor(0);
            doc.setFontSize(10);

            let startY = 207;
            doc.text("SUMMA EX MOMS", mid, startY);
            doc.text(String(vm.calculations.amountExVAT), mid + 60, startY);

            let x = startY;
            if (vm.calculations.vat6) {
                doc.text("MOMS 25%", mid, x + 6);
                doc.text(String(vm.calculations.vat6), mid + 60, x + 6);
                x += 6;
            }

            if (vm.calculations.vat12) {
                doc.text("MOMS 12%", mid, x + 6);
                doc.text(String(vm.calculations.vat12), mid + 60, x + 6);
                x += 6;
            }

            if (vm.calculations.vat25) {
                doc.text("MOMS 6%", mid, x + 6);
                doc.text(String(vm.calculations.vat25), mid + 60, x + 6);
                x += 6;
            }

            doc.text("ÖRESAVRUNDNING", mid, x + 6);
            doc.text(String(vm.calculations.RoundedSum), mid + 60, x + 6);

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
            doc.text(`${vm.calculations.totalSumToPay} kr`, 177, startY + 41);

            doc.setFontSize(12);
            doc.text("BETALNINGSVILLKOR", start + 124, startY + 50);
            doc.setFontSize(10);
            doc.setFontStyle("bold");
            doc.text(`${vm.invoice.dagar} Dagar`, 177, startY + 56);
        }

        pays();
        if (vm.draggableItems.length > 15) {
            doc.text("Se fakturaspecifikation på följande sidor", start, 90);

            doc.addPage();

            doc.autoTable(product.columns, product.data, {
                margin: { top: 70, left: start, right: start, bottom: 60 },
                headStyles: { fillColor: "#0d5892" }
            });

            let pagesNo = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pagesNo; i++) {
                doc.setPage(i);
                header();
                footer();
                doc.setFontSize(10);
                doc.text(`Page ${i} of ${pagesNo}`, 5, 292);
            }
            // window.open(doc.output("bloburl"));
        } else {
            header();
            doc.autoTable(product.columns, product.data, {
                margin: { top: 70, left: start, right: start, bottom: 60 },
                pageBreak: "avoid"
            });
            footer();
            doc.setFontSize(10);
            doc.text(`Page 1 of 1`, 5, 292);
        }
        if (!!preview) {
            doc.save("fixed.pdf");
            return;
        } else {
            const pdf = new File([doc.output("blob")], "filename.pdf", {
                type: "pdf"
            }),
                data = new FormData();

            data.append("file", pdf);

            await vm.$axios
                .$post("/profile/file-upload", data, {
                    headers: {
                        accept: "application/json",
                        "Accept-Language": "en-US,en;q=0.8",
                        "Content-Type": `multipart/form-data;`
                    }
                })
                .then(response => {
                    console.log(response.status);
                    vm.pdf_link = response.location;

                    doc.save("invoice.pdf");

                    if (200 === response.status) {
                        // If file size is larger than expected.
                        if (response.data.error) {
                            if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                                alert("Max size: 2MB", "red");
                            } else {
                                console.log(response.data);
                                // If not the given file type
                                alert(response.data.error, "red");
                            }
                        } else {
                            // Success
                            let fileName = response.data;
                            console.log("filedata", fileName);

                            alert("File Uploaded", "#3089cf");
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}