namespace backendPetHome.BLL.Models.QueryParameters
{
    public class AdvertsParameters : QueryStringParameters
    {
        public int priceFrom { get; set; } = 0;
        public int priceTo { get; set; } = int.MaxValue;
        public bool isDatesFit { get; set; } = false;
        const int _maxKmRadius = 500;
        private int _kmRadius = 30;
        public int kmRadius
        {
            get
            {
                return _kmRadius;
            }
            set
            {
                _kmRadius = value > _maxKmRadius ? _maxKmRadius : value;
            }
        }
    }
}
