using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Data;
using DAL.Models;
using DAL.Repositories;

namespace DAL.Repositories
{
    public class userRepository:IRepository<User>
    {
        private readonly DataContext _context;
        public userRepository(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<User> getAll()
        {
            _context.users.Add(new User());
            _context.SaveChanges();
            return _context.users;
        }
    }
}
