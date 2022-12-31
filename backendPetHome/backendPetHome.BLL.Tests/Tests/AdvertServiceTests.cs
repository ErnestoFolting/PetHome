using AutoMapper;
using backendPetHome.BLL.Services;
using backendPetHome.DAL.Interfaces;
using Moq;

namespace backendPetHome.BLL.Tests.Tests
{
    public class AdvertServiceTests
    {
        private readonly AdvertService _sut;
        private readonly Mock<IUnitOfWork> _unitOfWorkMock = new Mock<IUnitOfWork>();
        private readonly Mock<IMapper> _mapperMock = new Mock<IMapper>();
        public AdvertServiceTests()
        {
            //_sut = new AdvertService(_unitOfWorkMock.Object,);
        }
    }
}
