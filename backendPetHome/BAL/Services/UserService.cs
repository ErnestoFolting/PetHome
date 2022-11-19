using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backendPetHome.BLL.DTOs;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;
using DAL;
using Microsoft.EntityFrameworkCore;
using static backendPetHome.DAL.Models.User;

namespace backendPetHome.BLL.Services
{
    public class UserService
    {
        private readonly DataContext _context;
        public UserService(DataContext context)
        {
            _context = context;
        }
        public async Task<List<User>> getAllUsers()
        {
            var lst = await _context.users.Include(u => u.postedAdverts).ToListAsync();
            //List<UserDTO> lstDTO = new();
            //foreach (var user in lst)
            //{
            //    UserDTO dto = new();

            //    dto.name = user.name;

            //    dto.surname = user.surname;
            //    dto.sex = user.sex;
            //    lstDTO.Add(dto);
            //}
            return lst;
        }
        public async Task<User> getCertainUser(string id)
        {
            var user = await _context.users.Include(u => u.timeExceptions).FirstOrDefaultAsync(u=>u.Id==id);
            return user;
        }
        public Task addUser(UserDTO dto)
        {
            //User userToAdd = new();
            ////userToAdd.id = dto.id;
            //userToAdd.name = dto.name;
            ////userToAdd.email = dto.email;
            //userToAdd.surname= dto.surname;
            //userToAdd.sex= dto.sex;
            ////userToAdd.phoneNumber = dto.phone;
            //_context.users.Add(userToAdd);
            return _context.SaveChangesAsync();
        }
        public Task deleteUser(int id)
        {
            var el = _context.users.FindAsync(id).Result;
            _context.users.Remove(el);
            return _context.SaveChangesAsync();
        }
    }
}
