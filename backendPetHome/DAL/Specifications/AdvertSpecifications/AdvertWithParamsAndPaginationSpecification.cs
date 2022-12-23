using backendPetHome.DAL.Entities;
using backendPetHome.DAL.Specifications.QueryParameters;

namespace backendPetHome.DAL.Specifications.RequestSpecifications
{
    public class AdvertWithParamsAndPaginationSpecification : Specification<Advert>
    {
        public AdvertWithParamsAndPaginationSpecification(QueryStringParameters parameters)
            : base(el => el.cost >= parameters.priceFrom && el.cost <= parameters.priceTo 
            && el.status == parameters.advertsStatus )
        {
            AddPagination(parameters);
        }
    }
}
