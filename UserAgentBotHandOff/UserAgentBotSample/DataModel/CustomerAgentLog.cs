//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UserAgentBot.DataModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class CustomerAgentLog
    {
        public int Id { get; set; }
        public string UserID { get; set; }
        public string Channel { get; set; }
        public System.DateTime created { get; set; }
        public string Message { get; set; }
        public string DeviceType { get; set; }
        public Nullable<int> AttendedBy { get; set; }
        public string AttendedAgent { get; set; }
        public string ServiceURL { get; set; }
        public string ChannelId { get; set; }
        public string ChannelName { get; set; }
        public string ConversationId { get; set; }
        public string ConversationName { get; set; }
        public string JsonString { get; set; }
    }
}
