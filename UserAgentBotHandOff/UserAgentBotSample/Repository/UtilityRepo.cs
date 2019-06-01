using UserAgentBot.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Bot.Connector;
using System.Threading.Tasks;
using System.Data.Entity;
using Underscore.Bot.Models;
using Underscore.Bot.MessageRouting;

namespace UserAgentBot.Repository
{
    public static class UtilityRepo
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        public static async Task<int> LogRequestMessageAsync(Activity activity)
        {
            try
            {
                // *************************
                // Instantiate the BotData dbContext
                using (var DB = new UserAgentDBEntities())
                {
                    // Create a new UserLog object
                    UserLog NewUserLog = new UserLog();
                    // Set the properties on the UserLog object
                    NewUserLog.Channel = activity.ChannelId;
                    NewUserLog.UserID = activity.From.Id;
                    NewUserLog.UserName = activity.ChannelId == "telegram" ? "telegram" : activity.From.Name;
                    NewUserLog.created = DateTime.UtcNow;
                    NewUserLog.Message = activity.Text.Truncate(500);
                    // Add the UserLog object to UserLogs
                    DB.UserLog.Add(NewUserLog);
                    // Save the changes to the database
                    return await DB.SaveChangesAsync();
                }
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
                throw;
            }
            catch (Exception ex)
            {
                await LogErrorAsync(ex);
                throw;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static List<UserPendingRequest> GetPendingRequestAsync(DateTime dt)
        {
            using (var DB = new UserAgentDBEntities())
            {
                return DB.UserPendingRequest.Where(q => q.IsAttended == false && DbFunctions.TruncateTime(q.created) == dt).OrderByDescending(o => o.Id).Take(5).ToList();
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static List<UserPendingRequest> GetMonitoringResultAsync(DateTime dt)
        {
            using (var DB = new UserAgentDBEntities())
            {
                return DB.UserPendingRequest.Where(q => q.created >= dt).ToList();
            }
        }
        public static async Task<int> LogPendingRequestAsync(Activity activity, string ip, string deviceType)
        {
            try
            {
                // *************************
                // Instantiate the BotData dbContext
                using (var DB = new UserAgentDBEntities())
                {
                    // Create a new UserPendingRequest object
                    UserPendingRequest req = new UserPendingRequest();
                    // Set the properties on the UserPendingRequest object
                    req.Channel = activity.ChannelId;
                    req.UserID = activity.From.Id;
                    req.UserName = activity.ChannelId == "telegram" ? "telegram" : activity.From.Name;
                    req.created = DateTime.UtcNow;
                    req.Message = activity.Text.Truncate(500);
                    req.MessageID = activity.Id;
                    req.Type = "ConnectionRequested";
                    req.IPAddress = ip;//string.Empty;
                    req.DeviceType = !string.IsNullOrEmpty(deviceType) ? deviceType : "unknown";
                    req.IsAttended = false;
                    // Add the UserPendingRequest object to UserPendingRequests
                    DB.UserPendingRequest.Add(req);
                    // Save the changes to the database
                    return await DB.SaveChangesAsync();
                }
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
                throw;
            }
            catch (Exception ex)
            {
                await LogErrorAsync(ex);
                throw;
            }

        }

        public static async Task<int> UpdatedUserAttendedByAsync(Activity activity)
        {
            try
            {
                string commandAccept = activity.Text;
                if (!string.IsNullOrEmpty(commandAccept) && commandAccept.Contains("command accept "))
                {
                    // Instantiate the BotData dbContext
                    using (var DB = new UserAgentDBEntities())
                    {
                        // Add the UserPendingRequest object to UserPendingRequests
                        var user = DB.UserPendingRequest.Where(q => commandAccept.Contains(q.UserID) && q.IsAttended == false).OrderByDescending(o => o.Id).FirstOrDefault();
                        if (user != null)
                        {
                            user.IsAttended = true;
                            user.AttendedAgent = activity.From.Name;
                            user.MessageID = activity.Id;
                        }
                        // Save the changes to the database
                        return await DB.SaveChangesAsync();
                    }
                }
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
                throw;
            }
            catch (Exception ex)
            {
                await LogErrorAsync(ex);
                throw;
            }
            return await Task.FromResult<int>(0);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="activity"></param>
        /// <returns></returns>
        public static async Task<int> LogCustomerAgentChatAsync(Activity activity)
        {
            try
            {
                // *************************
                // Instantiate the BotData dbContext
                using (var DB = new UserAgentDBEntities())
                {
                    // Create a new CustomerAgentLog object
                    CustomerAgentLog caLog = new CustomerAgentLog();
                    // Set the properties on the CustomerAgentLog object
                    caLog.Channel = activity.ChannelId;
                    caLog.UserID = activity.From.Id;
                    caLog.created = DateTime.UtcNow;
                    caLog.Message = activity.Text.Truncate(500);
                    // Add the CustomerAgentLog object to CustomerAgentLog
                    DB.CustomerAgentLog.Add(caLog);
                    // Save the changes to the database
                    return await DB.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                await LogErrorAsync(ex);
                throw;
            }

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="conversationParty"></param>
        /// <param name="IsUserAccepted"></param>
        /// <param name="UserName"></param>
        /// <param name="userID"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static async Task<int> CustomerAgentConnectedAsync(Party conversationParty, bool IsUserAccepted, string UserName, string userID, string message)
        {
            try
            {
                // *************************
                // Instantiate the BotData dbContext
                using (var DB = new UserAgentDBEntities())
                {
                    // Create a new CustomerAgentLog object
                    CustomerAgentLog caLog = new CustomerAgentLog();
                    // Set the properties on the CustomerAgentLog object
                    caLog.Channel = conversationParty.ChannelId;
                    caLog.ChannelId = conversationParty.ChannelAccount.Id;
                    caLog.ChannelName = conversationParty.ChannelAccount.Name;
                    caLog.ConversationId = conversationParty.ConversationAccount?.Id;
                    caLog.ConversationName = conversationParty.ConversationAccount?.Name;

                    caLog.AttendedAgent = UserName;
                    caLog.AttendedBy = conversationParty.ConversationAccount.Name == null ? 1 : 1;
                    caLog.ServiceURL = conversationParty.ServiceUrl;
                    caLog.DeviceType = conversationParty.ChannelId;
                    caLog.UserID = "Bot";
                    caLog.JsonString = conversationParty.ToJsonString();

                    caLog.created = DateTime.UtcNow;
                    caLog.Message = message;
                    // Add the CustomerAgentLog object to CustomerAgentLog
                    DB.CustomerAgentLog.Add(caLog);
                    // Save the changes to the database
                    return await DB.SaveChangesAsync();
                }

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
                throw;
            }
            catch (Exception ex)
            {
                await LogErrorAsync(ex);
                throw;
            }

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="messageRouterResult"></param>
        /// <returns></returns>
        public static async Task<int> CustomerAgentChatHistoryLogAsync(MessageRouterResult messageRouterResult)
        {
            try
            {
                // *************************
                // Instantiate the BotData dbContext
                using (var DB = new UserAgentDBEntities())
                {
                    // Create a new CustomerAgentLog object
                    CustomerAgentLog caLog = new CustomerAgentLog();
                    // Set the properties on the CustomerAgentLog object
                    caLog.Channel = messageRouterResult.Activity.ChannelId;

                    caLog.ChannelId = messageRouterResult.ConversationClientParty.ChannelAccount.Id;
                    caLog.ChannelName = messageRouterResult.ConversationClientParty.ChannelAccount.Name;
                    caLog.ConversationId = messageRouterResult.ConversationOwnerParty.ConversationAccount?.Id;
                    caLog.ConversationName = messageRouterResult.ConversationOwnerParty.ConversationAccount?.Name;

                    caLog.AttendedAgent = messageRouterResult.Activity.From.Name;//messageRouterResult.ConversationOwnerParty.ConversationAccount.Name;
                    caLog.AttendedBy = messageRouterResult.ConversationOwnerParty.ConversationAccount.Name == null ? 1 : 1;
                    caLog.ServiceURL = messageRouterResult.ConversationClientParty.ServiceUrl;
                    caLog.DeviceType = messageRouterResult.Activity.ChannelId;

                    caLog.UserID = System.Web.HttpContext.Current.Session["UserID"] == null ? messageRouterResult.Activity.From.Id : System.Web.HttpContext.Current.Session["UserID"].ToString();

                    caLog.JsonString = messageRouterResult.ConversationClientParty.ToJsonString();

                    caLog.created = DateTime.UtcNow;
                    caLog.Message = messageRouterResult.Activity.Text;
                    // Add the CustomerAgentLog object to CustomerAgentLog
                    DB.CustomerAgentLog.Add(caLog);
                    // Save the changes to the database
                    return await DB.SaveChangesAsync();
                }
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
                throw;
            }
            catch (Exception ex)
            {
                await LogErrorAsync(ex);
                throw;
            }

        }
        /// <summary>
        ///  Get Latest Chat Message Async
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="top20"></param>
        /// <returns></returns>
        public static List<CustomerAgentLog> GetLatestChatMessageAsync(string userId, int take)
        {
            using (var DB = new UserAgentDBEntities())
            {
                return DB.CustomerAgentLog.Where(q => q.UserID == userId).OrderByDescending(o => o.Id).Take(take).ToList();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ex"></param>
        public static async Task<int> LogErrorAsync(Exception ex)
        {
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += string.Format("StackTrace: {0}", ex.StackTrace);
            message += Environment.NewLine;
            message += string.Format("Source: {0}", ex.Source);
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            //
            // *************************
            // Log to Database
            // *************************
            // Instantiate the BotData dbContext
            using (var db = new UserAgentDBEntities())
            { // Create a new log object
                LogMessage log = new LogMessage();
                // Set the properties on the UserLog object
                log.CreatedDate = DateTime.UtcNow;
                log.Type = "Error";
                log.Msg = message;
                // Add the log object to UserLogs
                db.LogMessage.Add(log);
                // Save the changes to the database
                return await db.SaveChangesAsync();
            }

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="msg"></param>
        public static async Task<int> LogMsgAsync(string msg)
        {
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", msg);
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            //
            // *************************
            // Log to Database
            // *************************
            // Instantiate the BotData dbContext
            using (var db = new UserAgentDBEntities())
            { // Create a new log object
                LogMessage log = new LogMessage();
                // Set the properties on the UserLog object
                log.CreatedDate = DateTime.UtcNow;
                log.Type = "Info";
                log.Msg = message;
                // Add the log object to UserLogs
                db.LogMessage.Add(log);
                // Save the changes to the database
                return await db.SaveChangesAsync();
            }

        }
    }

    public static class Utility
    {
        public static string Truncate(this string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return value.Length <= maxLength ? value : value.Substring(0, maxLength);
        }
    }

}