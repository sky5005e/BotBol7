using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Bot.Connector;
using UserAgentBot.Dialogs;
using Microsoft.Bot.Builder.Dialogs;
using Underscore.Bot.MessageRouting;
using Underscore.Bot.Utils;
using Underscore.Bot.Models;
using System.Globalization;
using UserAgentBot.Strings;
using System;
using UserAgentBot.Utils;
using Microsoft.Bot.Builder.FormFlow;

namespace UserAgentBot.Controllers
{
    [BotAuthentication]
    public class MessagesController : ApiController
    {


        public const string CommandRequestConnection = "human";

       
        public MessagesController()
        {
            // Note: This class is constructed every time there is a new activity (Post called).
        }
        private string GetUserIP(System.Web.HttpContext context)
        {
            string ipList = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];
        }
        
        /// <summary>
        /// Handles the received message.
        /// </summary>
        public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
        {
            //await Repository.UtilityRepo.LogMsgAsync("activity id" + activity.From.Id);
            //await Repository.UtilityRepo.LogMsgAsync("activity from" + activity.From.Name);
            //await Repository.UtilityRepo.LogMsgAsync("activity channel" + activity.ChannelId);
            // var t = System.Web.HttpContext.Current.Request.UserHostAddress;
            //var CallerIp = System.Web.HttpContext.Current.Request.UserHostAddress;
            var CallerAgent = System.Web.HttpContext.Current.Request.UserAgent;
            //var CalledUrl = System.Web.HttpContext.Current.Request.Url.OriginalString;
            var current = System.Web.HttpContext.Current;
            var ip = GetUserIP(current);

            await Repository.UtilityRepo.UpdatedUserAttendedByAsync(activity);

            if (activity.Locale != null)
            {
                ConversationText.Culture = new CultureInfo(activity.Locale);
            }

            if (activity.Type == ActivityTypes.Message)
            {
                MessageRouterManager messageRouterManager = WebApiConfig.MessageRouterManager;
                IMessageRouterResultHandler messageRouterResultHandler = WebApiConfig.MessageRouterResultHandler;

                messageRouterManager.MakeSurePartiesAreTracked(activity);
                
                // First check for commands (both from back channel and the ones directly typed)
                MessageRouterResult messageRouterResult =
                    WebApiConfig.BackChannelMessageHandler.HandleBackChannelMessage(activity);

                if (messageRouterResult.Type != MessageRouterResultType.Connected
                    && await WebApiConfig.CommandMessageHandler.HandleCommandAsync(activity) == false)
                {
                    // No valid back channel (command) message or typed command detected

                    // Let the message router manager instance handle the activity
                    messageRouterResult = await messageRouterManager.HandleActivityAsync(activity, false);

                    if (messageRouterResult.Type == MessageRouterResultType.NoActionTaken)
                    {
                        // No action was taken by the message router manager. This means that the
                        // user is not connected (in a 1:1 conversation) with a human
                        // (e.g. customer service agent) yet.
                        //
                        // You can, for example, check if the user (customer) needs human
                        // assistance here or forward the activity to a dialog. You could also do
                        // the check in the dialog too...
                        //
                        // Here's an example:
                        if (!string.IsNullOrEmpty(activity.Text)
                            && activity.Text.ToLower().Contains(CommandRequestConnection) )//&& System.Web.HttpContext.Current.Session["UserID"] != null)
                        {
                            messageRouterResult = messageRouterManager.RequestConnection(activity);
                            // log all the request and thier sources
                            try
                            {
                                await Repository.UtilityRepo.LogPendingRequestAsync(activity, ip, CallerAgent);
                            }
                            catch (System.Data.Entity.Validation.DbEntityValidationException e)
                            {
                                foreach (var eve in e.EntityValidationErrors)
                                {

                                    await Repository.UtilityRepo.LogMsgAsync(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                        eve.Entry.Entity.GetType().Name, eve.Entry.State));
                                    foreach (var ve in eve.ValidationErrors)
                                    {
                                        await Repository.UtilityRepo.LogMsgAsync(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                                            ve.PropertyName, ve.ErrorMessage));
                                    }
                                }
                                //throw;
                            }
                            catch (Exception ex)
                            {
                                await Repository.UtilityRepo.LogMsgAsync("Eror on human request : " + ex.Message);
                            }
                        }
                        else
                        {
                            try
                            {
                                await Repository.UtilityRepo.LogRequestMessageAsync(activity);
                                // Call 
                                await Conversation.SendAsync(activity, () => new RootDialog());
                            }
                            catch (FormCanceledException fcEx) when (fcEx.InnerException is TooManyAttemptsException)
                            {
                                ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));

                                Activity reply = activity.CreateReply(
                                    $"Too Many Attempts at {fcEx.Last}. " +
                                    $"Completed Steps: {string.Join(", ", fcEx.Completed)}");

                                await Repository.UtilityRepo.LogMsgAsync("reply : " + reply.Text);
                                
                                await connector.Conversations.ReplyToActivityAsync(reply);
                            }
                            catch (FormCanceledException fcEx)
                            {
                                ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));

