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
            var result = Repository.UtilityRepo.GetPendingRequestAsync(DateTime.UtcNow.Date);
            return ToJson(result); 
        }
        [Route("monitoring/{day}")]
        public HttpResponseMessage GetMonitoring(int day)
        {
            var result = Repository.UtilityRepo.GetMonitoringResultAsync(DateTime.Now.AddDays(-day).Date);
            return ToJson(result);
        }

        [Route("chats/{take}")]
        public HttpResponseMessage GetChats(int take)
        {
            string userId = "0";
            userId = System.Web.HttpContext.Current.Session["UserID"] != null ? System.Web.HttpContext.Current.Session["UserID"].ToString() : "0";
            var result = Repository.UtilityRepo.GetLatestChatMessageAsync(userId, take);
            return ToJson(result);
        }

    }
}
