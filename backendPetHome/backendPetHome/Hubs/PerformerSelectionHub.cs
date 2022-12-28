using backendPetHome.BLL.DTOs.AdvertDTOs;
using backendPetHome.BLL.DTOs.RequestDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace backendPetHome.Hubs
{
    [Authorize]
    public class PerformerSelectionHub : Hub
    {
        public async Task Send(IEnumerable<string> possiblePerformerIds, AdvertDTO advertToSend)
        {
            await Clients.Users(possiblePerformerIds).SendAsync("Send", advertToSend);
        }
        public async Task ApplyRequest(RequestDTO requestDTO)
        {
            string? ownerId = requestDTO.advert.ownerId;
            if(ownerId != null)
            {
                await Clients.User(ownerId).SendAsync("Apply", requestDTO);
            }
        }
        public async Task DeleteRequest(string deleterId, int requestId)
        {

        }
        public async Task ConfirmRequest(int requestId)
        {

        }
        public async Task RejectRequest(int requestId)
        {

        }
    }
}
