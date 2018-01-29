using UserAgentBot.DataModel;
using UserAgentBot.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace UserAgentBot.Repository
{
    public class QuesAnsRepo
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public string Create(QuesAnswerModel model)
        {
            using (var db = new UserAgentDBEntities())
            {
                // Create a new  object
                QuestionAnswer qa = new QuestionAnswer();
                // Set the properties on the  object
                qa.QuestionDesc = model.Question;
                qa.created = DateTime.UtcNow;
                qa.AnswerDesc = model.Answer;
                // Add the  object 
                db.QuestionAnswer.Add(qa);
                // Save the changes to the database
                db.SaveChanges();
                return "Saved Successfully";

            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ques"></param>
        /// <returns></returns>
        public List<QuestionAnswer> GetList(string ques)
        {
            using (var db = new UserAgentDBEntities())
            {
                return  db.QuestionAnswer.Where(q => q.QuestionDesc.Contains(ques)).ToList();
            }
        }

        public QuestionAnswer Get(string ques)
        {
            using (var db = new UserAgentDBEntities())
            {
                return db.QuestionAnswer.Where(q => q.QuestionDesc.Contains(ques)).FirstOrDefault();
            }
        }

    }
}