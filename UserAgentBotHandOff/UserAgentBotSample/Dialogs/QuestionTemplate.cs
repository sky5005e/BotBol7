using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.FormFlow;
using Microsoft.Bot.Builder.FormFlow.Advanced;
using Microsoft.Bot.Connector;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace UserAgentBot.Dialogs
{
    [Serializable]
    [Template(TemplateUsage.NotUnderstood, "I do not understand \"{0}\".", "Try again, I don't get \"{0}\".")]
    public class QuestionTemplate
    {

        public QuestionTemplate(string requestedQues)
        {

            QuestionDesc = requestedQues;

        }

       // List<string> _names;

        [Prompt("Please select {||}")]
        [Describe("Ques Desc")]
        public string QuestionDesc { get; set; }
        [Prompt("Select a option {||}")]
        [Describe("Place to find the current option")]
        public string SelectedQues { get; set; }
        public static IForm<QuestionTemplate> BuildPlaceForm()
        {
            var logic = new DBLogic();
            OnCompletionAsyncDelegate<QuestionTemplate> process = async (context, state) =>
            {
                var businesLogic = new DBLogic();
                var response = businesLogic.GetById(state.SelectedQues);
                var replyText = string.Empty;
                if (!string.IsNullOrEmpty(response.Qdesc))
                {
                    replyText =  $"{ response.Qdesc} : { response.Ansdesc}";//$"As per your selection : {response.Qdesc} : {response.Ansdesc}";
                }
                else
                {
                    replyText = $"Sorry we could not find Ques: {state.SelectedQues}";
                }
                var replyMessage = context.MakeMessage();
                replyMessage.Text = replyText;
                if (!string.IsNullOrEmpty(response.FilePath))
                {
                    replyMessage.Attachments = new List<Attachment> {
                       Utils.Utility.GetServerAttachment(response.FilePath, response.FileName)
                       
                    };
                }
                await context.PostAsync(replyMessage);
            };
            
                var builder = new FormBuilder<QuestionTemplate>()
                        //.Message("Available Options")
                        .Field(nameof(QuestionDesc))
                        .Field(new FieldReflector<QuestionTemplate>(nameof(SelectedQues))
                            .SetType(null)
                            .SetActive((state) =>
                            {
                                return string.IsNullOrEmpty(state.SelectedQues);
                            })
                            //.SetPrompt(new PromptAttribute("Please select one of the following options: {||}")
                            //{
                            //    ChoiceStyle = ChoiceStyleOptions.Buttons
                                
                            //})
                            .SetDefine((state, field) =>
                            {
                                //var result = logic.GetQues(state.QuestionDesc);
                                var result = logic.GetQues2(state.QuestionDesc);
                                foreach (var item in result)
                                {
                                    //field
                                    //    .AddDescription(item.Item1, item.Item2)
                                    //    .AddTerms(item.Item1, item.Item2);
                                    string image = string.IsNullOrEmpty(item.FilePath) ? null : Utils.Utility.GetImageUrl(item.FilePath);
                                    string message = string.IsNullOrEmpty(item.Ansdesc) ? null : item.Ansdesc;

                                    field
                                       .AddDescription(item.Qdesc, item.Qdesc, image, message)
                                       .AddTerms(item.Qdesc, item.Qdesc);
                                    if (image != null)
                                    {
                                        field.SetPrompt(new PromptAttribute("Please select one of the following options: {||}")
                                        {

                                            ChoiceStyle = ChoiceStyleOptions.Carousel

                                        });
                                    }
                                    else
                                    {
                                        field.SetPrompt(new PromptAttribute("Please select one of the following options: {||}")
                                        {

                                            ChoiceStyle = ChoiceStyleOptions.Buttons

                                        });
                                    }
                                }

                                return Task.FromResult(true);
                            }))
                            .OnCompletion(process);
           
            return builder.Build();
        }
    }

        [Serializable]
        public class QASMain
        {
            public int Qid { get; set; }
            public string Qdesc { get; set; }

            public string Ansdesc { get; set; }

            public string FileName { get; set; }

            public string FilePath { get; set; }
        }

    public class DBLogic
    {


        public QASMain GetById(string quesID)
        {
            var result = new UserAgentBot.Repository.QuesAnsRepo().Get(quesID);
            var responseData = new QASMain();

            if (result != null)
            {
                responseData.Qid = result.QuesAnsId;
                responseData.Qdesc = result.QuestionDesc;
                responseData.Ansdesc = result.AnswerDesc;
                responseData.FilePath = result.FilePath;
                responseData.FileName = result.FileName;
            }
            else
            {
                responseData.Qid = 1;
                responseData.Qdesc = "QDESC - 1";
            }
            return responseData;
        }

        public List<Tuple<string, string>> GetQues(string ques)
        {
            var responseData = new List<Tuple<string, string>>();

            var names = new List<QASMain>();
            for (int i = 0; i < 5; i++)
            {
                var q = new QASMain();
                q.Qid = i;
                q.Qdesc = "QDESC - " + i.ToString();
                names.Add(q);
            }


            if (names.Count() > 1)
            {
                for (int i = 0; i < names.Count(); i++)
                {
                    responseData.Add(new Tuple<string, string>(names[i].Qid.ToString(), names[i].Qdesc));
                }
            }

            return responseData;
        }

        public List<QASMain> GetQues2(string ques)
        {

            var names = new List<QASMain>();
            var result = new UserAgentBot.Repository.QuesAnsRepo().GetList(ques);

            for (int i = 0; i < result.Count(); i++)
            {
                var q = new QASMain();
                q.Qid = result[i].QuesAnsId;
                q.Qdesc = result[i].QuestionDesc;

                q.FileName = result[i].FileName;
                q.FilePath = result[i].FilePath;
                names.Add(q);
            }
            //if (!string.IsNullOrEmpty(ques))
            //    return names.Where(q => q.Qdesc.Contains(ques)).ToList();
            //else
                return names;

        }

    }
}
