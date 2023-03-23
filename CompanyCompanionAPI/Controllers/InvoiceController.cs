using CompanyCompanionAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CompanyCompanionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        public static List<InvoiceHeader> invoicesHeader = new List<InvoiceHeader>
        {
            new InvoiceHeader{ InvoiceNo="N0165",InvoiceDate=DateTime.Now}
    };

        [HttpGet("get-invoices-header")]
        public ActionResult<List<InvoiceHeader>> GetInvoicesHeader()
        {
            return Ok(invoicesHeader);
        }


        [HttpGet("get-invoice-header-by-code")]
        public ActionResult<InvoiceHeader> GetInvoiceHeaderByCode(string code)
        {
            InvoiceHeader c = invoicesHeader.Find(c => c.InvoiceNo == code);
            return Ok(c);
        }
        [HttpPost("save-invoice")]
        public ActionResult<InvoiceHeader> SaveInvoice(Invoice invoice)
        {
            InvoiceHeader c = invoicesHeader.Find(c => c.InvoiceNo == invoice.InvoiceNo);
            if(c != null)
            {
                invoicesHeader.Remove(c);
            }
            InvoiceHeader invoiceHeader = new InvoiceHeader
            {InvoiceId = invoice.InvoiceId, InvoiceNo = invoice.InvoiceNo, PlaceOfIssue = invoice.PlaceOfIssue, DateIssued = invoice.DateIssued, DueDate = invoice.DueDate,IsGenerated=invoice.IsGenerated };
            invoicesHeader.Add(invoiceHeader);
            return Ok(invoicesHeader);
        }
        [HttpDelete("delete-invoice")]
        public ActionResult<List<InvoiceHeader>> SaveInvoice(string code)
        {
            invoicesHeader.RemoveAll(x => x.InvoiceNo == code);
            return Ok(invoicesHeader);
        }
    }
}
