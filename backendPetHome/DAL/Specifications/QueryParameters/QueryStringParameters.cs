namespace backendPetHome.DAL.Specifications.QueryParameters
{
    public abstract class QueryStringParameters
    {
        const int maxPageSize = 36;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 12;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = value > maxPageSize ? maxPageSize : value;
            }
        }
    }
}
