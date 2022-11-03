using Microsoft.AspNetCore.SignalR;

namespace backendPetHome.Hubs
{
    public class PerformerSelectionHub : Hub
    {
        public async Task Send(string message)
        {
            await this.Clients.All.SendAsync("Send",message);
        }
    }
}
