using backendPetHome.BLL.DTOs;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Enums;
using backendPetHome.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace backendPetHome.BLL.Services
{
    public class AdvertService
    {
        private readonly DataContext _context;
        public AdvertService(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<Advert> getAllAdverts()
        {
            return _context.adverts.Where(el=>el.status == AdvertStatusEnum.search);
        }

        public Advert getAdvertById(int advertId)
        {
            var advert = _context.adverts.Include(el => el.owner).FirstOrDefault(a => a.Id == advertId);
            Console.WriteLine(advert.owner.name);
            return advert;
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
                status = AdvertStatusEnum.search,
                ownerId = userId
            };
            _context.adverts.Add(newAdvert);
            await _context.SaveChangesAsync();
        }
        public Task MarkAsFinished(int advertId, string userId) {
            var advertInDb = _context.adverts.FirstOrDefault(el => el.Id == advertId);
            if (advertInDb == null) throw new ArgumentException("That advert not exists.");
            if (advertInDb.ownerId!= userId) throw new ArgumentException("You do not have the access.");
            advertInDb.status = AdvertStatusEnum.finished;
            return _context.SaveChangesAsync();
        }

        public Task deleteAdvert(int advertId, string userId)
        {
            var advertInDb = _context.adverts.FirstOrDefault(el => el.Id == advertId);
            if (advertInDb == null) throw new ArgumentException("That advert not exists.");
            if (advertInDb.ownerId != userId) throw new ArgumentException("You do not have the access.");
            _context.adverts.Remove(advertInDb);
            return _context.SaveChangesAsync();
        }
    }
}
