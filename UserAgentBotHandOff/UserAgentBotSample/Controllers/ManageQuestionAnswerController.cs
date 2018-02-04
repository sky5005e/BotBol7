using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using UserAgentBot.DataModel;
using UserAgentBot.ViewModels;
using UserAgentBot.Controllers;

namespace UserAgentBot.Controllers
{
    //[Authorize]
    [RoutePrefix("api/MQA")]

    public class ManageQuestionAnswerController : BaseAPIController
    {
        [Route("get")]
        public HttpResponseMessage Get()
        {
            var result = List();
            return ToJson(result); //ErrorJson(List());//ToJson(List());
        }
        private List<QuestionAnswer> List()
        {
            return DB.QuestionAnswer.ToList();
        }
        [Route("post")]
        public HttpResponseMessage Post([FromBody]QuestionAnswer value)
        {
            value.created = DateTime.UtcNow;
            DB.QuestionAnswer.Add(value);
            return ToJson(DB.SaveChanges());
        }
        [Route("put")]

        public HttpResponseMessage Put(int id, [FromBody]QuestionAnswer value)
        {
            DB.Entry(value).State = EntityState.Modified;
            return ToJson(DB.SaveChanges());
        }
        [Route("delete")]
        public HttpResponseMessage Delete(int id)
        {
            DB.QuestionAnswer.Remove(DB.QuestionAnswer.FirstOrDefault(x => x.QuesAnsId == id));
            return ToJson(DB.SaveChanges());
        }
    }
    /*
    [Authorize]
    [RoutePrefix("api/ManageQuestionAnswer")]

    public class ManageQuestionAnswerController : ApiController
    {
        // GET api/<controller>/5
        [Route("Get/{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [Route("Post")]
        public async Task<IHttpActionResult> Post(QuesAnswerModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {

                var msg = new IntermediatorBotSample.Repository.QuesAnsRepo().Create(model);
                var t = await Task.FromResult<string>(msg);

                return Ok(t);
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                //throw ex;
                IntermediatorBotSample.Repository.UtilityRepo.LogError(ex);

                return BadRequest(msg);
            }
        }

        // PUT api/<controller>/5
        [Route("Put")]
        public void Put(QuestionAnswer value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }*/
}