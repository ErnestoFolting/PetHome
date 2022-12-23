using backendPetHome.DAL.Entities;

namespace backendPetHome.DAL.Specifications.RequestSpecifications
{
    public class TimeExceptionCurrentUserSpecification : Specification<TimeException>
    {
        public TimeExceptionCurrentUserSpecification(string id)
            : base(t => t.userId == id)
        {
        }
    }
}
