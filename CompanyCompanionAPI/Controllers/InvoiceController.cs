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
            new InvoiceHeader{IsGenerated=true, InvoiceNo="N0165",InvoiceDate=DateTime.Now}
    };

        [HttpGet("get-invoices-header")]
        public ActionResult<List<InvoiceHeader>> GetInvoicesHeader()
        {
            return Ok(invoicesHeader);
        }


        [HttpGet("get-invoice-header-by-code")]
        public ActionResult<InvoiceHeader> GetInvoiceHeaderByCode(string code)
        {
            InvoiceHeader c = invoicesHeader.Find(c => c.InvoiceId == code);
            return Ok(c);
        }
        [HttpPost("save-invoice")]
        public ActionResult<InvoiceHeader> SaveInvoice(Invoice invoice)
        {
            Random rnd = new Random();
            if (invoice.IsGenerated)
            {
                invoice.InvoiceNo = "No" + rnd.Next();
            }
            InvoiceHeader c = invoicesHeader.Find(c => c.InvoiceId == invoice.InvoiceId);
            if(c != null)
            {
                invoicesHeader.Remove(c);
            }
            InvoiceHeader invoiceHeader = new InvoiceHeader
            {InvoiceId = Guid.NewGuid().ToString(), InvoiceNo = invoice.InvoiceNo, PlaceOfIssue = invoice.PlaceOfIssue, DateIssued = invoice.DateIssued, DueDate = invoice.DueDate,IsGenerated=invoice.IsGenerated };
            invoicesHeader.Add(invoiceHeader);
            return Ok(invoicesHeader);
        }
        [HttpDelete("delete-invoice")]
        public ActionResult<List<InvoiceHeader>> SaveInvoice(string code)
        {
            invoicesHeader.RemoveAll(x => x.InvoiceId == code);
            return Ok(invoicesHeader);
        }
    }
}
