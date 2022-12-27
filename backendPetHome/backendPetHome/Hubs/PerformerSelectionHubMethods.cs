using backendPetHome.BLL.DTOs.AdvertDTOs;
using Microsoft.AspNetCore.SignalR;

namespace backendPetHome.Hubs
{
    public class PerformerSelectionHubMethods
    {
        private readonly IHubContext<PerformerSelectionHub> _hubContext;
        public PerformerSelectionHubMethods(IHubContext<PerformerSelectionHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task PostAdvert(IEnumerable<string> possiblePerformers, AdvertDTO advertToSend)
        {
            string groupName = Convert.ToString(advertToSend.id);
            await _hubContext.Clients.Users(possiblePerformers).SendAsync("Send", advertToSend);
        }
    }
}
