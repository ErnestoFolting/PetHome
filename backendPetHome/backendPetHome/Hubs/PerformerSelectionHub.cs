using backendPetHome.BLL.DTOs.AdvertDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace backendPetHome.Hubs
{
    [Authorize]
    public class PerformerSelectionHub : Hub 
    {
        private readonly PerformerSelectionHubMethods _hubMethods;

        public PerformerSelectionHub(PerformerSelectionHubMethods hubMethods)
        {
            _hubMethods = hubMethods;
        }

        //public async Task Check(AdvertDTO adv)
        //{
        //    AdvertDTO check = new AdvertDTO
        //    {
        //        id = 2,
        //        name = "Check"
        //    };
        //    await this.Clients.All.SendAsync("Send", check);
        //}
    }
}
