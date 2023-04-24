//using CompanyCompanionBackend.Models;
//using CompanyCompanionBackend.Models.Proforma;
//using Microsoft.AspNetCore.Mvc;

//namespace CompanyCompanionBackend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ProformaController : ControllerBase
//    {
//        public static List<ProformaHeader> proformasHeader = new List<ProformaHeader>
//        {
//            new ProformaHeader
//            {
//                IsGenerated = true,
//                ProformaNo = "P22",
//                ProformaDate = DateTime.Now
//            }
//        };

//        [HttpGet("get-proformas-header")]
//        public ActionResult<List<ProformaHeader>> GetProformaHeader()
//        {
//            return Ok(proformasHeader);
//        }

//        [HttpGet("get-proforma-header-by-code")]
//        public ActionResult<ProformaHeader> GetProformaHeaderByCode(string Code)
//        {
//            ProformaHeader c = proformasHeader.Find(c => c.ProformaId == Code);
//            return Ok(c);
//        }

//        [HttpPost("save-proforma")]
//        public ActionResult<ProformaHeader> SaveProforma(Proforma proforma)
//        {
//            Random rnd = new Random();
//            if (proforma.IsGenerated)
//            {
//                proforma.ProformaNo = "PNo" + rnd.Next();
//            }
//            ProformaHeader c = proformasHeader.Find(c => c.ProformaId == proforma.ProformaId);
//            if (c != null)
//            {
//                proformasHeader.Remove(c);
//            }
//            ProformaHeader proformaHeader = new ProformaHeader
//            {
//                ProformaId = Guid.NewGuid().ToString(),
//                ProformaNo = proforma.ProformaNo,
//                PlaceOfIssue = proforma.PlaceOfIssue,
//                DateIssued = proforma.DateIssued,
//                DueDate = proforma.DueDate,
//                IsGenerated = proforma.IsGenerated
//            };
//            proformasHeader.Add(proformaHeader);
//            return Ok(proformasHeader);
//        }

//        [HttpDelete("delete-proforma")]
//        public ActionResult<List<ProformaHeader>> SaveProforma(string Code)
//        {
//            proformasHeader.RemoveAll(x => x.ProformaId == Code);
//            return Ok(proformasHeader);
//        }
//    }
//}
