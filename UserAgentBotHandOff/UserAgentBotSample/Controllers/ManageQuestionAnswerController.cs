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
using System.Web;
using System.Drawing;
using UserAgentBot.Repository;

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

        [HttpPost]
        [Route("upload")]
        public async Task<HttpResponseMessage> Upload(int quesAnsId, string questionDesc, string answer)
        {
            try
            {
                var context = HttpContext.Current.Request;
                if (context.Files.Count > 0)
                {

                }
                var t = await DB.SaveChangesAsync();
            }
            catch (Exception ex)
            {

            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("post")]
        public async Task<HttpResponseMessage> post(string questionDesc, string answer)
        {
            try
            {
                var context = HttpContext.Current.Request;
                string filePath = string.Empty;
                string name = string.Empty;
                if (context.Files.Count > 0)
                {
                    name = context.Files[0].FileName;
                    filePath = String.Format("{0}_{1}", DateTime.Now.Ticks, name);
                    var savePath = HttpContext.Current.Server.MapPath("~/UploadedFiles/" + filePath);
                    context.Files[0].SaveAs(savePath);
                }
                if (!string.IsNullOrEmpty(answer) && !string.IsNullOrEmpty(questionDesc))
                {
                    QuestionAnswer model = new QuestionAnswer();
                    model.AnswerDesc = answer;
                    model.QuestionDesc = questionDesc;
                    model.created = DateTime.UtcNow;
                    model.FileName = name;
                    model.FilePath = filePath;
                    DB.QuestionAnswer.Add(model);
                    int result = await DB.SaveChangesAsync();
                    return ToJson(result);
                }
                else
                {
                    await UtilityRepo.LogMsgAsync("Error File saving");
                    return ToJson("Error");
                }
            }
            catch (Exception ex)
            {
                await  UtilityRepo.LogErrorAsync(ex);
                return ToJson("Error");
            }
        }

        [Route("put/{id}")]

        public HttpResponseMessage Put(int id, [FromBody]QuestionAnswer value)
        {
            DB.Entry(value).State = EntityState.Modified;
            return ToJson(DB.SaveChanges());
        }
        [Route("delete/{id}")]
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