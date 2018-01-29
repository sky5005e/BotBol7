//using BotData.Data;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Data.Entity;
//using System.Data.Entity.Infrastructure;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace BotData
//{
//    public class AuditHandler
//    {
//        private DbContext context;
//        /*
//        public AuditHandler(DbContext context)
//        {
//            this.context = context;
//        }
//        public List<Audit> GetAudits(DbEntityEntry entry, int SecurityUserId)
//        {
//            List<Audit> auditlogs = new List<Audit>();
//            DateTime dt = DateTime.UtcNow;
//            if (entry.State == EntityState.Modified)
//            {
//                auditlogs.AddRange(GetModifiedAudits(entry, dt, SecurityUserId));
//            }
//            ////entry is Added 
//            //if (entry.State == EntityState.Added)
//            //{


//            //}
//            ////entry in deleted
//            //else if (entry.State == EntityState.Deleted)
//            //{



//            //}
//            //entry is modified


//            return auditlogs;
//        }


//        private void SetAddedProperties(DbEntityEntry entry, StringBuilder newData)
//        {
//            foreach (var propertyName in entry.CurrentValues.PropertyNames)
//            {
//                var newVal = entry.CurrentValues[propertyName];
//                if (newVal != null)
//                {
//                    newData.AppendFormat("{0}={1} || ", propertyName, newVal);
//                }
//            }
//            if (newData.Length > 0)
//                newData = newData.Remove(newData.Length - 3, 3);
//        }

//        private void SetDeletedProperties(DbEntityEntry entry, StringBuilder oldData)
//        {
//            DbPropertyValues dbValues = entry.GetDatabaseValues();
//            foreach (var propertyName in dbValues.PropertyNames)
//            {
//                var oldVal = dbValues[propertyName];
//                if (oldVal != null)
//                {
//                    oldData.AppendFormat("{0}={1} || ", propertyName, oldVal);
//                }
//            }
//            if (oldData.Length > 0)
//                oldData = oldData.Remove(oldData.Length - 3, 3);
//        }

//        private List<Audit> GetModifiedAudits(DbEntityEntry entry, DateTime dt, int SecurityUserId)
//        {
//            List<Audit> Audits = new List<Audit>();
//            DbPropertyValues dbValues = entry.GetDatabaseValues();
//            foreach (var propertyName in entry.OriginalValues.PropertyNames)
//            {
//                var oldValue = dbValues[propertyName];
//                var newValue = entry.CurrentValues[propertyName];
//                var tableName = GetTableName(entry);

//                List<string> arrayFields = new List<string>();
//                // 
//                var tableAllowForfieldLog = new GenericRepository<Setting>((HicomEntities)this.context).GetManyQueryable(q => q.SettingValue == tableName && q.SettingName == "Audit").FirstOrDefault();
//                if(tableAllowForfieldLog != null)
//                {
//                    arrayFields = tableAllowForfieldLog.Description.Split(',').ToList();
//                }

//                if (oldValue != null && newValue != null && !Equals(oldValue, newValue))
//                {

//                    if (arrayFields.Where(q => propertyName.Equals(q)).Count() == 1)
//                    {
//                        Audit audit = new Audit();
//                        audit.SecurityUserId = SecurityUserId;
//                        audit.TableName = tableName;
//                        audit.PrimaryKey = GetKeyValue(entry);
//                        audit.EventDateTime = dt;
//                        audit.FieldName = propertyName;
//                        audit.EventType = 1;
//                        audit.OldValue = Convert.ToString(oldValue);
//                        audit.NewValue = Convert.ToString(newValue);
//                        Audits.Add(audit);
//                    }

//                }
//            }
//            return Audits;
//        }

//        private void SetModifiedProperties(DbEntityEntry entry, StringBuilder oldData, StringBuilder newData)
//        {
//            DbPropertyValues dbValues = entry.GetDatabaseValues();
//            foreach (var propertyName in entry.OriginalValues.PropertyNames)
//            {
//                var oldVal = dbValues[propertyName];
//                var newVal = entry.CurrentValues[propertyName];
//                if (oldVal != null && newVal != null && !Equals(oldVal, newVal))
//                {
//                    newData.AppendFormat("{0}={1} || ", propertyName, newVal);
//                    oldData.AppendFormat("{0}={1} || ", propertyName, oldVal);
//                }
//            }
//            if (oldData.Length > 0)
//                oldData = oldData.Remove(oldData.Length - 3, 3);
//            if (newData.Length > 0)
//                newData = newData.Remove(newData.Length - 3, 3);
//        }


//        public int? GetKeyValue(DbEntityEntry entry)
//        {
//            var objectStateEntry = ((IObjectContextAdapter)context).ObjectContext.ObjectStateManager.GetObjectStateEntry(entry.Entity);
//            int id = 0;
//            if (objectStateEntry.EntityKey.EntityKeyValues != null)
//                id = Convert.ToInt32(objectStateEntry.EntityKey.EntityKeyValues[0].Value);

//            return id;
//        }

//        private string GetTableName(DbEntityEntry dbEntry)
//        {
//            TableAttribute tableAttr = dbEntry.Entity.GetType().GetCustomAttributes(typeof(TableAttribute), false).SingleOrDefault() as TableAttribute;
//            string tableName = tableAttr != null ? tableAttr.Name : ((dbEntry.Entity.GetType()).BaseType).Name;
//                //tableAttr != null ? tableAttr.Name : dbEntry.Entity.GetType().Name;
//            return tableName;
//        }*/
//    }

   

//}
