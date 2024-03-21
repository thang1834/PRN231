using System.Collections.Generic;
using System.Threading.Tasks;
using PRN231_Project.Dto.HouseService;
using PRN231_Project.Models;

namespace PRN231_Project.Services
{
    public interface IHouseServiceService
    {
        Task<IEnumerable<ServiceDto>> GetAllServicesAsync();
        Task<ServiceDto> GetServiceByIdAsync(int serviceId);
        Task<ServiceDto> AddServiceAsync(ServiceCreateDto service);
        Task<ServiceDto> UpdateServiceAsync(int serviceId, ServiceUpdateDto service);
        Task<bool> RemoveServiceAsync(int serviceId);
        Task<List<ServiceDto>> GetServicesByHouseIdAsync(int houseId);

        Task<List<ServiceDto>> SetServicesForHouseAsync(HouseServicesDto h);
    }
}
