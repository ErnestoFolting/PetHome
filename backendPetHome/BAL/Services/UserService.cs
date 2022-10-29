using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BAL.DTOs;
using DAL;
using DAL.Data;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using static DAL.Models.User;

namespace BAL.Services
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
            var lst = await _context.users.ToListAsync();
            //List<UserDTO> lstDTO = new();
            //foreach (var user in lst)
            //{
            //    UserDTO dto = new ();
            //    dto.id = user.id;
            //    dto.name = user.name;  
            //    dto.email = user.email;
            //    dto.surname = user.surname;
            //    dto.sex = user.sex;
            //    dto.phone = user.phoneNumber;
            //    lstDTO.Add(dto);
            //}
            return lst;
        }
        public Task addUser(UserDTO dto)
        {
            User userToAdd = new();
            userToAdd.id = dto.id;
            userToAdd.name = dto.name;
            userToAdd.email = dto.email;
            userToAdd.surname= dto.surname;
            userToAdd.sex= dto.sex;
            userToAdd.phoneNumber = dto.phone;
            _context.users.Add(userToAdd);
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
