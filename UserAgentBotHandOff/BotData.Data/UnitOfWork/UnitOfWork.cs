
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.Common;
//using System.Data.Entity;
//using System.Data.Entity.Infrastructure;
//using System.Data.Entity.Validation;
//using System.Diagnostics;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using BotData.Data;

//namespace BotData
//{
//    /// <summary>
//    /// Unit of Work class responsible for DB transactions
//    /// </summary>
//    public class UnitOfWork : IDisposable
//    {
//        #region Private member variables...

//        private SkyAng4Entities _context = null;
//        private Dictionary<string, object> repositories;
//        private DbTransaction _transaction;

//        private AuditHandler AuditHandler;
//        //private List<Audit> AuditList = new List<Audit>();
//        private List<DbEntityEntry> ObjectList = new List<DbEntityEntry>();

//        private Dictionary<Type, List<string>> AuditInfo;

//        private int SecurityUserId = 1;
//        #endregion

//        public UnitOfWork()
//        {
//            _context = new SkyAng4Entities();
//        }

//        #region Public Repository Creation properties...
        
//        public GenericRepository<TEntity> Repository<TEntity>() where TEntity : class
//        {
//            if (repositories == null)
//            {
//                repositories = new Dictionary<string, object>();
//            }

//            var type = typeof(TEntity).Name;

//            if (!repositories.ContainsKey(type))
//            {
//                var repositoryType = typeof(GenericRepository<>);
//                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
//                repositories.Add(type, repositoryInstance);
//            }
//            return (GenericRepository<TEntity>)repositories[type];
//        }

//        public void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.Unspecified)
//        {
//            if (_context.Database.Connection.State != ConnectionState.Open)
//            {
//                _context.Database.Connection.Open();
//            }

//            _transaction = _context.Database.Connection.BeginTransaction();
//        }

//        public bool Commit()
//        {
//            _transaction.Commit();
//            return true;
//        }

//        public void Rollback()
//        {
//            _transaction.Rollback();
            
//        }
//        #endregion

//        #region Public member methods...
//        /// <summary>
//        /// Save method.
//        /// </summary>
//        public int SaveChanges()
//        {
//            try
//            {
//                /*
//                AuditList.Clear();
//                ObjectList.Clear();
//                AuditHandler = new AuditHandler(_context);

//                var entityList = _context.ChangeTracker.Entries().Where(p => p.State == EntityState.Added || p.State == EntityState.Deleted || p.State == EntityState.Modified);
//                foreach (var entity in entityList)
//                {
//                    var audits = AuditHandler.GetAudits(entity, SecurityUserId);
//                    bool isValid = true;
//                    foreach (var audit in audits)
//                    {
//                        if (entity.State == EntityState.Modified && string.IsNullOrWhiteSpace(audit.NewValue) && string.IsNullOrWhiteSpace(audit.OldValue))
//                        {
//                            isValid = false;
//                        }
//                        if (isValid)
//                        {
//                            AuditList.Add(audit);
//                            ObjectList.Add(entity);
//                        }
//                    }
//                }

//                var retVal = _context.SaveChanges();
//                if (AuditList.Count > 0)
//                {
//                    for (int i = 0; i < AuditList.Count; i++)
//                    {
//                        if (AuditList[i].EventType == 0)
//                            AuditList[i].PrimaryKey = AuditHandler.GetKeyValue(ObjectList[i]);
//                        //this.Repository<Audit>().Insert(AuditList[i]);
//                    }
//                    this.Repository<Audit>().InsertRange(AuditList);
//                    _context.SaveChanges();
//                }
//                */
//                var retVal = _context.SaveChanges();
//                return retVal;
//            }
//            catch (DbEntityValidationException e)
//            {

//                var outputLines = new List<string>();
//                foreach (var eve in e.EntityValidationErrors)
//                {
//                    outputLines.Add(string.Format("{0}: Entity of type \"{1}\" in state \"{2}\" has the following validation errors:", DateTime.Now, eve.Entry.Entity.GetType().Name, eve.Entry.State));
//                    foreach (var ve in eve.ValidationErrors)
//                    {
//                        outputLines.Add(string.Format("- Property: \"{0}\", Error: \"{1}\"", ve.PropertyName, ve.ErrorMessage));
//                    }
//                }
//                System.IO.File.AppendAllLines(@"C:\errors.txt", outputLines);
//                return 0;
//                throw e;
              
//            }

//        }

//        #endregion

//        #region Implementing IDiosposable...

//        #region private dispose variable declaration...
//        private bool disposed = false;
//        #endregion

//        /// <summary>
//        /// Protected Virtual Dispose method
//        /// </summary>
//        /// <param name="disposing"></param>
//        protected virtual void Dispose(bool disposing)
//        {
//            if (!this.disposed)
//            {
//                if (disposing)
//                {
//                    Debug.WriteLine("UnitOfWork is being disposed");
//                    _context.Dispose();
//                }
//            }
//            this.disposed = true;
//        }

//        /// <summary>
//        /// Dispose method
//        /// </summary>
//        public void Dispose()
//        {
//            Dispose(true);
//            GC.SuppressFinalize(this);
//        }
//        #endregion
//    }
//}
