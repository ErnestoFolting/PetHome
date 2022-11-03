using backendPetHome.BLL.DTOs;
using backendPetHome.DAL.Data;
using backendPetHome.DAL.Enums;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.Services
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
            return _context.adverts.Where(a => a.ownerId == userId);
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
    }
}
