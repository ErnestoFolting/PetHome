using backendPetHome.DAL.Data;
using backendPetHome.DAL.Models;

namespace backendPetHome.BLL.Services
{
    public class TimeExceptionService
    {
        private readonly DataContext _context;
        public TimeExceptionService(DataContext context)
        {
            _context = context;
        }
        public Task addTimeExceptions(string userId, IEnumerable<DateTime> dates)
        {
            var userExceptions = _context.timeExceptions.Where(el => el.userId == userId).ToList();
            foreach (var date in dates)
            {
                TimeException exception = new();
                exception.userId = userId;
                exception.date = date;
                if (userExceptions.FindIndex(el => el.date == exception.date) == -1)
                {
                    _context.timeExceptions.Add(exception);
                }
            }
            return _context.SaveChangesAsync();
        }
        public bool checkPerformerDates(string userId, DateTime advertStart, DateTime advertEnd)
        {
            var userExceptions = _context.timeExceptions.Where(el => el.userId == userId && el.date >= advertStart && el.date <= advertEnd);
            if (userExceptions.Count() > 0) return false;
            return true;
        }
    }    
}
