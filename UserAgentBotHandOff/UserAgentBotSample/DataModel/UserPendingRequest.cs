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
    
    public partial class UserPendingRequest
    {
        public int Id { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Channel { get; set; }
        public System.DateTime created { get; set; }
        public string Message { get; set; }
        public string IPAddress { get; set; }
        public string MessageID { get; set; }
        public string Type { get; set; }
        public string DeviceType { get; set; }
        public Nullable<bool> IsAttended { get; set; }
        public Nullable<int> AttendedBy { get; set; }
        public string AttendedAgent { get; set; }
    }
}