                                Activity reply = activity.CreateReply(
                                    $"Form cancelled at {fcEx.Last}. " +
                                    $"Completed Steps: {string.Join(", ", fcEx.Completed)}");


                                await Repository.UtilityRepo.LogMsgAsync("reply : " + reply.Text);
                                await connector.Conversations.ReplyToActivityAsync(reply);
                            }

                            catch (Exception ex)
                            {

                                await Repository.UtilityRepo.LogErrorAsync(ex);
                            }
                        }
                    }
                }

                if(messageRouterResult!=null && messageRouterResult.Type == MessageRouterResultType.OK && string.IsNullOrEmpty(messageRouterResult.ErrorMessage))
                {
                    await Repository.UtilityRepo.CustomerAgentChatHistoryLogAsync(messageRouterResult);
                }
                // Handle the result, if required
                await messageRouterResultHandler.HandleResultAsync(messageRouterResult);
            }
            else
            {
                await HandleSystemMessageAsync(activity);
            }

            var response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

#pragma warning disable 1998
        private async Task<Activity> HandleSystemMessageAsync(Activity message)
        {
            MessageRouterManager messageRouterManager = WebApiConfig.MessageRouterManager;

            if (message.Type == ActivityTypes.DeleteUserData)
            {
                // Implement user deletion here
                // If we handle user deletion, return a real message
                Party senderParty = MessagingUtils.CreateSenderParty(message);

                if (messageRouterManager.RemoveParty(senderParty)?.Count > 0)
                {
                    return message.CreateReply($"Data of user {senderParty.ChannelAccount?.Name} removed");
                }
            }
            else if (message.Type == ActivityTypes.ConversationUpdate)
            {
                // Handle conversation state changes, like members being added and removed
                // Use Activity.MembersAdded and Activity.MembersRemoved and Activity.Action for info
                // Not available in all channels
                if (message.MembersRemoved != null && message.MembersRemoved.Count > 0)
                {
                    foreach (ChannelAccount channelAccount in message.MembersRemoved)
                    {
                        Party party = new Party(
                            message.ServiceUrl, message.ChannelId, channelAccount, message.Conversation);

                        if (messageRouterManager.RemoveParty(party)?.Count > 0)
                        {
                            System.Diagnostics.Debug.WriteLine($"Party {party.ToString()} removed");
                        }
                    }
                }
            }
            else if (message.Type == ActivityTypes.ContactRelationUpdate)
            {
                // Handle add/remove from contact lists
                // Activity.From + Activity.Action represent what happened
            }
            else if (message.Type == ActivityTypes.Typing)
            {
                // Handle knowing that the user is typing
            }
            else if (message.Type == ActivityTypes.Ping)
            {
            }

            return null;
        }
#pragma warning restore 1998
    }
}