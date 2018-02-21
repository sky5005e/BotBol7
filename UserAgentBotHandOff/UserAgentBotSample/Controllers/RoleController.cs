using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

using System.Collections.Generic;
using UserAgentBot.DataModel;

namespace UserAgentBot.Controllers
{
    [RoutePrefix("api/Role")]
    public class RoleController : BaseAPIController
    {
        [Route("Get")]
        public HttpResponseMessage Get()
        {
            return ToJson(List());
        }

        private List<Roles> List()
        {
            return DB.Roles.ToList();
        }
        [Route("Post")]
        public HttpResponseMessage Post([FromBody]Roles value)
        {
            DB.Roles.Add(value);
            return ToJson(DB.SaveChanges());
        }
        [Route("Put")]
        public HttpResponseMessage Put(int id, [FromBody]Roles value)
        {
            DB.Entry(value).State = EntityState.Modified;
            return ToJson(DB.SaveChanges());
        }
        [Route("Delete")]
        public HttpResponseMessage Delete(int id)
        {
            DB.Roles.Remove(DB.Roles.FirstOrDefault(x => x.Id == id));
            return ToJson(DB.SaveChanges());
        }
    }
}

