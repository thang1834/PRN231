using PRN231_Project.Models;

namespace PRN231_Project.Repositories
{
    public interface IHouseServiceRepository
    {
        Task<IEnumerable<Service>> GetAllServicesAsync();
        Task<Service> GetServiceByIdAsync(int serviceId);
        Task<Service> AddServiceAsync(Service service);
        Task<Service> UpdateServiceAsync(Service service);
        Task<bool> RemoveServiceAsync(int serviceId);
        Task<List<Service>> GetServicesByHouseIdAsync(int userId);
	}
}
