using backendPetHome.DAL.Enums;

namespace backendPetHome.Models.QueryParameters
{
    public class UserAdvertsParameters : QueryStringParameters
    {
        public int priceFrom { get; set; } = 0;
        public int priceTo { get; set; } = int.MaxValue;
        public AdvertStatusEnum? advertsStatus { get; set; } = AdvertStatusEnum.search;
    }
}
