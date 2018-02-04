using UserAgentBot.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Bot.Connector;
using System.Threading.Tasks;

namespace UserAgentBot.Repository
{
    public static class UtilityRepo
    {
        public static async Task<int> LogRequestMessageAsync(Activity activity)
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
                NewUserLog.UserName = activity.From.Name;
                NewUserLog.created = DateTime.UtcNow;
                NewUserLog.Message = activity.Text.Truncate(500);
                // Add the UserLog object to UserLogs
                DB.UserLog.Add(NewUserLog);
                // Save the changes to the database
                return await DB.SaveChangesAsync();
            }

        }

        public static List<UserPendingRequest> GetPendingRequestAsync()
        {
            using (var DB = new UserAgentDBEntities())
            {
                return DB.UserPendingRequest.Where(q => q.IsAttended == false).OrderByDescending(o=>o.Id).Take(5).ToList();
            }
        }
        public static List<UserPendingRequest> GetMonitoringResultAsync(DateTime dt)
        {
            using (var DB = new UserAgentDBEntities())
            {
                return DB.UserPendingRequest.Where(q => q.created >= dt).ToList();
            }
        }
        public static async Task<int> LogPendingRequestAsync(Activity activity, string ip, string deviceType)
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
                req.UserName = activity.From.Name;
                req.created = DateTime.UtcNow;
                req.Message = activity.Text.Truncate(500);
                req.MessageID = activity.Id;
                req.Type = "ConnectionRequested";
                req.IPAddress = ip;//string.Empty;
                req.DeviceType = deviceType;
                req.IsAttended = false;
                // Add the UserPendingRequest object to UserPendingRequests
                DB.UserPendingRequest.Add(req);
                // Save the changes to the database
                return await DB.SaveChangesAsync();
            }

        }

        public static async Task<int> UpdatedUserAttendedByAsync(Activity activity)
        {

            string commandAccept = activity.Text;
            if (!string.IsNullOrEmpty(commandAccept) && commandAccept.Contains("command accept "))
            {
                // Instantiate the BotData dbContext
                using (var DB = new UserAgentDBEntities())
                {
                    // Add the UserPendingRequest object to UserPendingRequests
                    var user = DB.UserPendingRequest.Where(q => commandAccept.Contains(q.UserID) && q.IsAttended == false).FirstOrDefault();
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
            return await Task.FromResult<int>(0);
        }

        public static async Task<int> LogCustomerAgentChatAsync(Activity activity)
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