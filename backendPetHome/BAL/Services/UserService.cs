using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Data;
using DAL.Models;
using DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BAL.Services
{
    public class UserService
    {
        private readonly IRepository<User> _userData;
        public UserService(IRepository<User> context)
        {
            _userData = context;
        }

        public async Task<List<User>> getAllUsers()
        {
            return _userData.getAll().ToList();
        }
    }
}
