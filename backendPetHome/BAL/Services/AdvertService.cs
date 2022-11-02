using BAL.DTOs;
using DAL.Data;
using DAL.Models;
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
        public IEnumerable<Advert> getAdverts(string userId)
        {
            throw new ArgumentNullException("Check");
        }

        public async Task addAdvert(AdvertDTO advertToAdd, string userId)
        {
            Advert newAdvert = new()
            {
                name = advertToAdd.name,
                cost = advertToAdd.cost,
                location = advertToAdd.location,
                description = advertToAdd.description,
                startTime = advertToAdd.startTime,
                endTime = advertToAdd.endTime,
                status = Advert.advertStatusEnum.search,
                ownerId = userId
            };
            _context.adverts.Add(newAdvert);
            await _context.SaveChangesAsync();
        }
    }
}
