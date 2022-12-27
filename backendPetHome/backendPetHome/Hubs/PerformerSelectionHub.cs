using backendPetHome.BLL.DTOs.AdvertDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace backendPetHome.Hubs
{
    [Authorize]
    public class PerformerSelectionHub : Hub
    {
        public async Task Send(IEnumerable<string> possiblePerformers, AdvertDTO advertToSend)
        {
            await Clients.Users(possiblePerformers).SendAsync("Send",advertToSend);
        }
    }
}
