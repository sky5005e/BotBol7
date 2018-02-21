using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

using System.Collections.Generic;
using UserAgentBot.DataModel;

namespace UserAgentBot.Controllers
{
    public class UserAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(List()); //ErrorJson(List());//ToJson(List());
        }

        private List<UserInformation> List()
        {
            return DB.UserInformation.ToList();
        }

        public HttpResponseMessage Post([FromBody]UserInformation value)
        {
            DB.UserInformation.Add(value);
            return ToJson(DB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]UserInformation value)
        {
            DB.Entry(value).State = EntityState.Modified;
            return ToJson(DB.SaveChanges());
        }
        public HttpResponseMessage Delete(int  id)
        {
            DB.UserInformation.Remove(DB.UserInformation.FirstOrDefault(x => x.UserId == id));
            return ToJson(DB.SaveChanges());
        }
    }
}
