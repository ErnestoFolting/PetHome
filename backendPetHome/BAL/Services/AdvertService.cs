using DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL.Services
{
    public class AdvertService
    {
        private readonly DataContext _context;
        public AdvertService(DataContext context)
        {
            _context = context;
        }

    }
}
