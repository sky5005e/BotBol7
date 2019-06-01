using Microsoft.Bot.Builder.Dialogs;
using System;
using System.Threading.Tasks;
using Microsoft.Bot.Connector;
using UserAgentBot.Strings;
using UserAgentBot.Controllers;
using UserAgentBot.CommandHandling;
using System.Collections.Generic;
using Microsoft.Bot.Builder.FormFlow;
using Microsoft.Bot.Builder.FormFlow.Advanced;
using System.Linq;
using UserAgentBot.Dialogs;

namespace UserAgentBot.Dialogs
{


    /// <summary>
    /// Simple echo dialog that tries to connect with a human, if the message contains a certain keyword.
    /// </summary>
    [Serializable]
    public class RootDialog : IDialog<object>
    {
#pragma warning disable 1998
        public async Task StartAsync(IDialogContext context)
        {
            // My dialog initiates and waits for the next message from the user.              
            // await context.PostAsync("Hi I am Bol7 Enquiry Bot.");
            //await Respond(context);
            // When a message arrives, call MessageReceivedAsync.
            context.Wait(OnMessageReceivedAsync);
            await Task.CompletedTask;
        }
#pragma warning restore 1998

        /// <summary>
        /// Responds back to the sender with the message received or in case the message contains
        /// a specific keyword, will try to connect with a human (in 1:1 conversation).
        /// </summary>
        /// <param name="context"></param>
        /// <param name="result"></param>
        /// <returns></returns>
        private async Task OnMessageReceivedAsync(IDialogContext context, IAwaitable<IMessageActivity> result)
        {
            IMessageActivity messageActivity = await result;
            string message = messageActivity.Text;

            if (!string.IsNullOrEmpty(message))
            {
                if (message.ToLower().Contains(MessagesController.CommandRequestConnection))
                {
                    WebApiConfig.MessageRouterManager.RequestConnection((messageActivity as Activity));
                    context.Done(this);
                }
                else
                {
                    messageActivity = context.MakeMessage();
                    //messageActivity.Text = Respondsanswer(message);
                    var answers = new Repository.QuesAnsRepo().GetList(message);
                    if (answers.Count() > 1)
                    {
                        //var list = answers.Select(q => q.QuestionDesc).ToList();
                        //var form = new FormDialog<MyForm>(new MyForm(list), MyForm.BuildForm, FormOptions.PromptInStart);
                        //context.Call(form, Form_Callback);

                        var form = new FormDialog<QuestionTemplate>(new QuestionTemplate(message), QuestionTemplate.BuildPlaceForm, FormOptions.PromptInStart);
                        context.Call(form, QuestionTemplate_Callback);

                        await Task.CompletedTask;
                    }
                    else
                    {
                        if (answers != null && answers.Count > 0)
                        {
                            messageActivity.Text = $"{answers[0].AnswerDesc}";
                            if (!string.IsNullOrEmpty(answers[0].FilePath))
                            {
                                messageActivity.Attachments = new List<Attachment> {
                                    Utils.Utility.GetServerAttachment(answers[0].FilePath, answers[0].FileName)
                                };
                            }
                        }
                        else
                        {
                            messageActivity.Text = $"Sorry didn't understand. " +
                                //$"\n\rType \"{Commands.CommandKeyword} {Commands.CommandListOptions}\" to see all command options." +
                                $"\n\rType \"{MessagesController.CommandRequestConnection}\" to initiate conversation with human agent.";
                            messageActivity.Attachments = new List<Attachment> {
                                Utils.Utility.GetInternetAttachment()
                            };
                        }
                        //$"{ConversationText.EchoMessage}: {message}\n\rType \"{Commands.CommandKeyword} {Commands.CommandListOptions}\" to see all command options.\n\rType \"{MessagesController.CommandRequestConnection}\" to initiate conversation with human agent.";
                        await context.PostAsync(messageActivity);
                        //await Respond(context);
                        context.Done(this);
                    }
                }
            }

        }

        //private async Task Form_Callback(IDialogContext context, IAwaitable<MyForm> result)
        //{
        //    var formData = await result;
        //    //output our selected names form our form
        //    await context.PostAsync("You selected the following names:");
        //    await context.PostAsync(formData.Names?.Aggregate((x, y) => $"{x}, {y}") ?? "No names to select");
        //}

        private async Task QuestionTemplate_Callback(IDialogContext context, IAwaitable<QuestionTemplate> result)
        {
            var formData = await result;
            //output our selected names form our form
            //await context.PostAsync("You selected the following names:");
            //await context.PostAsync(formData.Names?.Aggregate((x, y) => $"{x}, {y}") ?? "No names to select");
        }


        private string Respondsanswer(string ques)
        {
            var answer = new Repository.QuesAnsRepo().GetList(ques);
            if (answer != null && answer.Count > 0)
            {
                
                //if (answer.Count == 1)
                return $"{answer[0].AnswerDesc}";
                //else
                //  return $", \n\rType \"{Commands.CommandKeyword} {Commands.CommandListOptions}\" to see all command options.\n\rType \"{MessagesController.CommandRequestConnection}\" to initiate conversation with human agent.";
            }
            else
            {
                return $"Sorry didn't understand. " +
                    //$"\n\rType \"{Commands.CommandKeyword} {Commands.CommandListOptions}\" to see all command options." +
                    $"\n\rType \"{MessagesController.CommandRequestConnection}\" to initiate conversation with human agent.";
            }
        }

        private async Task Respond(IDialogContext context)
        {
            var userName = string.Empty;
            context.UserData.TryGetValue<string>("Name", out userName);
            if (string.IsNullOrEmpty(userName))
            {
                await context.PostAsync("What is your Name?");
                context.UserData.SetValue<bool>("GetName", true);
            }
            else
            {
                await context.PostAsync(string.Format("Hi {0}. How can I help you today?", userName));
            }
        }

    }
    /*
    [Serializable]
    public class MyForm
    {
        public MyForm(List<string> Names)
        {

            _names = Names;

        }

        List<string> _names;

        [Template(TemplateUsage.NotUnderstood, "**{0}** isn't a valid selection", ChoiceStyle = ChoiceStyleOptions.PerLine)]
        [Prompt("**Choose from the following names**:  {||}")]
        public List<string> Names { get; set; }

        public static IForm<MyForm> BuildForm()
        {

            return new FormBuilder<MyForm>()
             .Field(new FieldReflector<MyForm>(nameof(Names))
                .SetType(null)
              .SetActive(form => form._names != null && form._names.Count > 0)
              .SetDefine(async (form, field) =>
              {
                  form?._names.ForEach(name => field.AddDescription(name, name).AddTerms(name, name));

                  return await Task.FromResult(true);
              }))
            .Build();
        }

    }*/
}


