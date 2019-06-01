using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using UserAgentBot.ViewModels;
using UserAgentBot.DataModel;
namespace UserAgentBot.Repository
{
    public class UserRepo
    {
       // DataModel.UserAgentBotDataEntities DB = new DataModel.UserAgentBotDataEntities();
        
        public string  ResetPassword(RegisterExternalBindingModel model)
        {
            using (var db = new UserAgentDBEntities())
            {

                var user = db.UserInformation.Where(s => s.Email == model.Email).FirstOrDefault();
                if(user!= null)
                {
                    user.Password = "Abc123!";
                }
                return "Update Successfully";
            }

        }

        public string RegisterUser(RegisterBindingModel model)
        {
            try
            {
                using (var db = new UserAgentDBEntities())
                {
                    // Create a new User object
                    UserInformation User = new UserInformation();
                    // Set the properties on the User object
                    User.Email = model.UserName;
                    User.FirstName = model.FirstName;
                    User.LastName = model.LastName;
                    User.Password = model.Password;
                    User.UserName = model.UserName;
                    User.created = DateTime.UtcNow;
                    // Add the UserLog object to UserLogs
                    db.UserInformation.Add(User);
                    // Save the changes to the database
                    db.SaveChanges();
                    //return "Saved Successfully";
                }
            }
            catch (DbEntityValidationException e)
            {
                UtilityRepo.LogErrorAsync(e).GetAwaiter().GetResult();
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
            return "true";
        }

        public Models.UserLoginInfoViewModel ValidateUser(ViewModels.LoginModel model)
        {
            using (var db = new UserAgentDBEntities())
            {

                var user = db.UserInformation.Where(s => s.Email == model.UserName && s.Password == model.Password).FirstOrDefault();
                if (user != null)
                {
                    byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
                    byte[] key = Guid.NewGuid().ToByteArray();
                    string token = Convert.ToBase64String(time.Concat(key).ToArray());

                    Models.UserLoginInfoViewModel UserInfo = new Models.UserLoginInfoViewModel();
                    UserInfo.Email = user.Email;
                    UserInfo.Token = token;
                    UserInfo.UserName = user.UserName;
                    UserInfo.FirstName = user.FirstName;
                    UserInfo.LastName = user.LastName;
                    UserInfo.UserId = user.UserId.ToString();
                    return UserInfo;
                }
                else
                {
                    return null;
                }
            }

        }

        //public string GenerateToken(string reason, UserInformation user)
        //{
        //    byte[] _time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
        //    byte[] _key = Guid.Parse(user.UserId.ToString()).ToByteArray();//user.SecurityStamp).ToByteArray();
        //    byte[] _Id = GetBytes(user.UserId.ToString());
        //    byte[] _reason = GetBytes(reason);
        //    byte[] data = new byte[_time.Length + _key.Length + _reason.Length + _Id.Length];

        //    System.Buffer.BlockCopy(_time, 0, data, 0, _time.Length);
        //    System.Buffer.BlockCopy(_key, 0, data, _time.Length, _key.Length);
        //    System.Buffer.BlockCopy(_reason, 0, data, _time.Length + _key.Length, _reason.Length);
        //    System.Buffer.BlockCopy(_Id, 0, data, _time.Length + _key.Length + _reason.Length, _Id.Length);

        //    return Convert.ToBase64String(data.ToArray());
        //}
    }
}