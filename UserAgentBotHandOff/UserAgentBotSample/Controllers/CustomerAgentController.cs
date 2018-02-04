using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserAgentBot.DataModel;

namespace UserAgentBot.Controllers
{
    [RoutePrefix("api/CustomerAgent")]
    public class CustomerAgentController : BaseAPIController
    {
        [Route("get")]
        public HttpResponseMessage Get()
        {
            var result = Repository.UtilityRepo.GetPendingRequestAsync();
            return ToJson(result); 
        }
        [Route("monitoring")]
        public HttpResponseMessage GetMonitoring()
        {
            var result = Repository.UtilityRepo.GetMonitoringResultAsync(DateTime.Now.AddDays(-7).Date);
            return ToJson(result);
        }

    }
}
