using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserAgentBot.DataModel;

namespace UserAgentBot.Controllers
{
    public class CustomerAgentController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            var result = Repository.UtilityRepo.GetPendingRequestAsync();
            return ToJson(result); 
        }

    }
}
