using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace backendPetHome.Hubs
{
    public class PerformerSelectionHub : Hub
    {
        [Authorize]
        public async Task Send(string message)
        {
            string? userId = Context.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            await this.Clients.All.SendAsync("Send", userId);
        }
    }
}
