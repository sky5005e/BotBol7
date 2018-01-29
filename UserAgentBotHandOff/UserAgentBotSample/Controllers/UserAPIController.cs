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

        private List<UserLog> List()
        {
            List<UserLog> Users = new List<UserLog>();
            for (int i = 1; i <= 500; i++)
            {
                UserLog user = new UserLog();
                //user.FirstName = "FirstName" + i.ToString();
                //user.LastName = "LastName" + i.ToString();
               // user.Email = string.Format("Email{0}@gmail.com", i.ToString());
                Users.Add(user);
            }

            return Users;
        }

        public HttpResponseMessage Post([FromBody]UserLog value)
        {
            DB.UserLog.Add(value);
            return ToJson(DB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]UserLog value)
        {
            DB.Entry(value).State = EntityState.Modified;
            return ToJson(DB.SaveChanges());
        }
        public HttpResponseMessage Delete(string  id)
        {
            DB.UserLog.Remove(DB.UserLog.FirstOrDefault(x => x.UserID == id));
            return ToJson(DB.SaveChanges());
        }
    }
}
