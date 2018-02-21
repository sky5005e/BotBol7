using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

using System.Collections.Generic;
using UserAgentBot.DataModel;

namespace UserAgentBot.Controllers
{
    [RoutePrefix("api/Department")]
    public class DepartmentController : BaseAPIController
    { 
        [Route("Get")]
        public HttpResponseMessage Get()
        {
            return ToJson(List()); 
        }

        private List<Department> List()
        {
            return DB.Department.ToList();
        }
        [Route("Post")]
        public HttpResponseMessage Post([FromBody]Department value)
        {
            DB.Department.Add(value);
            return ToJson(DB.SaveChanges());
        }
        [Route("Put")]
        public HttpResponseMessage Put(int id, [FromBody]Department value)
        {
            DB.Entry(value).State = EntityState.Modified;
            return ToJson(DB.SaveChanges());
        }
        [Route("Delete")]
        public HttpResponseMessage Delete(int id)
        {
            DB.Department.Remove(DB.Department.FirstOrDefault(x => x.Id == id));
            return ToJson(DB.SaveChanges());
        }
    }
}
