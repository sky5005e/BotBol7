using Microsoft.Bot.Connector;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace UserAgentBot.Utils
{
    public static class Utility
    {
        public static string Truncate(this string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return value.Length <= maxLength ? value : value.Substring(0, maxLength);
        }
        /// <summary>  
        /// Dispaly image from internet  
        /// </summary>  
        /// <returns></returns>  
        public static Attachment GetInternetAttachment()
        {
            return new Attachment
            {
                Name = "robot.png",
                ContentType = "image/png",
                ContentUrl = "http://useragentbot.azurewebsites.net/assets/icon/favicon-96x96.png"
            };
        }
        /// <summary>  
        /// dispaly local image  
        /// </summary>  
        /// <returns></returns>  
        public static Attachment GetLocalAttachment(string filepath, string FileName)
        {

            var imageData = Convert.ToBase64String(File.ReadAllBytes(System.Web.HttpContext.Current.Server.MapPath(filepath)));
            string type = GetContentType(filepath);
            return new Attachment
            {
                Name = FileName,
                ContentType = type,
                ContentUrl = $"data:{type};base64,{imageData}"
            };
        }
        private static string GetContentType(string filepath)
        {
           var ext = Path.GetExtension(filepath);
            switch (ext.ToLower())
            {
                case ".png":
                    return "image/png";
                case ".jpg":
                    return "image/jpg";
                //case "":
                  //  return "";
                default:
                    return "image/jpg";
            }
        }
        /// <summary>  
        /// dispaly local image  
        /// </summary>  
        /// <returns></returns>  
        public static Attachment GetServerAttachment(string filepath, string FileName)
        {
            string type = GetContentType(filepath);
            return new Attachment
            {
                Name = FileName,
                ContentType = type,//"image/png",
                ContentUrl = string.Format("http://useragentbot.azurewebsites.net/UploadedFiles/{0}", filepath)
            };
        }
        public static string GetImageUrl(string filepath)
        {
            return string.Format("http://useragentbot.azurewebsites.net/UploadedFiles/{0}", filepath);
        }
    }
}