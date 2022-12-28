namespace backendPetHome.Hubs
{
    public class UserToConnectionIdManager
    {
        private Dictionary<string, List<string>> _mapper;
        public UserToConnectionIdManager()
        {
            _mapper = new Dictionary<string, List<string>>();
        }
        public void AddConnection(string connectionId, string userId)
        {
            List<string> list;
            if (_mapper.TryGetValue(userId, out list)) {
                list.Add(connectionId);
            }
            else
            {
                _mapper[userId] = new List<string> { connectionId };
            }
        }
        public void RemoveConnection(string connectionId, string userId)
        {
            _mapper[userId].Remove(connectionId);
        }
        public List<string> GetConnections(string userId)
        {
            return _mapper[userId];
        }
    }
}
