using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backendPetHome.DAL.Enums
{
    public enum RequestStatusEnum
    {
        rejected = -1,
        generated = 0,
        applied = 1,
        confirmed = 2,
    }
}
